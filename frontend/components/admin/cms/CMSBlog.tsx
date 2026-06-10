"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import ImageDropZone from "./ImageDropZone";
import api from "@/lib/api";

interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  metaTitle: string;
  metaDescription: string;
  targetKeyword: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

const defaultPost: BlogPost = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  coverImage: "",
  author: "Remotage Team",
  status: "draft",
  metaTitle: "",
  metaDescription: "",
  targetKeyword: "",
  tags: [],
};

export default function CMSBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'edit'>('list');
  const [form, setForm] = useState<BlogPost>(defaultPost);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/blog?status=all");
      if (res.data?.success) {
        setPosts(res.data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.targetKeyword.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || post.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [posts, searchTerm, statusFilter]);

  const handleCreateNew = () => {
    setForm(defaultPost);
    setIsEditing(false);
    setView('edit');
  };

  const handleEdit = (post: BlogPost) => {
    // Clean the slug defensively in case it contains leading slashes or blog/ prefixes
    const cleanedSlug = post.slug
      .toLowerCase()
      .replace(/^(https?:\/\/[^\/]+)?(\/)?blog\//i, "")
      .replace(/^\/+/, "")
      .replace(/\//g, "-")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setForm({ ...post, slug: cleanedSlug });
    setIsEditing(true);
    setView('edit');
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      return;
    }
    try {
      const res = await api.delete(`/api/blog/${slug}`);
      if (res.data?.success) {
        alert("Blog post deleted successfully.");
        fetchPosts();
      }
    } catch (error) {
      alert("Failed to delete blog post.");
    }
  };

  const handleInputChange = (name: string, value: any) => {
    setForm(prev => {
      let val = value;
      if (name === "slug") {
        // Strip domain and blog prefix if typed/pasted
        let cleaned = value.toLowerCase()
          .replace(/^(https?:\/\/[^\/]+)?(\/)?blog\//i, "")
          .replace(/^\/+/, ""); // remove leading slashes

        // Convert any remaining slashes to hyphens
        cleaned = cleaned.replace(/\//g, "-");

        // Strip non-slug characters
        cleaned = cleaned.replace(/[^a-z0-9\s-]/g, "");

        val = cleaned
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");
      }
      
      const updated = { ...prev, [name]: val };
      
      // Auto-generate slug from title if it's a new post and title changes
      if (name === "title" && !isEditing) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim();
      }
      return updated;
    });
  };

  const handleTagsChange = (value: string) => {
    const arr = value.split(",").map(t => t.trim()).filter(t => t !== "");
    handleInputChange("tags", arr);
  };

  const handleImageUpload = useCallback(async (previewUrl: string | null, file: File | null) => {
    if (!file) {
      handleInputChange("coverImage", "");
      return;
    }
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await api.post("/api/cms/upload/image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const url = res.data.data?.url;
      if (url) {
        handleInputChange("coverImage", url);
      }
    } catch {
      alert("Cover image upload failed.");
    } finally {
      setUploadingImage(false);
    }
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) {
      alert("Title, Slug, and Content are required.");
      return;
    }

    setSaving(true);
    try {
      const cleanSlug = form.slug.replace(/^[-\/]+|[-\\\/]+$/g, "").toLowerCase().trim();
      const cleanForm = { ...form, slug: cleanSlug };

      if (isEditing) {
        // Edit requires put on old slug (using form._id or matching slug)
        // Since we lookup by slug, we query old slug. If slug changes, we handle that in backend.
        // We find the original post slug from the posts list using form._id
        const originalPost = posts.find(p => p._id === form._id);
        const requestSlug = originalPost ? originalPost.slug : form.slug;
        const cleanRequestSlug = requestSlug.replace(/^\/+|\/+$/g, "").toLowerCase().trim();

        await api.put(`/api/blog/${cleanRequestSlug}`, cleanForm);
      } else {
        await api.post("/api/blog", cleanForm);
      }
      
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setView('list');
        fetchPosts();
      }, 1500);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to save blog post.";
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  // Metrics calculators
  const contentWordCount = useMemo(() => {
    if (!form.content) return 0;
    return form.content.trim().split(/\s+/).filter(w => w.length > 0).length;
  }, [form.content]);

  const metaTitleCharCount = form.metaTitle?.length || 0;
  const metaDescriptionCharCount = form.metaDescription?.length || 0;

  if (loading && view === 'list') {
    return <div className="text-gray-400 text-sm">Loading blog posts...</div>;
  }

  return (
    <div className="space-y-6 max-w-6xl">
      {view === 'list' ? (
        // ── LIST VIEW ─────────────────────────────────────────────────────────────
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Blog Content Management</h1>
              <p className="text-gray-400 text-sm mt-1">
                Create, edit, and publish search-optimized articles for Remotage
              </p>
            </div>
            <button 
              onClick={handleCreateNew}
              className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-black font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition flex items-center gap-2 self-start sm:self-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Blog Post
            </button>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-4 bg-[#111] p-4 rounded-xl border border-white/[0.06]">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Search by title, slug, keyword..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]/50 transition text-sm"
              />
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex gap-2">
              <select 
                value={statusFilter} 
                onChange={e => setStatusFilter(e.target.value)}
                className="bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#D4AF37]/50 transition text-sm cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#111] border border-white/[0.06] rounded-2xl overflow-hidden">
            {filteredPosts.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                No blog posts found. Click "New Blog Post" to get started!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02] text-xs text-gray-400 uppercase tracking-wider">
                      <th className="p-4 pl-6">Title & Slug</th>
                      <th className="p-4">Target Keyword</th>
                      <th className="p-4">Author</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Published Date</th>
                      <th className="p-4 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {filteredPosts.map((post) => (
                      <tr key={post._id || post.slug} className="hover:bg-white/[0.01] transition-colors text-sm text-gray-300">
                        <td className="p-4 pl-6">
                          <p className="font-semibold text-white truncate max-w-[280px]">{post.title}</p>
                          <p className="text-gray-500 text-xs mt-0.5 truncate max-w-[280px] font-mono">/blog/{post.slug}</p>
                        </td>
                        <td className="p-4">
                          {post.targetKeyword ? (
                            <span className="px-2 py-0.5 rounded bg-[#D4AF37]/10 text-[#D4AF37] text-xs border border-[#D4AF37]/20">
                              {post.targetKeyword}
                            </span>
                          ) : (
                            <span className="text-gray-600 italic text-xs">None</span>
                          )}
                        </td>
                        <td className="p-4 text-gray-400">{post.author}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            post.status === 'published' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                              : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
                          }`}>
                            {post.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4 text-gray-400">
                          {post.publishedAt 
                            ? new Date(post.publishedAt).toLocaleDateString(undefined, {
                                year: 'numeric', month: 'short', day: 'numeric'
                              })
                            : <span className="text-gray-600">—</span>
                          }
                        </td>
                        <td className="p-4 pr-6 text-right space-x-2">
                          <button 
                            onClick={() => handleEdit(post)}
                            className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] text-xs transition"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(post.slug)}
                            className="px-3 py-1.5 rounded-lg border border-red-500/20 hover:bg-red-500/10 text-red-400 text-xs transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : (
        // ── EDIT/CREATE FORM VIEW ──────────────────────────────────────────────────
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
              </h1>
              <p className="text-gray-400 text-sm mt-0.5">
                {isEditing ? `Editing: ${form.title}` : "Provide details for the new blog article"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setView('list')}
                className="px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || uploadingImage}
                className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-black font-semibold text-sm hover:scale-[1.02] transition disabled:opacity-60"
              >
                {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Post"}
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left 2 Columns: Main Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Slug */}
              <div className="bg-[#111] p-6 rounded-2xl border border-white/[0.06] space-y-4">
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Article Details
                </h2>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter post title"
                    value={form.title}
                    onChange={e => handleInputChange("title", e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide flex justify-between">
                    <span>Slug (URL Path)</span>
                    <span className="text-gray-500 font-mono text-[10px]">Must be unique</span>
                  </label>
                  <div className="flex rounded-xl bg-[#0A0A0A] border border-white/10 focus-within:border-[#D4AF37]/50 transition overflow-hidden">
                    <span className="bg-white/[0.02] px-4 py-3 text-gray-500 text-sm font-mono border-r border-white/10 flex items-center select-none">
                      /blog/
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="how-to-outsource-lead-generation"
                      value={form.slug}
                      onChange={e => handleInputChange("slug", e.target.value)}
                      className="flex-1 bg-transparent px-4 py-3 text-white focus:outline-none text-sm font-mono"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Author</label>
                    <input
                      type="text"
                      value={form.author}
                      onChange={e => handleInputChange("author", e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Tags (comma separated)</label>
                    <input
                      type="text"
                      placeholder="marketing, outsourcing, leadgen"
                      value={form.tags.join(", ")}
                      onChange={e => handleTagsChange(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              <div className="bg-[#111] p-6 rounded-2xl border border-white/[0.06] space-y-2">
                <label className="block text-xs text-gray-400 uppercase tracking-wide">Excerpt (Summary)</label>
                <textarea
                  value={form.excerpt}
                  onChange={e => handleInputChange("excerpt", e.target.value)}
                  rows={2}
                  placeholder="Provide a quick 1-2 sentence description of the article..."
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition text-sm resize-none"
                />
              </div>

              {/* Content Editor */}
              <div className="bg-[#111] p-6 rounded-2xl border border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs text-gray-400 uppercase tracking-wide font-semibold">Content (Markdown)</label>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full ${
                    contentWordCount >= 1200 && contentWordCount <= 2000 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                  }`}>
                    {contentWordCount} words { (contentWordCount < 1200 || contentWordCount > 2000) && "(Target: 1,200 - 2,000)" }
                  </span>
                </div>
                <textarea
                  required
                  value={form.content}
                  onChange={e => handleInputChange("content", e.target.value)}
                  rows={16}
                  placeholder="Write in Markdown format. Use H2 (##) and H3 (###) for structure..."
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#D4AF37]/50 transition text-sm font-mono leading-relaxed"
                />
              </div>
            </div>

            {/* Right Column: SEO & Settings */}
            <div className="space-y-6">
              {/* Publishing Status */}
              <div className="bg-[#111] p-6 rounded-2xl border border-white/[0.06] space-y-4">
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />Publishing Status
                </h2>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Status</label>
                  <select
                    value={form.status}
                    onChange={e => handleInputChange("status", e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition text-sm cursor-pointer"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              {/* Cover Image */}
              <div className="bg-[#111] p-6 rounded-2xl border border-white/[0.06]">
                <ImageDropZone
                  label="Cover Image"
                  currentImage={form.coverImage}
                  onImageChange={handleImageUpload}
                  aspectRatio="landscape"
                />
                {uploadingImage && (
                  <p className="text-xs text-[#D4AF37] mt-2 animate-pulse">Uploading cover image...</p>
                )}
                {form.coverImage && (
                  <div className="mt-3">
                    <label className="block text-[10px] text-gray-500 font-mono select-all truncate">
                      {form.coverImage}
                    </label>
                  </div>
                )}
              </div>

              {/* Search Engine Optimization */}
              <div className="bg-[#111] p-6 rounded-2xl border border-white/[0.06] space-y-4">
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />SEO Settings
                </h2>
                
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Target Keyword</label>
                  <input
                    type="text"
                    placeholder="outsource lead generation"
                    value={form.targetKeyword}
                    onChange={e => handleInputChange("targetKeyword", e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition text-sm"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs text-gray-400 uppercase tracking-wide">Meta Title</label>
                    <span className={`text-[10px] font-mono ${
                      metaTitleCharCount <= 60 ? 'text-emerald-400' : 'text-rose-400 font-bold'
                    }`}>
                      {metaTitleCharCount}/60 chars
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Primary Keyword | Company Name"
                    value={form.metaTitle}
                    onChange={e => handleInputChange("metaTitle", e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition text-sm"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs text-gray-400 uppercase tracking-wide">Meta Description</label>
                    <span className={`text-[10px] font-mono ${
                      metaDescriptionCharCount <= 160 ? 'text-emerald-400' : 'text-rose-400 font-bold'
                    }`}>
                      {metaDescriptionCharCount}/160 chars
                    </span>
                  </div>
                  <textarea
                    value={form.metaDescription}
                    onChange={e => handleInputChange("metaDescription", e.target.value)}
                    rows={3}
                    placeholder="Brief description under 160 characters..."
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition text-sm resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

