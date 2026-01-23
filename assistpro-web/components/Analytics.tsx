"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logPageView, GA_MEASUREMENT_ID } from "@/lib/analytics";

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      logPageView(pathname);
    }
  }, [pathname]);

  // Don't render anything if GA_MEASUREMENT_ID is not set
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
