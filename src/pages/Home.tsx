import { Layout } from '../components/Layout';

export function Home() {
  return (
    <Layout>
      <div className="py-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.04em] mb-4">
          Bequest <span className="text-[#3F1DFF]">Ferramentas</span>
        </h1>
        <p className="text-gray-400 text-lg">Sua plataforma completa de ferramentas para dropshipping.</p>
      </div>
    </Layout>
  );
}
