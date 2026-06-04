import { dbConnect } from '@/lib/mongodb';
import { PageContent } from '@/models/index';

export async function getPageContent(pageSlug: string) {
  try {
    await dbConnect();
    const page = await PageContent.findOne({ pageSlug }).lean();
    if (page) {
      // Safe serialization for Next.js Server Components
      return JSON.parse(JSON.stringify(page));
    }
    return { pageSlug, content: {}, images: {}, sections: [] };
  } catch (error) {
    console.error(`Error fetching page content for ${pageSlug}:`, error);
    return { pageSlug, content: {}, images: {}, sections: [] };
  }
}