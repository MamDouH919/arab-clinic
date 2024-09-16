/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TranslationsProvider from '@/component/TranslationsProvider';
import initTranslations from "../i18n";
import i18nConfig from "@/i18nConfig";
import { dir, t } from 'i18next';
import ThemeProv from "@/context/ThemeProv";
import ModeContextProvider from "@/context/modeContext";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import './index.css';
import { config } from "@/config";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }))
}

type Props = {
  params: { locale: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  return {
    title: config.app.name[params.locale],
  };
}

const i18nNamespaces = ['website', 'dashboard', 'custom']

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

  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Libre+Barcode+39+Text&amp;display=swap" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <ModeContextProvider>
          <ThemeProv locale={locale}>
            <TranslationsProvider
              namespaces={i18nNamespaces}
              locale={locale}
              resources={resources}
            >
              {children}
            </TranslationsProvider>
          </ThemeProv>
        </ModeContextProvider>
      </body>
    </html>
  );
}

