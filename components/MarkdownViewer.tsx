import React from 'react';

interface MarkdownViewerProps {
  content: string;
}

// A simple Markdown renderer to avoid heavy dependencies for this specific task
// It handles Headers, Bold, Italic, Lists, and Blockquotes
const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');
  
  return (
    <div className="prose prose-lg prose-slate max-w-none font-serif leading-relaxed text-gray-700">
      {lines.map((line, index) => {
        // H1
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-4xl font-bold text-danao-900 mt-8 mb-6 tracking-tight">{processInlineStyles(line.replace('# ', ''))}</h1>;
        }
        // H2 - Added ID generation for auto-scroll navigation
        if (line.startsWith('## ')) {
          const text = line.replace('## ', '');
          const id = getSectionId(text);
          return <h2 key={index} id={id} className="text-2xl font-bold text-danao-600 mt-10 mb-4 border-b pb-2 border-danao-100 scroll-mt-24">{processInlineStyles(text)}</h2>;
        }
        // H3
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold text-danao-900 mt-6 mb-2">{processInlineStyles(line.replace('### ', ''))}</h3>;
        }
        // Blockquotes
        if (line.trim().startsWith('> ')) {
          return (
            <blockquote key={index} className="border-l-4 border-danao-500 pl-4 italic text-gray-600 my-6 bg-danao-50 py-3 rounded-r shadow-sm">
              {processInlineStyles(line.replace(/^>\s?/, ''))}
            </blockquote>
          );
        }
        // List items
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
          return (
            <li key={index} className="ml-6 list-disc mb-2 pl-2 marker:text-danao-500">
              {processInlineStyles(line.replace(/^[-*]\s/, ''))}
            </li>
          );
        }
        // Empty lines
        if (line.trim() === '') {
          return <div key={index} className="h-4"></div>;
        }
        // Paragraphs
        return <p key={index} className="mb-4">{processInlineStyles(line)}</p>;
      })}
    </div>
  );
};

// Helper to determine ID based on header text
// Expanded to match the richer prompt keywords
const getSectionId = (text: string): string | undefined => {
  const lower = text.toLowerCase();
  if (lower.includes('history')) return 'history';
  if (lower.includes('adventure') || lower.includes('nature')) return 'adventure';
  if (lower.includes('culture') || lower.includes('festival') || lower.includes('heritage')) return 'culture';
  if (lower.includes('food') || lower.includes('delicacies') || lower.includes('gastronomic')) return 'food';
  return undefined;
};

// Helper to handle bold (**) and italic (*)
const processInlineStyles = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} className="italic text-gray-800">{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

export default MarkdownViewer;