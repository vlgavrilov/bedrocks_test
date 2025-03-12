
import express from 'express';
import cors from 'cors';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

const app = express();
app.use(cors());
app.use(express.json());



app.post('/ask', async (req, res) => {
  try {
    const { question, accessKeyId, secretAccessKey, model } = req.body;

    const clientAi = new BedrockRuntimeClient({
      region: 'eu-west-1',
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });

    const requestBody = {
      prompt: question,
      // maxTokens: 1024,
      temperature: 0.1,
      // topP: 1,
      // stopSequences: [],
      // countPenalty: { scale: 0 },
      // presencePenalty: { scale: 0 },
      // frequencyPenalty: { scale: 0 },
    };
    const input = {
      modelId: model || 'mistral.mistral-large-2402-v1:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(requestBody)
    };
    const command = new InvokeModelCommand(input);
    const response = await clientAi.send(command);
    const data = await response.body.transformToString();
    res.json({ answer: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5001, () => console.log('Server running on port 5001'));