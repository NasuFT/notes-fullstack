import { create } from "zustand";

type NoteID = string | number;
type NoteGroupID = string | number;

interface Note {
  id: NoteID;
  groupId: NoteGroupID;
  title: string;
  note: string;
}

interface NoteGroup {
  id: NoteGroupID;
  title: string;
}

interface NotesStore {
  groups: NoteGroup[];
  notes: Note[];
  addGroup: () => void;
  deleteGroup: (id: NoteGroupID) => void;
  addNote: (groupId: NoteGroupID) => void;
  deleteNote: (id: NoteID) => void;
  save: () => void;
  _nextGroup: number;
  _nextNote: number;
}

export const useNotes = create<NotesStore>((set) => ({
  groups: [
    { id: 1, title: "Group 1" },
    { id: 2, title: "Group 2" },
  ],
  notes: [
    { id: 1, title: "String", note: "", groupId: 1 },
    { id: 2, title: "Of Course", note: "", groupId: 2 },
    { id: 3, title: "No", note: "No", groupId: 2 },
  ],
  _nextGroup: 3,
  _nextNote: 4,

  addNote: (groupId: NoteGroupID) =>
    set((state) => ({
      notes: [
        ...state.notes,
        { id: state._nextNote, title: "", note: "", groupId },
      ],
      _nextNote: state._nextNote + 1,
    })),
  addGroup: () =>
    set((state) => ({
      groups: [...state.groups, { id: state._nextGroup, title: "" }],
      _nextGroup: state._nextGroup + 1,
    })),
  deleteGroup: (id: NoteGroupID) =>
    set((state) => ({
      groups: state.groups.filter((group) => group.id !== id),
    })),
  deleteNote: (id: NoteGroupID) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),
  save: () => {},
}));
