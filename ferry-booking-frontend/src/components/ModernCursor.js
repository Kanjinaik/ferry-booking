import React, { useEffect, useRef } from 'react';
import '../styles/cursor.css';

const ModernCursor = () => {
  const cursorRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorInner = cursorInnerRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorInner || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;
    let dotX = 0;
    let dotY = 0;

    const speed = 0.15;
    const dotSpeed = 0.3;

    const updateCursor = () => {
      posX += (mouseX - posX) * speed;
      posY += (mouseY - posY) * speed;
      
      dotX += (mouseX - dotX) * dotSpeed;
      dotY += (mouseY - dotY) * dotSpeed;

      cursorInner.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
      cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;

      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target && typeof target.closest === 'function' && target.closest('button, a, input, select, .interactive')) {
        cursorInner.style.transform += ' scale(1.5)';
        cursorDot.style.transform += ' scale(0)';
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      if (target && typeof target.closest === 'function' && target.closest('button, a, input, select, .interactive')) {
        cursorInner.style.transform = cursorInner.style.transform.replace(' scale(1.5)', '');
        cursorDot.style.transform = cursorDot.style.transform.replace(' scale(0)', '');
      }
    };

    // Handle SVG and other special elements
    const handleSvgMouseEnter = (e) => {
      const target = e.target;
      if (target && target.tagName && ['BUTTON', 'A', 'INPUT', 'SELECT'].includes(target.tagName)) {
        cursorInner.style.transform += ' scale(1.5)';
        cursorDot.style.transform += ' scale(0)';
      }
    };

    const handleSvgMouseLeave = (e) => {
      const target = e.target;
      if (target && target.tagName && ['BUTTON', 'A', 'INPUT', 'SELECT'].includes(target.tagName)) {
        cursorInner.style.transform = cursorInner.style.transform.replace(' scale(1.5)', '');
        cursorDot.style.transform = cursorDot.style.transform.replace(' scale(0)', '');
      }
    };

    // Add event listeners for SVG elements
    document.addEventListener('mouseenter', handleSvgMouseEnter, true);
    document.addEventListener('mouseleave', handleSvgMouseLeave, true);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    updateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mouseenter', handleSvgMouseEnter, true);
      document.removeEventListener('mouseleave', handleSvgMouseLeave, true);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor">
        <div ref={cursorInnerRef} className="cursor-inner"></div>
        <div ref={cursorDotRef} className="cursor-dot"></div>
      </div>
    </>
  );
};

export default ModernCursor;