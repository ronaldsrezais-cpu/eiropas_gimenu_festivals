import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata = {
  title: "Eiropas Ģimeņu festivāls | Home & Heart",
  description: "Eiropas Ģimeņu festivāls Rīgā – bezmaksas aktivitāšu diena ģimenēm Uzvaras parkā 2026. gada 22. augustā.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="lv">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        {/* Meta Pixel Code */}
        <script
          id="meta-pixel-base"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '961169723611118');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=961169723611118&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body>{children}
        <Analytics />
      </body>
    </html>
  );
}
