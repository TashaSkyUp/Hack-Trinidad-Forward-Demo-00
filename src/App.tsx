import { useEffect, useState } from "react";
import { generatePost } from "./services/geminiService";
import { Header } from "./components/Header";
import { SourceInput } from "./components/SourceInput";
import { PostOutput } from "./components/PostOutput";
import { ApiKeyInput } from "./components/ApiKeyInput";

const STORAGE_KEY = "social-post-spinner:gemini-api-key";

function App() {
  const [apiKey, setApiKey] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [persona, setPersona] = useState("friendly AI educator");
  const [platform, setPlatform] = useState("twitter");
  const [temperature, setTemperature] = useState(0.7);
  const [generatedPost, setGeneratedPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const storedKey = window.localStorage.getItem(STORAGE_KEY);
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (apiKey.trim()) {
      window.localStorage.setItem(STORAGE_KEY, apiKey.trim());
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [apiKey]);

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      setError("Please enter your Gemini API key.");
      return;
    }

    if (!sourceText.trim()) {
      setError("Please enter some source text.");
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedPost("");

    try {
      const post = await generatePost({
        sourceText,
        persona,
        platform,
        temperature,
        apiKey: apiKey.trim(),
      });
      setGeneratedPost(post);
    } catch (err) {
      console.error(err);
      setError("Failed to generate post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Header />

        <ApiKeyInput apiKey={apiKey} onApiKeyChange={setApiKey} />

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/50 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <SourceInput
            sourceText={sourceText}
            onSourceTextChange={setSourceText}
            persona={persona}
            onPersonaChange={setPersona}
            platform={platform}
            onPlatformChange={setPlatform}
            temperature={temperature}
            onTemperatureChange={setTemperature}
            onGenerate={handleGenerate}
            loading={loading}
            canGenerate={Boolean(apiKey.trim())}
          />

          <PostOutput generatedPost={generatedPost} loading={loading} />
        </div>

        <footer className="mt-8 pt-6 border-t border-slate-800/60 text-xs text-slate-500 flex flex-wrap gap-2 items-center justify-between">
          <span>
            Built with <span className="text-sky-400">Gemini 2.0 Flash</span> & Vite + React
          </span>
          <span className="text-slate-600">
            Tip: Start with a short article, blog post, or outline.
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;

