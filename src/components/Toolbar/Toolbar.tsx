import { Camera, Maximize2, Pause, Play } from "lucide-react";
import { Button } from "../ui/button";
import { useToolbar } from "./useToolbar";

const Toolbar = () => {
  const {
    isPlaying,
    isFullscreen,
    togglePlay,
    takeScreenshot,
    toggleFullscreen,
  } = useToolbar();

  return (
    <div className="flex justify-around bg-muted p-sm gap-sm rounded-sm shadow">
      <Button className="w-full" size="sm" onClick={togglePlay}>
        {isPlaying ? (
          <>
            <Pause className="mr-xxs" />
            Pause
          </>
        ) : (
          <>
            <Play className="mr-xxs" />
            Play
          </>
        )}
      </Button>
      <Button className="w-full" size="sm" onClick={takeScreenshot}>
        <Camera className="mr-xxs" />
        Screenshot
      </Button>
      <Button className="w-full" size="sm" onClick={toggleFullscreen}>
        <Maximize2 className="mr-xxs" />
        Fullscreen
      </Button>
    </div>
  );
};

export default Toolbar;
