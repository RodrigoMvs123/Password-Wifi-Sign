import React from 'react';

interface ProductPreviewProps {
  password?: string;
  loading?: boolean;
}

const ProductPreview: React.FC<ProductPreviewProps> = ({ password, loading }) => {
  const displayPassword = password || 'YourPassword';

  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] bg-slate-100 rounded-3xl flex items-center justify-center overflow-hidden border border-slate-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30" style={{ 
        backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', 
        backgroundSize: '20px 20px' 
      }}></div>

      {/* Cloud Plate */}
      <div className={`relative transition-all duration-500 transform ${loading ? 'scale-95 opacity-80 blur-sm' : 'scale-100 opacity-100'}`}>
        {/* Shadow */}
        <div className="absolute top-4 left-4 w-64 h-40 bg-black/10 rounded-full blur-xl"></div>
        
        {/* Cloud Shape SVG */}
        <div className="relative drop-shadow-2xl">
          <svg width="320" height="220" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M259.2 76.8C256.6 42.4 228.2 16 192 16C169.4 16 150.2 26.6 138.2 42.8C132.2 38.8 125.4 36.8 118.2 36.8C94.4 36.8 74.6 53.8 69.8 76.4C30.4 81 0 114.4 0 154.4C0 196.8 34.4 231.2 76.8 231.2H252.8C289.8 231.2 320 201 320 164C320 128.4 292.8 99.4 259.2 76.8Z" 
             fill="white" 
             className="drop-shadow-lg"
             />
             <path d="M259.2 76.8C256.6 42.4 228.2 16 192 16C169.4 16 150.2 26.6 138.2 42.8C132.2 38.8 125.4 36.8 118.2 36.8C94.4 36.8 74.6 53.8 69.8 76.4C30.4 81 0 114.4 0 154.4C0 196.8 34.4 231.2 76.8 231.2H252.8C289.8 231.2 320 201 320 164C320 128.4 292.8 99.4 259.2 76.8Z" 
             stroke="#E2E8F0" strokeWidth="2"
             />
          </svg>

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
            <div className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-1">WiFi Password</div>
            <div className="font-sans font-bold text-slate-800 text-3xl tracking-wide px-8 text-center break-all max-w-[280px]">
              {displayPassword}
            </div>
          </div>
        </div>
      </div>
      
      {/* Reflection hint */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/20 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default ProductPreview;