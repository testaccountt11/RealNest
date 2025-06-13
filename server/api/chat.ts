import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBKyegbe_vyj9srORjWM8G005ozLFhSexA');

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Подготавливаем контекст для модели
    const context = `Ты - виртуальный помощник по аренде недвижимости. 
    Твоя задача - помогать пользователям найти подходящую недвижимость, 
    отвечать на их вопросы о процессе аренды, давать советы по выбору района и типа жилья. 
    Используй вежливый и профессиональный тон. Отвечай кратко и по существу.`;

    // Формируем историю чата для контекста
    const chat = model.startChat({
      history: history.map((msg: any) => ({
        role: msg.role,
        parts: msg.content,
      })),
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ response: text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Произошла ошибка при обработке запроса' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
} 