import React from 'react';
import { President } from '../components/President';
import { PageMeta } from '../components/UI/PageMeta';

export const PresidentPage: React.FC = () => {
  return (
    <div className="pt-20">
      <PageMeta 
        title="Nossa Presidência" 
        description="Conheça a trajetória científica, titulações e a liderança executiva da presidência do nosso instituto." 
      />
      <President />
    </div>
  );
};
