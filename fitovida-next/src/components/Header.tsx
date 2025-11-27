'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Leaf, Search, ShoppingCart, ShieldCheck, Menu, X, Sprout } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toggleCart, getCartCount, setSearchQuery, searchQuery } = useCartStore();
  const cartCount = getCartCount();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
          isScrolled ? "py-2" : "py-4 md:py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={cn(
              "relative flex items-center justify-between px-4 md:px-6 transition-all duration-500 rounded-2xl",
              isScrolled 
                ? "h-16 bg-white/80 backdrop-blur-md shadow-lg shadow-[var(--primary)]/5" 
                : "h-20 bg-transparent"
            )}
          >
            {/* Decorative Leaves (Visible on scroll or hover) */}
            <div className={cn(
              "absolute -top-2 -left-2 text-[var(--primary)] transition-opacity duration-500 animate-sway",
              isScrolled ? "opacity-100" : "opacity-0"
            )}>
              <Leaf className="h-6 w-6 fill-current opacity-40" />
            </div>
            <div className={cn(
              "absolute -bottom-2 -right-2 text-[var(--celadon)] transition-opacity duration-500 animate-float animation-delay-400",
              isScrolled ? "opacity-100" : "opacity-0"
            )}>
              <Sprout className="h-5 w-5 fill-current opacity-40" />
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group relative z-10">
              <div className={cn(
                "p-2.5 rounded-2xl transition-all duration-300 group-hover:rotate-12",
                isScrolled 
                  ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/30" 
                  : "bg-white/90 backdrop-blur-sm text-[var(--primary)] shadow-sm"
              )}>
                <Leaf className="h-6 w-6" />
              </div>
              <span className={cn(
                "text-xl font-bold tracking-tight transition-colors duration-300",
                isScrolled ? "text-[var(--foreground)]" : "text-[var(--foreground)] md:text-[var(--foreground)]"
              )}>
                Fitovida
              </span>
            </Link>

            {/* Navigation Desktop */}
            <nav className={cn(
              "hidden md:flex items-center gap-1 p-1.5 rounded-2xl transition-all duration-500",
              !isScrolled && "bg-white/50 backdrop-blur-sm"
            )}>
              {['inicio', 'productos', 'categorias', 'sobre-nosotros', 'contacto'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item === 'categorias' ? 'categorias' : item)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 relative overflow-hidden group",
                    "text-[var(--muted)] hover:text-[var(--primary)]"
                  )}
                >
                  <span className="relative z-10">
                    {item === 'sobre-nosotros' ? 'Nosotros' : item.charAt(0).toUpperCase() + item.slice(1)}
                  </span>
                  <span className="absolute inset-0 bg-[var(--accent-light)]/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl" />
                </button>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-2 relative z-10">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={cn(
                  "p-2.5 rounded-xl transition-all duration-200 group hover:bg-[var(--accent-light)]/30",
                  isSearchOpen ? "bg-[var(--primary)] text-white" : "text-[var(--muted)] hover:text-[var(--primary)]"
                )}
                aria-label="Buscar"
              >
                <Search className="h-5 w-5 transition-transform group-hover:scale-110" />
              </button>
              
              <button
                onClick={toggleCart}
                className="relative p-2.5 text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--accent-light)]/30 rounded-xl transition-all duration-200 group"
                aria-label="Carrito"
              >
                <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--primary)] text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm border-2 border-white animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </button>

              <Link
                href="/login"
                className="p-2.5 text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--accent-light)]/30 rounded-xl transition-all duration-200 group"
                aria-label="Admin"
              >
                <ShieldCheck className="h-5 w-5 transition-transform group-hover:scale-110" />
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2.5 text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--accent-light)]/30 rounded-xl transition-all duration-200"
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl border border-[var(--border)] rounded-2xl shadow-xl transition-all duration-300 overflow-hidden origin-top",
          isMenuOpen ? "max-h-96 opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-95"
        )}>
          <nav className="flex flex-col p-2 gap-1">
            {['Inicio', 'Productos', 'Categorías', 'Nosotros', 'Contacto'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase() === 'nosotros' ? 'sobre-nosotros' : item.toLowerCase())}
                className="text-left py-3 px-4 text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--accent-light)]/30 rounded-xl transition-all duration-200 font-medium flex items-center gap-3"
              >
                <Sprout className="h-4 w-4 opacity-50" />
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Search Bar Overlay */}
      <div className={cn(
        "fixed top-0 left-0 right-0 h-32 z-40 bg-white/90 backdrop-blur-xl transition-all duration-500 ease-in-out",
        isSearchOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      )}>
        <div className="max-w-3xl mx-auto px-4 h-full flex items-end pb-6 justify-center">
          <div className="w-full relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--muted)] group-focus-within:text-[var(--primary)] transition-colors" />
            <input
              type="text"
              placeholder="¿Qué producto natural buscas hoy?"
              value={searchQuery}
              onChange={handleSearch}
              autoFocus={isSearchOpen}
              className="w-full pl-14 pr-12 py-4 bg-[var(--background)] border-2 border-transparent focus:border-[var(--primary)]/30 rounded-2xl focus:outline-none shadow-inner text-lg transition-all placeholder:text-gray-400"
            />
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery('');
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[var(--muted)] hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
