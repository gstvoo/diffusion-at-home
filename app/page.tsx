'use client'

import { useState } from 'react';
import Image from 'next/image';

interface Prediction {
  output: string[], 
  status: string, 
}

const sleep = (ms : number) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState<Prediction>(); 
  
  const handleSubmit = async (e : any) => {
    e.preventDefault(); 
    const response = await fetch('api/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({prompt: e.target.name.value})
    }); 
    let pred = await response.json();
    setPrediction(pred);
    console.log(pred.id);
    while(pred.status !== 'succeeded' && pred.status !== 'failed') {
      await sleep(500); 
      const res = await fetch('api/predictions/' + pred.id); 
      pred = await res.json();
      setPrediction(pred);
    }
  }
  
  return (
    <div className='container mx-auto max-w-2xl p-5'>
      <h1 className='text-center text-2xl py-6 font-semibold'>
        Dream something with{" "}
        <a href="https://replicate.com/stability-ai/stable-diffusion">
          Stable Diffusion
        </a>
      </h1>
      <form onSubmit={handleSubmit} className='flex'>
        <input type="text" name="name" 
          placeholder="Enter a prompt to display an image"
          className='flex-grow'
        />
        <button className='button' type="submit">Go!</button>
      </form>
      {prediction && (
        <>
          <p className="py-3 text-sm opacity-50">status: {prediction.status}</p>
          {prediction.output && (
            <div className="image-wrapper`">
              <Image
                fill
                src={prediction.output[prediction.output.length - 1]}
                alt="output"
                sizes="100vw"
              />
            </div>
          )}
          
        </>
      )}
    </div>
  )
}