'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Star, ShieldCheck, Leaf, Truck } from 'lucide-react';
import Image from 'next/image';
import { products } from '@/lib/products';

export default function Hero() {
  const [featuredProduct, setFeaturedProduct] = useState(products[0]);

  useEffect(() => {
    // Seleccionar producto aleatorio al montar
    const randomIndex = Math.floor(Math.random() * products.length);
    setFeaturedProduct(products[randomIndex]);
  }, []);

  const scrollToProducts = () => {
    const element = document.getElementById('productos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden pt-32 md:pt-40 pb-16 bg-gradient-to-b from-white via-white to-[var(--background)]">
      {/* Background - Very subtle, unified */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[var(--accent-light)]/20 rounded-full blur-[120px] translate-x-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[var(--border)] shadow-sm">
              <Leaf className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-sm font-medium text-[var(--foreground)]">Productos 100% Naturales</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-[1.15]">
              Tu Bienestar,{' '}
              <span className="text-[var(--primary)]">Nuestra Pasión</span>
            </h1>
            
            <p className="text-lg text-[var(--muted)] max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Suplementos y productos orgánicos de la más alta calidad para cuidar tu salud de forma natural.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={scrollToProducts}
                className="inline-flex items-center gap-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
              >
                Ver Productos
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => document.getElementById('sobre-nosotros')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-[var(--foreground)] font-medium px-6 py-4 rounded-xl hover:bg-white/50 transition-colors"
              >
                Conocer más
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-8 text-sm text-[var(--muted)]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--primary)]" />
                <span>Calidad Certificada</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[var(--primary)]" />
                <span>Envío Rápido</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-medium text-[var(--foreground)]">4.9</span>
                <span>(2k+ reseñas)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Product - Difuminado */}
          <div className="relative hidden lg:flex justify-center items-center">
            <div className="relative w-[400px] h-[480px]">
              {/* Glow background behind product */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-light)]/40 via-[var(--celadon)]/30 to-transparent rounded-[60px] blur-3xl scale-110" />
              
              {/* Product floating container */}
              <div className="relative h-full flex flex-col items-center justify-center group cursor-pointer" onClick={scrollToProducts}>
                {/* Product Image - Main focus */}
                <div className="relative w-[260px] h-[260px] mb-8">
                  <div className="absolute inset-0 bg-white/50 rounded-full blur-2xl scale-125" />
                  <Image
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    width={260}
                    height={260}
                    className="relative object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Product Info - Clear but integrated */}
                <div className="text-center space-y-3 px-6">
                  <span className="inline-block px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full text-xs font-semibold text-[var(--primary)] uppercase tracking-wider border border-white/50">
                    {featuredProduct.category}
                  </span>
                  <h3 className="text-2xl font-bold text-[var(--foreground)] leading-tight">{featuredProduct.name}</h3>
                  <p className="text-sm text-[var(--muted)] max-w-[280px] line-clamp-2">{featuredProduct.description}</p>
                  <p className="text-3xl font-bold text-[var(--primary)]">${featuredProduct.price}</p>
                  
                  <button className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)]/90 hover:bg-[var(--primary)] text-white font-medium rounded-full backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/25">
                    Ver Producto
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Ambient glow effects */}
              <div className="absolute top-1/4 -right-10 w-40 h-40 bg-[var(--primary)]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 -left-10 w-32 h-32 bg-[var(--celadon)]/30 rounded-full blur-3xl" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
