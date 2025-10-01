'use client'

import { ArrowRight } from 'lucide-react'

interface NewsCardProps {
  title: string;
  image: string;
  link?: string;
  featured?: boolean;
  leafDirection?: 'left' | 'right';
  fullHeight?: boolean;
}

const NewsCard = ({ title, image, link = '#', featured = false, leafDirection = 'left', fullHeight = false }: NewsCardProps) => {
  const leafClass = leafDirection === 'right'
    ? 'rounded-[0rem_3rem_0rem_3rem]'
    : 'rounded-[3rem_0rem_3rem_0rem]'
  const cornerClass = leafDirection === 'right' ? 'rounded-br-full right-0' : 'rounded-bl-full left-0'
  const baseCardClass = fullHeight
    ? `bg-card ${leafClass} overflow-hidden group cursor-pointer shadow-lg border border-black/10 transition-all duration-300 relative h-full flex flex-col`
    : `bg-card ${leafClass} overflow-hidden group cursor-pointer shadow-lg border border-black/10 transition-all duration-300 relative`
  const imageWrapperClass = fullHeight ? 'flex-1 overflow-hidden' : 'aspect-video overflow-hidden'

  if (featured) {
    return (
      <div className={`relative h-full ${leafClass} overflow-hidden group cursor-pointer shadow-lg border border-white/10`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/40 to-transparent ${leafClass}`} />
        <div className={`absolute top-0 ${leafDirection === 'right' ? 'left-0' : 'right-0'} w-16 h-16 bg-white/20 ${cornerClass}`}></div>

        <div className="relative h-full p-6 md:p-8 flex flex-col justify-end">
          <h3 className="text-white text-xl md:text-2xl font-semibold mb-6 leading-relaxed">
            {title}
          </h3>

          <a
            href={link}
            className="inline-flex items-center gap-2 text-white transition-all duration-300 text-sm font-medium"
          >
            Xem thêm
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className={baseCardClass}>
      <div className={`absolute top-0 ${leafDirection === 'right' ? 'left-0' : 'right-0'} w-10 h-10 bg-white/40 ${cornerClass}`}></div>
      <div className={imageWrapperClass}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 md:p-5">
        <h3 className="text-foreground text-base font-medium mb-4 leading-relaxed line-clamp-2">
          {title}
        </h3>

        <a
          href={link}
          className="inline-flex items-center gap-2 text-success transition-all duration-300 text-sm font-medium"
        >
          Xem thêm
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

export default NewsCard


