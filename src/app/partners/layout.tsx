import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đối tác - KSB GROUP",
  description: "Khám phá các đối tác chiến lược của KSB GROUP và cơ hội hợp tác. KSB GROUP tự hào là đối tác của nhiều thương hiệu uy tín từ Hàn Quốc, châu Âu và các quốc gia phát triển khác.",
};

export default function PartnersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
