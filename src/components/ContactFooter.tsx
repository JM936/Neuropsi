import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { Send, Phone, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './UI/Button';
import { Logo } from './Logo';

export const ContactFooter: React.FC = () => {
  const location = useLocation();
  const isContactPage = location.pathname === '/contato';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    role: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'O nome é obrigatório';
    if (!formData.email.trim()) {
      tempErrors.email = 'O e-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Formato de e-mail inválido';
    }
    if (!formData.phone.trim()) tempErrors.phone = 'O telefone/WhatsApp é obrigatório';
    if (!formData.message.trim()) tempErrors.message = 'Escreva sua mensagem ou dúvida';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    
    setTimeout(() => {
      try {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          institution: '',
          role: '',
          message: ''
        });
      } catch {
        setStatus('error');
      }
    }, 1500);
  };

  return (
    <footer id="contact" className="bg-neuro-darkBgLight border-t border-neuro-border relative pt-20 pb-8 overflow-hidden">
      {/* Background soft lighting */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neuro-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Renderiza o formulário de rodapé apenas se não estiver na página de contato */}
        {!isContactPage && (
          <>
            {/* Chamada de Impacto Final */}
            <div className="text-center max-w-4xl mx-auto mb-16 px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-title leading-tight">
                  Sua instituição está preparada para os desafios da inclusão, da neurodiversidade e da saúde mental?
                </h2>
                <p className="text-neuro-textSecondary text-base sm:text-lg max-w-2xl mx-auto">
                  Nossa equipe de peritos e consultores está pronta para desenhar soluções customizadas para suas demandas.
                </p>
              </motion.div>
            </div>

            {/* Bloco de Contato (Formulário + Informações Físicas) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-stretch">
              
              {/* Lado Esquerdo: Formulário */}
              <div className="lg:col-span-7 bg-glass/65 border-glow-premium p-6 sm:p-10 rounded-2xl shadow-glass flex flex-col justify-between">
                <h3 className="text-xl font-bold font-title text-white mb-6 flex items-center gap-2">
                  <Mail className="text-neuro-accent" size={22} />
                  Envie uma Mensagem para nossa Equipe
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nome */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-neuro-textSecondary mb-1.5">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-neuro-darkBg/80 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-neuro-primary transition-all duration-300 ${
                          errors.name ? 'border-red-500 focus:ring-red-500' : 'border-neuro-border'
                        }`}
                        placeholder="Seu nome"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                    </div>

                    {/* E-mail */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-neuro-textSecondary mb-1.5">
                        E-mail Institucional ou Pessoal *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-neuro-darkBg/80 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-neuro-primary transition-all duration-300 ${
                          errors.email ? 'border-red-500 focus:ring-red-500' : 'border-neuro-border'
                        }`}
                        placeholder="exemplo@instituicao.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Telefone */}
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-neuro-textSecondary mb-1.5">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-neuro-darkBg/80 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-neuro-primary transition-all duration-300 ${
                          errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-neuro-border'
                        }`}
                        placeholder="(00) 00000-0000"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                    </div>

                    {/* Instituição */}
                    <div>
                      <label htmlFor="institution" className="block text-xs font-semibold uppercase tracking-wider text-neuro-textSecondary mb-1.5">
                        Instituição / Órgão Público
                      </label>
                      <input
                        type="text"
                        id="institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-neuro-darkBg/80 border border-neuro-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-neuro-primary transition-all duration-300"
                        placeholder="Nome da sua organização"
                      />
                    </div>
                  </div>

                  {/* Cargo */}
                  <div>
                    <label htmlFor="role" className="block text-xs font-semibold uppercase tracking-wider text-neuro-textSecondary mb-1.5">
                      Seu Cargo / Função
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-neuro-darkBg/80 border border-neuro-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-neuro-primary transition-all duration-300"
                      placeholder="Ex: Secretário de Educação, Gestor de RH, Diretor"
                    />
                  </div>

                  {/* Mensagem */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-neuro-textSecondary mb-1.5">
                      Mensagem / Detalhes da Solicitação *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-3 rounded-lg bg-neuro-darkBg/80 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-neuro-primary transition-all duration-300 ${
                        errors.message ? 'border-red-500 focus:ring-red-500' : 'border-neuro-border'
                      }`}
                      placeholder="Descreva a demanda da sua escola, município ou empresa..."
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message}</p>}
                  </div>

                  {/* Botão de Envio */}
                  <div className="pt-2 flex items-center justify-between gap-4">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={status === 'submitting'}
                      className="gap-2 px-8 shadow-glow min-h-[46px]"
                    >
                      <Send size={18} />
                      {status === 'submitting' ? 'Enviando...' : 'Falar com Nossa Equipe'}
                    </Button>

                    <AnimatePresence mode="wait">
                      {status === 'success' && (
                        <motion.div 
                          className="flex items-center gap-1.5 text-emerald-400 text-sm font-semibold"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <CheckCircle size={18} />
                          Recebemos seu contato! Retornaremos em breve.
                        </motion.div>
                      )}
                      {status === 'error' && (
                        <motion.div 
                          className="flex items-center gap-1.5 text-red-400 text-sm font-semibold"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <AlertCircle size={18} />
                          Erro ao enviar. Tente novamente mais tarde.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              </div>

              {/* Lado Direito: Informações Físicas */}
              <div className="lg:col-span-5 bg-glass-card border border-neuro-border p-6 sm:p-10 rounded-2xl flex flex-col justify-between">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold font-title text-white mb-2">
                      Atendimento Corporativo
                    </h3>
                    <p className="text-sm text-neuro-textSecondary leading-relaxed">
                      Oferecemos apresentações executivas estruturadas para secretários municipais, conselhos escolares, diretores de hospitais e comandos de segurança corporativa ou pública.
                    </p>
                  </div>

                  {/* Contatos Rápidos */}
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-neuro-darkBg rounded-lg text-neuro-accent border border-neuro-border">
                        <Phone size={20} />
                      </div>
                      <div>
                        <h4 className="text-xs uppercase font-bold text-white tracking-wider">
                          Telefone & WhatsApp
                        </h4>
                        <a 
                          href="https://wa.me/5511999999999" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm text-neuro-textSecondary hover:text-white transition-colors"
                        >
                          +55 (11) 99999-9999
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-neuro-darkBg rounded-lg text-neuro-primary border border-neuro-border">
                        <Mail size={20} />
                      </div>
                      <div>
                        <h4 className="text-xs uppercase font-bold text-white tracking-wider">
                          E-mail Institucional
                        </h4>
                        <a 
                          href="mailto:contato@institutoneuropsicopedagogia.com.br" 
                          className="text-sm text-neuro-textSecondary hover:text-white transition-colors"
                        >
                          contato@institutoneuropsicopedagogia.com.br
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-neuro-darkBg rounded-lg text-neuro-highlight border border-neuro-border">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h4 className="text-xs uppercase font-bold text-white tracking-wider">
                          Sede Administrativa
                        </h4>
                        <p className="text-sm text-neuro-textSecondary">
                          Av. Paulista, 1000 - Bela Vista<br />
                          São Paulo - SP, CEP 01310-100
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Aviso de Registro */}
                <div className="mt-8 pt-6 border-t border-white/5 text-xs text-neuro-textMuted leading-relaxed">
                  O Instituto de Neuropsicopedagogia é uma organização científica registrada, detentora dos registros de marcas intelectuais chanceladas pelo INPI para fomento de programas em neurociências aplicadas.
                </div>
              </div>

            </div>
          </>
        )}

        {/* Slogan Oficial em Destaque */}
        <div className="border-t border-b border-neuro-border/30 py-8 mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-neuro-accent mb-2">
            Slogan Oficial
          </p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold font-title text-gradient-primary">
            "Ciência, Comportamento e Estratégia para Transformar Vidas e Instituições"
          </p>
        </div>

        {/* Rodapé Final */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link to="/" aria-label="Ir para a página inicial">
            <Logo showText={true} className="h-10" />
          </Link>
          
          <p className="text-xs text-neuro-textMuted text-center md:text-right leading-relaxed">
            &copy; {new Date().getFullYear()} Instituto de Neuropsicopedagogia. Todos os direitos reservados.<br />
            Desenvolvido sob rígidos critérios científicos de acessibilidade e ergonomia mental.<br />
            <Link to="/privacidade" className="text-neuro-accent hover:underline font-semibold mt-1 inline-block">
              Política de Privacidade (LGPD)
            </Link>
          </p>
        </div>

      </div>
    </footer>
  );
};
