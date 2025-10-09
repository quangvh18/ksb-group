'use client';

import { Card } from "@/components/ui/card";
import { useEffect, useMemo } from "react";
import AOS from 'aos';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/about.css';

interface OrgNode {
  id: string;
  title: string;
  type: "director" | "manager" | "regional" | "support";
  children?: OrgNode[];
}

const getOrgData = (t: (key: string) => string): OrgNode => ({
  id: "ceo",
  title: t('org.ceo'),
  type: "director",
  children: [
    {
      id: "marketing",
      title: t('org.marketing.director'),
      type: "manager",
      children: [
        { id: "phong-marketing", title: t('org.marketing.department'), type: "regional" },
        { id: "cham-soc-kh-1", title: t('org.customer.care'), type: "regional" },
      ],
    },
    {
      id: "international",
      title: t('org.international.director'),
      type: "manager",
      children: [
        { id: "phong-kd-qt", title: t('org.international.department'), type: "regional" },
        { id: "cham-soc-kh-2", title: t('org.customer.care'), type: "regional" },
      ],
    },
    {
      id: "production",
      title: t('org.production.director'),
      type: "manager",
      children: [
        { id: "phong-san-xuat", title: t('org.production.department'), type: "regional" },
        {
          id: "xuong-dong-goi",
          title: t('org.packaging.workshop'),
          type: "regional",
          children: [{ id: "kho", title: t('org.warehouse'), type: "regional" }],
        },
      ],
    },
    {
      id: "operations",
      title: t('org.operations.director'),
      type: "manager",
    },
    {
      id: "north",
      title: t('org.north.director'),
      type: "manager",
      children: [
        { id: "asm-north-1", title: t('org.asm'), type: "regional" },
        { id: "asm-north-2", title: t('org.asm'), type: "regional" },
        { id: "sales-north", title: t('org.sales'), type: "regional" },
        { id: "npp-north", title: t('org.npp'), type: "regional" },
      ],
    },
    {
      id: "central",
      title: t('org.central.director'),
      type: "manager",
      children: [
        { id: "asm-central-1", title: t('org.asm'), type: "regional" },
        { id: "asm-central-2", title: t('org.asm'), type: "regional" },
        { id: "sales-central", title: t('org.sales'), type: "regional" },
        { id: "npp-central", title: t('org.npp'), type: "regional" },
      ],
    },
    {
      id: "south",
      title: t('org.south.director'),
      type: "manager",
      children: [
        { id: "asm-south-1", title: t('org.asm'), type: "regional" },
        { id: "asm-south-2", title: t('org.asm'), type: "regional" },
        { id: "sales-south", title: t('org.sales'), type: "regional" },
        { id: "npp-south", title: t('org.npp'), type: "regional" },
      ],
    },
  ],
});

const getOfficeData = (t: (key: string) => string): OrgNode[] => [
  {
    id: "office-north",
    title: t('org.north.region'),
    type: "regional",
    children: [
      {
        id: "hr-north",
        title: t('org.hr.dept'),
        type: "support",
        children: [
          {
            id: "acc-north",
            title: t('org.accounting.dept'),
            type: "support",
            children: [{ id: "general-north", title: t('org.general.dept'), type: "support" }],
          },
        ],
      },
    ],
  },
  {
    id: "office-central",
    title: t('org.central.region'),
    type: "regional",
    children: [
      {
        id: "tech-central",
        title: t('org.technical.dept'),
        type: "support",
        children: [{ id: "warehouse-central", title: t('org.warehouse.dept'), type: "support" }],
      },
    ],
  },
  {
    id: "office-south",
    title: t('org.south.region'),
    type: "regional",
    children: [
      {
        id: "tech-south",
        title: t('org.technical.dept'),
        type: "support",
        children: [{ id: "warehouse-south", title: t('org.warehouse.dept'), type: "support" }],
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
  language?: string;
}

const OrgLevel = ({ nodes, level = 0, language = 'vi' }: OrgLevelProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-8">
      {nodes.map((node) => (
        <div key={`${node.id}-${language}`} className="flex flex-col items-center gap-4">
          {level > 0 && (
            <div className="w-0.5 h-8 bg-org-line" />
          )}
          <OrgNodeCard node={node} />
          {node.children && node.children.length > 0 && (
            <>
              <div className="w-0.5 h-6 bg-org-line" />
              <OrgLevel nodes={node.children} level={level + 1} language={language} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const OrgChart = () => {
  const { t, language } = useLanguage();

  // Memoize organization data to ensure re-render when language changes
  const orgData = useMemo(() => getOrgData(t), [t]);
  const officeData = useMemo(() => getOfficeData(t), [t]);

  useEffect(() => {
    // Refresh AOS when component mounts to ensure animations work
    AOS.refresh();
  }, []);

  useEffect(() => {
    // Refresh AOS when language changes to ensure animations work properly
    AOS.refresh();
  }, [language]);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background to-muted/30" data-aos="fade">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-muted-foreground" data-aos="fade" data-aos-delay="100">
          {t('org.title')}
        </h2>

        <div className="flex flex-col items-center gap-6">
          {/* CEO Level */}
          <div data-aos="fade" data-aos-delay="200">
            <OrgNodeCard node={orgData} isRoot />
          </div>
          
          <div className="w-0.5 h-12 bg-org-line" data-aos="fade" data-aos-delay="300" />
          
          {/* Horizontal line connecting all directors */}
          <div className="relative w-full max-w-6xl" data-aos="fade" data-aos-delay="400">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-org-line" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 pt-12">
              {orgData.children?.map((child, index) => (
                <div key={`${child.id}-${language}`} className="flex flex-col items-center gap-4" data-aos="fade" data-aos-delay={500 + index * 100}>
                  <div className="w-0.5 h-12 bg-org-line -mt-12" />
                  <OrgNodeCard node={child} />
                  {child.children && child.children.length > 0 && (
                    <>
                      <div className="w-0.5 h-6 bg-org-line" />
                      <div className="flex flex-col gap-4">
                        {child.children.map((subChild, subIndex) => (
                          <div key={`${subChild.id}-${language}`} className="flex flex-col items-center gap-4" data-aos="fade" data-aos-delay={600 + index * 100 + subIndex * 50}>
                            <OrgNodeCard node={subChild} />
                            {subChild.children && subChild.children.length > 0 && (
                              <>
                                <div className="w-0.5 h-4 bg-org-line" />
                                {subChild.children.map((subSubChild) => (
                                  <OrgNodeCard key={`${subSubChild.id}-${language}`} node={subSubChild} />
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
          <div className="w-0.5 h-12 bg-org-line" data-aos="fade" data-aos-delay="1200" />
          <div className="relative w-full max-w-4xl" data-aos="fade" data-aos-delay="1300">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-org-line" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              {officeData.map((office, index) => (
                <div key={`${office.id}-${language}`} className="flex flex-col items-center gap-4" data-aos="fade" data-aos-delay={1400 + index * 200}>
                  <div className="w-0.5 h-12 bg-org-line -mt-12" />
                  <OrgNodeCard node={office} />
                  {office.children && (
                    <div className="w-0.5 h-6 bg-org-line" />
                  )}
                  <OrgLevel nodes={office.children || []} level={1} language={language} />
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
