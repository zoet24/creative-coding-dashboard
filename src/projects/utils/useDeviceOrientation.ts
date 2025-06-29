export type OrientationData = {
  alpha: number; // compass direction (0-360)
  beta: number; // front/back tilt (-180 to 180)
  gamma: number; // left/right tilt (-90 to 90)
  isPortrait: boolean; // true if device in portrait, false if landscape
};

export function useDeviceOrientation(
  onUpdate: (data: OrientationData) => void
) {
  // Helper to get orientation mode
  const getIsPortrait = () => {
    if (window.screen.orientation && window.screen.orientation.type) {
      return window.screen.orientation.type.startsWith("portrait");
    }
    return window.innerHeight >= window.innerWidth;
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    onUpdate({
      alpha: event.alpha ?? 0,
      beta: event.beta ?? 0,
      gamma: event.gamma ?? 0,
      isPortrait: getIsPortrait(),
    });
  };

  window.addEventListener("deviceorientation", handleOrientation, true);

  // Fallback: use mouse to simulate gamma / beta
  const handleMouseMove = (e: MouseEvent) => {
    const gamma = (e.clientX / window.innerWidth - 0.5) * 180; // -90 to +90
    const beta = (e.clientY / window.innerHeight - 0.5) * 180; // -90 to +90
    onUpdate({
      alpha: 0,
      beta,
      gamma,
      isPortrait: getIsPortrait(),
    });
  };

  window.addEventListener("mousemove", handleMouseMove);

  // Return a cleanup function
  return () => {
    window.removeEventListener("deviceorientation", handleOrientation);
    window.removeEventListener("mousemove", handleMouseMove);
  };
}
