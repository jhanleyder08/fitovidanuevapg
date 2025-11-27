'use client';

import { useMemo } from 'react';
import { useCartStore } from '@/lib/store';
import { products, searchProducts, getProductsByCategory } from '@/lib/products';
import ProductCard from './ProductCard';
import { Product } from '@/types';

export default function ProductsGrid() {
  const { currentCategory, searchQuery, sortBy, setSortBy } = useCartStore();

  const filteredProducts = useMemo(() => {
    let result: Product[] = [];

    // Apply search or category filter
    if (searchQuery) {
      result = searchProducts(searchQuery);
    } else {
      result = getProductsByCategory(currentCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order
        break;
    }

    return result;
  }, [currentCategory, searchQuery, sortBy]);

  return (
    <section id="productos" className="py-20 md:py-28 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-[var(--steel-blue)] uppercase tracking-wider">Catálogo</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mt-2">
            Nuestros Productos
          </h2>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-[var(--border)]">
          <p className="text-sm text-[var(--muted)]">
            <span className="font-semibold text-[var(--foreground)]">{filteredProducts.length}</span> productos encontrados
          </p>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-2.5 border border-[var(--border)] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] text-sm text-[var(--foreground)] cursor-pointer transition-all duration-200"
          >
            <option value="default">Ordenar por</option>
            <option value="price-low">Precio: Menor a Mayor</option>
            <option value="price-high">Precio: Mayor a Menor</option>
            <option value="name">Nombre A-Z</option>
          </select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--muted)] text-lg">No se encontraron productos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
