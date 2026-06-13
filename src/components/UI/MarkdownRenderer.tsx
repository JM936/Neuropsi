import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Função para parsear estilos inline: Negrito, Itálico e Links
  const parseInlineStyles = (text: string): React.ReactNode[] => {
    // Expressões regulares para marcar os elementos inline
    // 1. Negrito: **texto** ou __texto__
    // 2. Itálico: *texto* ou _texto_
    // 3. Link: [texto](url)
    
    const parts: React.ReactNode[] = [];
    let currentIndex = 0;
    
    // Expressão regular unificada para encontrar as tags inline
    // Grupo 1: Negrito (**...**)
    // Grupo 2: Itálico (*...*)
    // Grupo 3: Link ([...](...)) -> Grupo 4 (texto), Grupo 5 (url)
    const inlineRegex = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
    
    let match;
    let keyCounter = 0;
    
    while ((match = inlineRegex.exec(text)) !== null) {
      const matchIndex = match.index;
      
      // Adiciona texto plano antes do match, se houver
      if (matchIndex > currentIndex) {
        parts.push(text.slice(currentIndex, matchIndex));
      }
      
      if (match[1]) {
        // Negrito
        parts.push(<strong key={keyCounter++} className="font-bold text-neuro-textPrimary">{match[2]}</strong>);
      } else if (match[3]) {
        // Itálico
        parts.push(<em key={keyCounter++} className="italic text-neuro-textPrimary">{match[4]}</em>);
      } else if (match[5]) {
        // Link
        parts.push(
          <a
            key={keyCounter++}
            href={match[7]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neuro-accent hover:underline font-semibold transition-colors duration-200"
          >
            {match[6]}
          </a>
        );
      }
      
      currentIndex = inlineRegex.lastIndex;
    }
    
    // Adiciona o restante do texto pós-último match
    if (currentIndex < text.length) {
      parts.push(text.slice(currentIndex));
    }
    
    return parts.length > 0 ? parts : [text];
  };

  // Separa o conteúdo em blocos separados por linhas em branco
  const blocks = content.split(/\n\s*\n/);

  return (
    <div className="space-y-6 text-neuro-textSecondary leading-relaxed text-sm sm:text-base">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Cabeçalhos H3: ### Título
        if (trimmed.startsWith('###')) {
          const title = trimmed.replace(/^###\s*/, '');
          return (
            <h3 key={index} className="text-xl sm:text-2xl font-extrabold font-title text-neuro-textPrimary mt-8 mb-4 border-l-4 border-neuro-primary pl-3">
              {parseInlineStyles(title)}
            </h3>
          );
        }

        // Cabeçalhos H2: ## Título
        if (trimmed.startsWith('##')) {
          const title = trimmed.replace(/^##\s*/, '');
          return (
            <h2 key={index} className="text-2xl sm:text-3xl font-extrabold font-title text-neuro-textPrimary mt-10 mb-5 border-l-4 border-neuro-primary pl-4">
              {parseInlineStyles(title)}
            </h2>
          );
        }

        // Cabeçalhos H1: # Título
        if (trimmed.startsWith('#')) {
          const title = trimmed.replace(/^#\s*/, '');
          return (
            <h1 key={index} className="text-3xl sm:text-4xl font-extrabold font-title text-neuro-textPrimary mt-12 mb-6">
              {parseInlineStyles(title)}
            </h1>
          );
        }

        // Linha Horizontal (Divider): --- ou ***
        if (trimmed === '---' || trimmed === '***') {
          return <hr key={index} className="border-neuro-border/40 my-8" />;
        }

        // Listas não ordenadas: linhas começando com '-' ou '*'
        if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
          const lines = trimmed.split('\n');
          return (
            <ul key={index} className="list-disc pl-6 space-y-2.5 my-4">
              {lines.map((line, lineIdx) => {
                const itemText = line.replace(/^[-*]\s*/, '');
                return (
                  <li key={lineIdx} className="text-neuro-textSecondary text-sm sm:text-base">
                    {parseInlineStyles(itemText)}
                  </li>
                );
              })}
            </ul>
          );
        }

        // Caso padrão: Parágrafo normal
        return (
          <p key={index} className="leading-relaxed text-justify">
            {parseInlineStyles(trimmed)}
          </p>
        );
      })}
    </div>
  );
};
