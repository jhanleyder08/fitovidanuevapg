'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, User, CreditCard, ShoppingBag, Lock, Check } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice, cn } from '@/lib/utils';
import { CustomerInfo, PaymentMethod } from '@/types';

export default function CheckoutModal() {
  const {
    cart,
    isCheckoutOpen,
    closeCheckout,
    shippingCost,
    discountCode,
    discountAmount,
    getSubtotal,
    getFinalTotal,
    applyPromoCode,
    resetDiscount,
    createOrder
  } = useCartStore();

  const [formData, setFormData] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [notes, setNotes] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCheckoutOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      const success = applyPromoCode(promoInput);
      if (!success) {
        alert('Código de descuento inválido');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const order = createOrder(formData, paymentMethod, notes);
    setOrderNumber(order.orderNumber);
    setShowSuccess(true);
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', address: '', city: '', zip: '' });
    setNotes('');
    setPromoInput('');
    resetDiscount();
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    closeCheckout();
  };

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const subtotal = getSubtotal();
  const discount = discountAmount > 100 ? discountAmount : (subtotal * discountAmount) / 100;
  const total = getFinalTotal();

  if (!isCheckoutOpen) return null;

  // Success Modal
  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[var(--foreground)]/40 backdrop-blur-sm" />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in-95 duration-300 border border-[var(--border)]">
          <div className="w-16 h-16 bg-[var(--accent-light)]/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-[var(--primary)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            ¡Pedido Realizado con Éxito!
          </h2>
          <p className="text-[var(--muted)] mb-4">
            Gracias por tu compra. Hemos recibido tu pedido y te enviaremos un email de confirmación.
          </p>
          <div className="bg-[var(--background)] rounded-xl p-4 mb-6">
            <p className="text-sm text-[var(--muted)]">Número de Pedido:</p>
            <p className="text-xl font-bold text-[var(--primary)]">{orderNumber}</p>
          </div>
          <button
            onClick={handleCloseSuccess}
            className="w-full py-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-semibold rounded-xl transition-colors"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[var(--foreground)]/40 backdrop-blur-sm" onClick={closeCheckout} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)]">Finalizar Compra</h2>
          <button
            onClick={closeCheckout}
            className="p-2 hover:bg-[var(--background)] rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-[var(--muted)]" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid md:grid-cols-2 gap-6 p-4 md:p-6">
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-[var(--foreground)] mb-4">
                  <User className="h-5 w-5 text-[var(--primary)]" />
                  Información Personal
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      Código Postal *
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-[var(--foreground)] mb-4">
                  <CreditCard className="h-5 w-5 text-[var(--primary)]" />
                  Método de Pago
                </h3>
                <div className="space-y-2">
                  {[
                    { id: 'card', label: 'Tarjeta de Crédito/Débito', icon: '💳' },
                    { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                    { id: 'transfer', label: 'Transferencia Bancaria', icon: '🏦' }
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={cn(
                        "flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors",
                        paymentMethod === method.id
                          ? "border-[var(--primary)] bg-[var(--accent-light)]/30"
                          : "border-[var(--border)] hover:bg-[var(--background)]"
                      )}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                        className="text-[var(--primary)] focus:ring-[var(--primary)]/20"
                      />
                      <span className="text-xl">{method.icon}</span>
                      <span className="font-medium">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Notas del Pedido (Opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Instrucciones especiales, horario de entrega, etc."
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 resize-none"
                />
              </div>
            </form>

            {/* Summary Section */}
            <div className="bg-[var(--background)] rounded-xl p-4 md:p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-[var(--foreground)] mb-4">
                <ShoppingBag className="h-5 w-5 text-[var(--primary)]" />
                Resumen del Pedido
              </h3>

              {/* Items */}
              <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      {imageErrors[item.id] ? (
                        <div className="w-full h-full bg-[var(--accent-light)]/50" />
                      ) : (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          onError={() => handleImageError(item.id)}
                          sizes="48px"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[var(--foreground)] truncate text-sm">{item.name}</p>
                      <p className="text-[var(--muted)] text-sm">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-[var(--foreground)]">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-[var(--muted)]">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[var(--muted)]">
                  <span>Envío:</span>
                  <span>{formatPrice(shippingCost)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[var(--primary)]">
                    <span>Descuento:</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-[var(--foreground)] pt-2 border-t">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Código de descuento"
                  className="flex-1 px-3 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 text-sm"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-[var(--border)] hover:bg-[var(--accent-light)]/50 text-[var(--foreground)] font-medium rounded-lg transition-colors text-sm"
                >
                  Aplicar
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full mt-6 py-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Check className="h-5 w-5" />
                Confirmar Pedido
              </button>

              {/* Secure Badge */}
              <div className="flex items-center justify-center gap-2 mt-4 text-[var(--muted)] text-sm">
                <Lock className="h-4 w-4" />
                <span>Compra 100% Segura</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
