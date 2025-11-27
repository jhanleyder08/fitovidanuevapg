'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/lib/store';
import { formatPrice, truncateText, getCategoryName } from '@/lib/utils';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <>
      <div className="group bg-white rounded-2xl border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-300 overflow-hidden card-hover">
        {/* Image */}
        <div 
          className="relative aspect-[4/3] overflow-hidden cursor-pointer bg-[var(--background)]"
          onClick={() => setIsModalOpen(true)}
        >
          {imageError ? (
            <div className="w-full h-full bg-[var(--accent-light)]/30 flex items-center justify-center">
              <span className="text-[var(--primary)] text-center px-4 font-medium text-sm">
                {product.name}
              </span>
            </div>
          ) : (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-[var(--primary)]/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <button 
              className="p-3 bg-white rounded-xl text-[var(--primary)] hover:bg-[var(--accent-light)] transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              <Eye className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <span className="inline-block px-2.5 py-1 text-xs font-medium text-[var(--steel-blue)] bg-[var(--accent-light)]/40 rounded-lg mb-2">
            {getCategoryName(product.category)}
          </span>
          
          <h3 className="font-semibold text-[var(--foreground)] mb-1.5 line-clamp-1">
            {product.name}
          </h3>
          
          <p className="text-[var(--muted)] text-sm mb-4 line-clamp-2 leading-relaxed">
            {truncateText(product.description, 70)}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
            <span className="text-lg font-bold text-[var(--primary)]">
              {formatPrice(product.price)}
            </span>
            
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 px-3 py-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white text-sm font-medium rounded-lg transition-all duration-200"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Agregar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
