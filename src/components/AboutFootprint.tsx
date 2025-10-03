'use client';

import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

const AboutFootprint = () => {
  const { t } = useLanguage();
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-6 md:mb-8 text-center" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground mb-4 text-center">
              {t('about.footprint.title')}
            </h2>
            <p className="text-muted-foreground text-base text-center">
              {t('about.footprint.subtitle')}
            </p>
          </div>

          {/* Content Above Image */}
          <div className="mb-8" data-aos="fade-up" data-aos-delay="200">
            <p className="text-base text-muted-foreground text-center max-w-4xl mx-auto">
              {t('about.footprint.description')}
            </p>
          </div>

          {/* Full Width Image - Much Larger */}
          <div className="rounded-3xl overflow-hidden shadow-[0_12px_40px_-8px_rgba(0,0,0,0.2),0_8px_24px_-4px_rgba(0,0,0,0.15)] hover:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.3),0_12px_32px_-4px_rgba(0,0,0,0.2)] transition-all duration-500" data-aos="zoom-in" data-aos-delay="300">
            <Image 
              src="/images/ksb.jpg" 
              alt={t('about.footprint.image.alt')} 
              width={1200}
              height={800}
              className="w-full h-auto transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFootprint;
