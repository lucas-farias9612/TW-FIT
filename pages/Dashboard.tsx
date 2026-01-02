
import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { collection, query, onSnapshot, orderBy, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';
import { Video } from '../types';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filter, setFilter] = useState<string>('Todos');

  useEffect(() => {
    // Escuta em tempo real as mudanças no Firestore
    const q = query(collection(db, 'videos'), orderBy('category'));
    
    // Fix: Explicitly casting the snapshot to QuerySnapshot<DocumentData> to resolve the type error
    // where the compiler was incorrectly inferring it as a DocumentSnapshot.
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const querySnapshot = snapshot as unknown as QuerySnapshot<DocumentData>;
      const videoList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Video[];
      setVideos(videoList);
    }, (error) => {
        console.error("Erro ao carregar vídeos:", error);
        // Fallback for demo
        setVideos([
            { id: '1', title: 'Supino Reto Perfeito', description: 'Técnica avançada', url: 'https://www.youtube.com/embed/sqOw2Y6u9as', category: 'Peito' },
            { id: '2', title: 'Agachamento Livre', description: 'Força e estabilidade', url: 'https://www.youtube.com/embed/U3HlEF_E9uo', category: 'Pernas' },
            { id: '3', title: 'Remada Curvada', description: 'Explosão dorsal', url: 'https://www.youtube.com/embed/6Fv764vX920', category: 'Costas' }
        ]);
    });

    return () => unsubscribe();
  }, []);

  const categories = ['Todos', 'Peito', 'Costas', 'Pernas', 'Cardio', 'Mobilidade'];
  const filteredVideos = filter === 'Todos' ? videos : videos.filter(v => v.category === filter);

  return (
    <div className="container mx-auto px-6 py-12 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black">BEM-VINDO, <span className="text-primary">{user.displayName || 'GUERREIRO'}</span>!</h1>
          <p className="text-gray-400">Seu treino de hoje já está disponível.</p>
        </div>
        <div className="glass px-6 py-4 rounded-2xl border-l-4 border-primary">
          <span className="block text-xs uppercase tracking-widest text-gray-500 font-bold">Foco do Dia</span>
          <span className="text-xl font-bold">Peito & Tríceps 🔥</span>
        </div>
      </header>

      {/* Netflix Filter */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-white/10 pb-4">Biblioteca de Treinos</h2>
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {categories.map(c => (
            <button 
              key={c}
              onClick={() => setFilter(c)}
              className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all ${
                filter === c ? 'bg-primary text-white' : 'bg-white/5 hover:bg-white/10 text-gray-400'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.length > 0 ? filteredVideos.map(video => (
            <div key={video.id} className="glass rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform">
              <div className="aspect-video relative">
                <iframe 
                  className="w-full h-full"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <span className="text-xs font-black text-primary uppercase tracking-tighter">{video.category}</span>
                <h3 className="text-xl font-bold mt-1">{video.title}</h3>
                <p className="text-sm text-gray-400 mt-2 line-clamp-2">{video.description}</p>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-20 text-center text-gray-500">
              Nenhum vídeo encontrado nesta categoria.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
