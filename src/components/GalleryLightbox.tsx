"use client";

import { useCallback, useEffect, useState } from "react";

interface Props {
  images: string[];
  alt: string;
}

export default function GalleryLightbox({ images, alt }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i !== null ? (i - 1 + images.length) % images.length : null)),
    [images.length]
  );
  const next = useCallback(
    () => setOpen((i) => (i !== null ? (i + 1) % images.length : null)),
    [images.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, prev, next]);

  return (
    <>
      <div className="gallery-grid">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${alt} - photo ${i + 1}`}
            className="gallery-image"
            onClick={() => setOpen(i)}
          />
        ))}
      </div>

      {open !== null && (
        <div className="lightbox-overlay" onClick={close}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={close} aria-label="Close">
              &times;
            </button>

            {images.length > 1 && (
              <button className="lightbox-prev" onClick={prev} aria-label="Previous image">
                &#8249;
              </button>
            )}

            <img
              src={images[open]}
              alt={`${alt} - photo ${open + 1}`}
              className="lightbox-img"
            />

            {images.length > 1 && (
              <button className="lightbox-next" onClick={next} aria-label="Next image">
                &#8250;
              </button>
            )}

            <div className="lightbox-counter">
              {open + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
