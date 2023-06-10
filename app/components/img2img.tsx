'use client'

import { useState } from "react"; 
import Image from "next/image";

interface Prediction {
  output: string, 
  status: string, 
}
interface Image2ImageProps {
    model: string,
    title: string,
}
export default function ImageToImage({model, title} : Image2ImageProps) {
  const [prediction, setPrediction] = useState<Prediction>(); 
  const [selectedImage, setSelectedImage] = useState(''); 
  
  const handleImageUpload = (e : any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        setSelectedImage(reader.result as string);
    }

    reader.readAsDataURL(file);
  }

  const handleSubmit = async (e : any) => {
    e.preventDefault(); 
    
    console.log(model);
  
    const response = await fetch('api/predictions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          file: selectedImage
        })
    });

    if(!response.ok) throw new Error(response.statusText); 
  	let pred = await response.json(); 
		setPrediction(pred);

    console.log(pred.id);
    
    while(pred.status !== 'succeeded' && pred.status !== 'failed') {
      const res = await fetch('api/predictions/' + pred.id); 
      pred = await res.json();
      setPrediction(pred);	
    }
		console.log(pred);
  }
  
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-center text-5xl py-6 font-semibold">
        {title}
      </h1>
      <div className="flex flex-row justify-around">
        <div className="flex-1 mx-5">
          <h2 className="text-3xl py-5">Input</h2>
          {selectedImage && (
            <div className="image-wrapper">
              <Image 
                  fill
                  src={selectedImage}
                  alt="input"
                />
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="file" className="cursor-pointer border-2 border-dashed border-gray-200 rounded-lg p-4 text-center text-gray my-1 text-gray-400">
              Drag &apos;n&apos; drop some files here, or click to select files
            </label>
            <input 
              id="file"
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              style={{display: 'none'}}
            />
            <button type="submit" className="button-bottom">Submit</button>
          </form>
        </div>
        <div className="flex-1 mx-5">
          <h2 className="text-3xl py-5">Output</h2>
					
					{prediction && (
     		  	<>
          		{prediction.output && (
            	<div className="image-wrapper">
             		<Image
              		fill 
                	src={prediction.output}
                	alt="output"
                	sizes="100vw"
              	/>
            	</div>
        			)}
            <p className="text-sm opacity-50">status: {prediction.status}</p>
        		</>
					)}
        </div>
      </div>
    </div>
  )
}
