import { Fragment } from 'react';

const KEYWORDS = new Set([
  'int', 'float', 'void', 'return', 'for', 'if', 'else', 'while', 'class', 'public', 'private', 'protected', 'const', 'let',
  'await', 'async', 'throw', 'new', 'def', 'import', 'from', 'export', 'default', 'function', 'extends', 'boolean', 'String',
  'std', 'include', 'True', 'False', 'None', 'print', 'printf', 'static',
]);

// strings | comments | numbers | words | everything else
const TOKEN_RE = /("[^"]*"|'[^']*'|\/\/.*$|#.*$|\b\d+(?:\.\d+)?\b|[A-Za-z_]\w*|\s+|.)/gm;

/** Very small, dependency-free highlighter — good enough for decorative previews. */
export function CodePreview({ code }: { code: string }) {
  const lines = code.split('\n');
  return (
    <pre className="code-block overflow-hidden whitespace-pre text-ink-300">
      {lines.map((line, i) => (
        <span key={i} className="flex">
          <span aria-hidden="true" className="mr-4 w-4 shrink-0 select-none text-right text-ink-500/70">
            {i + 1}
          </span>
          <code>
            {line.match(TOKEN_RE)?.map((tok, j) => (
              <Fragment key={j}>{colour(tok)}</Fragment>
            )) ?? ' '}
          </code>
        </span>
      ))}
    </pre>
  );
}

function colour(tok: string) {
  if (/^["']/.test(tok)) return <span className="text-signal">{tok}</span>;
  if (tok.startsWith('//') || (tok.startsWith('#') && tok.length > 1 && !tok.startsWith('#include'))) {
    return <span className="italic text-ink-500">{tok}</span>;
  }
  if (tok.startsWith('#include')) return <span className="text-accent">{tok}</span>;
  if (/^\d/.test(tok)) return <span className="text-amber-300/90">{tok}</span>;
  if (KEYWORDS.has(tok)) return <span className="text-accent">{tok}</span>;
  if (/^[A-Z]/.test(tok)) return <span className="text-sky-300/90">{tok}</span>;
  return tok;
}
