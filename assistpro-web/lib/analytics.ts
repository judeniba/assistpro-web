/**
 * Analytics and performance monitoring utilities
 */

// Google Analytics configuration
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== "undefined" && GA_MEASUREMENT_ID) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    });
  }
};

// Log page views
export const logPageView = (url: string) => {
  if (typeof window !== "undefined" && GA_MEASUREMENT_ID) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Log custom events
export const logEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && GA_MEASUREMENT_ID) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Web Vitals reporting
export const reportWebVitals = (metric: {
  id: string;
  name: string;
  value: number;
  label: "web-vital" | "custom";
}) => {
  if (typeof window !== "undefined" && GA_MEASUREMENT_ID) {
    window.gtag("event", metric.name, {
      event_category: metric.label === "web-vital" ? "Web Vitals" : "Custom",
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Also log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log("Web Vital:", metric);
  }
};

// Type declarations for gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}
