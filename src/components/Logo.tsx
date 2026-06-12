import React from 'react';

interface LogoProps {
  showText?: boolean;
  hideTagline?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  showText = true,
  hideTagline = false,
  className = 'h-12',
  variant = 'light'
}) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-neuro-darkBg';
  const subtitleColor = variant === 'light' ? 'text-neuro-accent' : 'text-neuro-primary';
  const sloganColor = variant === 'light' ? 'text-neuro-textSecondary' : 'text-neuro-textMuted';

  return (
    <div className={`flex items-center gap-3 select-none logo-container ${className}`}>
      {/* Ícone Vetorial SVG do Instituto de Neuropsicopedagogia (Representação fiel do Logo) */}
      <svg
        className="h-10 w-10 flex-shrink-0"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Arco Dourado Externo */}
        <path
          d="M 25,100 A 75,75 0 0,1 175,100"
          stroke="#F59E0B"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
        
        {/* Hemisfério Esquerdo do Cérebro (Verde/Esmeralda) */}
        <path
          className="logo-brain-left"
          d="M 100,45 
             C 85,45 70,50 65,65 
             C 60,75 68,85 62,95 
             C 56,105 45,110 50,125 
             C 54,135 68,135 75,145
             C 80,150 90,152 100,152 
             Z"
          fill="#10B981"
          opacity="0.9"
        />
        
        {/* Hemisfério Direito do Cérebro (Magenta/Roxo) */}
        <path
          className="logo-brain-right"
          d="M 100,45 
             C 115,45 130,50 135,65 
             C 140,75 132,85 138,95 
             C 144,105 155,110 150,125 
             C 146,135 132,135 125,145
             C 120,150 110,152 100,152 
             Z"
          fill="#D90429"
          opacity="0.9"
        />
        
        {/* Sulco Central do Cérebro */}
        <line x1="100" y1="45" x2="100" y2="152" stroke="#03071E" strokeWidth="4" />
        
        {/* Mãos que Sustentam/Envolvem (Azul Marinho) */}
        {/* Mão Esquerda */}
        <path
          d="M 40,110 
             C 30,125 35,145 55,165 
             C 70,180 90,185 100,185 
             C 90,180 80,170 75,155
             C 70,140 65,120 40,110 Z"
          fill="#3F37C9"
        />
        {/* Mão Direita */}
        <path
          d="M 160,110 
             C 170,125 165,145 145,165 
             C 130,180 110,185 100,185 
             C 110,180 120,170 125,155
             C 130,140 135,120 160,110 Z"
          fill="#3F37C9"
        />

        {/* Silhueta das Pessoas no Centro (Representando Inclusão e Família) */}
        <circle cx="100" cy="98" r="8" fill="#F8FAFC" />
        <path d="M 90,120 C 90,110 110,110 110,120 Z" fill="#F8FAFC" />
        
        <circle cx="85" cy="105" r="6" fill="#F8FAFC" opacity="0.8" />
        <path d="M 77,122 C 77,114 93,114 93,122 Z" fill="#F8FAFC" opacity="0.8" />
        
        <circle cx="115" cy="105" r="6" fill="#F8FAFC" opacity="0.8" />
        <path d="M 107,122 C 107,114 123,114 123,122 Z" fill="#F8FAFC" opacity="0.8" />

        {/* Escudo de Proteção/Segurança na Base */}
        <path
          d="M 85,140 
             L 115,140 
             C 115,158 100,168 100,168 
             C 100,168 85,158 85,140 Z"
          fill="#03071E"
          stroke="#F59E0B"
          strokeWidth="3"
        />
        
        {/* Estrela Dourada no Escudo */}
        <path
          d="M 100,145 
             L 102,150 
             L 107,150 
             L 103,153 
             L 105,158 
             L 100,155 
             L 95,158 
             L 97,153 
             L 93,150 
             L 98,150 Z"
          fill="#F59E0B"
        />
      </svg>
      
      {/* Texto do Logotipo */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`text-[10px] tracking-[0.25em] font-semibold uppercase ${sloganColor}`}>
            Instituto de
          </span>
          <span className={`text-sm font-bold tracking-wider uppercase font-title ${textColor}`}>
            Neuropsicopedagogia
          </span>
          {!hideTagline && (
            <span className={`text-[9px] tracking-[0.11em] font-semibold uppercase ${subtitleColor}`}>
              Aplicada e Educação Inclusiva
            </span>
          )}
        </div>
      )}
    </div>
  );
};
