import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

// Simulação de páginas
const MapView = () => <div className="p-4">Página do Mapa (Em construção)</div>;
const AuthPage = () => <div className="p-4">Página de Autenticação (Em construção)</div>;
const DiagnosticPage = () => <div className="p-4">Página de Diagnóstico (Em construção)</div>;
const ReportPage = () => <div className="p-4">Página de Relatório (Em construção)</div>;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Simulação de verificação de autenticação
  useEffect(() => {
    const checkAuth = () => {
      try {
        const user = localStorage.getItem('user');
        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setIsAuthenticated(false);
      }
    };

    // Verificar autenticação quando o componente montar
    checkAuth();
    
    // Escutar por mudanças no localStorage (login/logout)
    window.addEventListener('storage', checkAuth);
    window.addEventListener('localStorageChange', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('localStorageChange', checkAuth);
    };
  }, []);

  // Função para simular login/logout
  const toggleAuth = () => {
    if (isAuthenticated) {
      localStorage.removeItem('user');
    } else {
      localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Usuário Teste' }));
    }
    // Disparar evento personalizado para notificar mudança no localStorage
    window.dispatchEvent(new Event('localStorageChange'));
  };

  return (
    <>
      {/* Barra de navegação temporária para desenvolvimento */}
      <div className="bg-gray-800 text-white p-3 flex justify-between items-center">
        <span className="font-bold">Social Impact Express</span>
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleAuth}
            className="px-3 py-1 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
          <span className="text-sm">Status: {isAuthenticated ? 'Autenticado' : 'Não autenticado'}</span>
        </div>
      </div>
      
      {/* Rotas da aplicação */}
      <Routes>
        <Route path="/" element={isAuthenticated ? <MapView /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!isAuthenticated ? <AuthPage /> : <Navigate to="/" />} />
        <Route path="/diagnostic" element={<DiagnosticPage />} />
        <Route path="/report" element={isAuthenticated ? <ReportPage /> : <Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      {/* Toaster para notificações */}
      <Toaster position="top-right" />
    </>
  );
}

export default App;