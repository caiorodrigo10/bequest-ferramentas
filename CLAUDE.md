# CLAUDE.md — Bequest Ferramentas

## Visão Geral

Protótipo visual (sem backend) de uma plataforma de ferramentas para dropshippers da Bequest. 100% frontend, dados mockados, deploy na Vercel.

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- React Router DOM v7
- Lucide React (ícones)

## Comandos

```bash
npm install          # Instalar dependências
npm run dev          # Dev server
npm run build        # Build de produção
npm run preview      # Preview do build
```

## Design System Bequest

| Token | Valor | Uso |
|-------|-------|-----|
| `accent` | `#3F1DFF` | Cor principal — botões, links, borders ativos |
| `accent-hover` | `#3217C7` | Hover da cor principal |
| `secondary` | `#FFBA26` | Dourado — badges, destaques premium |
| `dark-bg` | `#0c0c0c` | Background principal |
| `dark-surface` | `#141414` | Cards e superfícies |
| `dark-elevated` | `#1c1c1c` | Superfícies elevadas |
| `dark-border` | `#252525` | Borders |
| Font | `DM Sans` | Toda a tipografia |
| Border radius | `16px` / `24px` / `32px` | `rounded-growth` / `rounded-growth-lg` / `rounded-growth-xl` |

Os tokens estão definidos no `src/index.css` usando `@theme` do Tailwind v4.

## Estrutura

```
src/
├── components/
│   ├── Navbar.tsx         # Navbar fixa com logo + nav links + avatar
│   ├── Layout.tsx         # Wrapper (Navbar + main content)
│   └── ui/
│       ├── Button.tsx     # Variantes: primary, secondary, ghost
│       ├── Badge.tsx      # Variantes: accent, secondary, ghost
│       └── Card.tsx       # Card base com hover
├── pages/
│   ├── Home.tsx           # Dashboard principal (Story 2)
│   ├── Buscador.tsx       # Buscador de produtos (Story 3)
│   ├── EmAlta.tsx         # Produtos em alta (Story 4)
│   ├── Fornecedores.tsx   # Fornecedores (Story 5)
│   └── Calculadora.tsx    # Calculadora de preços (Story 6)
├── data/
│   ├── products.ts        # 15+ produtos mockados
│   ├── suppliers.ts       # 10+ fornecedores mockados
│   └── trending.ts        # 9+ produtos trending curados
├── lib/
│   └── utils.ts           # formatCurrency, cn, formatNumber
├── App.tsx                # Router config
├── main.tsx               # Entry point
└── index.css              # Tailwind + design tokens
```

## Rotas

| Path | Página | Descrição |
|------|--------|-----------|
| `/` | Home | Dashboard principal |
| `/buscador` | Buscador | Busca de produtos |
| `/em-alta` | EmAlta | Produtos trending |
| `/fornecedores` | Fornecedores | Lista de fornecedores |
| `/calculadora` | Calculadora | Calculadora de preços |

## Dados

Todos os dados são mockados (sem backend). Os arquivos em `src/data/` exportam arrays tipados que são importados diretamente nas páginas.

## Logos

Disponíveis em `public/images/`:
- `logo-bequest-branca.svg` — logo principal (dark mode)
- `simbolo-bequest-branco.svg` — símbolo/ícone
- `logo-bequest-branca.png` — versão PNG
