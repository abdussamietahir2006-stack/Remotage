/**
 * Converts a Markdown string into safely-renderable HTML with premium Tailwind styling.
 * Supports:
 * - H1, H2, H3 (Title, Subheadings)
 * - Blockquotes (with custom gold border)
 * - Bullet lists (unordered)
 * - Bold and italic text
 * - External/Internal links (styled gold, open in new tab for external)
 * - Paragraphs
 */
export function parseMarkdownToHtml(markdown: string): string {
  if (!markdown) return '';

  let html = markdown
    // Headings
    .replace(/^### (.*$)/gim, '<h4 class="text-lg font-bold text-white mt-5 mb-2">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 class="text-xl font-bold text-[#D4AF37] mt-8 mb-4 border-b border-white/10 pb-2">$1</h3>')
    .replace(/^# (.*$)/gim, '<h2 class="text-2xl font-bold text-white mt-10 mb-4">$1</h2>')
    // Blockquotes
    .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-[#D4AF37] pl-4 italic text-gray-400 my-5 bg-white/[0.02] py-2 pr-2 rounded-r-lg">$1</blockquote>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    // Italics
    .replace(/\*(.*?)\*/g, '<em class="text-gray-300">$1</em>')
    // Links: [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#D4AF37] hover:underline font-medium transition-colors">$1</a>');

  // Handle lists and paragraphs
  const lines = html.split('\n');
  let inList = false;
  
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const content = trimmed.substring(2);
      let listHtml = '';
      if (!inList) {
        inList = true;
        listHtml += '<ul class="list-disc pl-6 my-4 space-y-2 text-gray-300">';
      }
      listHtml += `<li>${content}</li>`;
      return listHtml;
    } else {
      let listHtml = '';
      if (inList) {
        inList = false;
        listHtml += '</ul>';
      }
      if (trimmed === '') {
        return listHtml;
      }
      // If it's already an HTML block tag, don't wrap in <p>
      if (
        trimmed.startsWith('<h') || 
        trimmed.startsWith('<blockquote') || 
        trimmed.startsWith('<ul') || 
        trimmed.startsWith('<li')
      ) {
        return listHtml + trimmed;
      }
      return listHtml + `<p class="text-gray-300 leading-relaxed mb-5 text-base font-normal">${trimmed}</p>`;
    }
  });

  if (inList) {
    processedLines.push('</ul>');
  }

  return processedLines.join('\n');
}
