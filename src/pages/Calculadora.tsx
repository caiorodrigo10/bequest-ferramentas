import { Layout } from '../components/Layout';

export function Calculadora() {
  return (
    <Layout>
      <div className="py-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.04em] mb-4">
          Calculadora de <span className="text-[#3F1DFF]">Preços</span>
        </h1>
        <p className="text-gray-400 text-lg">Calcule custos, margens e preço de venda ideal.</p>
      </div>
    </Layout>
  );
}
