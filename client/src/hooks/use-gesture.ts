import { useEffect, RefObject, useCallback } from "react";

interface GestureHandlers {
  onStart?: () => void;
  onMove?: (deltaX: number, deltaY: number) => void;
  onEnd?: (deltaX: number, deltaY: number) => void;
}

export function useGesture(
  elementRef: RefObject<HTMLElement>,
  handlers: GestureHandlers
) {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let startX = 0;
    let startY = 0;
    let isDragging = false;

    // Touch events
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = true;
      handlers.onStart?.();
      e.preventDefault();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      const deltaX = e.touches[0].clientX - startX;
      const deltaY = e.touches[0].clientY - startY;
      handlers.onMove?.(deltaX, deltaY);
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isDragging) return;

      isDragging = false;
      const deltaX = e.changedTouches[0].clientX - startX;
      const deltaY = e.changedTouches[0].clientY - startY;
      handlers.onEnd?.(deltaX, deltaY);
    };

    // Mouse events (for desktop)
    const handleMouseDown = (e: MouseEvent) => {
      startX = e.clientX;
      startY = e.clientY;
      isDragging = true;
      handlers.onStart?.();
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      handlers.onMove?.(deltaX, deltaY);
      e.preventDefault();
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDragging) return;

      isDragging = false;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      handlers.onEnd?.(deltaX, deltaY);
    };

    const handleMouseLeave = () => {
      if (isDragging) {
        isDragging = false;
        handlers.onEnd?.(0, 0);
      }
    };

    // Add event listeners
    element.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd, { passive: false });
    element.addEventListener("touchcancel", handleTouchEnd, { passive: false });

    element.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    element.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
      element.removeEventListener("touchcancel", handleTouchEnd);

      element.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handlers.onStart, handlers.onMove, handlers.onEnd]);
}
