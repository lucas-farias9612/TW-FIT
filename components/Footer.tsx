
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="glass border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <span className="text-2xl font-black text-white">TW <span className="text-primary">FIT</span></span>
          <p className="text-gray-500 text-sm mt-2 max-w-xs">
            Transformando vidas através do movimento e da disciplina.
          </p>
        </div>
        
        <div className="flex space-x-6 text-gray-400">
          <a href="#" className="hover:text-primary transition-colors">Instagram</a>
          <a href="#" className="hover:text-primary transition-colors">YouTube</a>
          <a href="#" className="hover:text-primary transition-colors">Facebook</a>
        </div>

        <div className="text-center md:text-right text-gray-500 text-sm">
          <p>© 2024 TW FIT Academia.</p>
          <p>Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
