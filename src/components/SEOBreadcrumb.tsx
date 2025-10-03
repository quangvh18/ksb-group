import Link from 'next/link'
import StructuredData from './StructuredData'

interface BreadcrumbItem {
  label: string
  href?: string
  isActive?: boolean
}

interface SEOBreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function SEOBreadcrumb({ items, className = '' }: SEOBreadcrumbProps) {
  const structuredData = items.map((item) => ({
    name: item.label,
    item: item.href ? `https://ksbgroup.vn${item.href}` : `https://ksbgroup.vn`
  }))

  return (
    <>
      <StructuredData type="breadcrumb" data={structuredData} />
      <nav 
        className={`flex items-center space-x-2 text-sm ${className}`}
        aria-label="Breadcrumb"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <svg 
                className="w-4 h-4 text-gray-400 mx-2" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            )}
            {item.isActive ? (
              <span 
                className="text-gray-500 font-medium"
                itemProp="name"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href || '#'}
                className="text-[#c9184a] hover:text-[#a0153a] transition-colors duration-200"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            )}
            <meta itemProp="position" content={(index + 1).toString()} />
          </div>
        ))}
      </nav>
    </>
  )
}
