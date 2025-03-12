import { useState } from 'react';

function App() {
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const [model, setModel] = useState('');
  const [accessKeyId, setAccessKeyId] = useState('');
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
      <input value={secretAccessKey} onChange={e => setSecretAccessKey(e.target.value)}/>

      <p>model:</p>
      <input value={model} onChange={e => setModel(e.target.value)}/>
      <p>accessKeyId:</p>
      <input value={accessKeyId} onChange={e => setAccessKeyId(e.target.value)}/>
      <p>Ask:</p>
      <input value={input} onChange={e => setInput(e.target.value)}/>
      <button onClick={askQuestion}>Ask</button>
      <p>Response: {output}</p>
    </div>
  );
}

export default App;