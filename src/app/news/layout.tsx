import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin tức - KSB Group",
  description: "Cập nhật tin tức mới nhất về KSB Group, các hoạt động kinh doanh, sự kiện và phát triển bền vững của tập đoàn.",
  keywords: [
    "tin tức KSB Group",
    "news KSB",
    "hoạt động KSB",
    "sự kiện KSB",
    "phát triển bền vững",
    "kinh doanh KSB",
    "cập nhật KSB",
    "thông tin KSB Group"
  ],
  openGraph: {
    title: "Tin tức - KSB Group | Cập nhật mới nhất",
    description: "Cập nhật tin tức mới nhất về KSB Group, các hoạt động kinh doanh, sự kiện và phát triển bền vững của tập đoàn.",
    url: "https://ksbgroup.vn/news",
    images: [
      {
        url: "/images/office.png",
        width: 1200,
        height: 630,
        alt: "KSB Group - Tin tức",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tin tức - KSB Group | Cập nhật mới nhất",
    description: "Cập nhật tin tức mới nhất về KSB Group, các hoạt động kinh doanh và sự kiện.",
    images: ["/images/office.png"],
  },
  alternates: {
    canonical: "https://ksbgroup.vn/news",
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
