import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KSB Group - Tập đoàn KSB | Hệ sinh thái kinh doanh đa ngành',
    short_name: 'KSB Group',
    description: 'KSB Group - Tập đoàn kinh doanh đa ngành với các lĩnh vực: Hóa - Mỹ phẩm (Biofresh), Sản xuất & Phân phối thực phẩm',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#c9184a',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'vi',
    icons: [
      {
        src: '/images/ksb-group-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/images/ksb-group-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/images/ksb-group-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'monochrome'
      }
    ],
    categories: ['business', 'productivity', 'utilities'],
    screenshots: [
      {
        src: '/images/ksb-group-screenshot-desktop.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'KSB Group Desktop View'
      },
      {
        src: '/images/ksb-group-screenshot-mobile.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'KSB Group Mobile View'
      }
    ]
  }
}
