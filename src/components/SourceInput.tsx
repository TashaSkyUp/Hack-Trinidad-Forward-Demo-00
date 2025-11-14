import { SparklesIcon } from "./icons/SparklesIcon";

interface SourceInputProps {
  sourceText: string;
  onSourceTextChange: (value: string) => void;
  persona: string;
  onPersonaChange: (value: string) => void;
  platform: string;
  onPlatformChange: (value: string) => void;
  temperature: number;
  onTemperatureChange: (value: number) => void;
  onGenerate: () => void;
  loading: boolean;
  canGenerate: boolean;
}

export function SourceInput({
  sourceText,
  onSourceTextChange,
  persona,
  onPersonaChange,
  platform,
  onPlatformChange,
  temperature,
  onTemperatureChange,
  onGenerate,
  loading,
  canGenerate,
}: SourceInputProps) {
  return (
    <section className="rounded-2xl bg-slate-900/70 border border-slate-800/90 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Source content</label>
          <p className="text-[11px] text-slate-500 max-w-md">
            Paste a blog excerpt, notes, or any long-form text. The AI will distill it into a
            platform-specific post.
          </p>
        </div>
        <button
          type="button"
          onClick={onGenerate}
          disabled={loading || !canGenerate}
          className="inline-flex items-center gap-1 rounded-full bg-sky-500 px-3 py-1.5 text-[11px] font-semibold text-slate-950 shadow-lg shadow-sky-500/30 hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <SparklesIcon className="w-3.5 h-3.5" />
          {loading ? "Spinning..." : "Spin Post"}
        </button>
      </div>

      <textarea
        value={sourceText}
        onChange={(event) => onSourceTextChange(event.target.value)}
        className="w-full min-h-[180px] rounded-xl bg-slate-950/70 border border-slate-800/90 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500/70 focus:border-sky-500/70 font-mono"
        placeholder="Paste your long-form content here..."
      />

      <div className="grid gap-3 md:grid-cols-3 text-[11px] text-slate-200">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-slate-300">Persona</label>
          <input
            type="text"
            value={persona}
            onChange={(event) => onPersonaChange(event.target.value)}
            className="rounded-lg bg-slate-950/70 border border-slate-800/90 px-2 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500/70 focus:border-sky-500/70"
            placeholder="e.g. friendly AI educator"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-slate-300">Platform</label>
          <select
            value={platform}
            onChange={(event) => onPlatformChange(event.target.value)}
            className="rounded-lg bg-slate-950/70 border border-slate-800/90 px-2 py-1.5 text-[11px] text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500/70 focus:border-sky-500/70"
          >
            <option value="twitter">Twitter / X</option>
            <option value="linkedin">LinkedIn</option>
            <option value="instagram">Instagram caption</option>
            <option value="threads">Threads</option>
            <option value="facebook">Facebook post</option>
            <option value="youtube">YouTube description</option>
            <option value="tiktok">TikTok caption</option>
            <option value="email">Email subject + hook</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-slate-300 flex items-center justify-between">
            Creativity
            <span className="text-[10px] text-slate-500">{temperature.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min={0.1}
            max={1}
            step={0.05}
            value={temperature}
            onChange={(event) => onTemperatureChange(parseFloat(event.target.value))}
            className="w-full accent-sky-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>More exact</span>
            <span>More creative</span>
          </div>
        </div>
      </div>
    </section>
  );
}

