import { useEffect, useState } from 'react';

export enum DeviceType {
  mobile = '(max-width: 767px)',
  tablet = '(max-width: 1023px)',
  laptop = '(min-width: 1024px)',
}

export const useMediaQuery = (query: DeviceType) => {
  const mediaMatch = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaMatch.matches);
  useEffect(() => {
    const handler = (e: { matches: boolean }) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });
  return matches;
};
