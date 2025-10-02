import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "Về chúng tôi - KSB Group",
  description: "Tập đoàn KSB tự hào kiến tạo nên một nền tảng vững mạnh với hệ sinh thái kinh doanh bền vững.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
