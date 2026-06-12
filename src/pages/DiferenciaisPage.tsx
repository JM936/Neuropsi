import React from 'react';
import { Diferenciais } from '../components/Diferenciais';
import { PageMeta } from '../components/UI/PageMeta';

export const DiferenciaisPage: React.FC = () => {
  return (
    <div className="pt-20">
      <PageMeta 
        title="Nossos Diferenciais" 
        description="Descubra o que nos torna líderes em neurociência educacional: rigor científico, marcas registradas INPI e metodologia de excelência pericial." 
      />
      <Diferenciais />
    </div>
  );
};
