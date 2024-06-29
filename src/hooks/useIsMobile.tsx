import { useState, useEffect } from 'react';

const useIsMobile = (): boolean => {
  const mobileWidth = 800;
  const [isMobile, setIsMobile] = useState(window.innerWidth < mobileWidth);
  useEffect(() => {
    if (!window) {
      return;
    }
    const handleResize = () => {
      setIsMobile(window?.innerWidth < mobileWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
