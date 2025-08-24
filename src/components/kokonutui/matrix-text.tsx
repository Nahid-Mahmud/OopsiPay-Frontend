import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LetterState {
  char: string;
  isMatrix: boolean;
  isSpace: boolean;
}

interface MatrixTextProps {
  text?: string;
  className?: string;
  initialDelay?: number;
  letterAnimationDuration?: number;
  letterInterval?: number;
}

const MatrixText = ({
  text = "HelloWorld!",
  className,
  initialDelay = 100,
  letterAnimationDuration = 500,
  letterInterval = 100,
}: MatrixTextProps) => {
  const [letters, setLetters] = useState<LetterState[]>(() =>
    text.split("").map((char) => ({
      char,
      isMatrix: false,
      isSpace: char === " ",
    }))
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomChar = useCallback(() => (Math.random() > 0.5 ? "1" : "0"), []);

  const animateLetter = useCallback(
    (index: number) => {
      if (index >= text.length) return;

      requestAnimationFrame(() => {
        setLetters((prev) => {
          const newLetters = [...prev];
          if (!newLetters[index].isSpace) {
            newLetters[index] = {
              ...newLetters[index],
              char: getRandomChar(),
              isMatrix: true,
            };
          }
          return newLetters;
        });

        setTimeout(() => {
          setLetters((prev) => {
            const newLetters = [...prev];
            newLetters[index] = {
              ...newLetters[index],
              char: text[index],
              isMatrix: false,
            };
            return newLetters;
          });
        }, letterAnimationDuration);
      });
    },
    [getRandomChar, text, letterAnimationDuration]
  );

  // keep a ref to the animating state so `startAnimation` can be stable
  // and not recreate when `isAnimating` toggles (which would re-run the
  // effect that depends on `startAnimation` and cause a loop).
  const isAnimatingRef = useRef<boolean>(false);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  const startAnimation = useCallback(() => {
    if (isAnimatingRef.current) return;

    // mark both ref and state
    isAnimatingRef.current = true;
    setIsAnimating(true);

    let currentIndex = 0;

    const animate = () => {
      if (currentIndex >= text.length) {
        isAnimatingRef.current = false;
        setIsAnimating(false);
        return;
      }

      animateLetter(currentIndex);
      currentIndex++;
      setTimeout(animate, letterInterval);
    };

    animate();
  }, [animateLetter, text, letterInterval]);

  useEffect(() => {
    const timer = setTimeout(startAnimation, initialDelay);
    return () => clearTimeout(timer);
  }, [initialDelay, startAnimation]);

  const motionVariants = useMemo(
    () => ({
      // initial: {
      //     color: "rgb(var(--foreground-rgb))",
      // },
      matrix: {
        color: "#00ff00",
        textShadow: "0 2px 4px rgba(0, 255, 0, 0.5)",
      },
      // normal: {
      //     color: "rgb(var(--foreground-rgb))",
      //     textShadow: "none",
      // },
    }),
    []
  );

  return (
    <div
      className={cn("flex min-h-screen items-center justify-center text-black dark:text-white", className)}
      aria-label="Matrix text animation"
    >
      <div className="h-24 flex items-center justify-center">
        <div className="flex flex-wrap items-center justify-center">
          {letters.map((letter, index) => (
            <motion.div
              key={`${index}-${letter.char}`}
              className="font-mono text-4xl md:text-6xl w-[1ch] text-center overflow-hidden"
              initial="initial"
              animate={letter.isMatrix ? "matrix" : "normal"}
              variants={motionVariants}
              transition={{
                duration: 0.1,
                ease: "easeInOut",
              }}
              style={{
                display: "inline-block",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {letter.isSpace ? "\u00A0" : letter.char}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatrixText;
