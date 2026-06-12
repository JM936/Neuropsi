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
  variant
}) => {
  // Se variant for fornecida, usamos a cor chumbada. Caso contrário (padrão), usamos as classes dinâmicas de tema.
  const textColor = variant 
    ? (variant === 'light' ? 'text-white' : 'text-neuro-darkBg') 
    : 'text-neuro-textPrimary';
    
  const subtitleColor = variant 
    ? (variant === 'light' ? 'text-neuro-accent' : 'text-neuro-primary') 
    : 'text-neuro-accent';
    
  const sloganColor = variant 
    ? (variant === 'light' ? 'text-neuro-textSecondary' : 'text-neuro-textMuted') 
    : 'text-neuro-textSecondary';

  return (
    <div className={`flex items-center gap-3 select-none logo-container ${className}`}>
      <img
        src="/images/logo_symbol.png"
        alt="Logotipo do Instituto de Neuropsicopedagogia"
        className="h-full w-auto object-contain flex-shrink-0 logo-image-animate"
      />
      
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
