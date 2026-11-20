import Link from 'next/link';
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

function renderInline(text: string, keyPrefix = 'inl'): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const tokenRegex =
    /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const key = `${keyPrefix}-${idx++}`;

    if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push(
        <strong key={key} className="font-semibold text-gray-900">
          {renderInline(token.slice(2, -2), key)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      nodes.push(
        <em key={key} className="italic">
          {renderInline(token.slice(1, -1), key)}
        </em>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      nodes.push(
        <code
          key={key}
          className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.875em] text-gray-900"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('[')) {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const isInternal = href.startsWith('/');
        if (isInternal) {
          nodes.push(
            <Link
              key={key}
              href={href}
              className="font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-4 hover:text-blue-700 hover:decoration-blue-700"
            >
              {renderInline(label, key)}
            </Link>
          );
        } else {
          nodes.push(
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-4 hover:text-blue-700 hover:decoration-blue-700"
            >
              {renderInline(label, key)}
            </a>
          );
        }
      } else {
        nodes.push(token);
      }
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function parseCodeHeader(meta: string): { lang: string; title?: string } {
  const trimmed = meta.trim();
  const titleMatch = /title="([^"]+)"/.exec(trimmed);
  const title = titleMatch ? titleMatch[1] : undefined;
  const lang = trimmed.replace(/title="[^"]+"/, '').trim() || 'text';
  return { lang, title };
}

function isItalicCaption(line: string | undefined): string | null {
  if (!line) return null;
  const t = line.trim();
  if (t.startsWith('*') && t.endsWith('*') && !t.startsWith('**') && t.length > 2) {
    return t.slice(1, -1).trim();
  }
  return null;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      i++;
      continue;
    }

    // Fenced code block
    if (line.startsWith('```')) {
      const { lang, title } = parseCodeHeader(line.slice(3));
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```

      const maybeCaption = isItalicCaption(lines[i]);
      if (maybeCaption) {
        i++;
      }

      elements.push(
        <figure key={`code-${i}`} className="my-8">
          <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-950 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-4 py-2 text-xs text-gray-300">
              <span className="font-mono font-medium text-gray-200">
                {title ?? lang}
              </span>
              {title && (
                <span className="rounded bg-gray-800 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-gray-400">
                  {lang}
                </span>
              )}
            </div>
            <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-gray-100">
              <code className="font-mono">{codeLines.join('\n')}</code>
            </pre>
          </div>
          {maybeCaption && (
            <figcaption className="mt-2.5 text-center text-sm text-gray-500">
              {maybeCaption}
            </figcaption>
          )}
        </figure>
      );
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line)) {
      elements.push(<hr key={`hr-${i}`} className="my-10 border-gray-200" />);
      i++;
      continue;
    }

    // Headings
    const headingMatch = /^(#{2,4})\s+(.*)$/.exec(line);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      if (level === 2) {
        elements.push(
          <h2
            key={`h2-${i}`}
            className="mt-10 mb-4 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl"
          >
            {renderInline(text, `h2-${i}`)}
          </h2>
        );
      } else if (level === 3) {
        elements.push(
          <h3
            key={`h3-${i}`}
            className="mt-8 mb-3 text-xl font-bold tracking-tight text-gray-900 md:text-2xl"
          >
            {renderInline(text, `h3-${i}`)}
          </h3>
        );
      } else {
        elements.push(
          <h4
            key={`h4-${i}`}
            className="mt-6 mb-2 text-lg font-semibold text-gray-900"
          >
            {renderInline(text, `h4-${i}`)}
          </h4>
        );
      }
      i++;
      continue;
    }

    // Linked image (e.g. Loom video demo card: [![alt](img)](url))
    const linkedImgMatch = /^\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)$/.exec(line);
    if (linkedImgMatch) {
      const [, alt, imgSrc, targetUrl] = linkedImgMatch;
      i++;
      const maybeCaption = isItalicCaption(lines[i]);
      if (maybeCaption) {
        i++;
      }

      elements.push(
        <figure key={`vid-${i}`} className="my-8">
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-xl border border-gray-200 bg-gray-900 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgSrc}
              alt={alt || 'Video demo'}
              loading="lazy"
              decoding="async"
              className="h-auto w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/15">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-gray-900 shadow">
                Watch Video Demo ↗
              </span>
            </span>
          </a>
          {maybeCaption && (
            <figcaption className="mt-2.5 text-center text-sm text-gray-500">
              {renderInline(maybeCaption, `vidcap-${i}`)}
            </figcaption>
          )}
        </figure>
      );
      continue;
    }

    // Standalone image figure: ![alt](src)
    const imgMatch = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(line);
    if (imgMatch) {
      const [, alt, src] = imgMatch;
      i++;
      const maybeCaption = isItalicCaption(lines[i]);
      if (maybeCaption) {
        i++;
      }

      elements.push(
        <figure key={`img-${i}`} className="my-8">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt || maybeCaption || 'Article illustration'}
              loading="lazy"
              decoding="async"
              className="h-auto w-full object-contain"
            />
          </div>
          {maybeCaption && (
            <figcaption className="mt-2.5 text-center text-sm text-gray-500">
              {renderInline(maybeCaption, `cap-${i}`)}
            </figcaption>
          )}
        </figure>
      );
      continue;
    }

    // Blockquote (> ...)
    if (line.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      elements.push(
        <blockquote
          key={`bq-${i}`}
          className="my-6 rounded-r-xl border-l-4 border-blue-600 bg-blue-50/50 px-5 py-4 text-gray-700"
        >
          <div className="space-y-2 leading-relaxed">
            {quoteLines.map((q, qi) => (
              <p key={qi}>{renderInline(q, `bq-${i}-${qi}`)}</p>
            ))}
          </div>
        </blockquote>
      );
      continue;
    }

    // Unordered list (- or *)
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }
      elements.push(
        <ul
          key={`ul-${i}`}
          className="my-5 list-disc space-y-2.5 pl-6 text-lg leading-relaxed text-gray-700"
        >
          {items.map((item, li) => (
            <li key={li}>{renderInline(item, `ul-${i}-${li}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list (1. ...)
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      elements.push(
        <ol
          key={`ol-${i}`}
          className="my-5 list-decimal space-y-2.5 pl-6 text-lg leading-relaxed text-gray-700"
        >
          {items.map((item, li) => (
            <li key={li}>{renderInline(item, `ol-${i}-${li}`)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular paragraph (consume consecutive plain text lines until blank or block token)
    const paraLines: string[] = [];
    while (i < lines.length) {
      const cur = lines[i].trim();
      if (
        !cur ||
        /^(#{2,4})\s+/.test(cur) ||
        cur.startsWith('```') ||
        cur.startsWith('>') ||
        /^!\[([^\]]*)\]\(([^)]+)\)$/.test(cur) ||
        /^\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)$/.test(cur) ||
        /^[-*]\s+/.test(cur) ||
        /^\d+\.\s+/.test(cur) ||
        /^---+$/.test(cur)
      ) {
        if (paraLines.length === 0 && cur) {
          paraLines.push(cur);
          i++;
        }
        break;
      }
      paraLines.push(cur);
      i++;
    }

    const joined = paraLines.join(' ');
    elements.push(
      <p
        key={`p-${i}`}
        className="my-5 text-lg leading-relaxed text-gray-700"
      >
        {renderInline(joined, `p-${i}`)}
      </p>
    );
  }

  return <div className="article-body">{elements}</div>;
}
