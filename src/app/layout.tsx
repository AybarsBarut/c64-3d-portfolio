import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = "https://aybarsbarut.com.tr";
const primaryPersonId = "https://aybarsbarut.com/#person";
const title = "Fahri Aybars Barut | C64 3D Portfolio";
const description =
  "Explore Fahri Aybars Barut's immersive Commodore 64-inspired 3D portfolio featuring simulation, VR/XR, Unity, Unreal Engine, C++, C#, Python and AI/RAG projects.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Fahri Aybars Barut C64 Portfolio",
  authors: [{ name: "Fahri Aybars Barut", url: "https://aybarsbarut.com/" }],
  creator: "Fahri Aybars Barut",
  publisher: "Fahri Aybars Barut",
  keywords: [
    "Fahri Aybars Barut",
    "C64 3D portfolio",
    "simulation developer",
    "VR/XR developer",
    "Unity developer",
    "Unreal Engine developer",
    "C++ developer",
    "AI RAG developer",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "profile",
    title,
    description,
    url: siteUrl,
    siteName: "Fahri Aybars Barut C64 Portfolio",
    locale: "en_US",
    firstName: "Fahri Aybars",
    lastName: "Barut",
    username: "AybarsBarut",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "Fahri Aybars Barut C64 Portfolio",
      inLanguage: "en",
      publisher: { "@id": primaryPersonId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: `${siteUrl}/`,
      name: title,
      description,
      inLanguage: "en",
      dateModified: "2026-08-06T12:45:00+03:00",
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": primaryPersonId },
    },
    {
      "@type": "Person",
      "@id": primaryPersonId,
      name: "Fahri Aybars Barut",
      alternateName: "AybarsBarut",
      url: "https://aybarsbarut.com/",
      image: {
        "@type": "ImageObject",
        url: "https://avatars.githubusercontent.com/u/57864464?v=4",
        caption: "Fahri Aybars Barut",
      },
      description:
        "Computer Engineer specializing in real-time simulation systems, VR/XR development, Unity, Unreal Engine, C++, C#, Python and AI/RAG.",
      jobTitle: "Computer Engineer and Simulation & VR/XR Developer",
      worksFor: {
        "@type": "Organization",
        name: "DGH YAZILIM Tic. Ltd. Şti.",
        sameAs: "https://www.linkedin.com/company/dghyazilim/",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Sivas Cumhuriyet Üniversitesi",
        url: "https://www.cumhuriyet.edu.tr/",
      },
      homeLocation: {
        "@type": "Place",
        name: "Ankara, Türkiye",
      },
      sameAs: [
        "https://aybarsbarut.com/",
        `${siteUrl}/`,
        "https://github.com/AybarsBarut",
        "https://www.linkedin.com/in/fahriaybarsbarut1853/",
      ],
      subjectOf: {
        "@type": "SoftwareSourceCode",
        name: "Ionization-Based Logic System Simulation",
        url: "https://doi.org/10.5281/zenodo.20589245",
        sameAs: "https://github.com/AybarsBarut/Ionization-Based-Logic-System-Simulation",
        author: { "@id": primaryPersonId },
      },
      knowsAbout: [
        "Real-time simulation systems",
        "Virtual reality",
        "Extended reality",
        "Unity",
        "Unreal Engine 5",
        "C++",
        "C#",
        "Python",
        "Retrieval-Augmented Generation",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
