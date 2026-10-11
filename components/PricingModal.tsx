'use client';

import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    Paddle?: any;
  }
}

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Cargar el script oficial de Paddle v2 si no está presente en el DOM
      if (!document.getElementById('paddle-script')) {
        const script = document.createElement('script');
        script.id = 'paddle-script';
        script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
        script.async = true;
        script.onload = () => {
          if (window.Paddle) {
            window.Paddle.Environment.set('sandbox');
            window.Paddle.Initialize({
              token: 'test_0c8748280f36f39f4e1822e8e8f',
            });
          }
        };
        document.body.appendChild(script);
      } else if (window.Paddle) {
        window.Paddle.Environment.set('sandbox');
        window.Paddle.Initialize({
          token: 'test_0c8748280f36f39f4e1822e8e8f',
        });
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const PRICE_ID = "pri_01m4nqp5q7aa57zj7xpys4wxe8";

  const handleOpenCheckout = () => {
    if (window.Paddle && window.Paddle.Checkout) {
      window.Paddle.Checkout.open({
        items: [{ priceId: PRICE_ID, quantity: 1 }],
        settings: {
          displayMode: "overlay",
          theme: "dark",
          locale: "es",
        },
      });
    } else {
      setIsLoading(true);
      // Reintentar en un segundo si el SDK aún se está cargando
      setTimeout(() => {
        setIsLoading(false);
        if (window.Paddle && window.Paddle.Checkout) {
          window.Paddle.Checkout.open({
            items: [{ priceId: PRICE_ID, quantity: 1 }],
            settings: {
              displayMode: "overlay",
              theme: "dark",
              locale: "es",
            },
          });
        } else {
          alert("El entorno de pago se está inicializando. Por favor, volvé a hacer clic en el botón.");
        }
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 max-w-md w-full text-center shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <h3 className="text-2xl font-serif font-bold text-amber-200 mb-2">
          Desbloqueá la Revelación Completa
        </h3>
        <p className="text-slate-300 text-sm mb-6">
          Acceso instantáneo a la consulta guiada por la IA celestial.
        </p>

        <div className="bg-slate-800/80 rounded-xl p-4 mb-6 border border-slate-700">
          <span className="text-4xl font-extrabold text-white">
            $2.00 <span className="text-sm font-normal text-slate-400">USD</span>
          </span>
          <p className="text-xs text-amber-400/90 mt-2">
            ✓ Tarjeta de Pruebas (Sandbox Mode)
          </p>
        </div>

        <button
          onClick={handleOpenCheckout}
          disabled={isLoading}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? "Cargando..." : "Pagar $2 USD (Checkout Sandbox)"}
        </button>

        <button
          onClick={onClose}
          className="mt-4 text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer block mx-auto"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default PricingModal;