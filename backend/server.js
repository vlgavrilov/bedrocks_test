
import express from 'express';
import cors from 'cors';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../.env')
});

const clientAi = new BedrockRuntimeClient({
  region: 'eu-west-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

app.post('/ask', async (req, res) => {
  try {
    const { question, model } = req.body;
    
    /*
    const requestBody = {
      prompt: question,
      temperature: 0.1,
      top_p: 0.9,
      //stop_sequences: ["\n"],
      // count_penalty: { scale: 0 },
      // presence_penalty: { scale: 0 },
      // frequency_penalty: { scale: 0 },
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
    res.json({ answer: data }); */

    const params = {
      modelId: model,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
          prompt: `Describe the image at this URL: https://tripfixers.com/wp-content/uploads/2019/11/eiffel-tower-with-snow.jpeg`,
          max_tokens: 150, // Adjust as needed
          temperature: 0.7, // Adjust as needed
      }),
    };

    const command = new InvokeModelCommand(params);
    const response = await clientAi.send(command);
    
    const result = JSON.parse(Buffer.from(response.body).toString());
    const responseText = result.outputs[0].text;
    res.json({ answer: responseText });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

app.listen(5001, () => console.log('Server running on port 5001'));