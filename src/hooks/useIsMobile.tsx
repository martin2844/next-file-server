import { useState, useEffect } from 'react';

const useIsMobile = (): boolean => {
  const mobileWidth = 800;
  const [isMobile, setIsMobile] = useState(false); // Set default state to false

  useEffect(() => {
    // Define the function to update the state based on the window width
    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileWidth);
    };

    // Check if window is available and set initial width
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < mobileWidth);
      window.addEventListener('resize', handleResize);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
