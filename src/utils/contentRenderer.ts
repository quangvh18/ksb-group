// Utility functions for rendering rich content from API

export interface ContentBlock {
  type: string;
  level?: number;
  children?: Array<{
    text?: string;
    type?: string;
    bold?: boolean;
    italic?: boolean;
  }>;
  image?: {
    url: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
  };
}

// Render a single content block
export const renderContentBlock = (block: ContentBlock): string => {
  switch (block.type) {
    case 'heading':
      const level = block.level || 1;
      const headingText = block.children?.map(child => child.text || '').join('') || '';
      return `<h${level}>${headingText}</h${level}>`;
    
    case 'paragraph':
      const paragraphText = block.children?.map(child => {
        let text = child.text || '';
        if (child.bold) text = `<strong>${text}</strong>`;
        if (child.italic) text = `<em>${text}</em>`;
        return text;
      }).join('') || '';
      return `<p>${paragraphText}</p>`;
    
    case 'image':
      const imageUrl = block.image?.url || '';
      const altText = block.image?.alternativeText || '';
      const caption = block.image?.caption || '';
      return `<img src="${imageUrl}" alt="${altText}" />${caption ? `<p><em>${caption}</em></p>` : ''}`;
    
    default:
      return '';
  }
};

// Render full content array
export const renderContent = (content: ContentBlock[]): string => {
  if (!content || !Array.isArray(content)) return '';
  
  return content.map(block => renderContentBlock(block)).join('');
};

// Extract plain text from content (for summaries)
export const extractPlainText = (content: ContentBlock[]): string => {
  if (!content || !Array.isArray(content)) return '';
  
  return content
    .map(block => {
      if (block.children) {
        return block.children.map(child => child.text || '').join('');
      }
      return '';
    })
    .join(' ')
    .trim();
};

// Get content preview (first few paragraphs)
export const getContentPreview = (content: ContentBlock[], maxLength: number = 200): string => {
  const plainText = extractPlainText(content);
  if (plainText.length <= maxLength) return plainText;
  
  return plainText.substring(0, maxLength) + '...';
};
