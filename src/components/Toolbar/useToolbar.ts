import html2canvas from "html2canvas";
import { useActiveProject } from "../../context/ActiveProjectContext";

export const useToolbar = () => {
  const { config, setIsPlaying } = useActiveProject();

  if (!config) {
    return {
      isPlaying: false,
      togglePlay: () => {},
      takeScreenshot: async () => {},
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

  return {
    isPlaying,
    togglePlay,
    takeScreenshot,
  };
};
