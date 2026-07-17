import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

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
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
