
import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCred.user, { displayName: name });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError('Credenciais inválidas ou erro no servidor. Verifique os dados.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="glass w-full max-w-md p-10 rounded-[2.5rem] shadow-2xl space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black">{isRegister ? 'CRIE SUA CONTA' : 'ACESSO DO ALUNO'}</h2>
          <p className="text-gray-400">{isRegister ? 'Entre para a família TW FIT.' : 'Bem-vindo de volta, atleta!'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegister && (
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-2 uppercase tracking-widest">Nome Completo</label>
              <input 
                required
                className="w-full bg-dark border border-white/10 rounded-2xl p-4 focus:border-primary outline-none transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold text-gray-500 mb-2 uppercase tracking-widest">E-mail</label>
            <input 
              type="email"
              required
              className="w-full bg-dark border border-white/10 rounded-2xl p-4 focus:border-primary outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-500 mb-2 uppercase tracking-widest">Senha</label>
            <input 
              type="password"
              required
              className="w-full bg-dark border border-white/10 rounded-2xl p-4 focus:border-primary outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-400 text-sm font-medium">{error}</p>}

          <button className="w-full bg-primary hover:bg-orange-600 text-white p-5 rounded-2xl font-black text-lg orange-glow transition-all transform hover:scale-[1.02]">
            {isRegister ? 'COMEÇAR AGORA' : 'ENTRAR NO DASHBOARD'}
          </button>
        </form>

        <div className="text-center">
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
          >
            {isRegister ? 'Já possui conta? Clique aqui.' : 'Não é aluno? Faça sua matrícula.'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
