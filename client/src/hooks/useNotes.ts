import { create } from "zustand";

type NoteID = string | number;
// type NoteGroupID = string | number;

export interface Note {
  id: NoteID;
  title: string;
  note: string;
}

// interface NoteGroup {
//   id: NoteGroupID;
//   title: string;
// }

interface NotesStore {
  // groups: NoteGroup[];
  notes: Note[];
  // addGroup: () => void;
  // deleteGroup: (id: NoteGroupID) => void;
  addNote: () => void;
  deleteNote: (id: NoteID) => void;
  setNotes: (notes: Note[]) => void;
  updateNoteTitle: (id: NoteID, title: string) => void;
  updateNoteText: (id: NoteID, note: string) => void;
  // save: () => void;
  // _nextGroup: number;
  _nextNote: number;
}

export const useNotes = create<NotesStore>((set) => ({
  // groups: [
  //   { id: 1, title: "Group 1" },
  //   { id: 2, title: "Group 2" },
  // ],
  notes: [],
  // _nextGroup: 3,
  _nextNote: 4,

  setNotes: (notes: Note[]) => set(() => ({ notes })),
  updateNoteTitle: (id, title) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id !== id ? note : { ...note, title }
      ),
    })),
  updateNoteText: (id, text) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id !== id ? note : { ...note, note: text }
      ),
    })),
  addNote: () => {
    set((state) => ({
      notes: [...state.notes, { id: state._nextNote, title: "", note: "" }],
      _nextNote: state._nextNote + 1,
    }));
  },
  deleteNote: (id: NoteID) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),
  save: () => {},
}));
