"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedAt?: string;
  createdAt: string;
  tags: string[];
  content: string;
}

interface BlogListProps {
  initialPosts: BlogPost[];
}

export default function BlogList({ initialPosts }: BlogListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    initialPosts.forEach(post => {
      if (Array.isArray(post.tags)) {
        post.tags.forEach(t => tagsSet.add(t));
      }
    });
    return Array.from(tagsSet);
  }, [initialPosts]);

  // Estimate reading time
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content ? content.trim().split(/\s+/).length : 0;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  const filteredPosts = useMemo(() => {
    return initialPosts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags && post.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [initialPosts, searchTerm, selectedTag]);

  return (
    <div className="space-y-12">
      {/* Search & Tag Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.02] border border-white/[0.06] p-6 rounded-2xl">
        <div className="w-full md:max-w-md relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50 transition text-sm"
          />
          <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Tags list */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-gray-400 text-xs mr-2 uppercase tracking-wider font-semibold">Filter by:</span>
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedTag === null
                ? "bg-[#D4AF37] text-black"
                : "bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.08]"
            }`}
          >
            All Posts
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedTag === tag
                  ? "bg-[#D4AF37] text-black"
                  : "bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364.364l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <p className="text-lg font-medium text-white mb-2">No articles found</p>
          <p className="text-sm">Try broadening your search criteria or tags</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const formattedDate = post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: 'numeric', month: 'long', day: 'numeric'
                })
              : "Draft";

            return (
              <article 
                key={post._id}
                className="group flex flex-col bg-[#111] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                {/* Cover Image */}
                <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden aspect-video bg-black/20">
                  <img
                    src={post.coverImage || "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Tags & Reading Time */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags && post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[#D4AF37] font-semibold tracking-wider uppercase text-[10px]">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-500 font-medium">
                        {getReadingTime(post.content)} min read
                      </span>
                    </div>

                    {/* Title */}
                    <Link href={`/blog/${post.slug}`} className="block">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                    </Link>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer metadata */}
                  <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between">
                    <div>
                      <p className="text-white text-xs font-semibold">{post.author}</p>
                      <p className="text-gray-500 text-[10px] mt-0.5">{formattedDate}</p>
                    </div>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-[#D4AF37] text-xs font-semibold flex items-center gap-1 group/btn"
                    >
                      Read More
                      <svg className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
