import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "@/hooks/use-toast";
import { API_BASE_URL } from '@/app/utils/constants';

interface ProductFormData {
  name: string;
  category: string;
  price: string;
  quantity: string;
  status: string;
  description: string;
}

interface UseProductFormReturn {
  formData: ProductFormData;
  loading: boolean;
  error: string;
  selectedImage: File | null;
  imagePreview: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
}

export function useProductForm(): UseProductFormReturn {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: '',
    price: '',
    quantity: '',
    status: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setError('Image size must be less than 4MB');
        return;
      }
      if (!['image/svg+xml', 'image/png', 'image/jpeg'].includes(file.type)) {
        setError('Only SVG, PNG, or JPG files are allowed');
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate required fields
    if (!formData.name || !formData.category || !formData.price || !formData.quantity || !formData.status || !formData.description) {
      setError('Please fill in all required fields');
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    // Validate price and quantity are positive numbers
    if (parseFloat(formData.price) <= 0 || parseInt(formData.quantity) <= 0) {
      setError('Price and quantity must be positive numbers');
      toast({
        title: "Error",
        description: "Price and quantity must be positive numbers",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('quantity', formData.quantity);
    formDataToSend.append('status', formData.status);
    formDataToSend.append('description', formData.description);
    if (selectedImage) {
      formDataToSend.append('image', selectedImage, selectedImage.name);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to create product');
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format from server');
      }

      const data = await response.json();
      
      // Update image preview with the full URL if image was uploaded
      if (data.image) {
        setImagePreview(data.image.startsWith('http') ? data.image : `${API_BASE_URL}${data.image}`);
      }

      toast({
        title: "Success",
        description: "Product created successfully",
      });
      
      router.push('/dashboard/products');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    loading,
    error,
    selectedImage,
    imagePreview,
    handleChange,
    handleImageChange,
    handleSubmit,
    setFormData
  };
}