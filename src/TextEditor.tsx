import { useState } from 'react';

export default function TextEditor() {
  const [text, setText] = useState('');

  return (
    <div className="p-4 h-full flex flex-col">
      <textarea
        className="flex-grow p-4 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing here..."
      />
    </div>
  );
}
