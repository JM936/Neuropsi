import React from 'react';
import { Pilares } from '../components/Pilares';
import { PageMeta } from '../components/UI/PageMeta';

export const PilaresPage: React.FC = () => {
  return (
    <div className="pt-20">
      <PageMeta 
        title="Nossos Pilares" 
        description="Explique os 4 pilares fundamentais da nossa atuação: Neurociência Aplicada, Educação Inclusiva, Saúde Pública e Segurança Pública." 
      />
      <Pilares />
    </div>
  );
};
