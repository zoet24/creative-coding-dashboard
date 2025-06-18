import { Camera, Maximize2, Pause, Play } from "lucide-react";
import { useFullscreen } from "../../context/FullscreenContext";
import { Button } from "../ui/button";
import { useToolbar } from "./useToolbar";

const Toolbar = () => {
  const { isPlaying, isAnimated, togglePlay, takeScreenshot } = useToolbar();
  const { toggleFullscreen } = useFullscreen();

  return (
    <div className="flex justify-around bg-muted p-sm gap-sm rounded-sm shadow">
      {isAnimated && (
        <Button className="w-full" size="sm" onClick={togglePlay}>
          {isPlaying ? (
            <>
              <Pause className="mr-xxs" />
              <span className="hidden sm:block">Pause</span>
            </>
          ) : (
            <>
              <Play className="mr-xxs" />
              <span className="hidden sm:block">Play</span>
            </>
          )}
        </Button>
      )}
      <Button className="w-full" size="sm" onClick={takeScreenshot}>
        <Camera className="mr-xxs" />
        <span className="hidden sm:block">Screenshot</span>
      </Button>
      <Button className="w-full" size="sm" onClick={toggleFullscreen}>
        <Maximize2 className="mr-xxs" />
        <span className="hidden sm:block">Fullscreen</span>
      </Button>
    </div>
  );
};

export default Toolbar;
