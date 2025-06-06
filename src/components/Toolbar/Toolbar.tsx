import { Camera, Maximize2, Pause, Play } from "lucide-react";
import { useActiveProject } from "../../context/ActiveProjectContext";
import { Button } from "../ui/button";

const Toolbar = () => {
  const { config, setIsPlaying } = useActiveProject();

  if (!config) return null; // TOZO: Add loading state

  const { isPlaying } = config;

  return (
    <div className="flex justify-around bg-muted p-sm gap-sm rounded-sm shadow">
      <Button
        className="w-full"
        size="sm"
        onClick={() => setIsPlaying(!isPlaying)}
      >
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
      <Button className="w-full" size="sm">
        <Camera className="mr-xxs" />
        Screenshot
      </Button>
      <Button className="w-full" size="sm">
        <Maximize2 className="mr-xxs" />
        Fullscreen
      </Button>
    </div>
  );
};

export default Toolbar;
