import Text2Image from "@/app/components/text2img";

export default function AnimeStyle() {
	return (
		<div>
			<Text2Image 
				model="anime-style" 
				title="High Quality, High Style Anime Model" 
				initialPrompt="1girl, kimono, outdoors, shrine, lanterns, evening"
				initialPrediction={{output: ['https://i.imgur.com/HvEXPEJ.png'], status: "succeeded"}}
			/>
		</div>
	)
}