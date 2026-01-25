import { useState, useEffect, useCallback } from "react";
import type { Note } from "./Memo.types";

const STORAGE_KEY = "retro-planner-notes";

const NOTE_COLORS = [
  "#FFE4E1", // Misty Rose
  "#E0BBE4", // Light Purple
  "#FFDFD3", // Peach
  "#D5F4E6", // Light Green
  "#FFF9C4", // Light Yellow
  "#E3F2FD", // Light Blue
  "#FCE4EC", // Light Pink
  "#F3E5F5", // Light Lavender
] as const;

function getRandomColor(): string {
  return NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)];
}

function generateNoteId(): string {
  return `note-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function useNotepad() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // localStorage에서 노트 불러오기
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem(STORAGE_KEY);
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error("노트 불러오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // localStorage에 노트 저장
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (error) {
        console.error("노트 저장 실패:", error);
      }
    }
  }, [notes, isLoading]);

  const createNote = useCallback(() => {
    const now = new Date().toISOString();
    const newNote: Note = {
      id: generateNoteId(),
      title: "새 노트",
      content: "",
      createdAt: now,
      updatedAt: now,
      isExpanded: true,
      color: getRandomColor(),
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote.id;
  }, []);

  const updateNote = useCallback((id: string, updates: Partial<Pick<Note, "title" | "content">>) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, ...updates, updatedAt: new Date().toISOString() }
          : note
      )
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }, []);

  const toggleNoteExpanded = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isExpanded: !note.isExpanded } : note
      )
    );
  }, []);

  const expandAllNotes = useCallback(() => {
    setNotes((prev) => prev.map((note) => ({ ...note, isExpanded: true })));
  }, []);

  const collapseAllNotes = useCallback(() => {
    setNotes((prev) => prev.map((note) => ({ ...note, isExpanded: false })));
  }, []);

  const changeNoteColor = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, color: getRandomColor() } : note
      )
    );
  }, []);

  return {
    notes,
    isLoading,
    createNote,
    updateNote,
    deleteNote,
    toggleNoteExpanded,
    expandAllNotes,
    collapseAllNotes,
    changeNoteColor,
  };
}
