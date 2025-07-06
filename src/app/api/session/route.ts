import { NextResponse } from "next/server";

export async function GET() {
  // Check for API key first
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Missing OpenAI API key on server. Please set OPENAI_API_KEY in your environment." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      "https://api.openai.com/v1/realtime/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-realtime-preview-2024-12-17",
          // model: "gpt-4o-mini-realtime-preview-2024-12-17",
        }),
      }
    );

    if (!response.ok) {
      const errorMsg = `OpenAI API error: ${response.status} ${response.statusText}`;
      return NextResponse.json(
        { error: errorMsg },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Ensure structure matches what frontend expects
    if (!data.client_secret || typeof data.client_secret.value !== '\''string'\'') {
      return NextResponse.json(
        {
          error: "OpenAI API did not return a valid client_secret.value. Check your API key and account quotas.",
        },
        { status: 502 }
      );
    }

    // Return only the expected payload (for security and stability)
    return NextResponse.json({
      client_secret: { value: data.client_secret.value }
    });
  } catch (error) {
    console.error("Error in /session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
