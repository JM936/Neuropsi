import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { CorporateContact } from '../types';

interface CorporateContactRow {
  id: number;
  title: string;
  description: string;
  phone: string;
  whatsapp_url: string;
  email: string;
  address: string;
  footer_disclaimer: string;
  updated_at: string;
}

// Contatos de fallback estáticos para garantir UX fluida sem falhas de rede (Layout Shift)
const DEFAULT_CONTACT_INFO: CorporateContact = {
  title: 'Atendimento Corporativo',
  description: 'Oferecemos apresentações executivas estruturadas para secretários municipais, conselhos escolares, diretores de hospitais e comandos de segurança corporativa ou pública.',
  phone: '+55 (11) 99999-9999',
  whatsappUrl: 'https://wa.me/5511999999999',
  email: 'contato@institutoneuropsicopedagogia.com.br',
  address: 'Av. Paulista, 1000 - Bela Vista\nSão Paulo - SP, CEP 01310-100',
  footerDisclaimer: 'O Instituto de Neuropsicopedagogia é uma organização científica registrada, detentora dos registros de marcas intelectuais chanceladas pelo INPI para fomento de programas em neurociências aplicadas.'
};

export const useCorporateContact = () => {
  const [contactInfo, setContactInfo] = useState<CorporateContact>(DEFAULT_CONTACT_INFO);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchContactInfo = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('corporate_contact')
          .select('*')
          .eq('id', 1)
          .maybeSingle();

        if (fetchError) {
          throw fetchError;
        }

        if (!active) return;

        if (data) {
          const row = data as CorporateContactRow;
          setContactInfo({
            title: row.title,
            description: row.description,
            phone: row.phone,
            whatsappUrl: row.whatsapp_url,
            email: row.email,
            address: row.address,
            footerDisclaimer: row.footer_disclaimer
          });
        }
      } catch (err) {
        console.error('Erro ao carregar contato corporativo do Supabase:', err);
        if (active) {
          setError('Não foi possível sincronizar os contatos com o servidor.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchContactInfo();

    return () => {
      active = false;
    };
  }, []);

  return { contactInfo, loading, error };
};
