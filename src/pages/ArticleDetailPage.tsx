import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import { MarkdownRenderer } from '../components/UI/MarkdownRenderer';
import { PageMeta } from '../components/UI/PageMeta';
import { Button } from '../components/UI/Button';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { loading, error, getArticleBySlug } = useArticles();
  const article = slug ? getArticleBySlug(slug) : null;

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
      <section className="pt-28 pb-20 bg-neuro-darkBg min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-32 bg-white/10 rounded mb-8 animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-6">
              <div className="h-96 bg-white/5 rounded-2xl animate-pulse" />
              <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
              <div className="h-10 w-3/4 bg-white/10 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-white/10 rounded animate-pulse" />
              <hr className="border-white/5" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-white/10 rounded animate-pulse" />
              </div>
            </div>
            <div className="lg:col-span-4 h-[300px] bg-white/5 rounded-2xl animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  // Se o artigo não for encontrado ou se houver erro
  if (!article) {
    return (
      <section className="pt-28 pb-20 bg-neuro-darkBg min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-glass border border-neuro-border rounded-2xl shadow-glass mx-4">
          <h3 className="text-xl font-bold text-white mb-2">Artigo Não Encontrado</h3>
          <p className="text-sm text-neuro-textSecondary mb-6">
            {error || 'O artigo que você está tentando acessar não existe ou foi removido.'}
          </p>
          <Link to="/blog">
            <Button variant="primary" className="min-h-[44px] px-6 mx-auto gap-2">
              <ArrowLeft size={16} />
              Voltar para o Blog
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-28 pb-20 bg-neuro-darkBg min-h-screen relative overflow-hidden">
      <PageMeta 
        title={article.title} 
        description={article.tagline} 
      />
      
      {/* Brilhos decorativos */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-neuro-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-neuro-accent/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Link de retorno com acessibilidade de toque */}
        <div className="mb-8">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neuro-textSecondary hover:text-white transition-colors duration-200 min-h-[44px] px-2"
          >
            <ArrowLeft size={18} />
            Voltar para Artigos
          </Link>
        </div>

        {/* Layout de duas colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Lado Esquerdo: Conteúdo Principal */}
          <article className="lg:col-span-8 bg-glass-card/45 border border-neuro-border/60 p-6 sm:p-10 rounded-2xl shadow-glass">
            
            {/* Categoria */}
            <span className="px-3 py-1 text-xs font-semibold text-neuro-accent bg-neuro-accent/10 border border-neuro-accent/20 rounded-full inline-block mb-4 capitalize">
              {article.category === 'educacao' ? 'Educação Inclusiva' : 
               article.category === 'saude' ? 'Saúde Pública' : 
               article.category === 'seguranca' ? 'Segurança Pública' : article.category}
            </span>

            {/* Título Principal */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-title text-white mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Descrição Curta / Tagline */}
            <p className="text-base sm:text-lg text-neuro-textSecondary italic border-l-4 border-neuro-accent pl-4 mb-8">
              {article.tagline}
            </p>

            {/* Imagem de Destaque */}
            {article.imageUrl && (
              <div className="rounded-xl overflow-hidden mb-8 border border-white/5 bg-neuro-darkBg max-h-[420px] flex items-center justify-center">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Metadados do Autor e Post */}
            <div className="flex flex-wrap gap-y-4 gap-x-6 items-center justify-between pb-6 mb-8 border-b border-neuro-border/40 text-xs sm:text-sm text-neuro-textSecondary">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-neuro-darkBg rounded-full text-neuro-primary border border-neuro-border">
                  <User size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-white leading-none mb-1">
                    {article.authorName}
                  </h4>
                  <p className="text-xs text-neuro-textMuted">
                    {article.authorRole}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-neuro-accent" />
                  {formatDate(article.publishedAt)}
                </span>
                <span className="hidden sm:inline text-neuro-textMuted">•</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={16} className="text-neuro-primary" />
                  {article.readTime}
                </span>
              </div>
            </div>

            {/* Conteúdo Renderizado em Markdown */}
            <MarkdownRenderer content={article.content} />
          </article>

          {/* Lado Direito: Sidebar de Conversão e Suporte */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Card CTA Corporativo / Municipal */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-glass-card border-glow-premium rounded-2xl shadow-glass relative overflow-hidden"
            >
              {/* Brilho de fundo decorativo */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-neuro-accent/5 rounded-full blur-2xl -z-10" />

              <h3 className="text-lg font-bold font-title text-white mb-3 flex items-center gap-2">
                <ShieldCheck size={20} className="text-neuro-accent" />
                Soluções para Órgãos Públicos
              </h3>
              
              <p className="text-xs sm:text-sm text-neuro-textSecondary leading-relaxed mb-6">
                Assessoramos prefeituras, escolas públicas e forças policiais a estruturar planos de atendimento, inclusão e treinamento de servidores baseados em ciência.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-neuro-accent rounded-full mt-2 flex-shrink-0" />
                  <p className="text-xs text-neuro-textSecondary">Treinamentos homologados em conformidade legal.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-neuro-accent rounded-full mt-2 flex-shrink-0" />
                  <p className="text-xs text-neuro-textSecondary">Emissão de pareceres técnicos e diagnósticos institucionais.</p>
                </div>
              </div>

              <div className="mt-8">
                <Link to="/contato">
                  <Button 
                    variant="primary" 
                    fullWidth 
                    className="gap-2 min-h-[44px]"
                  >
                    Falar com Especialista
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Card Contato Rápido */}
            <div className="p-6 bg-glass-card/45 border border-neuro-border/60 rounded-2xl shadow-glass">
              <h4 className="text-sm font-bold font-title text-white mb-4 flex items-center gap-2">
                <Mail size={16} className="text-neuro-primary" />
                Ficou com alguma dúvida?
              </h4>
              <p className="text-xs text-neuro-textSecondary leading-relaxed mb-6">
                Caso deseje sugerir algum tema científico para nossos peritos analisarem ou precise de atendimento clínico institucional, contate-nos.
              </p>
              <Link 
                to="/contato"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neuro-accent hover:text-white transition-colors uppercase tracking-wider min-h-[44px]"
              >
                Enviar Mensagem
                <ArrowRight size={14} />
              </Link>
            </div>
          </aside>

        </div>

      </div>
    </section>
  );
};
