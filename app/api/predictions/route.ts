import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN || '', 
})

export async function POST(req: NextRequest) {
    if(!process.env.REPLICATE_API_TOKEN) {
        throw new Error('The REPLICATE_API_TOKEN environment variable is not set.'); 
    }

    // Read the request body
    const body = await req.json();
    const prompt = body.prompt;

    if (!prompt) {
        return new Error('The prompt is required.');
    }

    const prediction = await replicate.predictions.create({
        version: 'db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf', 
        input: {
            prompt: prompt, 
        }
    });
    
    if (prediction?.error) {
        return NextResponse.json({ detail: prediction.error }); 
    }
    return NextResponse.json( prediction );
}
