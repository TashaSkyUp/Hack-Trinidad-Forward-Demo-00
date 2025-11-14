export function Header() {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/40 flex items-center justify-center">
          <span className="text-sky-400 text-lg">∞</span>
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-50">Social Post Spinner</h1>
          <p className="text-xs text-slate-400">
            Paste long-form content → get platform-ready posts in one click.
          </p>
        </div>
      </div>
      <p className="text-xs text-slate-500 max-w-xl">
        This demo runs entirely in your browser using <span className="text-sky-400">Gemini 2.0 Flash</span>,
        and doesn't send your content to any server other than Google's API.
      </p>
    </header>
  );
}

