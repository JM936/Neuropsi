import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, FileSpreadsheet, Heart } from 'lucide-react';

export const President: React.FC = () => {
  const credentials = [
    {
      icon: <Award className="text-neuro-highlight" size={20} />,
      label: 'Neuropsicopedagogo Perito'
    },
    {
      icon: <ShieldCheck className="text-neuro-accent" size={20} />,
      label: 'Neuropsicólogo Clínico'
    },
    {
      icon: <FileSpreadsheet className="text-neuro-primary" size={20} />,
      label: 'Neurogestor Empresarial'
    },
    {
      icon: <Heart className="text-neuro-magenta" size={20} />,
      label: 'Esp. em Transtornos do Neurodesenvolvimento'
    }
  ];

  return (
    <section id="president" className="py-20 bg-neuro-darkBg relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-neuro-highlight/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Esquerdo: Imagem do Presidente com Moldura Premium */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group max-w-sm sm:max-w-md">
              {/* Brilho Dourado por trás */}
              <div className="absolute -inset-1 bg-gradient-to-r from-neuro-highlight via-neuro-accent to-neuro-primary rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              
              {/* Moldura da Imagem */}
              <div className="relative p-2 bg-neuro-darkBgLight border border-neuro-border rounded-2xl shadow-2xl">
                <img 
                  src="https://wbxrplkugvbpwryibnmu.supabase.co/storage/v1/object/public/blog-images/president.webp" 
                  alt="Comendador Leonardo Leal - Presidente do Instituto de Neuropsicopedagogia" 
                  className="rounded-xl w-full h-[400px] object-cover bg-neuro-darkBgLight/50 shadow-inner"
                  onError={(e) => {
                    e.currentTarget.src = "https://wbxrplkugvbpwryibnmu.supabase.co/storage/v1/object/public/blog-images/logo_symbol.webp";
                  }}
                />
                
                {/* Badge Flutuante de Comendador */}
                <div className="absolute -bottom-4 left-6 px-4 py-2 bg-gradient-to-r from-neuro-highlight to-amber-600 rounded-lg shadow-lg border border-yellow-400 flex items-center gap-2">
                  <Award size={18} className="text-white animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Comendador
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lado Direito: Perfil Acadêmico e Institucional */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="text-xs uppercase tracking-widest font-semibold text-neuro-highlight block">
                Presidência do Instituto
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient font-title">
                Comendador Leonardo Leal
              </h2>
              
              {/* Grid de Atuações */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                {credentials.map((cred, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 p-3 bg-glass-card rounded-lg border border-neuro-border"
                  >
                    <div className="p-2 bg-neuro-darkBg rounded-md">
                      {cred.icon}
                    </div>
                    <span className="text-sm font-semibold text-neuro-textPrimary">
                      {cred.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Descrição Detalhada */}
              <div className="text-neuro-textSecondary space-y-4 leading-relaxed text-sm sm:text-base">
                <p>
                  O <strong>Comendador Leonardo Leal</strong> é um dos principais nomes do país na articulação prática entre a neurociência, a pedagogia e as políticas institucionais. Sua trajetória é marcada pela especialização em transtornos do neurodesenvolvimento (como Autismo e TDAH), além de ser pioneiro na elaboração de metodologias de intervenção aplicadas a órgãos públicos.
                </p>
                <p>
                  Como <strong>Neuropsicopedagogo Perito</strong> e <strong>Neuropsicólogo</strong>, atua ativamente no auxílio ao poder judiciário, em diagnósticos clínicos e no desenvolvimento de programas de capacitação e consultoria escolar que impactam milhares de educadores no território nacional.
                </p>
                <p>
                  Sua atuação como <strong>Neurogestor Empresarial</strong> permitiu que o Instituto estruturasse protocolos robustos de treinamento corporativo e gerenciamento de crises táticas, estabelecendo novos padrões éticos e operacionais para forças de segurança pública e guardas civis metropolitanas.
                </p>
              </div>

              <blockquote className="border-l-4 border-neuro-highlight pl-4 italic text-neuro-textPrimary text-sm sm:text-base bg-neuro-highlight/5 p-4 rounded-r-lg">
                "Nosso compromisso é fazer com que a ciência do comportamento e o conhecimento cerebral não fiquem restritos aos laboratórios, mas se transformem em ferramentas cotidianas para salvar vidas, mediar crises e incluir de verdade."
              </blockquote>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
