declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: (string | Date | Record<string, unknown>)[]) => void;
    fbq: (...args: (string | Record<string, unknown>)[]) => void;
    hj: (...args: (string | number)[]) => void;
    _hjSettings: { hjid: number; hjsv: number };
    _fbq: Record<string, unknown>;
  }
}

// Google Analytics configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: (string | Date | Record<string, unknown>)[]) {
      window.dataLayer.push(...args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// E-commerce tracking
export interface AnalyticsItem {
  item_id: string;
  item_name: string;
  item_category: string;
  price: number;
  quantity: number;
  [key: string]: string | number;
}

export const trackPurchase = (
  transactionId: string,
  value: number,
  currency: string = 'GBP',
  items: AnalyticsItem[]
) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items
    });
  }
};

// Track product views
export const trackProductView = (
  productId: string,
  productName: string,
  category: string,
  price: number
) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', 'view_item', {
      currency: 'GBP',
      value: price,
      items: [{
        item_id: productId,
        item_name: productName,
        item_category: category,
        price: price,
        quantity: 1
      }]
    });
  }
};

// Track add to cart
export const trackAddToCart = (
  productId: string,
  productName: string,
  category: string,
  price: number,
  quantity: number
) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', 'add_to_cart', {
      currency: 'GBP',
      value: price * quantity,
      items: [{
        item_id: productId,
        item_name: productName,
        item_category: category,
        price: price,
        quantity: quantity
      }]
    });
  }
};

// Track checkout initiation
export const trackBeginCheckout = (
  value: number,
  items: AnalyticsItem[]
) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', 'begin_checkout', {
      currency: 'GBP',
      value: value,
      items: items
    });
  }
};

// Facebook Pixel integration
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';

export const initFacebookPixel = () => {
  if (typeof window !== 'undefined' && FB_PIXEL_ID) {
    ((f, b, e, v) => {
      if (f.fbq) return;
      const n = (...args: (string | Record<string, unknown>)[]) => {
        if ((n as any).callMethod) {
          (n as any).callMethod(...args);
        } else {
          (n as any).queue.push(args);
        }
      };
      if (!f._fbq) f._fbq = n;
      (n as any).push = n;
      (n as any).loaded = true;
      (n as any).version = '2.0';
      (n as any).queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      if (s && s.parentNode) {
        s.parentNode.insertBefore(t, s);
      }

      if (!window.fbq) {
        window.fbq = function (...args: (string | Record<string, unknown>)[]) {
          if ((window.fbq as any).queue) {
            (window.fbq as any).queue.push(args);
          }
        };
        (window.fbq as any).queue = [];
      }
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    if (window.fbq) {
      window.fbq('init', FB_PIXEL_ID);
      window.fbq('track', 'PageView');
    }
  }
};

// Track Facebook Pixel events
export const trackFBEvent = (event: string, data?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq && FB_PIXEL_ID) {
    if (data) {
      window.fbq('track', event, data);
    } else {
      window.fbq('track', event);
    }
  }
};

// Hotjar integration
export const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID || '';

export const initHotjar = () => {
  if (typeof window !== 'undefined' && HOTJAR_ID) {
    ((h, o, t, j) => {
      h.hj = h.hj || ((...args: (string | number)[]) => { (h.hj.q = h.hj.q || []).push(args); });
      h._hjSettings = { hjid: parseInt(HOTJAR_ID), hjsv: 6 };
      const a = o.getElementsByTagName('head')[0];
      const r = o.createElement('script') as HTMLScriptElement;
      r.async = true;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      if (a) {
        a.appendChild(r);
      }
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
  }
};

export const verifyEnvironmentVariables = () => {
  if (typeof window !== 'undefined') {
    if (!GA_TRACKING_ID) {
      // eslint-disable-next-line no-console
      console.warn('Google Analytics tracking ID is not set. Analytics will be disabled.');
    }
    if (!FB_PIXEL_ID) {
      // eslint-disable-next-line no-console
      console.warn('Facebook Pixel ID is not set. Facebook Pixel tracking will be disabled.');
    }
    if (!HOTJAR_ID) {
      // eslint-disable-next-line no-console
      console.warn('Hotjar ID is not set. Hotjar tracking will be disabled.');
    }
  }
};
