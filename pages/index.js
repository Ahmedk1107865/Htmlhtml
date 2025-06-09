import { useState } from 'react';
import Head from 'next/head';

export default function LogoGenerator() {
  const [type, setType] = useState('1');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const [error, setError] = useState('');

  const generateLogo = async () => {
    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const url = `/api/generate?type=${type}&name=${encodeURIComponent(name)}`;
      setLogoUrl(url);
    } catch (err) {
      setError('Failed to generate logo. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Logo Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Logo Generator</h1>
        
        <div className="form-group">
          <label htmlFor="type">Logo Style:</label>
          <select 
            id="type" 
            value={type} 
            onChange={(e) => setType(e.target.value)}
          >
            {Array.from({ length: 40 }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>Style {num}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="name">Text:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your text"
          />
        </div>
        
        <button onClick={generateLogo} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Logo'}
        </button>
        
        {error && <p className="error">{error}</p>}
        
        {logoUrl && (
          <div className="logo-preview">
            <h2>Your Logo:</h2>
            <img src={logoUrl} alt="Generated Logo" />
            <a 
              href={logoUrl} 
              download={`logo-${type}-${name}.png`}
              className="download-btn"
            >
              Download Logo
            </a>
          </div>
        )}
      </main>

      <footer>
        <p>Logo Generator &copy; {new Date().getFullYear()}</p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 800px;
          width: 100%;
        }
        
        h1 {
          margin-bottom: 2rem;
          color: #0070f3;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
          width: 100%;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        
        select, input {
          width: 100%;
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        button {
          background: #0070f3;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        button:hover {
          background: #005bb5;
        }
        
        button:disabled {
          background: #cccccc;
          cursor: not-allowed;
        }
        
        .error {
          color: #ff0000;
          margin-top: 1rem;
        }
        
        .logo-preview {
          margin-top: 2rem;
          text-align: center;
        }
        
        .logo-preview img {
          max-width: 100%;
          height: auto;
          border: 1px solid #ddd;
          margin: 1rem 0;
        }
        
        .download-btn {
          display: inline-block;
          background: #28a745;
          color: white;
          padding: 0.75rem 1.5rem;
          text-decoration: none;
          border-radius: 4px;
          margin-top: 1rem;
        }
        
        .download-btn:hover {
          background: #218838;
        }
        
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
