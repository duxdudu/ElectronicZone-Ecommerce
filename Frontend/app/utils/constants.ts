// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

// Image URL Configuration
export const getImageUrl = (imagePath: string | null): string => {
  if (!imagePath) return '/placeholder.jpg';
  
  // If the image path is already a full URL, return it as is
  if (imagePath.startsWith('http')) return imagePath;
  
  // If it's a relative path starting with '/uploads', construct the full URL
  if (imagePath.startsWith('/uploads')) {
    return `${API_BASE_URL}${imagePath}`;
  }

  // If it's an uploaded image path without '/uploads' prefix, add it
  if (imagePath.match(/^[\w-]+\.(jpg|jpeg|png|gif|webp|avif)$/i)) {
    return `${API_BASE_URL}/uploads/${imagePath}`;
  }
  
  // For other cases, return the path as is (might be a local public asset)
  return imagePath;
};