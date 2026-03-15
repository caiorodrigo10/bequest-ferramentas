import { NavLink } from 'react-router-dom';
import { Home, FolderKanban, TrendingUp, Store, Calculator, Package, Sparkles, ChevronRight, Search } from 'lucide-react';

const navItems = [
  { label: 'Início', icon: Home, to: '/' },
  { label: 'Assistente IA', icon: Sparkles, to: '/chat', badge: 'NOVO', badgeColor: 'bg-[#3F1DFF]' },
  { label: 'Projetos', icon: FolderKanban, to: '/projetos', badge: 'NOVO', badgeColor: 'bg-green-500' },
  { label: 'Anúncios', icon: TrendingUp, to: '/em-alta' },
  { label: 'Lojas', icon: Store, to: '/lojas', badge: 'NOVO', badgeColor: 'bg-green-500' },
  { label: 'Calculadora', icon: Calculator, to: '/calculadora' },
  { label: 'Fornecedores', icon: Package, to: '/fornecedores' },
];

const lockedItems = [
  { label: 'Magic Search', icon: Sparkles },
  { label: 'Buscador', icon: Search },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] bg-[#0d0d0d] border-r border-[#1a1a1a] flex flex-col z-50">
      {/* Logo */}
      <div className="p-5 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#3F1DFF] flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="text-white font-bold text-lg">Bequest</span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-wider px-2 mb-2">Ferramentas</p>
        <div className="space-y-0.5">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group ${
                  isActive
                    ? 'bg-[#3F1DFF]/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#3F1DFF]' : ''}`} />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge && (
                    <span className={`${item.badgeColor} text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Separator */}
        <div className="h-px bg-[#1a1a1a] my-3" />

        <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-wider px-2 mb-2">Em Breve</p>
        <div className="space-y-0.5 opacity-40">
          {lockedItems.map(item => (
            <div key={item.label} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 cursor-not-allowed">
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              <span className="text-[10px]">🔒</span>
            </div>
          ))}
        </div>
      </nav>

      {/* User footer */}
      <div className="p-3 border-t border-[#1a1a1a]">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#1a1a1a] cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-[#3F1DFF]/20 flex items-center justify-center text-[#3F1DFF] font-bold text-sm flex-shrink-0">J</div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">João Dropshipper</p>
            <p className="text-gray-500 text-[10px] truncate">Plano Pro</p>
          </div>
          <ChevronRight className="w-3 h-3 text-gray-600" />
        </div>
      </div>
    </aside>
  );
}
