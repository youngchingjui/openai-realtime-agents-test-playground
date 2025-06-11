import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

// Request schemas for both expected input types
type StructuredResponseFormat = {
  type: 'json_schema';
  schema?: any;
  schema_name?: string;
  name?: string;
};

type TextResponseFormat = {
  type: 'plain';
};

// Define allowed text.format.type values
const TextFormatTypeEnum = z.enum(['json_schema', 'plain']);

// Main schema for inbound body (matches usage in callOai.ts etc)
const RequestBodySchema = z.object({
  model: z.string(),
  input: z.any(), // Accept array or object, as upstream code does
  text: z.object({
    format: z.object({
      type: TextFormatTypeEnum,
    })
    .passthrough() // Accept other fields under format if needed (for zodTextFormat, etc)
  }).optional(),
  // Allow other props, as the schema sent to OpenAI may legitimately be extended
}).passthrough();

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
    RequestBodySchema.parse(body);
    // Ensure if text.format is present, its .type is required and valid
    if (body.text && body.text.format && !TextFormatTypeEnum.options.includes(body.text.format.type)) {
      throw new Error('Invalid text.format.type value');
    }
  } catch (err: any) {
    // Explicitly return details for validation errors
    return NextResponse.json(
      { error: 'Invalid request', details: err.errors || err.message },
      { status: 400 },
    );
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  if (body.text?.format?.type === 'json_schema') {
    return await structuredResponse(openai, body);
  } else {
    return await textResponse(openai, body);
  }
}

async function structuredResponse(openai: OpenAI, body: any) {
  try {
    const response = await openai.responses.parse({
      ...(body as any),
      stream: false,
    } as any);

    return NextResponse.json(response);
  } catch (err: any) {
    console.error('responses proxy error', err);
    return NextResponse.json({ error: 'failed' }, { status: 500 }); 
  }
}

async function textResponse(openai: OpenAI, body: any) {
  try {
    const response = await openai.responses.create({
      ...(body as any),
      stream: false,
    } as any);

    return NextResponse.json(response);
  } catch (err: any) {
    console.error('responses proxy error', err);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}
