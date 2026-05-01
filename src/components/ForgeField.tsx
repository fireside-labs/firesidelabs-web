import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const MOTE_COUNT = 110;
const FORGE_RADIUS = 4.0;

const SURFACE_VERT = /* glsl */ `
  uniform float uTime;
  varying float vHeat;
  varying vec3 vLocal;
  varying vec2 vPlanePos;

  void main() {
    vec3 pos = position;
    vec2 p = pos.xy;
    float r = length(p);

    // Heat dome at the core — breathing (faster, more visible)
    float breathing = 0.58 + sin(uTime * 0.85) * 0.24;
    float heat = exp(-r * 0.55) * breathing;

    // Four staggered ripples emanating outward — more frequent
    float ripple = 0.0;
    for (int i = 0; i < 4; i++) {
      float phase = float(i) * 1.4;
      float lifetime = mod(uTime * 0.75 + phase, 5.0);
      float ringR = lifetime * 0.95;
      float dist = abs(r - ringR);
      float fade = exp(-lifetime * 0.32);
      float crest = exp(-dist * 4.8);
      ripple += fade * crest * 0.36 * sin(dist * 14.0 + lifetime * 1.6);
    }

    // Faster ambient swell — keeps the surface alive between ripples
    float swell =
      sin(p.x * 1.3 + uTime * 0.42) *
      cos(p.y * 1.1 + uTime * 0.36) * 0.035;

    // Displace along Z in local space — after the -90° X rotation this becomes world-up
    pos.z = heat * 0.45 + ripple + swell;

    vHeat = heat + max(ripple, 0.0) * 1.4;
    vLocal = pos;
    vPlanePos = p;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const SURFACE_FRAG = /* glsl */ `
  uniform float uTime;
  varying float vHeat;
  varying vec3 vLocal;
  varying vec2 vPlanePos;

  void main() {
    // Obsidian base
    vec3 obsidian = vec3(0.04, 0.04, 0.055);

    // Copper palette
    vec3 copper       = vec3(0.78, 0.46, 0.20);  // #C87533
    vec3 copperBright = vec3(1.00, 0.70, 0.40);  // #FFB366
    vec3 copperDark   = vec3(0.32, 0.18, 0.08);

    float r = length(vPlanePos);

    // Heat-driven emissive: warmer + brighter near the core
    float h = clamp(vHeat * 1.65, 0.0, 1.0);
    vec3 emissive = mix(copperDark, copper, h);
    emissive = mix(emissive, copperBright, smoothstep(0.55, 1.0, h));

    // Radial fade — soft circular vignette so the plane has no hard edges
    float radialFade = smoothstep(FORGE_R, 1.0, r) ;
    float coreGlow = smoothstep(2.6, 0.0, r);

    // Final mix
    vec3 base = mix(obsidian, emissive, h * coreGlow * 1.05);
    // Subtle copper rim so the very center feels lit
    base += copperBright * 0.18 * pow(coreGlow, 3.0);

    // Alpha fades to 0 at the rim so the plane disappears into the page bg
    float alpha = (1.0 - radialFade) * 0.92;
    // Boost alpha at the bright core
    alpha = max(alpha, h * coreGlow * 0.6);

    gl_FragColor = vec4(base, alpha);
  }
`.replace('FORGE_R', (FORGE_RADIUS * 0.92).toFixed(2));

const MOTE_VERT = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aSeed;
  uniform float uTime;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 p = position;

    // Faster, more visible horizontal sway
    p.x += sin(uTime * 1.1 + aSeed * 6.28) * 0.06;
    p.z += cos(uTime * 1.0 + aSeed * 6.28) * 0.06;

    // Upward drift — about 2x faster than before
    float t = mod(uTime * 0.32 + aSeed * 4.0, 4.0);
    p.y = p.y + t * 0.65;

    // High-frequency twinkle so motes feel alive
    float twinkle = 0.7 + 0.3 * sin(uTime * 4.5 + aSeed * 31.4);

    // Per-mote alpha envelope: fade in low, hold, fade out top
    float lifeAlpha =
      smoothstep(0.0, 0.3, t) *
      (1.0 - smoothstep(2.6, 4.0, t));
    vColor = aColor;
    vAlpha = lifeAlpha * twinkle;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * (320.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const MOTE_FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    float halo = smoothstep(0.5, 0.18, d) * 0.4;
    gl_FragColor = vec4(vColor, (core + halo) * vAlpha);
  }
`;

function ForgeSurface() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
      <planeGeometry args={[FORGE_RADIUS * 2.4, FORGE_RADIUS * 2.4, 64, 64]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={SURFACE_VERT}
        fragmentShader={SURFACE_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function HeatCore() {
  // A small intensely bright mesh at the center of the forge — the eye-anchor
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (matRef.current) matRef.current.uniforms.uTime.value = t;
    if (meshRef.current) {
      const s = 1.0 + Math.sin(t * 0.95) * 0.13;
      meshRef.current.scale.setScalar(s);
    }
  });

  const coreVert = /* glsl */ `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const coreFrag = /* glsl */ `
    uniform float uTime;
    varying vec3 vNormal;
    void main() {
      // Fresnel-ish edge glow
      vec3 viewDir = vec3(0.0, 0.0, 1.0);
      float rim = 1.0 - max(0.0, dot(vNormal, viewDir));
      vec3 copperBright = vec3(1.0, 0.72, 0.38);
      vec3 copper = vec3(0.78, 0.46, 0.20);
      vec3 c = mix(copper, copperBright, pow(rim, 2.0));
      float pulse = 0.65 + sin(uTime * 1.05) * 0.25;
      gl_FragColor = vec4(c * pulse, 1.0);
    }
  `;

  return (
    <mesh ref={meshRef} position={[0, -0.45, 0]}>
      <sphereGeometry args={[0.14, 32, 32]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={coreVert}
        fragmentShader={coreFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function RisingMotes() {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(MOTE_COUNT * 3);
    const colors = new Float32Array(MOTE_COUNT * 3);
    const sizes = new Float32Array(MOTE_COUNT);
    const seeds = new Float32Array(MOTE_COUNT);

    const COPPER = new THREE.Color('#C87533');
    const COPPER_BRIGHT = new THREE.Color('#FFB366');

    for (let i = 0; i < MOTE_COUNT; i++) {
      // Concentrate motes near center, scatter outward
      const r = Math.pow(Math.random(), 0.7) * FORGE_RADIUS * 0.85;
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3 + 0] = Math.cos(theta) * r;
      positions[i * 3 + 1] = -0.5 + Math.random() * 0.3; // start near surface
      positions[i * 3 + 2] = Math.sin(theta) * r;

      const c = Math.random() < 0.7 ? COPPER : COPPER_BRIGHT;
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = 1.2 + Math.random() * 1.2;
      seeds[i] = Math.random();
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    return geo;
  }, []);

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={matRef}
        vertexShader={MOTE_VERT}
        fragmentShader={MOTE_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraRig() {
  // Mouse parallax — subtle camera offset that follows the cursor.
  // Makes the scene feel responsive to the user instead of frozen.
  useFrame((state) => {
    const px = state.pointer.x; // -1..1
    const py = state.pointer.y; // -1..1
    const targetX = px * 0.45;
    const targetY = 1.4 + py * 0.25;
    // Smooth interpolation toward target — never snaps
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, -0.3, 0);
  });
  return null;
}

export const ForgeField = () => {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 1.4, 4.2], fov: 52 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.75]}
        frameloop={reduced ? 'never' : 'always'}
        onCreated={({ camera }) => {
          camera.lookAt(0, -0.3, 0);
        }}
      >
        <CameraRig />
        <ForgeSurface />
        <HeatCore />
        <RisingMotes />
      </Canvas>
    </div>
  );
};
