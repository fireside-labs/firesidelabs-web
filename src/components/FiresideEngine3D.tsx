import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Stationary system diagram — labeled capabilities orbiting a central engine.
// 3D depth + parallax + flowing particles, but the structure communicates
// what Fireside does (Audit → Calibrate → Build → Deploy) instead of being decorative.

// 4 fixed capability positions in 3D space. The HTML overlay labels each.
const NODES: { id: string; label: string; pos: [number, number, number] }[] = [
  { id: 'audit',    label: 'Audit',     pos: [ 0.0,  1.45,  0.20] },
  { id: 'calibrate', label: 'Calibrate', pos: [ 1.55, 0.20, -0.15] },
  { id: 'build',    label: 'Build',     pos: [-1.55, 0.20, -0.15] },
  { id: 'deploy',   label: 'Deploy',    pos: [ 0.0, -1.20,  0.30] },
];

const HALO_COUNT = 90;
const FLOW_PER_BEAM = 4;
const TOTAL_FLOW = NODES.length * FLOW_PER_BEAM;
const CORE_RADIUS = 0.32;
const HALO_RADIUS = 3.2;

const COPPER = new THREE.Color('#C87533');
const COPPER_BRIGHT = new THREE.Color('#FFB366');
const COPPER_DIM = new THREE.Color('#6B3E1A');

const POINT_VERT = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vAlpha = smoothstep(-4.0, 1.5, mv.z);
    gl_PointSize = aSize * (320.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;
const POINT_FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    float halo = smoothstep(0.5, 0.18, d) * 0.45;
    gl_FragColor = vec4(vColor, (core + halo) * vAlpha);
  }
`;

const CORE_VERT = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const CORE_FRAG = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  void main() {
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    float rim = 1.0 - max(0.0, dot(vNormal, viewDir));
    vec3 copper       = vec3(0.78, 0.46, 0.20);
    vec3 copperBright = vec3(1.00, 0.72, 0.40);
    vec3 c = mix(copper, copperBright, pow(rim, 1.7));
    float pulse = 0.62 + sin(uTime * 0.95) * 0.22;
    gl_FragColor = vec4(c * pulse, 1.0);
  }
`;

function EngineCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (matRef.current) matRef.current.uniforms.uTime.value = t;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.18;
      meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.12;
      const s = 1.0 + Math.sin(t * 0.95) * 0.05;
      meshRef.current.scale.setScalar(s);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[CORE_RADIUS, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={CORE_VERT}
        fragmentShader={CORE_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function NodeMarkers() {
  // Small bright dots at each capability position — anchor for the HTML labels
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(NODES.length * 3);
    const colors = new Float32Array(NODES.length * 3);
    const sizes = new Float32Array(NODES.length);
    for (let i = 0; i < NODES.length; i++) {
      positions[i * 3 + 0] = NODES[i].pos[0];
      positions[i * 3 + 1] = NODES[i].pos[1];
      positions[i * 3 + 2] = NODES[i].pos[2];
      colors[i * 3 + 0] = COPPER_BRIGHT.r;
      colors[i * 3 + 1] = COPPER_BRIGHT.g;
      colors[i * 3 + 2] = COPPER_BRIGHT.b;
      sizes[i] = 4.0;
    }
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    return g;
  }, []);

  return (
    <points geometry={geometry}>
      <shaderMaterial
        vertexShader={POINT_VERT}
        fragmentShader={POINT_FRAG}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Beams() {
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(NODES.length * 2 * 3);
    for (let i = 0; i < NODES.length; i++) {
      // From node -> engine center
      positions[i * 6 + 0] = NODES[i].pos[0];
      positions[i * 6 + 1] = NODES[i].pos[1];
      positions[i * 6 + 2] = NODES[i].pos[2];
      positions[i * 6 + 3] = 0;
      positions[i * 6 + 4] = 0;
      positions[i * 6 + 5] = 0;
    }
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        color={COPPER}
        transparent
        opacity={0.32}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function FlowParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(TOTAL_FLOW * 3), 3));
    const colors = new Float32Array(TOTAL_FLOW * 3);
    const sizes = new Float32Array(TOTAL_FLOW);
    for (let i = 0; i < TOTAL_FLOW; i++) {
      const c = i % 3 === 0 ? COPPER_BRIGHT : COPPER;
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = 1.6 + (i % 2) * 0.4;
    }
    g.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    return g;
  }, []);

  const state = useMemo(
    () =>
      Array.from({ length: TOTAL_FLOW }, (_, i) => ({
        beam: i % NODES.length,
        t: Math.random(),
        speed: 0.22 + Math.random() * 0.18,
      })),
    [],
  );

  useFrame((_, dt) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < TOTAL_FLOW; i++) {
      const ps = state[i];
      ps.t += dt * ps.speed;
      if (ps.t > 1) ps.t -= 1;
      const node = NODES[ps.beam].pos;
      // Flow inward: node -> engine
      arr[i * 3 + 0] = node[0] * (1 - ps.t);
      arr[i * 3 + 1] = node[1] * (1 - ps.t);
      arr[i * 3 + 2] = node[2] * (1 - ps.t);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        vertexShader={POINT_VERT}
        fragmentShader={POINT_FRAG}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Halo() {
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(HALO_COUNT * 3);
    const colors = new Float32Array(HALO_COUNT * 3);
    const sizes = new Float32Array(HALO_COUNT);
    for (let i = 0; i < HALO_COUNT; i++) {
      const phi = Math.acos(1 - 2 * Math.random());
      const theta = Math.random() * Math.PI * 2;
      const r = HALO_RADIUS * (0.7 + Math.random() * 0.6);
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.55;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      const c = Math.random() < 0.85 ? COPPER_DIM : COPPER;
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = 0.5 + Math.random() * 1.0;
    }
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    return g;
  }, []);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.025;
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <shaderMaterial
          vertexShader={POINT_VERT}
          fragmentShader={POINT_FRAG}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function CameraRig() {
  // Very subtle parallax — keeps labels aligned with 3D nodes
  useFrame((state) => {
    const px = state.pointer.x;
    const py = state.pointer.y;
    const targetX = px * 0.18;
    const targetY = 0.4 + py * 0.10;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.04;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// Pause animation when tab is not visible (CPU saver)
function VisibilityGate() {
  useFrame((state) => {
    if (typeof document !== 'undefined' && document.hidden) {
      state.invalidate?.();
    }
  });
  return null;
}

export const FiresideEngine3D = () => {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0.4, 4.6], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        frameloop={reduced ? 'never' : 'always'}
      >
        <CameraRig />
        <VisibilityGate />
        <Halo />
        <Beams />
        <FlowParticles />
        <NodeMarkers />
        <EngineCore />
      </Canvas>

    </div>
  );
};
