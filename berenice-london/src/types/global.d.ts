// Global type definitions for tracking libraries

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: (string | Date | Record<string, unknown>)[]) => void;
    fbq?: (...args: (string | Record<string, unknown>)[]) => void;
    hj?: (...args: (string | number)[]) => void;
    _hjSettings?: { hjid: number; hjsv: number };
    _fbq?: Record<string, unknown>;
  }
}

export {};
