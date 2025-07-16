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
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
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
export const trackPurchase = (transactionId: string, value: number, currency: string = 'GBP', items: any[]) => {
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
export const trackProductView = (productId: string, productName: string, category: string, price: number) => {
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
export const trackAddToCart = (productId: string, productName: string, category: string, price: number, quantity: number) => {
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
export const trackBeginCheckout = (value: number, items: any[]) => {
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
    (function(f: any, b: Document, e: string, v: string) {
      if (f.fbq) return;
      const n: any = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      if (s && s.parentNode) {
        s.parentNode.insertBefore(t, s);
      }
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    if (window.fbq) {
      window.fbq('init', FB_PIXEL_ID);
      window.fbq('track', 'PageView');
    }
  }
};

// Track Facebook Pixel events
export const trackFBEvent = (event: string, data?: any) => {
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
    (function(h: any, o: Document, t: string, j: string) {
      h.hj = h.hj || function() { (h.hj.q = h.hj.q || []).push(arguments) };
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

// Environment variables verification
export const verifyEnvironmentVariables = () => {
  const variables = {
    GA_TRACKING_ID: GA_TRACKING_ID,
    FB_PIXEL_ID: FB_PIXEL_ID,
    HOTJAR_ID: HOTJAR_ID,
    STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    APP_URL: process.env.NEXT_PUBLIC_APP_URL || '',
    NODE_ENV: process.env.NODE_ENV || '',
  };

  console.log('🔍 Environment Variables Status:');
  Object.entries(variables).forEach(([key, value]) => {
    const status = value ? '✅' : '❌';
    console.log(`${status} ${key}: ${value ? 'Set' : 'Missing'}`);
  });

  return variables;
};

// Initialize all tracking
export const initAllTracking = () => {
  initGA();
  initFacebookPixel();
  initHotjar();
  verifyEnvironmentVariables();
};
