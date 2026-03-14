import { Layout } from '../components/Layout';

export function Buscador() {
  return (
    <Layout>
      <div className="py-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.04em] mb-4">
          Buscador de <span className="text-[#3F1DFF]">Produtos</span>
        </h1>
        <p className="text-gray-400 text-lg">Encontre os melhores produtos para vender.</p>
      </div>
    </Layout>
  );
}
