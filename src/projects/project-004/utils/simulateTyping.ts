export const simulateTyping = (
  text: string,
  baseDelay: number = 100,
  loop: boolean = false,
  timeoutRef?: React.MutableRefObject<number[]>
) => {
  if (timeoutRef) {
    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];
  }

  let index = 0;

  const getRandomDelay = () => {
    const variation = baseDelay * 0.3;
    return baseDelay + Math.floor(Math.random() * variation * 2 - variation);
  };

  const typeNext = () => {
    if (index < text.length) {
      const char = text[index];
      const keyEvent = new KeyboardEvent("keydown", { key: char });
      window.dispatchEvent(keyEvent);
      index++;
      const timeoutId = window.setTimeout(typeNext, getRandomDelay());
      timeoutRef?.current.push(timeoutId);
    } else if (loop) {
      const timeoutId = window.setTimeout(() => {
        index = 0;
        typeNext();
      }, 1000);
      timeoutRef?.current.push(timeoutId);
    }
  };

  typeNext();
};
