'use client'

import { useEffect } from 'react'

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload critical fonts
      const fontLink = document.createElement('link')
      fontLink.rel = 'preload'
      fontLink.href = '/fonts/inter-var.woff2'
      fontLink.as = 'font'
      fontLink.type = 'font/woff2'
      fontLink.crossOrigin = 'anonymous'
      document.head.appendChild(fontLink)

      // Preload critical images
      const criticalImages = [
        '/images/logo-header.png',
        '/images/ksb-group-og-image.jpg'
      ]

      criticalImages.forEach(src => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = src
        link.as = 'image'
        document.head.appendChild(link)
      })
    }

    // Optimize third-party scripts loading
    const optimizeThirdPartyScripts = () => {
      // Load Google Analytics with delay
      const loadGA = () => {
        const script = document.createElement('script')
        script.async = true
        script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'
        document.head.appendChild(script)
      }

      // Load GA after page is interactive
      if (document.readyState === 'complete') {
        setTimeout(loadGA, 2000)
      } else {
        window.addEventListener('load', () => {
          setTimeout(loadGA, 2000)
        })
      }
    }

    // Optimize images loading
    const optimizeImageLoading = () => {
      const images = document.querySelectorAll('img[data-src]')
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            img.src = img.dataset.src || ''
            img.classList.remove('lazy')
            imageObserver.unobserve(img)
          }
        })
      })

      images.forEach(img => imageObserver.observe(img))
    }

    // Initialize optimizations
    preloadCriticalResources()
    optimizeThirdPartyScripts()
    optimizeImageLoading()

    // Cleanup
    return () => {
      // Cleanup if needed
    }
  }, [])

  return null
}
