'use client';

import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import AOS from 'aos';

interface OrgNode {
  id: string;
  title: string;
  type: "director" | "manager" | "regional" | "support";
  children?: OrgNode[];
}

const orgData: OrgNode = {
  id: "ceo",
  title: "TỔNG GIÁM ĐỐC",
  type: "director",
  children: [
    {
      id: "marketing",
      title: "GIÁM ĐỐC MARKETING",
      type: "manager",
      children: [
        { id: "phong-marketing", title: "PHÒNG MARKETING", type: "regional" },
        { id: "cham-soc-kh-1", title: "CHĂM SÓC KHÁCH HÀNG", type: "regional" },
      ],
    },
    {
      id: "international",
      title: "GIÁM ĐỐC KD QUỐC TẾ",
      type: "manager",
      children: [
        { id: "phong-kd-qt", title: "PHÒNG KD QUỐC TẾ", type: "regional" },
        { id: "cham-soc-kh-2", title: "CHĂM SÓC KHÁCH HÀNG", type: "regional" },
      ],
    },
    {
      id: "production",
      title: "GIÁM ĐỐC SẢN XUẤT",
      type: "manager",
      children: [
        { id: "phong-san-xuat", title: "PHÒNG SẢN XUẤT", type: "regional" },
        {
          id: "xuong-dong-goi",
          title: "XƯỞNG ĐÓNG GÓI",
          type: "regional",
          children: [{ id: "kho", title: "KHO", type: "regional" }],
        },
      ],
    },
    {
      id: "operations",
      title: "GIÁM ĐỐC ĐIỀU HÀNH",
      type: "manager",
    },
    {
      id: "north",
      title: "GĐKD MIỀN BẮC",
      type: "manager",
      children: [
        { id: "asm-north-1", title: "ASM", type: "regional" },
        { id: "asm-north-2", title: "ASM", type: "regional" },
        { id: "sales-north", title: "SALES", type: "regional" },
        { id: "npp-north", title: "NPP", type: "regional" },
      ],
    },
    {
      id: "central",
      title: "GĐKD MIỀN TRUNG",
      type: "manager",
      children: [
        { id: "asm-central-1", title: "ASM", type: "regional" },
        { id: "asm-central-2", title: "ASM", type: "regional" },
        { id: "sales-central", title: "SALES", type: "regional" },
        { id: "npp-central", title: "NPP", type: "regional" },
      ],
    },
    {
      id: "south",
      title: "GĐKD MIỀN NAM",
      type: "manager",
      children: [
        { id: "asm-south-1", title: "ASM", type: "regional" },
        { id: "asm-south-2", title: "ASM", type: "regional" },
        { id: "sales-south", title: "SALES", type: "regional" },
        { id: "npp-south", title: "NPP", type: "regional" },
      ],
    },
  ],
};

const officeData: OrgNode[] = [
  {
    id: "office-north",
    title: "VP. BẮC",
    type: "regional",
    children: [
      {
        id: "hr-north",
        title: "P. NHÂN SỰ",
        type: "support",
        children: [
          {
            id: "acc-north",
            title: "P. KẾ TOÁN",
            type: "support",
            children: [{ id: "general-north", title: "P. TỔNG HỢP", type: "support" }],
          },
        ],
      },
    ],
  },
  {
    id: "office-central",
    title: "VP. TRUNG",
    type: "regional",
    children: [
      {
        id: "tech-central",
        title: "P. KỸ THUẬT",
        type: "support",
        children: [{ id: "warehouse-central", title: "KHO", type: "support" }],
      },
    ],
  },
  {
    id: "office-south",
    title: "VP. NAM",
    type: "regional",
    children: [
      {
        id: "tech-south",
        title: "P. KỸ THUẬT",
        type: "support",
        children: [{ id: "warehouse-south", title: "KHO", type: "support" }],
      },
    ],
  },
];

interface OrgNodeCardProps {
  node: OrgNode;
  isRoot?: boolean;
}

const OrgNodeCard = ({ node, isRoot = false }: OrgNodeCardProps) => {
  const getNodeStyle = () => {
    if (isRoot) return "bg-org-director text-white shadow-card scale-110";
    if (node.type === "manager") return "bg-org-manager text-white shadow-card";
    if (node.type === "regional") return "bg-org-regional text-white";
    return "bg-org-support text-white shadow-card";
  };

  return (
    <Card
      className={`px-4 py-3 rounded-2xl font-bold text-sm text-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${getNodeStyle()}`}
    >
      {node.title}
    </Card>
  );
};

interface OrgLevelProps {
  nodes: OrgNode[];
  level?: number;
}

const OrgLevel = ({ nodes, level = 0 }: OrgLevelProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-8">
      {nodes.map((node) => (
        <div key={node.id} className="flex flex-col items-center gap-4">
          {level > 0 && (
            <div className="w-0.5 h-8 bg-org-line" />
          )}
          <OrgNodeCard node={node} />
          {node.children && node.children.length > 0 && (
            <>
              <div className="w-0.5 h-6 bg-org-line" />
              <OrgLevel nodes={node.children} level={level + 1} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const OrgChart = () => {
  useEffect(() => {
    // Refresh AOS when component mounts to ensure animations work
    AOS.refresh();
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background to-muted/30" data-aos="fade-up">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-muted-foreground" data-aos="fade-up" data-aos-delay="100">
          SƠ ĐỒ TỔ CHỨC
        </h2>

        <div className="flex flex-col items-center gap-6">
          {/* CEO Level */}
          <div data-aos="zoom-in" data-aos-delay="200">
            <OrgNodeCard node={orgData} isRoot />
          </div>
          
          <div className="w-0.5 h-12 bg-org-line" data-aos="fade-up" data-aos-delay="300" />
          
          {/* Horizontal line connecting all directors */}
          <div className="relative w-full max-w-6xl" data-aos="fade-up" data-aos-delay="400">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-org-line" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 pt-12">
              {orgData.children?.map((child, index) => (
                <div key={child.id} className="flex flex-col items-center gap-4" data-aos="fade-up" data-aos-delay={500 + index * 100}>
                  <div className="w-0.5 h-12 bg-org-line -mt-12" />
                  <OrgNodeCard node={child} />
                  {child.children && child.children.length > 0 && (
                    <>
                      <div className="w-0.5 h-6 bg-org-line" />
                      <div className="flex flex-col gap-4">
                        {child.children.map((subChild, subIndex) => (
                          <div key={subChild.id} className="flex flex-col items-center gap-4" data-aos="fade-up" data-aos-delay={600 + index * 100 + subIndex * 50}>
                            <OrgNodeCard node={subChild} />
                            {subChild.children && subChild.children.length > 0 && (
                              <>
                                <div className="w-0.5 h-4 bg-org-line" />
                                {subChild.children.map((subSubChild) => (
                                  <OrgNodeCard key={subSubChild.id} node={subSubChild} />
                                ))}
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Regional Offices */}
          <div className="w-0.5 h-12 bg-org-line" data-aos="fade-up" data-aos-delay="1200" />
          <div className="relative w-full max-w-4xl" data-aos="fade-up" data-aos-delay="1300">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-org-line" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              {officeData.map((office, index) => (
                <div key={office.id} className="flex flex-col items-center gap-4" data-aos="fade-up" data-aos-delay={1400 + index * 200}>
                  <div className="w-0.5 h-12 bg-org-line -mt-12" />
                  <OrgNodeCard node={office} />
                  {office.children && (
                    <div className="w-0.5 h-6 bg-org-line" />
                  )}
                  <OrgLevel nodes={office.children || []} level={1} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrgChart;
