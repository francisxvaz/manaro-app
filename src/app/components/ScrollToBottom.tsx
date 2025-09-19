import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react"

export default function ScrollToBottomButton() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={scrollToBottom}

      className="fixed top-4 left-1/2 transform -translate-x-1/2 cursor-pointer"
    >
      <ArrowDown />
    </Button>
  );
}
