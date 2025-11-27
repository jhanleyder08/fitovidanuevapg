'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/lib/store';
import { formatPrice, getCategoryName, cn } from '@/lib/utils';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[var(--foreground)]/40 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className={cn(
          "relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-[var(--border)]",
          "animate-in fade-in zoom-in-95 duration-300"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white hover:bg-[var(--background)] rounded-xl border border-[var(--border)] transition-colors"
        >
          <X className="h-4 w-4 text-[var(--muted)]" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative w-full md:w-1/2 aspect-square bg-[var(--background)]">
            {imageError ? (
              <div className="w-full h-full bg-[var(--accent-light)]/30 flex items-center justify-center">
                <span className="text-[var(--primary)] text-center px-4 font-medium text-lg">
                  {product.name}
                </span>
              </div>
            ) : (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
            <span className="inline-block px-3 py-1.5 text-xs font-medium text-[var(--steel-blue)] bg-[var(--accent-light)]/40 rounded-lg mb-4 w-fit">
              {getCategoryName(product.category)}
            </span>
            
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-3">
              {product.name}
            </h2>
            
            <p className="text-2xl font-bold text-[var(--primary)] mb-6">
              {formatPrice(product.price)}
            </p>
            
            <p className="text-[var(--muted)] leading-relaxed flex-1 mb-8">
              {product.description}
            </p>

            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 w-full py-4 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-medium rounded-xl transition-all duration-200"
            >
              <ShoppingCart className="h-5 w-5" />
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
