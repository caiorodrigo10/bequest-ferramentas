import { useState, useEffect } from 'react';
import { radarProducts } from '../data/radar';

function getTimeUntilMidnightUTC(): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const midnight = new Date();
  midnight.setUTCHours(24, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function RadarProdutos() {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnightUTC());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnightUTC());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-12">
      <div className="bg-[#141414] border border-[#252525] rounded-[20px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#252525]">
          <div className="flex items-center gap-3">
            <span className="text-xl">📡</span>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">Radar de Produtos</h2>
              <p className="text-gray-500 text-xs">Top 10 produtos mais quentes desta semana</p>
            </div>
          </div>
          {/* Countdown */}
          <div className="flex items-center gap-1.5 bg-[#0c0c0c] border border-[#333] rounded-xl px-4 py-2">
            <span className="text-gray-500 text-xs mr-1">Renova em</span>
            <span className="text-[#3F1DFF] font-mono font-bold text-sm tabular-nums">
              {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
            </span>
          </div>
        </div>

        {/* Product list */}
        <div className="divide-y divide-[#1e1e1e]">
          {radarProducts.map((product) => (
            <div key={product.rank} className="flex items-center gap-4 px-6 py-3 hover:bg-[#1a1a1a] transition-colors">
              {/* Rank */}
              <span
                className={`text-sm font-bold w-6 text-center flex-shrink-0 ${
                  product.rank <= 3 ? 'text-[#3F1DFF]' : 'text-gray-600'
                }`}
              >
                {product.rank}
              </span>
              {/* Image */}
              <img
                src={product.imagePath}
                alt={product.name}
                className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
              />
              {/* Name + Shop */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{product.name}</p>
                <p className="text-gray-500 text-xs truncate">{product.shop}</p>
              </div>
              {/* Price */}
              <span className="text-[#3F1DFF] font-bold text-sm flex-shrink-0">{product.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
