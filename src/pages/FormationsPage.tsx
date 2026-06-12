import React from 'react';
import { Formations } from '../components/Formations';
import { PageMeta } from '../components/UI/PageMeta';

export const FormationsPage: React.FC = () => {
  return (
    <div className="pt-20">
      <PageMeta 
        title="Formação Profissional" 
        description="Confira nossas pós-graduações, capacitações e certificações nas áreas de neuropsicopedagogia, neuroeducação e gestão." 
      />
      <Formations />
    </div>
  );
};
