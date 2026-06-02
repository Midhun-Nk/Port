const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables manually
function loadEnv() {
  const envPaths = ['.env.local', '.env'];
  let loaded = false;
  for (const envPath of envPaths) {
    const fullPath = path.resolve(process.cwd(), envPath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const firstEqual = trimmed.indexOf('=');
          if (firstEqual !== -1) {
            const key = trimmed.slice(0, firstEqual).trim();
            const value = trimmed.slice(firstEqual + 1).trim().replace(/^['"]|['"]$/g, '');
            process.env[key] = value;
          }
        }
      }
      loaded = true;
    }
  }
  return loaded;
}

async function run() {
  // 1. Load env variables
  if (!loadEnv()) {
    console.error('Error: Could not find .env or .env.local file in the current working directory.');
    process.exit(1);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined in your env file.');
    process.exit(1);
  }

  // 2. Resolve JSON file path
  const jsonArg = process.argv[2] || 'blog-template.json';
  const jsonPath = path.resolve(process.cwd(), jsonArg);

  if (!fs.existsSync(jsonPath)) {
    console.error(`Error: JSON file not found at path: ${jsonPath}`);
    console.error('Usage: node scripts/import-blog.js [path-to-json-file]');
    process.exit(1);
  }

  console.log(`Reading blog data from: ${jsonPath}`);
  
  let blogData;
  try {
    const rawContent = fs.readFileSync(jsonPath, 'utf8');
    blogData = JSON.parse(rawContent);
  } catch (err) {
    console.error('Error: Failed to parse JSON file.', err.message);
    process.exit(1);
  }

  // Validate required fields
  if (!blogData.title || !blogData.slug) {
    console.error('Error: JSON data must contain both "title" and "slug".');
    process.exit(1);
  }

  // 3. Connect to Supabase
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // 4. Construct payload matching database schema
  const payload = {
    title: blogData.title,
    slug: blogData.slug,
    excerpt: blogData.excerpt || '',
    content: blogData.content || '',
    topic: blogData.topic || 'General',
    subtopic: blogData.subtopic || null,
    tags: Array.isArray(blogData.tags) ? blogData.tags : [],
    cover_image: blogData.cover_image || null,
    youtube_url: blogData.youtube_url || null,
    seo_title: blogData.seo_title || blogData.title,
    seo_description: blogData.seo_description || blogData.excerpt || '',
    seo_keywords: blogData.seo_keywords || null,
    og_image: blogData.og_image || blogData.cover_image || null,
    published: blogData.published !== undefined ? blogData.published : true,
    featured: blogData.featured !== undefined ? blogData.featured : false,
    read_time: blogData.read_time ? Number(blogData.read_time) : null,
    author: blogData.author || 'Midhun NK',
    subtopics: Array.isArray(blogData.subtopics) 
      ? blogData.subtopics.map((sub) => ({
          title: sub.title || null,
          image: sub.image || null,
          details: sub.details || null,
          unordered_list: Array.isArray(sub.unordered_list) ? sub.unordered_list : null,
          ordered_list: Array.isArray(sub.ordered_list) ? sub.ordered_list : null,
          video_url: sub.video_url || null,
          web_url: sub.web_url || null,
          code_snippet: sub.code_snippet || null
        }))
      : []
  };

  console.log(`Upserting blog post: "${payload.title}" (slug: ${payload.slug})...`);

  // 5. Upsert into Supabase
  const { data, error } = await supabase
    .from('blogs')
    .upsert(payload, { onConflict: 'slug' })
    .select();

  if (error) {
    console.error('Error inserting into Supabase:', error.message);
    process.exit(1);
  }

  console.log('Success! Blog post inserted/updated successfully.');
  if (data && data[0]) {
    console.log(`Inserted ID: ${data[0].id}`);
    console.log(`Route: /blog/${data[0].slug}`);
  }
}

run();
