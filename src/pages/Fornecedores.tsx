import { Layout } from '../components/Layout';

export function Fornecedores() {
  return (
    <Layout>
      <div className="py-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.04em] mb-4">
          <span className="text-[#3F1DFF]">Fornecedores</span>
        </h1>
        <p className="text-gray-400 text-lg">Compare fornecedores e encontre os melhores parceiros.</p>
      </div>
    </Layout>
  );
}
