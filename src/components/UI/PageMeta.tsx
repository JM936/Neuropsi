import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageMetaProps {
  title: string;
  description: string;
}

// Componente utilitário que atualiza os metadados de SEO a cada navegação
export const PageMeta: React.FC<PageMetaProps> = ({ title, description }) => {
  const location = useLocation();

  useEffect(() => {
    // Define o título da página
    document.title = `${title} | Instituto de Neuropsicopedagogia`;
    
    // Procura pela meta tag description existente ou cria uma nova se necessário
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    
    // Atualiza a descrição de SEO
    metaDesc.setAttribute('content', description);
  }, [location, title, description]);

  return null;
};
