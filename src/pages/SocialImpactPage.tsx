import React from 'react';
import { SocialImpact } from '../components/SocialImpact';
import { PageMeta } from '../components/UI/PageMeta';

export const SocialImpactPage: React.FC = () => {
  return (
    <div className="pt-20">
      <PageMeta 
        title="Impacto Social" 
        description="Veja como promovemos cidadania e acolhimento humanitário a populações vulneráveis através de nossos programas sociais." 
      />
      <SocialImpact />
    </div>
  );
};
