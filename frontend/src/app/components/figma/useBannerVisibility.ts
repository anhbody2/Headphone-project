import { useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

type OutletContext = {
  setIsBannerVisible: (visible: boolean) => void;
};

export function useBannerVisibility<T extends HTMLElement>(
  threshold: number = 0.6
) {
  const { setIsBannerVisible } = useOutletContext<OutletContext>();
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBannerVisible(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [setIsBannerVisible, threshold]);

  return ref;
}
