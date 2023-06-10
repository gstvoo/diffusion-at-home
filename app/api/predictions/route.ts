import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { models, ModelKeys } from './model-version';

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_TOKEN || '', 
})

export async function POST(req: NextRequest) {
	if(!process.env.REPLICATE_API_TOKEN) {
		throw new Error('The REPLICATE_API_TOKEN environment variable is not set.'); 
	}

	try {
		const data = await req.json();
		let id = ''; 

		if(models[data.model as ModelKeys]) {
			id = models[data.model as ModelKeys]; 
		}
	
		const input = {
			prompt: data?.prompt,
			image: data?.file,
			img: data?.file,
		}
		
		console.log(input, id);
		
		const prediction = await replicate.predictions.create({
			version: id, 
			input: input 
		}); 

		if (prediction?.error) 
			return NextResponse.json({detail: prediction.error}); 

		return NextResponse.json(prediction);
	} catch (error) {
		console.error(error);
		return NextResponse.json({detail: 'An error occurred while processing the request.'});
	}
}
