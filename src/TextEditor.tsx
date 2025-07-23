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

  // If initialContent changes externally, reset the history
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
    <div className="p-4 h-full flex flex-col gap-2">
      <div className="flex gap-2">
        <button onClick={undo} disabled={!canUndo} className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">
          Undo
        </button>
        <button onClick={redo} disabled={!canRedo} className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">
          Redo
        </button>
        <button onClick={handleSave} className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Save Document
        </button>
      </div>
      <textarea
        className="flex-grow p-4 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={currentValue}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Start typing here..."
      />
    </div>
  );
}
