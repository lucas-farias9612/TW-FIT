
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, signOut } from 'firebase/auth';
import { auth } from '../firebase';

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-black tracking-tighter text-white">
            TW <span className="text-primary">FIT</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8 font-medium">
          <Link to="/" className="hover:text-primary transition-colors">Início</Link>
          <a href="#diferenciais" className="hover:text-primary transition-colors">Diferenciais</a>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-primary transition-colors">Área do Aluno</Link>
              {user.email === 'admin@twfit.com.br' && (
                <Link to="/admin" className="text-red-400 hover:text-red-300">Admin</Link>
              )}
              <button 
                onClick={handleLogout}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
              >
                Sair
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="bg-primary hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-bold orange-glow transition-all"
            >
              Entrar
            </Link>
          )}
        </div>

        {/* Mobile menu button simplified */}
        <div className="md:hidden">
            <Link to={user ? "/dashboard" : "/login"} className="text-primary font-bold">Menu</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
