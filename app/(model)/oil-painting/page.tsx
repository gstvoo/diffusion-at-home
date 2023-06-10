import ImageToImage from "@/app/components/img2img";

export default function OilPaiting() {
  return (
    <div>
      <ImageToImage 
        model="oil-painting" 
        title="Image to Oil Painting Generation "
        initialImage="https://i.imgur.com/VvCVzhc.jpg"
        initialPrediction={{output: 'https://i.imgur.com/8IgcHsy.png', status: "succeeded"}}
      />
    </div>
  )
}