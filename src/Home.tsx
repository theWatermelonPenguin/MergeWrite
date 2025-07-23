import { useRef, useState, type ChangeEvent } from 'react';
import logo from './../public/favicon.ico'

interface HomePageProps {
  onNew: () => void;
  onOpen: (content: string) => void;
}

export default function HomePage({ onNew, onOpen }: HomePageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null); // file name state

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setFileName(file.name); // save file name to state
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      if (loadEvent.target?.result && typeof loadEvent.target.result === 'string') {
        onOpen(loadEvent.target.result); // pass content to App
      }
    };
    reader.readAsText(file);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>MergeWrite</h1>
      <img src={logo} className="mx-auto"/>
      <button onClick={onNew}>New Document</button>
      <br /><br />
      <button onClick={openFileDialog}>Open Document</button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".mwdoc"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <br /><br />
      {fileName && <div><strong>Opened:</strong> {fileName}</div>}
    </div>
  );
}
