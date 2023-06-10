import ImageToImage from "@/app/components/img2img"

export default function FaceRestoration() {
  return (
    <div>
      <ImageToImage 
        model="face-restoration" 
        title="Face Restoration For Old Photos"
        initialImage="https://i.imgur.com/R8TyveY.jpg"
        initialPrediction={{output: 'https://i.imgur.com/bDbfRBg.png', status: "succeeded"}}
      />
    </div>
  )
}