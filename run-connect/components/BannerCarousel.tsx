"use client";

// components/BannerCarousel.tsx
// Banner Carousel menggunakan embla-carousel-react
// Geser otomatis tiap 6 detik, berhenti saat kursor hover atau layar disentuh.
// Sesuai prototipe reference/Run_Connect.html baris 41-48, 232, 344.

import React, { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";

export interface BannerSlide {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

interface BannerCarouselProps {
  slides: BannerSlide[];
  big?: boolean; // Varian ukuran besar (misalnya di beranda)
}

// 4 variasi warna gradasi latar belakang slide
const BG_CLASSES = ["ph1", "ph2", "ph3", "ph4"];

export default function BannerCarousel({
  slides,
  big = false,
}: BannerCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update indeks yang sedang aktif saat slide berubah
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay 6 detik (pause saat hover atau touch)
  useEffect(() => {
    if (!emblaApi || isPaused) return;

    autoplayTimerRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [emblaApi, isPaused]);

  // Navigasi manual tombol panah
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <div
      className={`bn ${big ? "big" : ""}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      style={{ userSelect: "none" }}
    >
      {/* Container Viewport Embla */}
      <div
        ref={emblaRef}
        style={{
          overflow: "hidden",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", height: "100%" }}>
          {slides.map((slide, i) => (
            <div
              key={i}
              className="sl"
              style={{
                flex: "0 0 100%",
                minWidth: 0,
                position: "relative",
                height: "100%",
                display: "flex",
                alignItems: "center",
                opacity: 1,
                pointerEvents: "auto",
              }}
            >
              {/* Latar gradasi dan overlay biru */}
              <div
                className={`ph ${BG_CLASSES[i % BG_CLASSES.length]}`}
                style={{ position: "absolute", inset: 0, zIndex: -2 }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(120deg, rgba(11,46,122,0.88), rgba(29,99,216,0.35))",
                  zIndex: -1,
                }}
              />

              {/* Teks dan tombol di dalam slide */}
              <div className="w" style={{ position: "relative", zIndex: 1 }}>
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <Link href={slide.buttonHref} className="btn">
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tombol Panah Kiri (Laptop) */}
      <button
        type="button"
        className="ar l"
        onClick={scrollPrev}
        aria-label="Slide sebelumnya"
      >
        ‹
      </button>

      {/* Tombol Panah Kanan (Laptop) */}
      <button
        type="button"
        className="ar r"
        onClick={scrollNext}
        aria-label="Slide berikutnya"
      >
        ›
      </button>

      {/* Titik Penanda (Dots) */}
      <div className="dots">
        {slides.map((_, i) => (
          <b
            key={i}
            className={selectedIndex === i ? "on" : ""}
            onClick={() => scrollTo(i)}
            role="button"
            tabIndex={0}
            aria-label={`Pindah ke slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
