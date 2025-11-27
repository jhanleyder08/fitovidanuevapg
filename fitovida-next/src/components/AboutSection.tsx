'use client';

import { Leaf, ShieldCheck, Truck, HeartHandshake } from 'lucide-react';

const benefits = [
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'Productos orgánicos certificados'
  },
  {
    icon: ShieldCheck,
    title: 'Calidad Garantizada',
    description: 'Proveedores certificados'
  },
  {
    icon: Truck,
    title: 'Envío Rápido',
    description: 'Entrega en 24-48 horas'
  },
  {
    icon: HeartHandshake,
    title: 'Asesoría Experta',
    description: 'Te ayudamos a elegir'
  },
];

export default function AboutSection() {
  return (
    <section id="sobre-nosotros" className="py-16 md:py-20 bg-white border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Benefits Grid - Compact */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--accent-light)]/40 rounded-xl mb-4">
                  <Icon className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <h3 className="font-semibold text-[var(--foreground)] mb-1">{benefit.title}</h3>
                <p className="text-sm text-[var(--muted)]">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Simple About Text */}
        <div className="mt-16 pt-12 border-t border-[var(--border)] text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-4">
            Tu Tienda Naturista de Confianza
          </h2>
          <p className="text-[var(--muted)] leading-relaxed">
            En Fitovida seleccionamos cuidadosamente cada producto para ofrecerte lo mejor de la naturaleza. 
            Más de 5 años ayudando a miles de clientes a mejorar su bienestar de forma natural.
          </p>
        </div>
      </div>
    </section>
  );
}
