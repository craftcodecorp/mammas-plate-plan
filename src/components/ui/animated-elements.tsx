import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  fadeIn,
  fadeInUp,
  fadeInDown,
  staggerChildren,
  scaleIn,
  slideInLeft,
  slideInRight
} from '@/lib/animation-variants';

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variants?: Variants;
  once?: boolean;
  amount?: number; // Using amount instead of threshold for Framer Motion compatibility
}

/**
 * FadeIn component for simple fade-in animations
 */
export const FadeIn: React.FC<AnimatedElementProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.1
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { 
            duration,
            delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * FadeInUp component for fade-in-up animations
 */
export const FadeInUp: React.FC<AnimatedElementProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.1
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration,
            delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * ScaleIn component for scale-in animations
 */
export const ScaleIn: React.FC<AnimatedElementProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.1
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
          opacity: 1, 
          scale: 1,
          transition: { 
            duration,
            delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * SlideIn component for slide-in animations
 */
export const SlideIn: React.FC<AnimatedElementProps & { direction: 'left' | 'right' | 'up' | 'down' }> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  direction = 'left',
  once = true,
  amount = 0.1
}) => {
  const directionVariants = {
    left: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
    up: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: directionVariants[direction].hidden,
        visible: { 
          ...directionVariants[direction].visible,
          transition: { 
            duration,
            delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerContainer component for staggered animations of children
 */
export const StaggerContainer: React.FC<AnimatedElementProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.1
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { 
            staggerChildren: 0.1,
            delayChildren: delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerItem component for items inside a StaggerContainer
 */
export const StaggerItem: React.FC<AnimatedElementProps> = ({
  children,
  className = '',
  variants = fadeInUp
}) => {
  return (
    <motion.div
      className={className}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

/**
 * Hover animation component
 */
export const HoverScale: React.FC<AnimatedElementProps> = ({
  children,
  className = '',
}) => {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Pulse animation component
 */
export const PulseAnimation: React.FC<AnimatedElementProps> = ({
  children,
  className = '',
  duration = 2
}) => {
  return (
    <motion.div
      className={className}
      animate={{ 
        scale: [1, 1.03, 1],
      }}
      transition={{ 
        duration,
        repeat: Infinity,
        repeatType: "loop"
      }}
    >
      {children}
    </motion.div>
  );
};
