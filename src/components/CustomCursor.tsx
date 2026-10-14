import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad, NOT touch)
    const matchFine = window.matchMedia('(pointer: fine)');
    const updateFinePointer = () => setIsFinePointer(matchFine.matches);
    updateFinePointer();
    matchFine.addEventListener('change', updateFinePointer);

    if (!matchFine.matches) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = !!target.closest('a, button, input, textarea, [role="button"], [role="tab"]');
        setIsPointer(isInteractive);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const render = () => {
      // Smooth lerp
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      setPosition({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      matchFine.removeEventListener('change', updateFinePointer);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isFinePointer || !isVisible) return null;

  return (
    <>
      {/* Outer subtle follower ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0) scale(${isPointer ? 1.6 : 1})`,
        }}
      >
        <div
          className={`w-8 h-8 rounded-full border transition-all duration-200 ${
            isPointer
              ? 'border-[#bef264] bg-[#bef264]/10 shadow-[0_0_12px_rgba(190,242,100,0.3)]'
              : 'border-white/30 bg-transparent'
          }`}
        />
      </div>

      {/* Center sharp dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 will-change-transform"
        style={{
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#bef264]" />
      </div>
    </>
  );
};
