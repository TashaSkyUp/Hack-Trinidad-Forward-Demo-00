interface ApiKeyInputProps {
  apiKey: string;
  onApiKeyChange: (value: string) => void;
}

export function ApiKeyInput({ apiKey, onApiKeyChange }: ApiKeyInputProps) {
  return (
    <section className="mb-6 rounded-2xl bg-slate-900/70 border border-slate-800/90 p-4">
      <div className="flex flex-col gap-2 text-[11px] text-slate-200">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              Gemini API key
            </h2>
            <p className="mt-1 text-[11px] text-slate-500 max-w-2xl">
              The app runs entirely in your browser. Paste a Google Gemini API key with access to
              the <span className="text-sky-400">Gemini 2.0 Flash</span> model. Your key is stored
              locally in this browser only.
            </p>
          </div>
        </div>
        <input
          type="password"
          value={apiKey}
          onChange={(event) => onApiKeyChange(event.target.value)}
          placeholder="Paste your Google Gemini API key"
          className="rounded-lg bg-slate-950/70 border border-slate-800/90 px-3 py-2 text-[11px] text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500/70 focus:border-sky-500/70"
        />
      </div>
    </section>
  );
}

