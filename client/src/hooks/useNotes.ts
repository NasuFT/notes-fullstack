import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNote as addNoteAPI,
  fetchNotes as getNotesAPI,
  deleteNote as deleteNoteAPI,
  batchUpdate,
} from "../api/notes";
import { useCallback, useRef, useState } from "react";

type NoteID = number;
// type NoteGroupID = string | number;

export interface NoteContent {
  title?: string;
  note?: string;
}

export interface Note extends NoteContent {
  id: NoteID;
}

interface UseNotesOptions {
  onDeleteSuccess?: () => void;
}

export const useNotes = ({ onDeleteSuccess }: UseNotesOptions) => {
  const queryClient = useQueryClient();

  const updates = useRef(new Map<number, NoteContent>());
  const updatesToCommit = useRef(new Map<number, NoteContent>());
  const timerRef = useRef<number>(-1);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const { data: notes, isInitialLoading } = useQuery(
    ["notes"],
    () => getNotesAPI().then((res) => res.data as Note[]),
    {
      placeholderData: [],
    }
  );

  const { isLoading: isAdding, mutate: addNote } = useMutation(
    ["addNote"],
    () => addNoteAPI().then((res) => res.data as Note),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<Note[]>(["notes"], (notes) =>
          notes?.concat([data])
        );
      },
    }
  );

  const { isLoading: isDeleting, mutate: deleteNote } = useMutation(
    (id: NoteID) => deleteNoteAPI(id),
    {
      onSuccess: (_, id) => {
        onDeleteSuccess?.();
        queryClient.setQueryData<Note[]>(["notes"], (notes) =>
          notes?.filter((note) => note.id !== id)
        );
      },
    }
  );

  const {
    mutate: updateNotes,
    status: updateStatus,
    isLoading: isUpdating,
  } = useMutation(async () => {
    applyUpdates();
    return batchUpdate(updatesToCommit.current).then((res) => res.data);
  });

  const applyUpdates = useCallback(() => {
    if (updates.current.size === 0) {
      return;
    }

    updates.current.forEach((value, key) => {
      const update = updatesToCommit.current.get(key);

      if (!update) {
        updatesToCommit.current.set(key, value);
        return;
      }

      Object.assign(update, value);
    });
    updates.current.clear();
  }, []);

  const queueUpdate = useCallback(
    (id: number, content: NoteContent) => {
      clearTimeout(timerRef.current);

      const update = updates.current.get(id);

      if (!update) {
        updates.current.set(id, content);
      } else {
        Object.assign(update, content);
      }

      console.log(updates.current);

      setIsTimerActive(true);
      timerRef.current = setTimeout(() => {
        updateNotes();
        setIsTimerActive(false);
      }, 3000);
    },
    [updateNotes]
  );

  return {
    notes,
    isInitialLoading,
    isAdding,
    addNote,
    isDeleting,
    deleteNote,
    queueUpdate,
    willUpdate: isTimerActive,
    isUpdating,
    updateStatus,
  };
};
