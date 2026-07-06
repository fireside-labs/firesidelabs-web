import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * Animated router link. Use this instead of wrapping a motion.button in a
 * Link — a button inside an anchor is invalid HTML and doubles the tab stops.
 */
export const MotionLink = motion.create(Link);
