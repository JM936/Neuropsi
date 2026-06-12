import React from 'react';
import { Solutions } from '../components/Solutions';
import { PageMeta } from '../components/UI/PageMeta';

export const SolutionsPage: React.FC = () => {
  return (
    <div className="pt-20">
      <PageMeta 
        title="Soluções Customizadas" 
        description="Consulte nossas assessorias técnicas e treinamentos sob medida criados para responder a demandas complexas de governos, escolas e empresas." 
      />
      <Solutions />
    </div>
  );
};
