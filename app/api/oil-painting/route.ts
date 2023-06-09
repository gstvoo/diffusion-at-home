import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_TOKEN || '', 
})

export async function POST(req: NextRequest) {
	if(!process.env.REPLICATE_API_TOKEN) {
			throw new Error('The REPLICATE_API_TOKEN environment variable is not set.'); 
	}

	try {
		const data = await req.formData();
		const image = data.get('file');
		
		if(!image) 
			return NextResponse.json({detail: 'The file is required.'}); 
		

		
		const prediction = await replicate.predictions.create({
		    version: '6a8161f2fa2d6d3715f9c30ad3e808f31234f99007b441227075bee778e4b29f', 
		    input: {
		        image: image, 
		    }
		}); 
		if (prediction?.error) 
		    return NextResponse.json({detail: prediction.error}); 

		return NextResponse.json(prediction);
	} catch (error) {
		console.error(error);
		return NextResponse.json({detail: 'An error occurred while processing the request.'});
	}
}
