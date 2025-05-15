import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function IdeaForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    audience: "",
    problem: "",
    existing: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
      {[
  {
    name: "name",
    label: "Название идеи",
    placeholder: "Например: Remote Team Sync",
    type: "text",
  },
  {
    name: "description",
    label: "Краткое описание",
    placeholder: "Что делает продукт и зачем? В 1–2 предложениях.",
    type: "textarea",
  },
  {
    name: "audience",
    label: "Целевая аудитория",
    placeholder: "Кто ваши пользователи? Например: дизайнеры, фаундеры, команды 2–10 чел.",
    type: "text",
  },
  {
    name: "problem",
    label: "Проблема, которую решает идея",
    placeholder: "Опиши боль/неудобство, которое решаешь.",
    type: "textarea",
  },
  {
    name: "existing",
    label: "Альтернативы и конкуренты",
    placeholder: "Какие решения уже есть? Например: Notion, Slack, Excel",
    type: "textarea",
  },
  {
    name: "email",
    label: "Email для получения отчёта",
    placeholder: "test@example.com",
    type: "email",
  },
].map((field) => (
  <div key={field.name}>
    <label className="block font-semibold mb-1">{field.label}</label>
    {field.type === "textarea" ? (
      <textarea
        name={field.name}
        value={form[field.name as keyof typeof form]}
        onChange={handleChange}
        required
        placeholder={field.placeholder}
        className="w-full border border-gray-300 p-3 rounded-md"
        rows={3}
      />
    ) : (
      <input
        type={field.type}
        name={field.name}
        value={form[field.name as keyof typeof form]}
        onChange={handleChange}
        required
        placeholder={field.placeholder}
        className="w-full border border-gray-300 p-3 rounded-md"
      />
    )}
  </div>
))}


      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        {loading ? "Анализирую..." : "Проверить идею"}
      </button>

      {result && (
  <div className="mt-6 p-6 bg-gray-50 rounded-xl prose max-w-none">
    <ReactMarkdown>{result}</ReactMarkdown>
  </div>
)}
    </form>
  );
}
