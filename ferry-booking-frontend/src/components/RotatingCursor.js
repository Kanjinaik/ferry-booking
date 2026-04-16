import React, { useState, useEffect, useRef } from 'react';
import '../styles/rotating-cursor.css';

const RotatingCursor = () => {
  const cursorRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const [cursorStyle, setCursorStyle] = useState(0);

  // Different cursor styles
  const cursorStyles = [
    {
      name: 'default',
      innerClass: 'cursor-inner-default',
      size: '32px',
      border: '2px solid rgba(255, 138, 0, 0.8)',
      background: 'rgba(255, 138, 0, 0.2)',
      hoverBackground: 'rgba(218, 27, 96, 0.3)',
      hoverBorder: 'rgba(218, 27, 96, 0.8)'
    },
    {
      name: 'neon',
      innerClass: 'cursor-inner-neon',
      size: '28px',
      border: '2px solid rgba(67, 206, 162, 0.9)',
      background: 'rgba(67, 206, 162, 0.2)',
      hoverBackground: 'rgba(24, 90, 157, 0.3)',
      hoverBorder: 'rgba(24, 90, 157, 0.9)'
    },
    {
      name: 'royal',
      innerClass: 'cursor-inner-royal',
      size: '36px',
      border: '3px solid rgba(138, 43, 226, 0.8)',
      background: 'rgba(138, 43, 226, 0.2)',
      hoverBackground: 'rgba(74, 0, 224, 0.3)',
      hoverBorder: 'rgba(74, 0, 224, 0.8)'
    },
    {
      name: 'gold',
      innerClass: 'cursor-inner-gold',
      size: '30px',
      border: '2px solid rgba(255, 215, 0, 0.9)',
      background: 'rgba(255, 215, 0, 0.2)',
      hoverBackground: 'rgba(255, 69, 0, 0.3)',
      hoverBorder: 'rgba(255, 69, 0, 0.9)'
    },
    {
      name: 'ocean',
      innerClass: 'cursor-inner-ocean',
      size: '34px',
      border: '2px solid rgba(0, 198, 255, 0.8)',
      background: 'rgba(0, 198, 255, 0.2)',
      hoverBackground: 'rgba(0, 114, 255, 0.3)',
      hoverBorder: 'rgba(0, 114, 255, 0.8)'
    },
    {
      name: 'fire',
      innerClass: 'cursor-inner-fire',
      size: '26px',
      border: '2px solid rgba(255, 69, 0, 0.9)',
      background: 'rgba(255, 69, 0, 0.2)',
      hoverBackground: 'rgba(255, 215, 0, 0.3)',
      hoverBorder: 'rgba(255, 215, 0, 0.9)'
    }
  ];

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
      const currentStyle = cursorStyles[cursorStyle];
      
      if (target && (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'SELECT' ||
        target.classList?.contains('interactive') ||
        target.closest?.('button, a, input, select, .interactive')
      )) {
        cursorInner.style.transform += ' scale(1.8)';
        cursorInner.style.background = currentStyle.hoverBackground;
        cursorInner.style.borderColor = currentStyle.hoverBorder;
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      const currentStyle = cursorStyles[cursorStyle];
      
      if (target && (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'SELECT' ||
        target.classList?.contains('interactive') ||
        target.closest?.('button, a, input, select, .interactive')
      )) {
        cursorInner.style.transform = cursorInner.style.transform.replace(' scale(1.8)', '');
        cursorInner.style.background = currentStyle.background;
        cursorInner.style.borderColor = currentStyle.border;
      }
    };

    // Rotate cursor styles every 5 seconds
    const styleInterval = setInterval(() => {
      setCursorStyle(prev => (prev + 1) % cursorStyles.length);
    }, 5000);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    updateCursor();

    return () => {
      clearInterval(styleInterval);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [cursorStyle]);

  useEffect(() => {
    // Apply current style when it changes
    const cursorInner = cursorInnerRef.current;
    if (cursorInner) {
      const currentStyle = cursorStyles[cursorStyle];
      cursorInner.className = `cursor-inner ${currentStyle.innerClass}`;
      cursorInner.style.width = currentStyle.size;
      cursorInner.style.height = currentStyle.size;
      cursorInner.style.borderColor = currentStyle.border;
      cursorInner.style.background = currentStyle.background;
    }
  }, [cursorStyle]);

  return (
    <>
      <div ref={cursorRef} className="rotating-cursor">
        <div ref={cursorInnerRef} className={`cursor-inner ${cursorStyles[cursorStyle].innerClass}`}></div>
      </div>
      
      {/* Style indicator */}
      <div className="cursor-style-indicator">
        <div className="style-name">
          Style: {cursorStyles[cursorStyle].name.toUpperCase()}
        </div>
        <div className="style-progress">
          <div 
            className="progress-bar" 
            style={{ 
              animation: 'progress 5s linear infinite',
              background: cursorStyles[cursorStyle].border
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default RotatingCursor;