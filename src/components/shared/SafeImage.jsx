"use client";
import Image from "next/image";
import { useState } from "react";

const FALLBACK = "/fallbacks/food.jpg";

export default function SafeImage({ src, alt = "", ...props }) {
  const [img, setImg] = useState(src || FALLBACK);
  return (
    <Image
      {...props}
      alt={alt}
      src={img || FALLBACK}
      onError={() => setImg(FALLBACK)}
    />
  );
}
