import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

/**
 * Animates a number from 0 to `value` when it scrolls into view.
 * `format` turns the interpolated value into the display string.
 */
export const CountUp = ({
  value,
  format,
  className = '',
}: {
  value: number;
  format: (n: number) => string;
  className?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1.8, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      if (ref.current) ref.current.textContent = format(latest);
    });
    return () => unsubscribe();
  }, [spring, format]);

  return (
    <span className={className}>
      {/* Assistive tech and crawlers get the final value; the ~60fps
          textContent mutation is hidden from them. */}
      <span ref={ref} aria-hidden="true">{format(0)}</span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
};
