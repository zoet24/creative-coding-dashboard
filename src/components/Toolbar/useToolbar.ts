import html2canvas from "html2canvas";
import { useState } from "react";
import { useActiveProject } from "../../context/ActiveProjectContext";

export const useToolbar = () => {
  const { config, setIsPlaying } = useActiveProject();
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!config) {
    return {
      isPlaying: false,
      isFullscreen,
      togglePlay: () => {},
      takeScreenshot: async () => {},
      toggleFullscreen: () => {},
    };
  }

  const isPlaying = config?.isPlaying;

  const togglePlay = () => {
    if (config) {
      setIsPlaying(!config.isPlaying);
    }
  };

  const takeScreenshot = async () => {
    const element = document.getElementById("project-display");
    if (!element) {
      alert("Project display not found");
      return;
    }
    try {
      const canvas = await html2canvas(element);
      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${config.slug}-screenshot.png`;
      link.click();
    } catch (error) {
      console.error("Screenshot failed", error);
      alert("Failed to take screenshot");
    }
  };

  const toggleFullscreen = () => {
    const elem = document.documentElement;

    if (!document.fullscreenElement) {
      elem
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(console.error);
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(console.error);
    }
  };

  return {
    isPlaying,
    isFullscreen,
    togglePlay,
    takeScreenshot,
    toggleFullscreen,
  };
};
