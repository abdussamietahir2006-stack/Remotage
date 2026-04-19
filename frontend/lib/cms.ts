const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getPageContent(pageSlug: string) {
  try {
    const res = await fetch(`${API}/api/cms/${pageSlug}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data.data ?? { pageSlug, content: {}, images: {} };
  } catch {
    return { pageSlug, content: {}, images: {} };
  }
}