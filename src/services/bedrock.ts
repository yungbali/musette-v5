import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: "us-east-1",  // adjust to your region
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  }
});

export async function generateImage(prompt: string) {
  const input = {
    text_prompts: [{ text: prompt }],
    cfg_scale: 10,
    steps: 50,
    seed: Math.floor(Math.random() * 1000000)
  };

  const command = new InvokeModelCommand({
    modelId: "stability.stable-diffusion-xl",
    body: JSON.stringify(input),
    contentType: "application/json",
    accept: "application/json",
  });

  try {
    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    return responseBody.artifacts[0].base64;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
} 