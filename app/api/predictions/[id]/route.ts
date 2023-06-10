import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || '',
});

export async function GET(req : NextRequest) {
	const { pathname } = new URL(req.url);
	const id = pathname.split('/').pop() as string;
	const prediction = await replicate.predictions.get(id);
	
	if (prediction?.error) {
			return NextResponse.json({ detail: prediction.error }); 
	}
	
	return NextResponse.json( prediction);
}