'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Prediction {
  output: string | string[], 
  status: string, 
}

interface Text2ImageProps {
    model: string,
    title: string,
    initialPrompt: string,
    initialPrediction: Prediction,
}
export default function Text2Image({model, title, initialPrompt, initialPrediction} : Text2ImageProps) {
  const [prediction, setPrediction] = useState<Prediction | null>(initialPrediction); 
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>(initialPrompt);
  
  useEffect(() => {
    const storedPrediction = sessionStorage.getItem('prediction'+model);
    const storedPrompt = sessionStorage.getItem('prompt'+model);
    if (storedPrediction) {
      setPrediction(JSON.parse(storedPrediction));
    }
    if (storedPrompt) {
      setPrompt(storedPrompt);
    }
  }, [model]);

  const handleSubmit = async (e : any) => {
    e.preventDefault(); 

    setError(null);

    const promptValue = e.target.name.value;
    setPrompt(promptValue);
    sessionStorage.setItem('prompt'+model, promptValue);

    const response = await fetch('api/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        prompt: promptValue, 
      })
    }); 
    let pred = await response.json();
    setPrediction(pred);
    sessionStorage.setItem('prediction'+model, JSON.stringify(pred));
    console.log(pred);
    while(pred.status !== 'succeeded' && pred.status !== 'failed') {
      const res = await fetch('api/predictions/' + pred.id); 
      pred = await res.json();
      if(pred.detail) {
        setError(pred.detail);
        setPrediction(null); 
        sessionStorage.removeItem('prediction'+model);
        break;
      }
      setPrediction(pred);
      sessionStorage.setItem('prediction'+model, JSON.stringify(pred));
      console.log(pred);
    }
  }
  
  return (
    <div className='container mx-auto max-w-4xl p-5'>
      <h1 className='text-center text-5xl py-6 font-semibold'>
        {title}
      </h1>
      <form onSubmit={handleSubmit} className='flex'>
        <input type="text" name="name" 
          placeholder="Enter a prompt to display an image"
          className='flex-grow rounded-r-md rounded-l-md'
          value={prompt || ''}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className='button-right' type="submit">Go!</button>
      </form>
      {error && (
        <div>
          <p className="py-3 text-sm text-red-500">{error}</p>
        </div>
      )}
      {prediction && (
        <>
          <p className="py-3 text-sm opacity-50">status: {prediction.status}</p>
          {prediction.output && (
            <div className="image-wrapper">
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
