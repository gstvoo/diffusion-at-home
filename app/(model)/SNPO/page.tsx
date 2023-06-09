'use client'

import { useState } from "react"; 
import Image from "next/image";

export default function SNPO() {
  const [selectedImage, setSelectedImage] = useState(''); 

  const handleImageUpload = (e : any) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = async (e : any) => {
    e.preventDefault(); 

		const formData = new FormData();
		formData.set('file', e.target.file.files[0]);
		
		
		const res = await fetch('api/oil-painting', {
			method: 'POST',
			body: formData,
		});

		if(!res.ok) throw new Error(res.statusText); 
		const pred = await res.json(); 
		console.log(pred); 

  }
  
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-center text-5xl py-6 font-semibold">
        Image to Oil Painting Generation 
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
        </div>
      </div>
    </div>
  )
}
