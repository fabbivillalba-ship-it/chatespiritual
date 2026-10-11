'use client';

import React, { useState } from 'react';
import ShareCard from '@/components/ShareCard';
import { PricingModal } from '@/components/PricingModal';

export default function Home() {
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [resumen, setResumen] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPaywall, setShowPaywall] = useState(false);

  const alHacerClicConsultar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pregunta.trim()) return;

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const esAdmin = urlParams.get('admin') === 'true';

      if (esAdmin) {
        ejecutarConsulta();
        return;
      }
    }

    setShowPaywall(true);
  };

  const ejecutarConsulta = async () => {
    setShowPaywall(false);
    setLoading(true);
    setError('');
    setRespuesta('');
    setResumen('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: pregunta }],
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.detail || data?.error || `Error del servidor (${res.status})`);
      }

      const textoCompleto = data?.content || '';

      if (textoCompleto.includes('SUMM:')) {
        const [partRespuesta, partResumen] = textoCompleto.split('SUMM:');
        setRespuesta(partRespuesta.trim());
        setResumen(partResumen.replace(/["']/g, '').trim());
      } else {
        setRespuesta(textoCompleto);
        setResumen(textoCompleto.slice(0, 80) + '...');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('No se pudo conectar.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between items-center p-6 md:p-12 font-sans relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-100/60 rounded-full blur-3xl pointer-events-none" />

      <header className="z-10 w-full max-w-xl flex justify-between items-center py-4 border-b border-amber-200/50">
        <div className="flex items-center gap-2">
          <span className="text-amber-600 text-lg">✨</span>
          <span className="font-serif tracking-widest text-xs uppercase text-slate-500 font-semibold">
            Guía Espiritual
          </span>
        </div>
      </header>

      <div className="z-10 w-full max-w-lg my-auto py-10">
        {!respuesta ? (
          <div className="space-y-8 text-center">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-5xl font-serif italic text-slate-900 tracking-tight">
                ¿Buscas revelación?
              </h1>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Escribe tu inquietud o pregunta para recibir un consejo guiado sobre tu camino.
              </p>
            </div>

            <form onSubmit={alHacerClicConsultar} className="space-y-5 text-left">
              <div className="relative">
                <textarea
                  value={pregunta}
                  onChange={(e) => setPregunta(e.target.value)}
                  placeholder="¿Qué necesitas saber hoy?..."
                  rows={4}
                  className="w-full bg-white/80 border border-slate-200 rounded-2xl p-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 transition-all resize-none text-sm shadow-sm"
                />
              </div>

              {error && <p className="text-rose-500 text-xs text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading || !pregunta.trim()}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-sm tracking-wide"
              >
                {loading ? (
                  <>
                    <span className="animate-spin text-amber-300">✦</span> Buscando luz...
                  </>
                ) : (
                  <>Consultar</>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <div className="bg-white/90 border border-slate-200 p-6 md:p-8 rounded-2xl space-y-4 text-left shadow-lg">
              <div className="text-xs uppercase tracking-widest text-amber-700 border-b border-slate-100 pb-3 font-semibold">
                Tu Inquietud
              </div>
              <p className="text-xs text-slate-500 italic">&quot;{pregunta}&quot;</p>
              <div className="pt-2 text-sm md:text-base font-serif italic leading-relaxed text-slate-800 whitespace-pre-line">
                {respuesta}
              </div>
            </div>

            <ShareCard pregunta={pregunta} respuestaCorta={resumen} />

            <button
              onClick={() => {
                setRespuesta('');
                setPregunta('');
                setResumen('');
              }}
              className="text-xs text-slate-500 hover:text-slate-800 transition-colors pt-4 block mx-auto underline decoration-slate-300 underline-offset-4"
            >
              Hacer otra consulta
            </button>
          </div>
        )}
      </div>

      {showPaywall && (
  <PricingModal
    isOpen={showPaywall}
    onClose={() => setShowPaywall(false)}
    onSuccess={ejecutarConsulta}
  />
)}
  
      <footer className="z-10 text-center text-[11px] text-slate-400 max-w-xs pt-6 border-t border-slate-200/60">
        Espacio de reflexión personal impulsado por IA.
      </footer>
    </main>
  );
}