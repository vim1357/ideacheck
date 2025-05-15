import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, description, audience, problem, existing } = req.body;

  const prompt = `
Ты — опытный стартап-консультант с практикой оценки более 500+ идей. Твоя задача — проанализировать идею проекта по следующим данным:

Название: ${name}
Описание: ${description}
Целевая аудитория: ${audience}
Проблема: ${problem}
Существующие решения: ${existing}

🔍 Проанализируй идею, строго следуя структуре ниже. Будь кратким, точным, прагматичным. Учитывай риски, конкуренцию, реалистичность запуска.

Ответ оформи строго по следующей структуре (табличная форма не требуется):

1. **Сегмент и ниша рынка** — кто потенциальные клиенты, где искать первых пользователей
2. **Потенциал рынка** — краткая оценка: высокий / средний / низкий + почему
3. **Риски и ограничения** — слабые места идеи, технические/бизнес-риски
4. **Конкуренты** — существующие решения, их сильные и слабые стороны
5. **Рекомендации по MVP** — что стоит включить в первую версию продукта
6. **Оценка реализуемости** — от 1 до 5 и краткое обоснование

Если ты считаешь, что идея слишком общая или неосуществимая — укажи это в блоке “Риски”.

Заверши отчёт коротким саморевью: есть ли в твоём ответе слабые места или неопределённости?
`;


  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const result = completion.choices[0].message.content;
    res.status(200).json({ result });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "Ошибка при генерации" });
  }
}
