import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

interface ScrollButtonProps {
  direction: "top" | "bottom";
}

export default function ScrollButton({ direction }: ScrollButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (direction === "top") {
        // Show button only when near bottom (last 100px of page)
        setVisible(scrollY + windowHeight > docHeight - 100);
      } else {
        // Scroll-to-bottom button always visible (or you can customize)
        setVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // Check immediately

    return () => window.removeEventListener("scroll", onScroll);
  }, [direction]);

  const scrollToPosition = () => {
    if (direction === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    }
  };

  if (!visible) return null;

  const positionClasses =
    direction === "top"
      ? "fixed bottom-4 right-4"
      : "fixed top-4 left-1/2 transform -translate-x-1/2";

  const icon = direction === "top" ? <ArrowUp /> : <ArrowDown />;

  return (
    <Button
      onClick={scrollToPosition}
      className={`${positionClasses} cursor-pointer`}
      aria-label={`Scroll to ${direction}`}
      title={`Scroll to ${direction}`}
    >
      {icon}
    </Button>
  );
}
