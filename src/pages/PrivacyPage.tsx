import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Database, FileText, UserCheck, Scale } from 'lucide-react';
import { PageMeta } from '../components/UI/PageMeta';

export const PrivacyPage: React.FC = () => {
  const sections = [
    {
      icon: <Eye className="text-teal-400" size={24} />,
      title: '1. Quais dados coletamos?',
      text: 'Coletamos exclusivamente as informações de contato fornecidas voluntariamente por você através do nosso formulário institucional, tais como Nome Completo, Endereço de E-mail, Telefone/WhatsApp, Nome da Instituição e Cargo/Função corporativa.'
    },
    {
      icon: <Database className="text-purple-400" size={24} />,
      title: '2. Como utilizamos seus dados?',
      text: 'Os dados fornecidos são utilizados estritamente para o estabelecimento de contato comercial, atendimento de solicitações de propostas e parcerias, agendamento de apresentações corporativas de nossas soluções e envio de informações acadêmicas sobre os cursos de especialização solicitados.'
    },
    {
      icon: <ShieldCheck className="text-amber-400" size={24} />,
      title: '3. Segurança e Armazenamento',
      text: 'Implementamos controles técnicos rigorosos e boas práticas de segurança digital para assegurar a integridade dos dados fornecidos, prevenindo acessos não autorizados, perdas acidentais ou alterações indevidas. Seus dados não são compartilhados nem comercializados com nenhuma entidade parceira ou terceiros.'
    },
    {
      icon: <UserCheck className="text-rose-400" size={24} />,
      title: '4. Seus Direitos (LGPD)',
      text: 'Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você detém pleno direito sobre suas informações pessoais. A qualquer momento, você pode solicitar a confirmação do tratamento, acesso aos dados armazenados, correção de dados incompletos ou a exclusão definitiva dos seus registros de nossos bancos de dados.'
    },
    {
      icon: <Scale className="text-blue-400" size={24} />,
      title: '5. Bases Legais para Tratamento',
      text: 'Realizamos o tratamento de dados pessoais com base em fundamentos legais específicos, destacando-se o consentimento explícito do titular (obtido voluntariamente no envio de formulários), a execução de contratos institucionais e o legítimo interesse para comunicações acadêmicas e de assessoria solicitadas.'
    },
    {
      icon: <FileText className="text-emerald-400" size={24} />,
      title: '6. Contato com o DPO',
      text: 'Caso possua qualquer dúvida relacionada a esta Política de Privacidade ou deseje exercer seus direitos legais de retificação e exclusão de dados pessoais, entre em contato diretamente com o nosso encarregado de dados (DPO) através do e-mail: dpo@institutoneuropsicopedagogia.com.br.'
    }
  ];

  return (
    <section className="pt-28 pb-20 bg-neuro-darkBg relative overflow-hidden min-h-screen flex items-center justify-center">
      <PageMeta 
        title="Política de Privacidade" 
        description="Política de Privacidade e Proteção de Dados (LGPD) do Instituto de Neuropsicopedagogia. Transparência na coleta, uso e segurança dos seus dados." 
      />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-neuro-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neuro-accent/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-xs uppercase tracking-widest font-semibold text-neuro-accent block mb-2">
              Privacidade e Transparência
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gradient font-title">
              Política de Privacidade
            </h1>
            <p className="text-neuro-textSecondary text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Esta política estabelece as diretrizes de coleta, armazenamento e proteção de informações dos usuários em plena conformidade com a LGPD.
            </p>
          </motion.div>
        </div>

        {/* Grade de Informações de Privacidade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-12">
          {sections.map((sec, idx) => (
            <motion.div
              key={sec.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 bg-glass-card border-glow-premium rounded-xl flex flex-col justify-between"
            >
              <div>
                <div className="p-3 bg-neuro-darkBg rounded-lg w-fit mb-4">
                  {sec.icon}
                </div>
                <h2 className="text-lg font-bold font-title text-white mb-2">
                  {sec.title}
                </h2>
                <p className="text-xs sm:text-sm text-neuro-textSecondary leading-relaxed">
                  {sec.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rodapé de Consentimento da Página */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center pt-8 border-t border-white/5 text-xs text-neuro-textMuted leading-relaxed max-w-2xl mx-auto"
        >
          O Instituto de Neuropsicopedagogia reforça o seu compromisso inabalável com a ética, a transparência e a segurança das informações coletadas para a excelência acadêmica e a promoção de uma educação inclusiva. Esta política foi revisada e encontra-se vigente a partir de junho de 2026.
        </motion.div>
      </div>
    </section>
  );
};
