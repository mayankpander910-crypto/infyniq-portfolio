import React from "react";
import { FigmaButton, PixelArrow } from "@/components/ui/PixelAccents";

export default function NotFound() {
  return (
    <main className="flex min-h-[85vh] flex-col items-center justify-center bg-canvas bg-artboard px-6 pt-24 pb-16 text-center text-ink">
      <div className="select-none leading-none">
        <span className="font-serif text-[clamp(5rem,16vw,10rem)] text-ink">
          4
        </span>
        <span className="font-pixel text-[clamp(4.6rem,15vw,9.4rem)] text-[#1463FF]">
          0
        </span>
        <span className="font-serif text-[clamp(5rem,16vw,10rem)] text-ink">
          4
        </span>
      </div>
      <p className="mt-2 font-mono text-xs uppercase tracking-[0.26em] text-muted">
        THIS PAGE DOESN&apos;T EXIST
      </p>
      <div className="mt-8">
        <FigmaButton href="/" handwritten>
          <span>Back To Homepage</span>
          <PixelArrow direction="right" className="h-3.5 w-3.5" />
        </FigmaButton>
      </div>
    </main>
  );
}
