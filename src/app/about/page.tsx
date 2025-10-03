import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "Về chúng tôi - KSB Group",
  description: "Tập đoàn KSB tự hào kiến tạo nên một nền tảng vững mạnh với hệ sinh thái kinh doanh bền vững.",
  openGraph: {
    title: "Về chúng tôi - KSB Group | Tập đoàn KSB",
    description: "Tập đoàn KSB tự hào kiến tạo nên một nền tảng vững mạnh với hệ sinh thái kinh doanh bền vững.",
    url: "https://ksbgroup.vn/about",
    images: [
      {
        url: "/images/office.png",
        width: 1200,
        height: 630,
        alt: "KSB Group - Về chúng tôi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Về chúng tôi - KSB Group | Tập đoàn KSB",
    description: "Tập đoàn KSB tự hào kiến tạo nên một nền tảng vững mạnh với hệ sinh thái kinh doanh bền vững.",
    images: ["/images/office.png"],
  },
  alternates: {
    canonical: "https://ksbgroup.vn/about",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
