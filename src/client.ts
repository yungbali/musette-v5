import { generateClient } from "aws-amplify/api";
import { createAIHooks } from "@aws-amplify/ui-react-ai";

export const client = generateClient();
export const { useAIConversation, useAIGeneration } = createAIHooks(client);

// Note: We'll need to install the AI package first
// npm install @aws-amplify/ui-react-ai 