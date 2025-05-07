import { NextResponse } from 'next/server';
import OpenAI from 'openai';

console.log("API Key: ", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// const client = new OpenAI();
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code } = body;
    if (!code) {
      return NextResponse.json({ error: 'No code provided.' }, { status: 400 });
    }
    const prompt = `You're a smart contract auditor. Analyze the following Solana smart contract code:\n\n${code}`;
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    return NextResponse.json({
      result: completion.choices[0].message.content,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[API ERROR]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.error('[API ERROR]', error);
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
  }
}
