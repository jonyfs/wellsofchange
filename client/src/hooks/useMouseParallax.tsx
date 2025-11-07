import { useState, useEffect, useRef } from "react";

export function useMouseParallax(strength: number = 20) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
    };

    const element = elementRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const transform = {
    transform: `translate3d(${mousePosition.x * strength}px, ${mousePosition.y * strength}px, 0) rotateY(${mousePosition.x * 2}deg) rotateX(${-mousePosition.y * 2}deg)`,
    transition: "transform 0.3s ease-out",
  };

  const backgroundTransform = {
    transform: `translate3d(${mousePosition.x * (strength * 0.5)}px, ${mousePosition.y * (strength * 0.5)}px, 0)`,
    transition: "transform 0.3s ease-out",
  };

  return { elementRef, transform, backgroundTransform, mousePosition };
}
