import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Início' },
  { to: '/buscador', label: 'Buscador' },
  { to: '/em-alta', label: 'Em Alta' },
  { to: '/fornecedores', label: 'Fornecedores' },
  { to: '/calculadora', label: 'Calculadora' },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 bg-gradient-to-b from-[#0c0c0c] to-transparent">
      <div className="flex items-center justify-between h-full px-4 md:px-12">
        <NavLink to="/">
          <img
            src="/images/logo-bequest-branca.svg"
            alt="Bequest"
            className="h-8 md:h-10 w-auto"
          />
        </NavLink>

        <div className="hidden xl:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `uppercase text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white border-b-2 border-[#3F1DFF] pb-1'
                    : 'text-gray-400 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Avatar mockado */}
        <div className="flex items-center gap-3">
          <span className="hidden md:block text-sm text-gray-400">João Dropshipper</span>
          <div className="w-9 h-9 rounded-full bg-[#3F1DFF]/20 border border-[#3F1DFF]/30 flex items-center justify-center cursor-pointer hover:bg-[#3F1DFF]/30 transition-colors">
            <span className="text-xs font-bold text-white">JD</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
