import React, { useState } from 'react';
import { Home, Activity, Facebook, Instagram, AlertTriangle, X, Moon, Sun } from 'lucide-react';

// --- Configuração de Temas ---
const getTheme = (isDark) => ({
  background: isDark ? 'bg-slate-900' : 'bg-gray-50',
  surface: isDark ? 'bg-slate-800' : 'bg-white',
  primaryText: isDark ? 'text-white' : 'text-gray-800',
  secondaryText: isDark ? 'text-gray-400' : 'text-gray-500',
  border: isDark ? 'border-slate-700' : 'border-gray-200',
  inputBg: isDark ? 'bg-slate-700' : 'bg-white',
  inputText: isDark ? 'text-white' : 'text-gray-900',
  primary: 'bg-blue-600 hover:bg-blue-700',
  primaryTextBtn: 'text-white',
});

// --- Componente: Rodapé (Footer) ---
const Footer = ({ theme }) => {
  return (
    <footer className={`w-full ${theme.surface} p-4 mt-auto border-t ${theme.border} shadow-inner transition-colors duration-300`}>
      <div className="flex justify-center items-center space-x-6">
        {/* Instagram */}
        <a 
          href="https://www.instagram.com/minsaude/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-pink-500 transition-colors"
        >
          <Instagram size={24} />
        </a>
        
        {/* Facebook */}
        <a 
          href="https://www.facebook.com/minsaude/?locale=pt_BR" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-600 transition-colors"
        >
          <Facebook size={24} />
        </a>

        {/* X (Antigo Twitter) */}
        <a 
          href="https://x.com/minsaude" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-100 transition-colors"
        >
          <X size={24} />
        </a>
      </div>
      <p className="text-center text-xs text-gray-400 mt-3">
        © 2025 TechHealth Solutions. Todos os direitos reservados.
      </p>
    </footer>
  );
};

// --- Componente: Barra de Navegação (Navbar) ---
const Navbar = ({ onNavigate, activePage, theme, isDarkMode, toggleTheme }) => {
  const NavButton = ({ page, label, icon: Icon }) => {
    const isActive = activePage === page;
    const activeClasses = 'text-blue-500 font-bold border-b-2 border-blue-500';
    const inactiveClasses = `text-gray-400 hover:text-blue-400`;

    return (
      <button
        onClick={() => onNavigate(page)}
        className={`flex items-center space-x-1 p-2 transition-all ${isActive ? activeClasses : inactiveClasses}`}
      >
        <Icon size={18} />
        <span className="font-medium">{label}</span>
      </button>
    );
  };

  return (
    <nav className={`w-full ${theme.surface} p-4 border-b ${theme.border} shadow-sm transition-colors duration-300`}>
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <span 
          className="text-2xl font-bold text-blue-600 cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          TechHealth Solutions
        </span>

        <div className="flex items-center space-x-6">
          <NavButton page="home" label="Home" icon={Home} />
          <NavButton page="imc" label="IMC" icon={Activity} />
          
          {/* Botão Secreto para Testar 404 */}
          <button 
            onClick={() => onNavigate('erro-proposital')}
            className="text-xs text-red-500 border border-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition-colors"
            title="Simular erro 404"
          >
            Testar 404
          </button>
          
          {/* Botão de Alternar Tema */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-slate-700 text-yellow-400' : 'bg-gray-100 text-slate-600'} transition-colors`}
            aria-label="Alternar Tema"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

// --- Tela: Página Inicial (HomeScreen) ---
const HomeScreen = ({ theme }) => {
  return (
    <div className="p-6 text-center transition-colors duration-300">
      <h1 className={`text-4xl font-bold mb-2 ${theme.primaryText}`}>
        Bem-vindo à TechHealth Solutions
      </h1>
      <p className={`${theme.secondaryText} text-xl mb-8`}>
        Inovando seu bem-estar com tecnologia.
      </p>
      <div className={`mt-8 p-8 rounded-xl shadow-md max-w-3xl mx-auto border ${theme.surface} ${theme.border}`}>
        <h2 className={`text-2xl font-semibold mb-4 ${theme.primaryText}`}>Explore Nossos Recursos</h2>
        <p className={`text-lg ${theme.secondaryText}`}>
          Este é um projeto desenvolvido em React. Utilize a barra de navegação acima para
          explorar os recursos, como a nossa calculadora de IMC completa.
        </p>
      </div>
    </div>
  );
};

// --- Tela: Calculadora de IMC (IMCScreen) ---
const IMCScreen = ({ theme }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [resultData, setResultData] = useState(null);

  const getIMCDetails = (imcValue) => {
    // Nota: Mantivemos as cores dos cards fixas (bg-colors) para garantir contraste e semântica,
    // mas ajustamos a opacidade ou bordas se necessário.
    if (imcValue < 18.5) {
      return {
        value: imcValue.toFixed(2),
        category: 'Abaixo do Peso (Magreza)',
        tip: 'Consulte um nutricionista para uma dieta focada em ganho de massa saudável.',
        boxClass: 'bg-yellow-100 border-yellow-400 text-yellow-900'
      };
    } else if (imcValue < 25) {
      return {
        value: imcValue.toFixed(2),
        category: 'Peso Normal',
        tip: 'Excelente! Mantenha uma alimentação equilibrada e a prática de exercícios.',
        boxClass: 'bg-green-100 border-green-400 text-green-900'
      };
    } else if (imcValue < 30) {
      return {
        value: imcValue.toFixed(2),
        category: 'Sobrepeso',
        tip: 'Sinal de alerta. Tente evitar alimentos processados e aumente a atividade física.',
        boxClass: 'bg-yellow-100 border-yellow-400 text-yellow-900'
      };
    } else if (imcValue < 35) {
      return {
        value: imcValue.toFixed(2),
        category: 'Obesidade Grau I',
        tip: 'Recomendamos buscar orientação profissional para adequar sua rotina.',
        boxClass: 'bg-orange-100 border-orange-400 text-orange-900'
      };
    } else if (imcValue < 40) {
      return {
        value: imcValue.toFixed(2),
        category: 'Obesidade Grau II (Severa)',
        tip: 'Sua saúde requer atenção. Procure um médico para uma avaliação completa.',
        boxClass: 'bg-red-100 border-red-400 text-red-900'
      };
    } else {
      return {
        value: imcValue.toFixed(2),
        category: 'Obesidade Grau III (Mórbida)',
        tip: 'É fundamental buscar ajuda médica especializada o quanto antes.',
        boxClass: 'bg-rose-200 border-rose-500 text-rose-900'
      };
    }
  };

  const calculateIMC = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    
    if (h > 0 && w > 0) {
      const imc = (w / (h * h));
      setResultData(getIMCDetails(imc));
    } else {
      setResultData(null);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center transition-colors duration-300">
      <h1 className={`text-3xl font-bold mb-6 text-center ${theme.primaryText}`}>
        Calculadora de IMC
      </h1>
      
      <div className={`space-y-4 w-full max-w-md p-8 rounded-xl shadow-md border ${theme.surface} ${theme.border}`}>
        <div>
          <label className={`block text-sm font-medium mb-1 ${theme.secondaryText}`}>
            Peso (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Ex: 70.5"
            className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme.inputBg} ${theme.border} ${theme.inputText}`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${theme.secondaryText}`}>
            Altura (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Ex: 175"
            className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme.inputBg} ${theme.border} ${theme.inputText}`}
          />
        </div>
        <button
          onClick={calculateIMC}
          className={`w-full ${theme.primary} ${theme.primaryTextBtn} py-3 rounded-lg font-semibold shadow-md transition-colors`}
        >
          Calcular
        </button>
      </div>

      {resultData && (
        <div className={`mt-6 p-6 border-2 rounded-xl text-center w-full max-w-md shadow-sm transition-all duration-500 ${resultData.boxClass}`}>
          <p className="text-sm font-bold uppercase tracking-wide opacity-80 mb-1">Resultado</p>
          <p className="text-5xl font-extrabold mb-2">{resultData.value}</p>
          <p className="text-xl font-bold mb-3">{resultData.category}</p>
          <div className="bg-white/60 p-3 rounded-lg text-gray-900">
            <p className="text-sm font-medium">
              💡 <strong>Dica:</strong> {resultData.tip}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Tela: Página Não Encontrada (NotFoundScreen) ---
const NotFoundScreen = ({ onNavigate, theme }) => {
  return (
    <div className="p-6 text-center flex-1 flex flex-col justify-center items-center transition-colors duration-300">
      <AlertTriangle size={64} className="text-yellow-500 mb-4" />
      <h1 className={`text-4xl font-bold mb-2 ${theme.primaryText}`}>Oops!</h1>
      <h2 className={`text-2xl font-semibold ${theme.secondaryText}`}>Página 404</h2>
      <p className={`mt-2 mb-6 ${theme.secondaryText}`}>
        A página que você está procurando não foi encontrada.
      </p>
      <button
        onClick={() => onNavigate('home')}
        className={`px-6 py-3 ${theme.primary} ${theme.primaryTextBtn} rounded-lg font-semibold shadow-md transition-colors`}
      >
        Voltar para a Home
      </button>
    </div>
  );
};

// --- Componente Principal (App) ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado do tema

  const theme = getTheme(isDarkMode); // Obtém as cores baseadas no estado

  const handleNavigate = (page) => {
    if (['home', 'imc'].includes(page)) {
      setCurrentPage(page);
    } else {
      setCurrentPage('404');
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomeScreen theme={theme} />;
      case 'imc': return <IMCScreen theme={theme} />;
      case '404':
      default: return <NotFoundScreen onNavigate={handleNavigate} theme={theme} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme.background}`}>
        {currentPage !== '404' && (
          <Navbar 
            onNavigate={handleNavigate} 
            activePage={currentPage} 
            theme={theme}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
        )}

        <main className="flex-1 w-full max-w-6xl mx-auto py-8 px-4">
          {renderPage()}
        </main>

        {currentPage !== '404' && (
          <Footer theme={theme} />
        )}
    </div>
  );
}