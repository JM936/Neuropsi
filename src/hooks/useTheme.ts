import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export const useTheme = () => {
  // Inicializa o estado do tema com base no localStorage ou nas preferências do sistema do usuário
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const savedTheme = localStorage.getItem('neuro-theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      
      // Iniciamos em tema Escuro por padrão absoluto para preservar a identidade visual premium do Instituto
      return 'dark';
    } catch {
      // Fallback seguro caso ocorra erro ao acessar o localStorage (ex: WebView restrita)
      return 'dark';
    }
  });

  // Atualiza as classes no elemento body e persiste a escolha do usuário
  useEffect(() => {
    const body = document.body;
    if (theme === 'light') {
      body.classList.add('light-mode');
      body.classList.remove('high-contrast-mode'); // Remove alto contraste para evitar sobreposições
    } else {
      body.classList.remove('light-mode');
    }

    try {
      localStorage.setItem('neuro-theme', theme);
    } catch (e) {
      console.warn('Erro ao salvar tema no localStorage:', e);
    }
  }, [theme]);

  // Função para alternar entre os temas Claro e Escuro
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};
