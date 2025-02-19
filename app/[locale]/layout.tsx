/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import TranslationsProvider from '@/component/TranslationsProvider';
import initTranslations from "../i18n";
import i18nConfig from "@/i18nConfig";
import { dir, t } from 'i18next';
import ThemeProv from "@/context/ThemeProv";
import ModeContextProvider from "@/context/modeContext";
import 'react-quill/dist/quill.snow.css';

const cairo = Cairo({ weight: ["600", "700", "800"], subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Arab Clinic - اراب كلينيك",
  description: "مركز أراب كلينك - نعمل من أجلك علي مدار اليوم Center Arab Clinic - We work for you around the clock",
  robots: "index,follow",
  keywords: "",
  openGraph: {
    type: "article",
    authors: ["arab clinic", "https://arabclinic.net"],
    url: "https://arabclinic.net",
    title: "Arab Clinic - اراب كلينيك",
    description: "",
    images: [
      {
        url: "https://arabclinic.net/logo.webp",
        width: 1200,
        height: 630,
        alt: "Arab Clinic",
      },
    ],
    siteName: "arab clinic",
    section: "Center Arab Clinic",
    publishedTime: "2024-10-1T12:00:00Z", // Publication date of the article
    modifiedTime: "2024-10-10T14:00:00Z", // Last modified time (optional)
  },
  twitter: {
    card: "summary_large_image",
    title: "Arab Clinic - اراب كلينيك",
    description: "مركز أراب كلينك - نعمل من أجلك علي مدار اليوم Center Arab Clinic - We work for you around the clock",
    images: "https://arabclinic.net/logo.webp",
  },
  manifest: "/manifest.json",
  authors: {
    name: "arab clinic",
    url: "https://arabclinic.net",
  },
  alternates: {
    canonical: "https://arabclinic.net", // Canonical URL for SEO purposes
    languages: {
      "ar": "https://arabclinic.net/ar", // If you have an Arabic language version
      "en": "https://arabclinic.net/en", // If you have an Arabic language version
    },
  },
  applicationName: "arab clinic",
  creator: "mountain",
  category: "",
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }))
}

type Props = {
  params: { locale: string };
};

// export const generateMetadata = async ({
//   params,
// }: Props): Promise<Metadata> => {
//   return {
//     title: config.app.name[params.locale],
//   };
// }

const i18nNamespaces = ['website', 'dashboard', 'custom']

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  const { resources } = await initTranslations(locale, i18nNamespaces);

  // metadata.title = config.app.name[locale];
  // metadata.description = resources.website.description;
  // await delay(2000); // 2-second delay

  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className={cairo.className}>
        {/* <ModeContextProvider> */}
        <ThemeProv locale={locale}>
          <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
          >
            {children}
          </TranslationsProvider>
        </ThemeProv>
        {/* </ModeContextProvider> */}
      </body>
    </html>
  );
}

