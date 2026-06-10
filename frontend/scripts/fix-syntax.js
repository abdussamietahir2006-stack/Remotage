import fs from 'fs';
import path from 'path';

const filePath = path.resolve('components/admin/cms/CMSBlog.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const targetLine = 'const handleEdit = (post: BlogPost) => { const cleanedSlug = post.slug.toLowerCase().replace(/^(https?:\\/\\/[^\\/]+)?(\\/)?blog\\//i, " \\).replace(/^\\/+/, \\\\).replace(/\\//g, \\-\\).replace(/[^a-z0-9\\s-]/g, \\\\).replace(/\\s+/g, \\-\\).replace(/-+/g, \\-\\); setForm({ ...post, slug: cleanedSlug }); setIsEditing(true); setView(\\edit\\); };';

const correctContent = `const handleEdit = (post: BlogPost) => {
    // Clean the slug defensively in case it contains leading slashes or blog/ prefixes
    const cleanedSlug = post.slug
      .toLowerCase()
      .replace(/^(https?:\\/\\/[^\\/]+)?(\\/)?blog\\//i, "")
      .replace(/^\\/+/, "")
      .replace(/\\//g, "-")
      .replace(/[^a-z0-9\\s-]/g, "")
      .replace(/\\s+/g, "-")
      .replace(/-+/g, "-");

    setForm({ ...post, slug: cleanedSlug });
    setIsEditing(true);
    setView('edit');
  };`;

if (content.includes(targetLine)) {
  content = content.replace(targetLine, correctContent);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Syntax successfully fixed in CMSBlog.tsx!');
} else {
  console.log('❌ Target line not found!');
  // Let's do a fallback replacement using index or regex if targetLine had subtle escaping differences
  const regex = /const handleEdit = \(post: BlogPost\) => \{ const cleanedSlug = post\.slug[\s\S]+?setView\(\\edit\\\); \};/;
  if (regex.test(content)) {
    content = content.replace(regex, correctContent);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Syntax successfully fixed via regex fallback!');
  } else {
    console.log('❌ Regex fallback also failed!');
  }
}
