// Global type definitions for tracking libraries

declare global {
  interface Window {
    dataLayer?: Record<string, any>[];
    gtag?: (...args: (string | Date | Record<string, any>)[]) => void;
    fbq?: (...args: (string | Record<string, any>)[]) => void;
    hj?: (...args: (string | number)[]) => void;
    _hjSettings?: { hjid: number; hjsv: number };
    _fbq?: Record<string, any>;
  }
}

export {};
