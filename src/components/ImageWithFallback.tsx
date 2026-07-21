"use client";
import React, { useState } from 'react';

// This component runs on the client to safely handle image load errors.
export default function ImageWithFallback({
  src,
  alt,
  className,
  fallbackSrc = '/images/ressources/default-finance.jpg',
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
