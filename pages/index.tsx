import Head from "next/head";
import IdeaForm from "@/components/IdeaForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>Product Idea Validator</title>
      </Head>
     <main className="min-h-screen bg-white">

  {/* Hero */}
  <section className="text-center py-24 px-4 bg-gray-100">
    <h1 className="text-4xl font-bold mb-4">
      Проверь свою стартап-идею с помощью AI
    </h1>
    <p className="text-gray-600 mb-8 text-lg">
      Получи быстрый фидбэк по рынку, конкурентам и рискам за 1 минуту.
    </p>
    <a href="#form" className="bg-black text-white px-6 py-3 rounded text-lg hover:bg-gray-800">
      Начать проверку →
    </a>
  </section>

  {/* How it works - карточки */}
<section className="py-20 px-4 bg-white">
  <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">Как это работает?</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
    {[
      { step: "1", icon: "📝", text: "Вводишь идею — кратко описываешь проект." },
      { step: "2", icon: "🤖", text: "AI анализирует рынок, конкуренцию и риски." },
      { step: "3", icon: "📊", text: "Ты получаешь отчёт с фидбэком за 1 минуту." },
    ].map((item) => (
      <div key={item.step} className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition text-center">
        <div className="text-4xl mb-2">{item.icon}</div>
        <div className="text-lg font-semibold text-gray-800 mb-1">Шаг {item.step}</div>
        <p className="text-gray-600">{item.text}</p>
      </div>
    ))}
  </div>
</section>

{/* Benefits - карточки */}
<section className="py-20 px-4 bg-gray-50">
  <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">Что ты получишь</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {[
      { icon: "📈", text: "Оценка рыночного сегмента" },
      { icon: "⚖️", text: "Потенциал идеи (высокий / средний / низкий)" },
      { icon: "🕵️‍♂️", text: "Анализ конкурентов" },
      { icon: "🚀", text: "Советы по MVP" },
      { icon: "⚠️", text: "Риски и слабые места" },
      { icon: "✅", text: "Оценка реализуемости" },
    ].map((item, i) => (
      <div key={i} className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition text-center text-gray-800">
        <div className="text-3xl mb-2">{item.icon}</div>
        <div className="font-medium">{item.text}</div>
      </div>
    ))}
  </div>
</section>


  <section id="form" className="py-16 px-4">
{/* Форма */}
    <IdeaForm />
  </section>
</main>

    </>
  );
}
