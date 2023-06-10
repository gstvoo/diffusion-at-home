import Text2Image from "./components/text2img"

export default function Home() {
  return (
    <div>
      <Text2Image 
        model="stable-diffusion" 
        title="Dream something with Stable Diffusion"
        initialPrompt="pencil sketch of robots playing poker"  
        initialPrediction={{output: ['https://i.imgur.com/tQI76k1.png'], status: "succeeded"}}
      />      
    </div>
  )
}