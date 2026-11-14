import React, { useLayoutEffect, useRef, useState } from 'react';

interface FitWidthProps {
  watch: string;
  children: React.ReactNode;
}

const FitWidth: React.FC<FitWidthProps> = ({ watch, children }) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) {
      return;
    }

    const measure = () => {
      const available = outer.clientWidth;
      const needed = inner.scrollWidth;
      const nextScale = needed > 0 ? Math.min(1, available / needed) : 1;
      const nextHeight = Math.ceil(inner.scrollHeight * nextScale);
      setScale((current) => (Math.abs(current - nextScale) < 0.004 ? current : nextScale));
      setHeight((current) => (current === nextHeight ? current : nextHeight));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(outer);
    observer.observe(inner);
    return () => observer.disconnect();
  }, [watch]);

  return (
    <div ref={outerRef} style={{ width: '100%', minWidth: 0 }}>
      <div style={{ position: 'relative', width: '100%', height, overflow: 'hidden' }}>
        <div
          ref={innerRef}
          style={{
            position: 'relative',
            left: '50%',
            width: 'max-content',
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default FitWidth;
