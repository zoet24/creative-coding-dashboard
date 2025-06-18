import { Button } from "../../ui/button";

interface MenuTriggerProps {
  type: "open" | "close";
  setIsOpen: (open: boolean) => void;
}

const MenuTrigger = ({ type, setIsOpen }: MenuTriggerProps) => {
  const isOpenTrigger = type === "open";

  const positionClasses = isOpenTrigger
    ? "h-screen w-lg rounded-l-none absolute bottom-0"
    : "h-screen w-lg rounded-l-none absolute top-0 bottom-0 right-[-16px]";

  return (
    <Button
      variant="ghost"
      className={`bg-muted p-0 rounded-lg ${positionClasses}`}
      onClick={() => setIsOpen(isOpenTrigger)}
    >
      <div className="bg-primary/20 rounded h-1/2 w-sm" />
    </Button>
  );
};

export default MenuTrigger;
