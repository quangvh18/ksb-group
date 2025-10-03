import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên hệ - KSB Group",
  description: "Liên hệ với KSB Group để được tư vấn và hỗ trợ. Thông tin liên hệ, địa chỉ văn phòng và form liên hệ trực tuyến.",
  keywords: [
    "liên hệ KSB Group",
    "contact KSB",
    "tư vấn KSB",
    "hỗ trợ KSB",
    "địa chỉ KSB",
    "văn phòng KSB",
    "thông tin liên hệ KSB",
    "form liên hệ KSB"
  ],
  openGraph: {
    title: "Liên hệ - KSB Group | Tư vấn và hỗ trợ",
    description: "Liên hệ với KSB Group để được tư vấn và hỗ trợ. Thông tin liên hệ, địa chỉ văn phòng và form liên hệ trực tuyến.",
    url: "https://ksbgroup.vn/contact",
    images: [
      {
        url: "/images/office.png",
        width: 1200,
        height: 630,
        alt: "KSB Group - Liên hệ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liên hệ - KSB Group | Tư vấn và hỗ trợ",
    description: "Liên hệ với KSB Group để được tư vấn và hỗ trợ chuyên nghiệp.",
    images: ["/images/office.png"],
  },
  alternates: {
    canonical: "https://ksbgroup.vn/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
