'use client';

import { useState, useRef } from 'react';
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
  const cardRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        ref={cardRef}
        className="group bg-white rounded-2xl border border-[var(--border)] hover:border-[var(--primary)]/30 hover:shadow-lg hover:shadow-[var(--primary)]/5 transition-all duration-300 overflow-hidden"
      >
        {/* Image */}
        <div 
          className="relative aspect-[4/3] overflow-hidden cursor-pointer bg-[var(--background)]"
          onClick={handleOpenModal}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
            <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-[var(--foreground)] flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Ver detalles
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <span className="inline-block px-2.5 py-1 text-xs font-medium text-[var(--primary)] bg-[var(--primary)]/10 rounded-full mb-2">
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
              className="flex items-center gap-1.5 px-3 py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-sm font-medium rounded-full transition-all duration-200"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Agregar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Modal with GSAP animation */}
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        triggerRef={cardRef}
      />
    </>
  );
}
