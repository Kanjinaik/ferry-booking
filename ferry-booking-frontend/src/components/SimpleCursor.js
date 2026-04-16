import React, { useEffect, useRef } from 'react';
import '../styles/cursor.css';

const SimpleCursor = () => {
  const cursorRef = useRef(null);
  const cursorInnerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorInner = cursorInnerRef.current;

    if (!cursor || !cursorInner) return;

    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    const speed = 0.15;

    const updateCursor = () => {
      posX += (mouseX - posX) * speed;
      posY += (mouseY - posY) * speed;
      
      cursorInner.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;

      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      // Simple check for interactive elements
      if (target && (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'SELECT' ||
        target.classList?.contains('interactive')
      )) {
        cursorInner.style.transform += ' scale(1.5)';
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      if (target && (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'SELECT' ||
        target.classList?.contains('interactive')
      )) {
        cursorInner.style.transform = cursorInner.style.transform.replace(' scale(1.5)', '');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    updateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor">
        <div ref={cursorInnerRef} className="cursor-inner"></div>
      </div>
    </>
  );
};

export default SimpleCursor;