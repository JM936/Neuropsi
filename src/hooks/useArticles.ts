import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Article } from '../types';

interface ArticleRow {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  content: string;
  image_url: string | null;
  category: string;
  author_name: string;
  author_role: string;
  read_time: string;
  published_at: string;
  created_at: string;
}

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const cached = sessionStorage.getItem('neuropsi_articles');
      if (cached) {
        return JSON.parse(cached) as Article[];
      }
    } catch (err) {
      console.error('Erro ao ler artigos do sessionStorage:', err);
    }
    return [];
  });

  const [loading, setLoading] = useState<boolean>(() => {
    try {
      const cached = sessionStorage.getItem('neuropsi_articles');
      return !cached;
    } catch {
      return true;
    }
  });

  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  useEffect(() => {
    let active = true;

    const fetchArticles = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('articles')
          .select('*')
          .order('published_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        if (data && active) {
          const mapped: Article[] = (data as ArticleRow[]).map((item) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            tagline: item.tagline,
            content: item.content,
            imageUrl: item.image_url || undefined,
            category: item.category as Article['category'],
            authorName: item.author_name,
            authorRole: item.author_role,
            readTime: item.read_time,
            publishedAt: item.published_at,
            createdAt: item.created_at
          }));

          setArticles(mapped);
          setError(null);
          try {
            sessionStorage.setItem('neuropsi_articles', JSON.stringify(mapped));
          } catch (storageErr) {
            console.error('Erro ao salvar no sessionStorage:', storageErr);
          }
        }
      } catch (err) {
        console.error('Erro ao buscar os artigos no hook:', err);
        if (active) {
          setError('Não foi possível carregar os artigos. Por favor, tente novamente mais tarde.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void fetchArticles();

    return () => {
      active = false;
    };
  }, [refetchIndex]);

  const refetch = () => {
    setLoading(true);
    setRefetchIndex((prev) => prev + 1);
  };

  const getArticleBySlug = (slug: string): Article | undefined => {
    return articles.find(article => article.slug === slug);
  };

  return { articles, loading, error, refetch, getArticleBySlug };
};
