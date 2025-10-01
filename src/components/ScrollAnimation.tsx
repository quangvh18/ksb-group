'use client';

import React from 'react';

type ScrollAnimationProps = {
  children: React.ReactNode;
  animation?: string;
  delay?: number;
  className?: string;
};

export default function ScrollAnimation({ children, animation, delay, className }: ScrollAnimationProps) {
  return (
    <div
      data-aos={animation}
      data-aos-delay={typeof delay === 'number' ? delay : undefined}
      className={className}
    >
      {children}
    </div>
  );
}


