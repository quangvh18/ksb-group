import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hệ sinh thái - KSB Group",
  description: "Khám phá hệ sinh thái kinh doanh bền vững của KSB Group. Tập đoàn xây dựng nền tảng vững mạnh với các dịch vụ đa dạng và chuyên nghiệp.",
  keywords: [
    "hệ sinh thái KSB Group",
    "ecosystem KSB",
    "kinh doanh bền vững",
    "tập đoàn KSB hệ sinh thái",
    "dịch vụ KSB Group",
    "nền tảng kinh doanh",
    "phát triển bền vững",
    "hệ sinh thái doanh nghiệp"
  ],
  openGraph: {
    title: "Hệ sinh thái - KSB Group | Kinh doanh bền vững",
    description: "Khám phá hệ sinh thái kinh doanh bền vững của KSB Group. Tập đoàn xây dựng nền tảng vững mạnh.",
    url: "https://ksbgroup.vn/ecosystem",
    images: [
      {
        url: "/images/office.png",
        width: 1200,
        height: 630,
        alt: "KSB Group - Hệ sinh thái",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hệ sinh thái - KSB Group | Kinh doanh bền vững",
    description: "Khám phá hệ sinh thái kinh doanh bền vững của KSB Group.",
    images: ["/images/office.png"],
  },
  alternates: {
    canonical: "https://ksbgroup.vn/ecosystem",
  },
};

export default function EcosystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
