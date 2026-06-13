import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { supabase } from '../lib/supabase';
import { useCorporateContact } from '../hooks/useCorporateContact';
import { PageMeta } from '../components/UI/PageMeta';

// Função auxiliar para aplicar a máscara de telefone brasileiro (DDD + 9 ou 8 dígitos)
const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  const limited = digits.slice(0, 11);
  
  if (limited.length === 0) {
    return '';
  }
  if (limited.length <= 2) {
    return `(${limited}`;
  }
  if (limited.length <= 6) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
  }
  if (limited.length <= 10) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 6)}-${limited.slice(6)}`;
  }
  return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
};

const generateMathChallenge = () => {
  const num1 = Math.floor(Math.random() * 9) + 1;
  const num2 = Math.floor(Math.random() * 9) + 1;
  return {
    question: `${num1} + ${num2}`,
    answer: num1 + num2
  };
};

export const ContactPage: React.FC = () => {
  const { contactInfo } = useCorporateContact();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    role: '',
    message: ''
  });

  const [honeypot, setHoneypot] = useState('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [challenge, setChallenge] = useState(() => generateMathChallenge());
  const [userAnswer, setUserAnswer] = useState('');

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'O nome é obrigatório';
    if (!formData.email.trim()) {
      tempErrors.email = 'O e-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Formato de e-mail inválido';
    }
    
    // Validação de telefone formatado (mínimo de 10 dígitos numéricos: DDD + 8 dígitos)
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      tempErrors.phone = 'O telefone/WhatsApp é obrigatório';
    } else if (phoneDigits.length < 10) {
      tempErrors.phone = 'O número deve conter o DDD e pelo menos 8 dígitos';
    }
    
    // Validação do Captcha Matemático
    if (!userAnswer.trim()) {
      tempErrors.captcha = 'Responda à pergunta de segurança';
    } else if (parseInt(userAnswer.trim(), 10) !== challenge.answer) {
      tempErrors.captcha = 'Resposta incorreta. Tente novamente.';
    }
    
    if (!formData.message.trim()) tempErrors.message = 'Escreva sua mensagem ou dúvida';
    if (!acceptedPrivacy) tempErrors.privacy = 'Você deve aceitar a Política de Privacidade para enviar';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    if (name === 'phone') {
      processedValue = formatPhoneNumber(value);
    }
    
    setFormData(prev => ({ ...prev, [name]: processedValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    
    try {
      // Se o honeypot estiver preenchido, simulamos sucesso silenciosamente contra bots (proteção básica)
      if (honeypot.trim()) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          institution: '',
          role: '',
          message: ''
        });
        setHoneypot('');
        setAcceptedPrivacy(false);
        setUserAnswer('');
        setChallenge(generateMathChallenge());
        return;
      }

      // Envia os dados de contato de forma estruturada e assíncrona ao Supabase
      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            institution: formData.institution.trim() || null,
            role: formData.role.trim() || null,
            message: formData.message.trim()
          }
        ]);

      if (error) {
        throw error;
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        institution: '',
        role: '',
        message: ''
      });
      setHoneypot('');
      setAcceptedPrivacy(false);
      setUserAnswer('');
      setChallenge(generateMathChallenge());
    } catch (error) {
      console.error('Erro ao registrar mensagem no Supabase:', error);
      setStatus('error');
      setChallenge(generateMathChallenge());
    }
  };

  return (
    <section className="pt-28 pb-20 bg-neuro-darkBg relative overflow-hidden min-h-screen flex items-center justify-center">
      <PageMeta 
        title="Fale Conosco" 
        description="Entre em contato com nossa equipe de especialistas e peritos do Instituto de Neuropsicopedagogia para demandas em educação, saúde ou segurança." 
      />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-neuro-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neuro-accent/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        
        {/* Chamada de Impacto */}
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-xs uppercase tracking-widest font-semibold text-neuro-accent block mb-2">
              Contato Institucional
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gradient font-title">
              Fale Conosco
            </h1>
            <p className="text-neuro-textSecondary text-base sm:text-lg max-w-xl mx-auto">
              Nossa equipe de especialistas está pronta para assessorar sua escola, município ou corporação privada.
            </p>
          </motion.div>
        </div>

        {/* Bloco de Contato (Formulário + Informações Físicas) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Lado Esquerdo: Formulário */}
          <div className="lg:col-span-7 bg-glass/65 border-glow-premium p-6 sm:p-10 rounded-2xl shadow-glass flex flex-col justify-between">
            <h2 className="text-xl font-bold font-title text-white mb-6 flex items-center gap-2">
              <Mail className="text-neuro-accent" size={22} />
              Envie uma Mensagem para nossa Equipe
            </h2>

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
                  placeholder="Descreva a demanda..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message}</p>}
              </div>

              {/* Campo Honeypot para proteção contra bots (invisível para humanos) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_url">Website URL</label>
                <input
                  type="text"
                  id="website_url"
                  name="website_url"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Desafio de Segurança (Captcha Matemático) */}
              <div className="space-y-1.5">
                <label htmlFor="userAnswer" className="block text-xs font-semibold uppercase tracking-wider text-neuro-textSecondary mb-1.5">
                  Pergunta de Segurança: Quanto é {challenge.question}? *
                </label>
                <input
                  type="text"
                  id="userAnswer"
                  name="userAnswer"
                  value={userAnswer}
                  onChange={(e) => {
                    setUserAnswer(e.target.value);
                    if (errors.captcha) {
                      setErrors(prev => ({ ...prev, captcha: '' }));
                    }
                  }}
                  className={`w-full max-w-[180px] px-4 py-2.5 rounded-lg bg-neuro-darkBg/80 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-neuro-primary transition-all duration-300 ${
                    errors.captcha ? 'border-red-500 focus:ring-red-500' : 'border-neuro-border'
                  }`}
                  placeholder="Sua resposta"
                  autoComplete="off"
                />
                {errors.captcha && <p className="text-red-500 text-xs mt-1 font-medium">{errors.captcha}</p>}
              </div>

              {/* Checkbox de Consentimento LGPD */}
              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="acceptedPrivacy"
                    checked={acceptedPrivacy}
                    onChange={(e) => {
                      setAcceptedPrivacy(e.target.checked);
                      if (errors.privacy) {
                        setErrors(prev => ({ ...prev, privacy: '' }));
                      }
                    }}
                    className={`mt-1 h-4 w-4 rounded border bg-neuro-darkBg/80 text-neuro-primary focus:ring-neuro-primary transition-colors cursor-pointer ${
                      errors.privacy ? 'border-red-500' : 'border-neuro-border'
                    }`}
                  />
                  <label htmlFor="acceptedPrivacy" className="text-xs text-neuro-textSecondary leading-normal cursor-pointer select-none">
                    Declaro que li e concordo com a{' '}
                    <Link to="/privacidade" className="text-neuro-accent hover:underline font-semibold">
                      Política de Privacidade
                    </Link>{' '}
                    para o tratamento dos meus dados de contato institucional. *
                  </label>
                </div>
                {errors.privacy && <p className="text-red-500 text-xs font-medium">{errors.privacy}</p>}
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
                      Mensagem enviada com sucesso!
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
                      Erro ao enviar.
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
                  {contactInfo.title}
                </h3>
                <p className="text-sm text-neuro-textSecondary leading-relaxed">
                  {contactInfo.description}
                </p>
              </div>

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
                      href={contactInfo.whatsappUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-neuro-textSecondary hover:text-white transition-colors"
                    >
                      {contactInfo.phone}
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
                      href={`mailto:${contactInfo.email}`} 
                      className="text-sm text-neuro-textSecondary hover:text-white transition-colors"
                    >
                      {contactInfo.email}
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
                    <p className="text-sm text-neuro-textSecondary leading-relaxed">
                      {contactInfo.address.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < contactInfo.address.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-xs text-neuro-textMuted leading-relaxed">
              {contactInfo.footerDisclaimer}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
