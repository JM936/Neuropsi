import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, User, Clock, ArrowRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';
import { PageMeta } from '../components/UI/PageMeta';
import { Button } from '../components/UI/Button';

export const BlogPage: React.FC = () => {
  const { articles, loading, error, refetch } = useArticles();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  // Categorias mapeadas com rótulos amigáveis
  const categories = [
    { id: 'todos', label: 'Todos os Artigos' },
    { id: 'educacao', label: 'Educação Inclusiva' },
    { id: 'saude', label: 'Saúde Pública' },
    { id: 'seguranca', label: 'Segurança Pública' },
    { id: 'neurociencia', label: 'Neurociência' }
  ];

  // Filtra artigos por categoria e busca textual
  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === 'todos' || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Função auxiliar para formatar a data ISO no padrão brasileiro
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return '';
    }
  };

  // Renderização do Loader de Esqueleto (Skeleton) com animação suave
  if (loading) {
    return (
      <section className="pt-28 pb-20 bg-neuro-darkBg min-h-screen relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-neuro-primary/5 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-pulse">
            <div className="h-4 w-28 bg-white/10 mx-auto rounded mb-3" />
            <div className="h-10 w-80 bg-white/10 mx-auto rounded mb-4" />
            <div className="h-5 w-96 bg-white/10 mx-auto rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="p-6 bg-glass-card rounded-2xl border border-neuro-border flex flex-col justify-between shadow-glass h-[420px] animate-pulse">
                <div>
                  <div className="h-48 bg-white/5 rounded-xl mb-4" />
                  <div className="h-4 w-24 bg-white/10 rounded mb-3" />
                  <div className="h-6 w-3/4 bg-white/10 rounded mb-4" />
                  <div className="h-4 w-full bg-white/10 rounded mb-2" />
                  <div className="h-4 w-5/6 bg-white/10 rounded" />
                </div>
                <div className="pt-4 border-t border-white/5 h-10 w-full bg-white/10 rounded-lg mt-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Fallback em caso de erro ao conectar ao Supabase
  if (error) {
    return (
      <section className="pt-28 pb-20 bg-neuro-darkBg min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-glass border border-red-500/30 rounded-2xl shadow-glass mx-4">
          <AlertCircle className="text-red-400 mx-auto mb-4" size={48} />
          <h3 className="text-lg font-bold text-white mb-2">Erro de Conexão</h3>
          <p className="text-sm text-neuro-textSecondary mb-6">{error}</p>
          <Button variant="primary" onClick={refetch} className="min-h-[44px] px-6">
            Tentar Novamente
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-28 pb-20 bg-neuro-darkBg min-h-screen relative overflow-hidden">
      <PageMeta 
        title="Artigos e Publicações" 
        description="Acesse nossa Central de Artigos e confira publicações científicas sobre neurociência aplicada, educação inclusiva, saúde e segurança." 
      />
      
      {/* Brilhos de Fundo */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-neuro-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neuro-accent/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-neuro-accent block mb-2">
            Central de Conhecimento
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gradient font-title mb-4">
            Artigos e Publicações Científicas
          </h1>
          <p className="text-neuro-textSecondary text-base sm:text-lg max-w-2xl mx-auto">
            Explora artigos produzidos por peritos com base em evidências científicas aplicadas aos nossos pilares de atuação.
          </p>
        </div>

        {/* Controles: Busca e Filtros de Categoria */}
        <div className="mb-12 space-y-6">
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="text-neuro-textSecondary" size={18} />
            </div>
            <input
              type="text"
              placeholder="Buscar artigos por palavra-chave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-neuro-cardBg/60 border border-neuro-border text-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-neuro-primary transition-all duration-300 min-h-[44px]"
            />
          </div>

          {/* Filtros de Categoria com acessibilidade de toque */}
          <div className="flex justify-center">
            <div 
              role="tablist" 
              aria-label="Filtro de Categorias"
              className="flex p-1.5 bg-neuro-cardBg/40 rounded-xl border border-neuro-border/80 max-w-full overflow-x-auto gap-2 scrollbar-none"
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                if (isActive) {
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className="px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap min-h-[44px] flex items-center bg-neuro-primary text-white shadow-glow"
                      role="tab"
                      aria-selected="true"
                    >
                      {cat.label}
                    </button>
                  );
                }
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap min-h-[44px] flex items-center text-neuro-textSecondary hover:text-white hover:bg-neuro-cardBg/30"
                    role="tab"
                    aria-selected="false"
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Grid de Artigos */}
        <AnimatePresence mode="popLayout">
          {filteredArticles.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredArticles.map((article, idx) => (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="p-5 bg-glass-card rounded-2xl border border-neuro-border flex flex-col justify-between shadow-glass group hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    {/* Banner do post */}
                    {article.imageUrl && (
                      <div className="relative rounded-xl overflow-hidden h-48 mb-4 bg-neuro-darkBg/60 border border-white/5 flex items-center justify-center">
                        <img 
                          src={article.imageUrl} 
                          alt={article.title} 
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neuro-darkBg/60 via-transparent to-transparent" />
                      </div>
                    )}

                    {/* Categoria e Leitura */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="px-2.5 py-0.5 text-xs font-semibold text-neuro-accent bg-neuro-accent/10 border border-neuro-accent/20 rounded-full capitalize">
                        {article.category === 'educacao' ? 'Educação Inclusiva' : 
                         article.category === 'saude' ? 'Saúde Pública' : 
                         article.category === 'seguranca' ? 'Segurança Pública' : article.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-neuro-textSecondary">
                        <Clock size={14} />
                        {article.readTime}
                      </div>
                    </div>

                    {/* Título e Tagline */}
                    <h2 className="text-lg sm:text-xl font-bold font-title text-neuro-textPrimary mb-2 leading-snug group-hover:text-neuro-accent transition-colors duration-300">
                      {article.title}
                    </h2>
                    
                    <p className="text-xs sm:text-sm text-neuro-textSecondary mb-6 line-clamp-3 leading-relaxed">
                      {article.tagline}
                    </p>
                  </div>

                  {/* Metadados e Link */}
                  <div className="pt-4 border-t border-white/5 mt-auto flex flex-col gap-4">
                    <div className="flex items-center justify-between text-xs text-neuro-textSecondary">
                      <span className="flex items-center gap-1 font-medium text-neuro-textPrimary">
                        <User size={13} className="text-neuro-primary" />
                        {article.authorName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={13} />
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>

                    <Link
                      to={`/blog/${article.slug}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold text-neuro-textPrimary bg-neuro-cardBg hover:bg-neuro-primary hover:text-white transition-all duration-300 min-h-[44px]"
                    >
                      Ler Artigo Completo
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 p-8 bg-glass-card border border-neuro-border rounded-2xl max-w-md mx-auto"
            >
              <p className="text-neuro-textSecondary text-sm mb-4">Nenhum artigo encontrado para a pesquisa ou categoria selecionada.</p>
              <Button 
                variant="outline" 
                onClick={() => { setSearchQuery(''); setSelectedCategory('todos'); }}
                className="min-h-[44px] px-6 mx-auto"
              >
                Limpar Filtros
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
