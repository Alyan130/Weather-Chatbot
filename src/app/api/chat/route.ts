import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import {tools} from "@/ai/tools"

export async function POST(req:Request){
   const {messages}  = await req.json()
   const result = streamText({
     model:google("gemini-1.5-flash"),
     system:"you are weather assistant that reponds weather specific queries , you have tool getWeather that display weather for particular location.",
    messages:messages,
    tools:tools
})
  return result.toDataStreamResponse();
} 

