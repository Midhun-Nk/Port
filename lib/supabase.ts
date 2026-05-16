import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      blogs: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          topic: string;
          subtopic: string | null;
          tags: string[];
          cover_image: string | null;
          youtube_url: string | null;
          seo_title: string | null;
          seo_description: string | null;
          seo_keywords: string | null;
          og_image: string | null;
          published: boolean;
          featured: boolean;
          read_time: number | null;
          author: string;
          views: number;
        };
        Insert: Omit<Database['public']['Tables']['blogs']['Row'], 'id' | 'created_at' | 'updated_at' | 'views'>;
        Update: Partial<Database['public']['Tables']['blogs']['Insert']>;
      };
    };
  };
};
