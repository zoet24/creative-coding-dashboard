import { useIsMobile } from "../../../hooks/useIsMobile";
import { Button } from "../../ui/button";

interface MenuTriggerProps {
  type: "open" | "close";
  setIsOpen: (open: boolean) => void;
}

const MenuTrigger = ({ type, setIsOpen }: MenuTriggerProps) => {
  const isMobile = useIsMobile();

  const isOpenTrigger = type === "open";

  const positionClasses = isMobile
    ? isOpenTrigger
      ? "w-screen h-lg rounded-b-none absolute bottom-0"
      : "w-screen h-lg rounded-b-none absolute top-[-16px] left-0 right-0"
    : isOpenTrigger
    ? "h-screen w-lg rounded-l-none absolute bottom-0"
    : "h-screen w-lg rounded-l-none absolute top-0 bottom-0 right-[-16px]";

  const sizeClasses = isMobile ? "w-1/2 h-sm" : "h-1/2 w-sm";

  return (
    <Button
      variant="ghost"
      className={`bg-muted p-0 rounded-lg ${positionClasses}`}
      onClick={() => setIsOpen(isOpenTrigger)}
    >
      <div className={`bg-primary/20 rounded ${sizeClasses}`} />
    </Button>
  );
};

export default MenuTrigger;
