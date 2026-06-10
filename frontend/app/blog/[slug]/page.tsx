import { dbConnect } from "@/lib/mongodb";
import { BlogPost } from "@/models/index";
import { parseMarkdownToHtml } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 60; // Cache but revalidate every minute

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

// ── DYNAMIC METADATA GENERATION ─────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = 'then' in params ? await params : params;
  const { slug } = resolvedParams;

  await dbConnect();
  const post = await BlogPost.findOne({ slug, status: "published" }).lean();
  
  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const title = post.metaTitle || `${post.title} | Remotage`;
  const description = post.metaDescription || post.excerpt;
  const canonicalUrl = `https://www.remotage.com/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.publishedAt || post.createdAt,
      authors: [post.author || "Remotage Team"],
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

// ── COMPONENT RENDER ────────────────────────────────────────────────────────
export default async function BlogPostDetailPage({ params }: PageProps) {
  const resolvedParams = 'then' in params ? await params : params;
  const { slug } = resolvedParams;

  await dbConnect();
  const post = await BlogPost.findOne({ slug, status: "published" }).lean();

  if (!post) {
    notFound();
  }

  const htmlContent = parseMarkdownToHtml(post.content);
  
  // Calculate reading time
  const words = post.content ? post.content.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : "Draft";

  // Injected JSON-LD Article Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || post.metaDescription,
    "image": post.coverImage || "https://www.remotage.com/default-cover.png",
    "datePublished": post.publishedAt || post.createdAt,
    "dateModified": post.updatedAt || post.createdAt,
    "author": {
      "@type": "Organization",
      "name": "Remotage",
      "url": "https://www.remotage.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Remotage",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.remotage.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.remotage.com/blog/${post.slug}`
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-24">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Back Link */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] text-xs font-semibold uppercase tracking-wider transition-colors group"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* Heading Header */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 items-center text-xs">
            {post.tags && (post.tags as string[]).map((tag: string) => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-400 font-semibold tracking-wider uppercase text-[10px]">
                {tag}
              </span>
            ))}
            <span className="text-gray-500 font-medium ml-2">•</span>
            <span className="text-gray-500 font-medium">{readingTime} min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-sm font-bold uppercase">
              {post.author ? post.author.substring(0, 2) : "RT"}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{post.author || "Remotage Team"}</p>
              <p className="text-gray-500 text-xs mt-0.5">Published on {formattedDate}</p>
            </div>
          </div>
        </div>

        {/* Cover image banner */}
        {post.coverImage && (
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/[0.06] bg-black/20">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article content parsed from markdown */}
        <article 
          className="prose prose-invert max-w-none text-gray-300 space-y-6 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-black via-white/[0.02] to-black border border-[#D4AF37]/20 rounded-3xl p-8 sm:p-10 text-center space-y-6 mt-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
          
          <div className="max-w-xl mx-auto space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Ready to scale your business operations?
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Outsource lead generation, customer support, marketing, bookkeeping and more to expert remote assistants. Eliminate administrative bloat today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link 
              href="/contact"
              className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2"
            >
              Book Free Audit & Consultation
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
