'use client';

import { Leaf, Facebook, Instagram, MessageCircle, Send, MapPin, Phone, Mail, Clock } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[var(--primary)]">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">Fitovida</span>
            </div>
            <p className="text-white/50 leading-relaxed text-sm">
              Tu tienda naturista de confianza. Productos naturales para tu salud y bienestar.
            </p>
            <div className="flex items-center gap-2">
              <a href="#" className="p-2 bg-white/5 hover:bg-[var(--primary)] rounded-lg transition-colors" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-[var(--primary)] rounded-lg transition-colors" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-[var(--primary)] rounded-lg transition-colors" aria-label="WhatsApp">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Navegación</h4>
            <ul className="space-y-2.5">
              {['Inicio', 'Productos', 'Nosotros'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => scrollToSection(item.toLowerCase() === 'nosotros' ? 'sobre-nosotros' : item.toLowerCase())}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-medium mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/50">
                <MapPin className="h-4 w-4 text-[var(--primary)]" />
                Calle Principal #123
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Phone className="h-4 w-4 text-[var(--primary)]" />
                +1 234 567 8900
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Mail className="h-4 w-4 text-[var(--primary)]" />
                info@fitovida.com
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Clock className="h-4 w-4 text-[var(--primary)]" />
                Lun - Sáb: 9AM - 7PM
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-medium mb-4">Newsletter</h4>
            <p className="text-sm text-white/50 mb-3">
              Recibe ofertas exclusivas
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu email"
                required
                className="flex-1 px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[var(--primary)] text-white placeholder:text-white/30 text-sm transition-all"
              />
              <button
                type="submit"
                className="px-3 py-2.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-lg transition-colors"
                aria-label="Suscribirse"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Fitovida. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
