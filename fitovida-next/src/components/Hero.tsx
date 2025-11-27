'use client';

import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToProducts = () => {
    const element = document.getElementById('productos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--background)]">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--tea-green)] rounded-full blur-[120px] opacity-40 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--celadon)] rounded-full blur-[100px] opacity-30 translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[var(--steel-blue)] rounded-full blur-[80px] opacity-20 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[var(--border)] mb-8 animate-fade-in-up">
          <span className="w-2 h-2 bg-[var(--celadon)] rounded-full animate-pulse" />
          <span className="text-sm font-medium text-[var(--muted)]">Tienda Naturista</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--foreground)] mb-6 animate-fade-in-up leading-tight">
          Bienestar{' '}
          <span className="gradient-text">Natural</span>
          <br />
          para tu Vida
        </h1>
        
        <p className="text-lg md:text-xl text-[var(--muted)] mb-10 max-w-xl mx-auto animate-fade-in-up animation-delay-200 leading-relaxed">
          Descubre nuestra selección de productos naturales de alta calidad para cuidar tu salud y bienestar.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-400">
          <button
            onClick={scrollToProducts}
            className="inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20 hover:-translate-y-0.5"
          >
            Explorar Productos
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => document.getElementById('sobre-nosotros')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-white hover:bg-[var(--accent-light)]/30 text-[var(--foreground)] font-medium px-8 py-4 rounded-xl border border-[var(--border)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Conocer más
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-[var(--border)] animate-fade-in-up animation-delay-600">
          {[
            { value: '48+', label: 'Productos' },
            { value: '100%', label: 'Natural' },
            { value: '5★', label: 'Calidad' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[var(--primary)]">{stat.value}</div>
              <div className="text-sm text-[var(--muted)] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[var(--border)] rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-[var(--steel-blue)] rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  );
}
