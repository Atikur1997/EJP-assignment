"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function ScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // easing duration
      easing: (t) => t, // custom easing
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return <>{children}</>;
}
