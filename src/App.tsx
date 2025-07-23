import { useState } from 'react';
import TextEditor from './TextEditor';
import HomePage from './Home'; // your HomePage component
import './App.css';

function App() {
  const [docContent, setDocContent] = useState<string | null>(null);

  const handleNew = () => {
    setDocContent(''); // empty string to start new doc
  };

  const handleOpen = (content: string) => {
    setDocContent(content); // open existing doc content
  };

  return (
    <div className="h-screen bg-gray-50">
      {docContent === null ? (
        <HomePage onNew={handleNew} onOpen={handleOpen} />
      ) : (
        <TextEditor initialContent={docContent} />
      )}
    </div>
  );
}

export default App;
