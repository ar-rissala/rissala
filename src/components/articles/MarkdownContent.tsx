"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Calendar, Target, Award, Info } from 'lucide-react';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  // Pre-process content to handle custom containers and components
  const processedContent = content
    // Handle info/warning boxes
    .replace(/:::(info|warning)\s*(?:###\s*(.*?)\s*\n)?([\s\S]*?)\s*:::/g, (match, type, title, content) => {
      const bgColor = type === 'warning' ? 'bg-amber-500/10 border-amber-500/20' : 'bg-muted/30 border-border/50';
      const titleColor = type === 'warning' ? 'text-amber-500' : 'text-foreground';
      return `<div class="${bgColor} border rounded-xl p-6 my-8">` +
             (title ? `<p class="text-lg font-bold ${titleColor} mb-2">${title}</p>` : '') +
             `<div class="text-sm text-muted-foreground">${content}</div></div>`;
    })
    // Handle Cards for Method Page
    .replace(/:::card\s*icon=(.*?)\s*title=(.*?)\s*\n([\s\S]*?)\s*:::/g, 
      '<div class="step-card flex flex-col items-center text-center p-6 rounded-xl border border-border/50 bg-card/50">' +
      '<div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary"><span class="icon-placeholder" data-icon="$1"></span></div>' +
      '<h3 class="font-bold mb-2">$2</h3>' +
      '<p class="text-sm text-muted-foreground">$3</p></div>');

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-table:border prose-table:border-border/50 prose-th:bg-muted/50 prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-12 mb-6 text-foreground" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-8 mb-4 text-foreground" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary bg-primary/5 py-4 px-6 my-8 rounded-r-lg italic text-foreground" {...props} />,
          table: ({node, ...props}) => (
            <div className="table-wrapper my-8 overflow-x-auto border border-border/50 rounded-xl">
              <table className="w-full text-sm text-left" {...props} />
            </div>
          ),
          th: ({node, ...props}) => <th className="bg-muted/50 px-4 py-3 font-bold text-foreground border-b border-border/50" {...props} />,
          td: ({node, ...props}) => <td className="px-4 py-3 border-b border-border/50 text-muted-foreground" {...props} />,
          // Map placeholder to real icons
          span: ({node, className, ...props}: any) => {
            if (className === 'icon-placeholder') {
              const iconName = (props as any)['data-icon'];
              if (iconName === 'Calendar') return <Calendar className="w-6 h-6" />;
              if (iconName === 'Target') return <Target className="w-6 h-6" />;
              if (iconName === 'Award') return <Award className="w-6 h-6" />;
            }
            return <span className={className} {...props} />;
          }
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
