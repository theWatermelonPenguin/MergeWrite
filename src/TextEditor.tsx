import { useEffect } from 'react';
import useUndoRedo from './useUndoRedo';

interface TextEditorProps {
  initialContent: string;
}

export default function TextEditor({ initialContent }: TextEditorProps) {
  const {
    currentValue,
    setValue,
    undo,
    redo,
    canUndo,
    canRedo,
    reset,
  } = useUndoRedo(initialContent);

  useEffect(() => {
    reset(initialContent);
  }, [initialContent, reset]);

  const handleSave = () => {
    const blob = new Blob([currentValue], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.mwdoc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 h-full flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => (window.location.href = '/')}
          className="flex items-center gap-2 px-3 py-1 bg-gray-300 rounded"
        >
          <img src="/go-back.svg" alt="Back" className="w-6 h-6 -scale-x-100" />
          Go Back
        </button>
        <button
          onClick={undo}
          disabled={!canUndo}
          className="flex items-center gap-2 px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          <img src="/undo.svg" alt="Undo" className="w-5 h-5" />
          Undo
        </button>

        <button
          onClick={redo}
          disabled={!canRedo}
          className="flex items-center gap-2 px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          <img src="/redo.svg" alt="Redo" className="w-5 h-5" />
          Redo
        </button>

        <button
          onClick={handleSave}
          className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Document
        </button>
      </div>

      {/* Textarea */}
      <textarea
        className="flex-grow p-4 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={currentValue}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Start typing here..."
      />
    </div>
  );
}
