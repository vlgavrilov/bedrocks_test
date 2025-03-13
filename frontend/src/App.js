import { useState } from 'react';

function App() {
  const [secretAccessKey, setSecretAccessKey] = useState('AccessKey');
  const [model, setModel] = useState('');
  const [accessKeyId, setAccessKeyId] = useState('KeyId');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const askQuestion = async () => {
    const response = await fetch('http://localhost:5001/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input, accessKeyId, model, secretAccessKey }),
    });
    const data = await response.json();
    setOutput(data.answer);
  };

  return (
    <div>
      <p>secretAccessKey:</p>
      <input type="password" value={secretAccessKey} onChange={e => setSecretAccessKey(e.target.value)}/>
      <p>accessKeyId:</p>
      <input type="password" value={accessKeyId} onChange={e => setAccessKeyId(e.target.value)}/>

      <p>model available in eu-west-1 region:</p>
      <select value={model} onChange={e => setModel(e.target.value)}>
        <option value="">Select a model</option>
        <option value="mistral.mistral-7b-instruct-v0:2">Mistral 7B Instruct</option>
        <option value="mistral.mistral-large-2402-v1:0">Mistral Large (24.02)</option>
        <option value="mistral.mixtral-8x7b-instruct-v0:1">Mixtral 8x7B Instruct</option>

        <option value="amazon.nova-canvas-v1:0">Nova Canvas</option>
        <option value="amazon.nova-lite-v1:0">Nova Lite*</option>
        <option value="amazon.nova-micro-v1:0">Nova Micro*</option>
        <option value="amazon.nova-pro-v1:0">Nova Pro*</option>
        <option value="amazon.nova-reel-v1:0">Nova Reel</option>

        <option value="amazon.titan-image-generator-v1">Titan Image Generator G1</option>
        <option value="amazon.titan-embed-image-v1">Titan Multimodal Embeddings G1</option>
        <option value="amazon.titan-embed-text-v2:0">Titan Text Embeddings V2</option>
        <option value="amazon.titan-text-express-v1">Titan Text G1 - Express</option>
        <option value="amazon.titan-text-lite-v1">Titan Text G1 - Lite</option>

        <option value="anthropic.claude-3-haiku-20240307-v1:0">Claude 3 Haiku</option>
        <option value="anthropic.claude-3-sonnet-20240229-v1:0">Claude 3 Sonnet</option>
        <option value="anthropic.claude-3-5-sonnet-20240620-v1:0">Claude 3.5 Sonnet*</option>

        <option value="cohere.embed-english-v3">Embed English</option>
        <option value="cohere.embed-multilingual-v3">Embed Multilingual</option>

        <option value="meta.llama3-2-1b-instruct-v1:0">Llama 3.2 1B Instruct*</option>
        <option value="meta.llama3-2-3b-instruct-v1:0">Llama 3.2 3B Instruct*</option>
      </select>

      <p style={{color: 'red', fontSize: '12px'}}>* Some models are accessible in some Regions only through cross-region inference. To learn more about cross-region inference, see <a target="_blank" href="https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html">Increase throughput with cross-region inference</a> and <a target="_blank" href="https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-support.html">Supported Regions and models for inference profiles.</a></p>

      <p>Ask:</p>
      <input value={input} onChange={e => setInput(e.target.value)}/>
      <button onClick={askQuestion}>Ask</button>
      <p>Response: {output}</p>
    </div>
  );
}

export default App;