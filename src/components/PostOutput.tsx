import { useEffect, useState } from "react";
import { ClipboardIcon } from "./icons/ClipboardIcon";
import { CheckIcon } from "./icons/CheckIcon";
import { SparklesIcon } from "./icons/SparklesIcon";

interface PostOutputProps {
  generatedPost: string;
  loading: boolean;
}

export function PostOutput({ generatedPost, loading }: PostOutputProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!generatedPost) {
      setCopied(false);
    }
  }, [generatedPost]);

  const handleCopy = async () => {
    if (!generatedPost) return;

    try {
      await navigator.clipboard.writeText(generatedPost);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <section className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-4 flex flex-col min-h-[320px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-sky-500/10 border border-sky-500/40 flex items-center justify-center">
            <SparklesIcon className="w-3 h-3 text-sky-400" />
          </div>
          <h2 className="text-sm font-medium tracking-tight text-slate-50">Generated Post</h2>
        </div>
        <button
          onClick={handleCopy}
          disabled={!generatedPost}
          className="inline-flex items-center gap-1 rounded-md border border-slate-700/80 bg-slate-900/60 px-2.5 py-1 text-[11px] font-medium text-slate-200 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed hover:border-slate-600 hover:bg-slate-900"
        >
          {copied ? (
            <>
              <CheckIcon className="w-3 h-3" />
              Copied
            </>
          ) : (
            <>
              <ClipboardIcon className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      <div className="relative flex-1">
        <div className="absolute inset-0 rounded-xl bg-slate-950/50 border border-slate-800/80 px-3 py-2 text-xs font-mono text-slate-100/90 overflow-auto">
          {loading ? (
            <div className="flex items-center gap-2 text-slate-500 text-[11px]">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              Generating post...
            </div>
          ) : generatedPost ? (
            <pre className="whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed">
              {generatedPost}
            </pre>
          ) : (
            <p className="text-[11px] text-slate-600">
              Your post will appear here. Try pasting a short article, choosing a persona, and clicking
              <span className="text-sky-400 font-medium"> Spin Post</span>.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

