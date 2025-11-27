'use client';

import { CheckCircle, Leaf } from 'lucide-react';

const features = [
  'Productos 100% Naturales',
  'Envío Rápido y Seguro',
  'Asesoría Personalizada',
  'Calidad Garantizada',
];

export default function AboutSection() {
  return (
    <section id="sobre-nosotros" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-[var(--steel-blue)] uppercase tracking-wider">Conócenos</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mt-2">
            Sobre Nosotros
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
              Tu Salud es Nuestra Prioridad
            </h3>
            
            <p className="text-[var(--muted)] leading-relaxed">
              En Fitovida, nos dedicamos a proporcionar productos naturales de la más alta 
              calidad para mejorar tu salud y bienestar. Contamos con una amplia selección 
              de vitaminas, suplementos, hierbas medicinales y productos orgánicos.
            </p>
            
            <p className="text-[var(--muted)] leading-relaxed">
              Todos nuestros productos son cuidadosamente seleccionados y provienen de 
              proveedores certificados que comparten nuestra visión de un estilo de vida 
              saludable y natural.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {features.map((feature) => (
                <div 
                  key={feature}
                  className="flex items-center gap-3 p-4 bg-[var(--accent-light)]/30 rounded-xl border border-[var(--accent)]/20"
                >
                  <CheckCircle className="h-5 w-5 text-[var(--primary)] flex-shrink-0" />
                  <span className="text-[var(--foreground)] text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Icon */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--celadon)] rounded-3xl blur-3xl opacity-40" />
              <div className="relative w-64 h-64 md:w-72 md:h-72 bg-gradient-to-br from-[var(--steel-blue)] to-[var(--egyptian-blue)] rounded-3xl flex items-center justify-center shadow-xl">
                <Leaf className="h-24 w-24 md:h-28 md:w-28 text-white/90" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
