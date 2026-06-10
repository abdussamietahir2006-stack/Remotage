import { dbConnect } from "@/lib/mongodb";
import { BlogPost } from "@/models/index";
import BlogList from "@/components/blog/BlogList";

// Allow next to cache but revalidate on update
export const revalidate = 60; 

export const metadata = {
  title: "Blog — Insights on Outsource Scaling & Operations",
  description:
    "Discover actionable advice, guides, and trends on outsourcing lead generation, customer support, bookkeeping, and digital operations for growing SMBs.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  await dbConnect();
  
  // Fetch published posts, sort by date
  const posts = await BlogPost.find({ status: "published" })
    .sort({ publishedAt: -1, createdAt: -1 })
    .lean();
    
  const serializedPosts = JSON.parse(JSON.stringify(posts));

  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-24 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider border border-[#D4AF37]/20">
            Remotage Blog
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            The Remote{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37] bg-clip-text text-transparent">
              Advantage
            </span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Expert strategies, industry data, and guides to help startups and SMBs scale operations, delegate tasks, and build high-performance remote teams.
          </p>
        </div>

        {/* Interactive Blog Cards & Filtering */}
        <BlogList initialPosts={serializedPosts} />
        
      </div>
    </main>
  );
}
