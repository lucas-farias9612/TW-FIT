
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
            alt="Gym" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-black leading-tight uppercase">
              SUPERE SEUS <span className="text-primary italic">LIMITES</span><br /> 
              VIVA A <span className="text-white">TW FIT</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-lg">
              Estrutura de elite, profissionais qualificados e tecnologia de ponta para sua melhor versão.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-bold orange-glow transition-all transform hover:scale-105">
                MATRICULE-SE AGORA
              </button>
              <Link to="/login" className="glass hover:bg-white/10 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all text-center">
                ÁREA DO ALUNO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section id="diferenciais" className="py-24 container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black">POR QUE A <span className="text-primary">TW FIT?</span></h2>
          <p className="text-gray-400">Muito além de uma academia, um centro de performance humana.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-3xl border-l-4 border-primary">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-2xl font-bold mb-2">Equipamentos de Elite</h4>
            <p className="text-gray-400">Máquinas importadas das melhores marcas do mundo.</p>
          </div>
          <div className="glass p-8 rounded-3xl border-l-4 border-primary">
            <div className="text-4xl mb-4">📱</div>
            <h4 className="text-2xl font-bold mb-2">Treino Digital</h4>
            <p className="text-gray-400">Acesse seus vídeos e fichas de qualquer lugar.</p>
          </div>
          <div className="glass p-8 rounded-3xl border-l-4 border-primary">
            <div className="text-4xl mb-4">🤝</div>
            <h4 className="text-2xl font-bold mb-2">Suporte Real</h4>
            <p className="text-gray-400">Nossos coaches não apenas olham, eles treinam com você.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
