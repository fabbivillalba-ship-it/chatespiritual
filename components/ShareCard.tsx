'use client';

import React from 'react';

interface ShareCardProps {
  pregunta: string;
  respuestaCorta: string;
}

export default function ShareCard({ pregunta, respuestaCorta }: ShareCardProps) {
  const compartirEnRedes = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Guía Espiritual',
          text: `"${respuestaCorta}"`,
          url: window.location.href,
        });
      } catch (err) {
        // Ignorar si el usuario cancela la acción
      }
    } else {
      await navigator.clipboard.writeText(`"${respuestaCorta}" - Guía Espiritual`);
      alert('¡Mensaje copiado al portapapeles!');
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 p-6 rounded-2xl text-center space-y-4 shadow-sm relative overflow-hidden">
      <div className="space-y-2">
        <span className="text-amber-600 text-xs tracking-widest uppercase font-semibold">
          ✨ Revelación del Día
        </span>
        <p className="text-xs text-slate-500 italic">&quot;{pregunta}&quot;</p>
        <p className="text-base font-serif italic text-slate-800 px-2 leading-relaxed">
          &quot;{respuestaCorta}&quot;
        </p>
      </div>

      <button
        onClick={compartirEnRedes}
        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium py-2.5 px-5 rounded-full transition-all shadow-sm"
      >
        <span>✦</span> Compartir Revelación
      </button>
    </div>
  );
}