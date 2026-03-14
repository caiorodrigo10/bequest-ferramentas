import { Layout } from '../components/Layout';

export function EmAlta() {
  return (
    <Layout>
      <div className="py-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.04em] mb-4">
          Em <span className="text-[#3F1DFF]">Alta</span>
        </h1>
        <p className="text-gray-400 text-lg">Produtos trending e oportunidades do momento.</p>
      </div>
    </Layout>
  );
}
