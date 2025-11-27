'use client';

import { useMemo } from 'react';
import { LayoutGrid, Pill, Leaf, Droplet, Dumbbell, Sparkles } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { products, searchProducts, getProductsByCategory } from '@/lib/products';
import ProductCard from './ProductCard';
import { Product, Category } from '@/types';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'todos' as Category, name: 'Todos', icon: LayoutGrid },
  { id: 'vitaminas' as Category, name: 'Vitaminas', icon: Pill },
  { id: 'suplementos' as Category, name: 'Suplementos', icon: Sparkles },
  { id: 'hierbas' as Category, name: 'Hierbas', icon: Leaf },
  { id: 'aceites' as Category, name: 'Aceites', icon: Droplet },
  { id: 'proteinas' as Category, name: 'Proteínas', icon: Dumbbell },
];

export default function ProductsGrid() {
  const { currentCategory, setCategory, searchQuery, sortBy, setSortBy } = useCartStore();

  const filteredProducts = useMemo(() => {
    let result: Product[] = [];

    if (searchQuery) {
      result = searchProducts(searchQuery);
    } else {
      result = getProductsByCategory(currentCategory);
    }

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
        break;
    }

    return result;
  }, [currentCategory, searchQuery, sortBy]);

  return (
    <section id="productos" className="py-16 md:py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            Nuestros Productos
          </h2>
          <p className="text-[var(--muted)] mt-3 max-w-lg mx-auto">
            Explora nuestra selección de productos naturales de alta calidad
          </p>
        </div>

        {/* Categories Filter - Integrated */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = currentCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setCategory(category.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20" 
                    : "bg-white text-[var(--muted)] border border-[var(--border)] hover:border-[var(--primary)]/50 hover:text-[var(--primary)]"
                )}
              >
                <Icon className="h-4 w-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-[var(--border)]">
          <p className="text-sm text-[var(--muted)]">
            <span className="font-semibold text-[var(--foreground)]">{filteredProducts.length}</span> productos encontrados
          </p>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-2.5 border border-[var(--border)] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] text-sm text-[var(--foreground)] cursor-pointer transition-all"
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
