'use client';

import { Leaf, Facebook, Instagram, Twitter, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Gracias por suscribirte!');
    setEmail('');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[var(--foreground)] text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[var(--primary)]">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">Fitovida</span>
            </div>
            <p className="text-white/50 leading-relaxed text-sm">
              Tu tienda naturista de confianza desde 2020. Productos naturales para tu salud y bienestar.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a 
                href="#" 
                className="p-2.5 bg-white/5 hover:bg-[var(--primary)] rounded-xl transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="p-2.5 bg-white/5 hover:bg-[var(--primary)] rounded-xl transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="p-2.5 bg-white/5 hover:bg-[var(--primary)] rounded-xl transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="p-2.5 bg-white/5 hover:bg-[var(--primary)] rounded-xl transition-all duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-5">Enlaces</h4>
            <ul className="space-y-3">
              {['Inicio', 'Productos', 'Categorías', 'Nosotros'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => scrollToSection(item.toLowerCase() === 'nosotros' ? 'sobre-nosotros' : item.toLowerCase())}
                    className="text-sm text-white/50 hover:text-[var(--accent)] transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-white font-medium mb-5">Información</h4>
            <ul className="space-y-3">
              {['Envíos', 'Devoluciones', 'Términos', 'Privacidad'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/50 hover:text-[var(--accent)] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-medium mb-5">Newsletter</h4>
            <p className="text-sm text-white/50 mb-4">
              Suscríbete para ofertas especiales
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu email"
                required
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] text-white placeholder:text-white/30 text-sm transition-all"
              />
              <button
                type="submit"
                className="p-2.5 bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white rounded-xl transition-all duration-200"
                aria-label="Suscribirse"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-14 pt-8 text-center">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Fitovida. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
