import { useState, useEffect, RefObject } from 'react';

export const useOnScreen = (ref: RefObject<any>) => {
  const [isOnScreen, setOnScreen] = useState(false);

  useEffect(() => {
    if (!ref?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log('entry is intersecting');
        setOnScreen(true);
        observer.unobserve(entry.target);
      }
    });

    observer.observe(ref.current);
  }, [ref]);

  return isOnScreen;
};
