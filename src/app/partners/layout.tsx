import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đối tác - KSB Group",
  description: "Khám phá các đối tác chiến lược của KSB Group. Tập đoàn tự hào hợp tác với các công ty hàng đầu trong nhiều lĩnh vực khác nhau.",
  keywords: [
    "đối tác KSB Group",
    "partners KSB",
    "hợp tác KSB",
    "đối tác chiến lược",
    "tập đoàn KSB đối tác",
    "công ty đối tác KSB",
    "liên minh kinh doanh",
    "hợp tác doanh nghiệp"
  ],
  openGraph: {
    title: "Đối tác - KSB Group | Đối tác chiến lược",
    description: "Khám phá các đối tác chiến lược của KSB Group. Tập đoàn tự hào hợp tác với các công ty hàng đầu.",
    url: "https://ksbgroup.vn/partners",
    images: [
      {
        url: "/images/office.png",
        width: 1200,
        height: 630,
        alt: "KSB Group - Đối tác",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đối tác - KSB Group | Đối tác chiến lược",
    description: "Khám phá các đối tác chiến lược của KSB Group. Tập đoàn tự hào hợp tác với các công ty hàng đầu.",
    images: ["/images/office.png"],
  },
  alternates: {
    canonical: "https://ksbgroup.vn/partners",
  },
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}