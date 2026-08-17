import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/** Curtain preloader: name flashes, panel wipes up, hands off to hero. */
export default function Preloader({ onDone }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onComplete: () => onDone?.(),
      });
      tl.fromTo(".pre-name", { yPercent: 110 }, { yPercent: 0, duration: 0.9 })
        .to(".pre-name", { yPercent: -110, duration: 0.7, delay: 0.5 })
        .to(root.current, { yPercent: -100, duration: 0.9 }, "-=0.15")
        .set(root.current, { display: "none" });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] bg-ink-950 flex items-center justify-center will-change-transform"
    >
      <div className="overflow-hidden">
        <p className="pre-name font-display text-2xl md:text-4xl tracking-tightest text-gold-500 will-change-transform">
          Talha Shahid — Portfolio
        </p>
      </div>
    </div>
  );
}
