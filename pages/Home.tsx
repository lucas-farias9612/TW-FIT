
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
            alt="Gym background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in slide-in-from-left duration-1000">
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              SUPERE SEUS <span className="text-primary italic">LIMITES</span><br /> 
              VIVA A EXPERIÊNCIA <span className="text-white">TW FIT</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-lg">
              A estrutura mais completa da região, com profissionais qualificados e tecnologia de ponta para você alcançar o corpo que sempre sonhou.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-bold orange-glow transition-all transform hover:scale-105">
                MATRICULE-SE AGORA
              </button>
              <Link to="/login" className="glass hover:bg-white/10 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all text-center">
                ÁREA DO ALUNO
              </Link>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://picsum.photos/40/40?random=${i}`} className="w-10 h-10 rounded-full border-2 border-dark" alt="User" />
                ))}
              </div>
              <span>+500 alunos transformados</span>
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
          <DifferentialCard 
            title="Equipamentos Premium" 
            desc="Máquinas de última geração importadas para garantir o melhor estímulo muscular." 
            icon="⚡"
          />
          <DifferentialCard 
            title="App de Treino Exclusivo" 
            desc="Acompanhe sua evolução e veja vídeos explicativos de cada exercício direto no celular." 
            icon="📱"
          />
          <DifferentialCard 
            title="Acompanhamento Real" 
            desc="Professores em sala prontos para corrigir sua postura e motivar seu treino." 
            icon="🤝"
          />
        </div>
      </section>

      {/* Promo Section */}
      <section className="bg-primary/10 py-20 border-y border-primary/20">
        <div className="container mx-auto px-6 text-center space-y-8">
          <h3 className="text-3xl font-bold">AGENDE UMA AULA EXPERIMENTAL <span className="text-primary italic">GRATUITA</span></h3>
          <p className="text-lg text-gray-300">Venha conhecer nosso espaço e sentir a energia que vai mudar sua vida.</p>
          <button className="bg-primary text-white px-10 py-4 rounded-full font-black text-xl orange-glow hover:scale-105 transition-all">
            QUERO MINHA AULA GRÁTIS
          </button>
        </div>
      </section>
    </div>
  );
};

const DifferentialCard = ({ title, desc, icon }: { title: string, desc: string, icon: string }) => (
  <div className="glass p-8 rounded-3xl hover:border-primary/50 transition-all group">
    <div className="text-5xl mb-6">{icon}</div>
    <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{title}</h4>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

export default Home;
