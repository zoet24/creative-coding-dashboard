import { Camera, Maximize2, Pause } from "lucide-react";
import { Button } from "../ui/button";

const Toolbar = () => {
  return (
    <div className="flex justify-around bg-muted p-2 rounded-xl shadow">
      <Button variant="default" size="sm">
        <Pause className="mr-2 h-4 w-4" /> Play/Pause
      </Button>
      <Button variant="default" size="sm">
        <Camera className="mr-2 h-4 w-4" /> Screenshot
      </Button>
      <Button variant="default" size="sm">
        <Maximize2 className="mr-2 h-4 w-4" /> Fullscreen
      </Button>
    </div>
  );
};

export default Toolbar;
