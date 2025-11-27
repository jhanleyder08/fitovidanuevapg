'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Leaf, Search, ShoppingCart, ShieldCheck, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { toggleCart, getCartCount, setSearchQuery, searchQuery } = useCartStore();
  const cartCount = getCartCount();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="p-2 rounded-xl bg-[var(--primary)] text-white group-hover:scale-105 transition-transform duration-300">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold text-[var(--foreground)]">Fitovida</span>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {['inicio', 'productos', 'categorias', 'sobre-nosotros', 'contacto'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item === 'categorias' ? 'categorias' : item)}
                  className="px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--primary)] rounded-lg hover:bg-[var(--accent-light)]/30 transition-all duration-200"
                >
                  {item === 'sobre-nosotros' ? 'Nosotros' : item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={cn(
                  "p-2.5 rounded-xl transition-all duration-200",
                  isSearchOpen 
                    ? "bg-[var(--primary)] text-white" 
                    : "text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--accent-light)]/30"
                )}
                aria-label="Buscar"
              >
                <Search className="h-[18px] w-[18px]" />
              </button>
              
              <button
                onClick={toggleCart}
                className="relative p-2.5 text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--accent-light)]/30 rounded-xl transition-all duration-200"
                aria-label="Carrito"
              >
                <ShoppingCart className="h-[18px] w-[18px]" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[var(--primary)] text-white text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <Link
                href="/login"
                className="p-2.5 text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--accent-light)]/30 rounded-xl transition-all duration-200"
                aria-label="Admin"
              >
                <ShieldCheck className="h-[18px] w-[18px]" />
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2.5 text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--accent-light)]/30 rounded-xl transition-all duration-200"
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-[var(--border)] transition-all duration-300 overflow-hidden",
          isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}>
          <nav className="flex flex-col p-3 gap-1">
            {['Inicio', 'Productos', 'Categorías', 'Nosotros', 'Contacto'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase() === 'nosotros' ? 'sobre-nosotros' : item.toLowerCase())}
                className="text-left py-3 px-4 text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--accent-light)]/20 rounded-xl transition-all duration-200 font-medium"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Search Bar */}
      <div className={cn(
        "fixed top-16 md:top-18 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-b border-[var(--border)] transition-all duration-300",
        isSearchOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      )}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-11 pr-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all duration-200 text-sm"
            />
          </div>
          <button
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery('');
            }}
            className="p-2.5 text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--background)] rounded-xl transition-all duration-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
