'use client'

import Link from 'next/link'
import { useLanguage } from '../contexts/LanguageContext'

export default function HomeFeature() {
  const { t } = useLanguage();
  
  return (
    <section className="bg-white py-12 md:py-16" data-aos="fade-up">
      <div className="container mx-auto px-4 md:px-5 max-w-[1300px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute top-0 left-0 w-full h-full bg-[#f0f0f0] rounded-[3rem_0rem_3rem_0rem] translate-x-6 translate-y-6 z-0"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop"
              alt="KSB Feature"
              className="relative z-10 w-full h-auto rounded-[3rem_0rem_3rem_0rem] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_4px_16px_-4px_rgba(0,0,0,0.1)]"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground mb-5" data-aos="fade-up" data-aos-delay="100">
              {t('features.title')}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8" data-aos="fade-up" data-aos-delay="150">
              {t('features.description')}
            </p>
            <Link href="/about" className="inline-block">
              <span className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#c9184a] hover:bg-[#a0153a] text-white font-semibold shadow transition-colors duration-300">
                {t('common.learnMore')}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}


