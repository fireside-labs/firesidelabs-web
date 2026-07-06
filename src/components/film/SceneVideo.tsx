import { useEffect, useRef, useState } from 'react';

/**
 * Full-bleed background video for a film scene.
 * Serves the poster instead of video on mobile, reduced-motion, or save-data
 * connections. The video mounts once the scene first approaches the viewport
 * and stays mounted (unmounting resets playback and re-fetches media ranges);
 * scrolling away pauses it instead.
 * Expects `${base}.mp4` and `${base}.jpg` to exist under public/.
 */
export const SceneVideo = ({
  base,
  className = '',
  priority = false,
}: {
  base: string;
  className?: string;
  /** First-viewport scene: poster loads eagerly (it is the mobile LCP). */
  priority?: boolean;
}) => {
  const [videoOK] = useState(() => {
    const desktop = window.matchMedia('(min-width: 768px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    type NetworkInformation = { saveData?: boolean };
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    return desktop && !reducedMotion && !connection?.saveData;
  });
  const [nearViewport, setNearViewport] = useState(false);
  const [everNear, setEverNear] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setNearViewport(entry.isIntersecting);
        if (entry.isIntersecting) setEverNear(true);
      },
      { rootMargin: '50% 0px' }
    );
    observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  // Pause offscreen videos so multiple scenes never decode simultaneously.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (nearViewport) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [nearViewport, everNear]);

  return (
    <div ref={wrapRef} className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {videoOK && everNear ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={`${base}.mp4`}
          poster={`${base}.jpg`}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
        />
      ) : (
        <img
          src={`${base}.jpg`}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
};
