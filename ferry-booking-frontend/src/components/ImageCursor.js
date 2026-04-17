// import React, { useState, useEffect, useRef } from 'react';
// import '../styles/image-cursor.css';

// const ImageCursor = () => {
//   const cursorRef = useRef(null);
//   const cursorInnerRef = useRef(null);
//   const cursorRingRef = useRef(null);
//   const [cursorStyle, setCursorStyle] = useState(0);

//   // Enhanced cursor styles optimized for image backgrounds
//   const cursorStyles = [
//     {
//       name: 'ocean',
//       innerClass: 'cursor-inner-ocean',
//       ringClass: 'cursor-ring-ocean',
//       size: '32px',
//       border: '2px solid rgba(0, 198, 255, 0.9)',
//       background: 'rgba(0, 198, 255, 0.25)',
//       ringSize: '60px',
//       ringBorder: '1px solid rgba(0, 198, 255, 0.6)',
//       hoverScale: '1.8',
//       hoverBackground: 'rgba(0, 114, 255, 0.4)',
//       hoverBorder: 'rgba(0, 114, 255, 0.9)',
//       ringHoverScale: '2.2'
//     },
//     {
//       name: 'sunset',
//       innerClass: 'cursor-inner-sunset',
//       ringClass: 'cursor-ring-sunset',
//       size: '30px',
//       border: '2px solid rgba(255, 105, 180, 0.9)',
//       background: 'rgba(255, 105, 180, 0.25)',
//       ringSize: '56px',
//       ringBorder: '1px solid rgba(255, 105, 180, 0.6)',
//       hoverScale: '1.7',
//       hoverBackground: 'rgba(255, 20, 147, 0.4)',
//       hoverBorder: 'rgba(255, 20, 147, 0.9)',
//       ringHoverScale: '2.1'
//     },
//     {
//       name: 'royal',
//       innerClass: 'cursor-inner-royal',
//       ringClass: 'cursor-ring-royal',
//       size: '34px',
//       border: '2px solid rgba(138, 43, 226, 0.9)',
//       background: 'rgba(138, 43, 226, 0.25)',
//       ringSize: '64px',
//       ringBorder: '1px solid rgba(138, 43, 226, 0.6)',
//       hoverScale: '1.9',
//       hoverBackground: 'rgba(75, 0, 130, 0.4)',
//       hoverBorder: 'rgba(75, 0, 130, 0.9)',
//       ringHoverScale: '2.3'
//     },
//     {
//       name: 'gold',
//       innerClass: 'cursor-inner-gold',
//       ringClass: 'cursor-ring-gold',
//       size: '28px',
//       border: '2px solid rgba(255, 215, 0, 0.9)',
//       background: 'rgba(255, 215, 0, 0.25)',
//       ringSize: '52px',
//       ringBorder: '1px solid rgba(255, 215, 0, 0.6)',
//       hoverScale: '1.6',
//       hoverBackground: 'rgba(255, 165, 0, 0.4)',
//       hoverBorder: 'rgba(255, 165, 0, 0.9)',
//       ringHoverScale: '2.0'
//     },
//     {
//       name: 'neon',
//       innerClass: 'cursor-inner-neon',
//       ringClass: 'cursor-ring-neon',
//       size: '36px',
//       border: '2px solid rgba(0, 255, 127, 0.9)',
//       background: 'rgba(0, 255, 127, 0.25)',
//       ringSize: '68px',
//       ringBorder: '1px solid rgba(0, 255, 127, 0.6)',
//       hoverScale: '2.0',
//       hoverBackground: 'rgba(0, 201, 87, 0.4)',
//       hoverBorder: 'rgba(0, 201, 87, 0.9)',
//       ringHoverScale: '2.4'
//     },
//     {
//       name: 'premium',
//       innerClass: 'cursor-inner-premium',
//       ringClass: 'cursor-ring-premium',
//       size: '38px',
//       border: '2px solid rgba(255, 138, 0, 0.9)',
//       background: 'rgba(255, 138, 0, 0.25)',
//       ringSize: '72px',
//       ringBorder: '1px solid rgba(255, 138, 0, 0.6)',
//       hoverScale: '2.1',
//       hoverBackground: 'rgba(218, 27, 96, 0.4)',
//       hoverBorder: 'rgba(218, 27, 96, 0.9)',
//       ringHoverScale: '2.5'
//     }
//   ];

//   useEffect(() => {
//     const cursor = cursorRef.current;
//     const cursorInner = cursorInnerRef.current;
//     const cursorRing = cursorRingRef.current;

//     if (!cursor || !cursorInner || !cursorRing) return;

//     let mouseX = 0;
//     let mouseY = 0;
//     let posX = 0;
//     let posY = 0;
//     let ringX = 0;
//     let ringY = 0;

//     const speed = 0.15;
//     const ringSpeed = 0.08;

//     const updateCursor = () => {
//       posX += (mouseX - posX) * speed;
//       posY += (mouseY - posY) * speed;
//       ringX += (mouseX - ringX) * ringSpeed;
//       ringY += (mouseY - ringY) * ringSpeed;
      
//       cursorInner.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
//       cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

//       requestAnimationFrame(updateCursor);
//     };

//     const handleMouseMove = (e) => {
//       mouseX = e.clientX;
//       mouseY = e.clientY;
//     };

//     const handleMouseEnter = (e) => {
//       const target = e.target;
//       const currentStyle = cursorStyles[cursorStyle];
      
//       if (target && (
//         target.tagName === 'BUTTON' || 
//         target.tagName === 'A' || 
//         target.tagName === 'INPUT' || 
//         target.tagName === 'SELECT' ||
//         target.classList?.contains('interactive') ||
//         target.closest?.('button, a, input, select, .interactive')
//       )) {
//         cursorInner.style.transform += ` scale(${currentStyle.hoverScale})`;
//         cursorInner.style.background = currentStyle.hoverBackground;
//         cursorInner.style.borderColor = currentStyle.hoverBorder;
//         cursorRing.style.transform += ` scale(${currentStyle.ringHoverScale})`;
//         cursorRing.style.opacity = '0.8';
//       }
//     };

//     const handleMouseLeave = (e) => {
//       const target = e.target;
//       const currentStyle = cursorStyles[cursorStyle];
      
//       if (target && (
//         target.tagName === 'BUTTON' || 
//         target.tagName === 'A' || 
//         target.tagName === 'INPUT' || 
//         target.tagName === 'SELECT' ||
//         target.classList?.contains('interactive') ||
//         target.closest?.('button, a, input, select, .interactive')
//       )) {
//         cursorInner.style.transform = cursorInner.style.transform.replace(` scale(${currentStyle.hoverScale})`, '');
//         cursorInner.style.background = currentStyle.background;
//         cursorInner.style.borderColor = currentStyle.border;
//         cursorRing.style.transform = cursorRing.style.transform.replace(` scale(${currentStyle.ringHoverScale})`, '');
//         cursorRing.style.opacity = '0.4';
//       }
//     };

//     // Rotate cursor styles every 5 seconds
//     const styleInterval = setInterval(() => {
//       setCursorStyle(prev => (prev + 1) % cursorStyles.length);
//     }, 5000);

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseenter', handleMouseEnter, true);
//     document.addEventListener('mouseleave', handleMouseLeave, true);

//     updateCursor();

//     return () => {
//       clearInterval(styleInterval);
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseenter', handleMouseEnter, true);
//       document.removeEventListener('mouseleave', handleMouseLeave, true);
//     };
//   }, [cursorStyle]);

//   useEffect(() => {
//     // Apply current style when it changes
//     const cursorInner = cursorInnerRef.current;
//     const cursorRing = cursorRingRef.current;
    
//     if (cursorInner && cursorRing) {
//       const currentStyle = cursorStyles[cursorStyle];
      
//       // Update inner cursor
//       cursorInner.className = `cursor-inner ${currentStyle.innerClass}`;
//       cursorInner.style.width = currentStyle.size;
//       cursorInner.style.height = currentStyle.size;
//       cursorInner.style.borderColor = currentStyle.border;
//       cursorInner.style.background = currentStyle.background;
      
//       // Update ring cursor
//       cursorRing.className = `cursor-ring ${currentStyle.ringClass}`;
//       cursorRing.style.width = currentStyle.ringSize;
//       cursorRing.style.height = currentStyle.ringSize;
//       cursorRing.style.borderColor = currentStyle.ringBorder;
//     }
//   }, [cursorStyle]);

//   return (
//     <>
//       <div ref={cursorRef} className="image-cursor">
//         <div ref={cursorRingRef} className="cursor-ring"></div>
//         <div ref={cursorInnerRef} className="cursor-inner"></div>
//       </div>
      
//       {/* Enhanced Style Indicator */}
//       <div className="cursor-style-indicator-image">
//         <div className="style-name-image">
//           Theme: {cursorStyles[cursorStyle].name.toUpperCase()}
//         </div>
//         <div className="style-progress-image">
//           <div 
//             className="progress-bar-image" 
//             style={{ 
//               animation: 'progressImage 5s linear infinite',
//               background: cursorStyles[cursorStyle].border
//             }}
//           ></div>
//         </div>
//         <div className="style-colors">
//           {cursorStyles.map((style, index) => (
//             <div 
//               key={index}
//               className={`color-dot ${index === cursorStyle ? 'active' : ''}`}
//               style={{ 
//                 background: style.border,
//                 boxShadow: `0 0 10px ${style.border}`
//               }}
//             ></div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ImageCursor;

import '../styles/image-cursor.css';

export default function ImageCursor() {
  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">

        <div className="carousel-item active bg-slide slide1">
          <div className="carousel-caption">
            <div className="hero-banner-content">
              <p className="hero-topline">Leave the road behind with</p>
              <h1 className="hero-title">
                PAYFIKAR <span>TRAVELS</span>.COM
              </h1>
              <div className="hero-cta-block">
                <h2>Sail into the calm.</h2>
                <a href="/booking" className="hero-book-button">
                  BOOK NOW
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="carousel-item bg-slide slide2">
          <div className="carousel-caption">
            <div className="hero-banner-content">
              <p className="hero-topline">Leave the road behind with</p>
              <h1 className="hero-title">
                PAYFIKAR <span>TRAVELS</span>.COM
              </h1>
              <div className="hero-cta-block">
                <h2>Sail into the calm.</h2>
                <a href="/booking" className="hero-book-button">
                  BOOK NOW
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="carousel-item bg-slide slide3">
          <div className="carousel-caption">
            <div className="hero-banner-content">
              <p className="hero-topline">Leave the road behind with</p>
              <h1 className="hero-title">
                PAYFIKAR <span>TRAVELS</span>.COM
              </h1>
              <div className="hero-cta-block">
                <h2>Sail into the calm.</h2>
                <a href="/booking" className="hero-book-button">
                  BOOK NOW
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}
