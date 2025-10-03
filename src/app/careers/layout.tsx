import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tuyển dụng - KSB Group",
  description: "Khám phá cơ hội nghề nghiệp tại KSB Group. Tham gia tập đoàn hàng đầu với hệ sinh thái kinh doanh bền vững và môi trường làm việc chuyên nghiệp.",
  keywords: [
    "tuyển dụng KSB Group",
    "việc làm KSB",
    "careers KSB",
    "cơ hội nghề nghiệp",
    "tập đoàn KSB tuyển dụng",
    "môi trường làm việc KSB",
    "phát triển sự nghiệp",
    "nhân viên KSB Group"
  ],
  openGraph: {
    title: "Tuyển dụng - KSB Group | Cơ hội nghề nghiệp hấp dẫn",
    description: "Khám phá cơ hội nghề nghiệp tại KSB Group. Tham gia tập đoàn hàng đầu với hệ sinh thái kinh doanh bền vững.",
    url: "https://ksbgroup.vn/careers",
    images: [
      {
        url: "/images/office.png",
        width: 1200,
        height: 630,
        alt: "KSB Group - Tuyển dụng",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tuyển dụng - KSB Group | Cơ hội nghề nghiệp hấp dẫn",
    description: "Khám phá cơ hội nghề nghiệp tại KSB Group. Tham gia tập đoàn hàng đầu.",
    images: ["/images/office.png"],
  },
  alternates: {
    canonical: "https://ksbgroup.vn/careers",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}