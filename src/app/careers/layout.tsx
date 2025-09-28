import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tuyển dụng - KSB GROUP",
  description: "Tham gia cùng KSB GROUP để kiến tạo giá trị và vươn tầm toàn cầu. Khám phá các cơ hội nghề nghiệp và văn hóa làm việc tại KSB GROUP.",
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
