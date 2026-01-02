
import React, { useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Video } from '../types';

const Admin: React.FC = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState<Video['category']>('Peito');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const formatYoutubeUrl = (raw: string) => {
      // Converte links normais para embed
      if (raw.includes('watch?v=')) {
          const id = raw.split('watch?v=')[1]?.split('&')[0];
          return `https://www.youtube.com/embed/${id}`;
      }
      if (raw.includes('youtu.be/')) {
          const id = raw.split('youtu.be/')[1];
          return `https://www.youtube.com/embed/${id}`;
      }
      return raw;
  }

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    try {
      await addDoc(collection(db, 'videos'), {
        title,
        url: formatYoutubeUrl(url),
        description: desc,
        category,
        createdAt: Date.now()
      });
      setTitle('');
      setUrl('');
      setDesc('');
      setSuccess('Vídeo adicionado com sucesso!');
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar no Firestore. Verifique suas regras de segurança.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-4xl font-black mb-8 text-white">PAINEL DO <span className="text-primary">DONO</span></h1>
      
      <div className="grid md:grid-cols-1 gap-12">
        <section className="glass p-8 rounded-3xl">
          <h2 className="text-2xl font-bold mb-6">Gerenciar Biblioteca de Vídeos</h2>
          
          <form onSubmit={handleAddVideo} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Título do Vídeo</label>
              <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-dark border border-white/10 rounded-xl p-4 focus:border-primary outline-none"
                placeholder="Ex: Treino de Costas - Iniciante"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Categoria</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Video['category'])}
                  className="w-full bg-dark border border-white/10 rounded-xl p-4 focus:border-primary outline-none"
                >
                  <option>Peito</option>
                  <option>Costas</option>
                  <option>Pernas</option>
                  <option>Braços</option>
                  <option>Cardio</option>
                  <option>Mobilidade</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">Link do YouTube</label>
                <input 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="w-full bg-dark border border-white/10 rounded-xl p-4 focus:border-primary outline-none"
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">Descrição</label>
              <textarea 
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
                className="w-full bg-dark border border-white/10 rounded-xl p-4 focus:border-primary outline-none"
              />
            </div>

            {success && <p className="text-green-400 font-bold">{success}</p>}

            <button 
              disabled={loading}
              className="w-full bg-primary hover:bg-orange-600 p-4 rounded-xl font-bold text-lg orange-glow transition-all"
            >
              {loading ? 'Salvando...' : 'ADICIONAR VÍDEO'}
            </button>
          </form>
        </section>

        <section className="glass p-8 rounded-3xl opacity-50 cursor-not-allowed">
            <h2 className="text-2xl font-bold mb-6">Banner de Aviso Global</h2>
            <div className="space-y-4">
                <input className="w-full bg-dark border border-white/10 rounded-xl p-4" placeholder="Texto do aviso..." disabled />
                <button className="w-full bg-white/10 p-4 rounded-xl font-bold" disabled>ATUALIZAR BANNER</button>
            </div>
            <p className="mt-4 text-xs italic">Funcionalidade em desenvolvimento na V2.</p>
        </section>
      </div>
    </div>
  );
};

export default Admin;
