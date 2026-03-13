import { Outlet } from 'react-router';
import { mockUser } from '../data/mockData';
import { LogOut } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen">
      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-[rgba(26,26,46,0.1)] shadow-[0_2px_12px_rgba(10,10,46,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FF6B00] rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-xl" style={{ fontFamily: 'Nunito, sans-serif' }}>E</span>
            </div>
            <span className="text-xl font-black text-[#1A1A2E]" style={{ fontFamily: 'Nunito, sans-serif' }}>
              EIC <span className="text-[#FF6B00]">Atenção</span>
            </span>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-semibold text-[#1A1A2E]">{mockUser.name}</div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FF6B00]/10 rounded-full">
                  <div className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full"></div>
                  <span className="text-xs font-medium text-[#FF6B00]">{mockUser.role}</span>
                </div>
              </div>
              <img 
                src={mockUser.avatar} 
                alt={mockUser.name}
                className="w-10 h-10 rounded-full border-2 border-[#FF6B00]/20"
              />
            </div>
            <button 
              className="p-2 hover:bg-[#F4F4F8] rounded-lg transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5 text-[#5A5A7A]" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
