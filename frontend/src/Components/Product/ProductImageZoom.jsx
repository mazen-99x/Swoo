import React, { useState } from "react";

const ProductImageZoom = ({ src, alt, className }) => {
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [lensPos, setLensPos] = useState({ top: 0, left: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();


    let x = e.pageX - left - window.scrollX;
    let y = e.pageY - top - window.scrollY;


    const lensWidth = 150;
    const lensHeight = 150;


    let lensLeft = x - lensWidth / 2;
    let lensTop = y - lensHeight / 2;


    if (lensLeft < 0) lensLeft = 0;
    if (lensTop < 0) lensTop = 0;
    if (lensLeft > width - lensWidth) lensLeft = width - lensWidth;
    if (lensTop > height - lensHeight) lensTop = height - lensHeight;

    setLensPos({ top: lensTop, left: lensLeft });


    const bgX = (lensLeft / (width - lensWidth)) * 100;
    const bgY = (lensTop / (height - lensHeight)) * 100;

    setZoomPos({ x: bgX, y: bgY });
  };

  return (
    <div
      className={`relative overflow-hidden cursor-crosshair ${className}`}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      style={{ cursor: "zoom-in" }}
      onMouseMove={handleMouseMove}
    >
     
      <img src={src} alt={alt} className="w-full h-full object-contain" />


      {showMagnifier && (
        <div
          style={{
            position: "absolute",
            top: `${lensPos.top}px`,
            left: `${lensPos.left}px`,
            width: "150px", 
            height: "150px",
            border: "1px solid #ccc",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",

            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "400%", 
            backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
            pointerEvents: "none",
            zIndex: 50,
          }}
          className="rounded-lg bg-(--gray-color) dark:bg-(--dark-secondary-color)"
        />
      )}
    </div>
  );
};

export default ProductImageZoom;
