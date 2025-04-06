"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  showHeader?: boolean;
  title?: string;
  subtitle?: string;
}

export const Timeline = ({ 
  data, 
  showHeader = false, 
  title = "", 
  subtitle = "" 
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans px-2 md:px-10"
      ref={containerRef}
    >
      {showHeader && (
        <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 md:px-8 lg:px-10">
          <h2 className="text-lg md:text-4xl mb-4 text-foreground max-w-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-sm md:text-base max-w-sm">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-12 md:pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-8 md:pt-20 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-16 md:top-24 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-8 md:h-10 absolute left-2.5 md:left-3.5 w-8 md:w-10 rounded-full bg-background flex items-center justify-center">
                <div className="h-3 md:h-4 w-3 md:w-4 rounded-full bg-primary/20 border border-primary/50 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-foreground">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-16 md:pl-4 pr-3 md:pr-4 w-full">
              <h3 className="md:hidden block text-xl mb-3 md:mb-4 text-left font-bold text-foreground">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-4 md:left-8 top-0 overflow-hidden w-[1px] md:w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-border to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[1px] md:w-[2px] bg-primary rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
