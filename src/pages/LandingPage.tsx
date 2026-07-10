import React from 'react';

interface LandingPageProps {
  onStartApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartApp }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#030014] text-white overflow-hidden font-sans select-none">
      {/* 1. Page Background Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* 2. Page Background Glow Lights (Purple & Orange theme highlights) */}
      <div 
        className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none opacity-40 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(125, 60, 112, 0.6) 0%, rgba(125, 60, 112, 0) 70%)',
        }}
      />
      <div 
        className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-30 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 132, 53, 0.4) 0%, rgba(255, 132, 53, 0) 70%)',
        }}
      />
      <div 
        className="absolute top-[40%] right-[15%] w-[450px] h-[450px] rounded-full blur-[150px] pointer-events-none opacity-25 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(50, 77, 123, 0.5) 0%, rgba(50, 77, 123, 0) 70%)',
        }}
      />

      {/* Temporary interactive handle to launch generator during page construction */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
          <div className="w-12 h-12 bg-[#7D3C70] rounded-xl flex items-center justify-center mx-auto mb-4 border border-[#FF8435]/30">
            <span className="text-xl font-bold text-white">A</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight mb-2">Aesthetic Arc Landing Page</h2>
          <p className="text-xs text-gray-400 mb-6">Section 1: Page background successfully created. Click below to launch the Presentation Generator App.</p>
          <button 
            onClick={onStartApp}
            className="w-full px-5 py-3 bg-[#7D3C70] hover:bg-[#652D5A] active:bg-[#5E2251] text-white text-xs font-bold rounded-xl border border-[#FF8435]/40 transition-all duration-200"
          >
            Open Presentation Builder
          </button>
        </div>
      </div>
    </div>
  );
};
