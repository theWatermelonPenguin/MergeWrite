import { useState, useCallback } from 'react';

export default function useUndoRedo<T>(initialValue: T) {
  const [history, setHistory] = useState<T[]>([initialValue]);
  const [index, setIndex] = useState(0);

  const setValue = useCallback((newValue: T) => {
    const newHistory = history.slice(0, index + 1);
    newHistory.push(newValue);
    setHistory(newHistory);
    setIndex(newHistory.length - 1);
  }, [history, index]);

  const undo = useCallback(() => {
    if (index > 0) setIndex(index - 1);
  }, [index]);

  const redo = useCallback(() => {
    if (index < history.length - 1) setIndex(index + 1);
  }, [index, history]);

  const reset = useCallback((value: T) => {
    setHistory([value]);
    setIndex(0);
  }, []);

  return {
    currentValue: history[index],
    setValue,
    undo,
    redo,
    canUndo: index > 0,
    canRedo: index < history.length - 1,
    reset,
  };
}
