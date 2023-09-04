import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const NOTES_API_URL = `${API_URL}/notes`;

export const fetchNotes = async () => {
  return axios(`${NOTES_API_URL}`);
};

export const createNote = async (data?: { title?: string; note?: string }) => {
  return axios.post(`${NOTES_API_URL}`, data);
};

export const deleteNote = async (id: number) => {
  return axios.delete(`${NOTES_API_URL}/${id}`);
};

export const updateNote = async ({
  id,
  title,
  note,
}: {
  id: string | number;
  title?: string;
  note?: string;
}) => {
  return axios.post(`${NOTES_API_URL}`, { id, title, note });
};

export const batchUpdate = async (
  updates: Map<number, { title?: string; note?: string }>
) => {
  const data = Array.from(updates.entries(), ([key, update]) => ({
    ...update,
    id: key,
  }));

  return axios.put(`${NOTES_API_URL}/batch`, data, {
    params: {
      batch: true,
    },
  });
};
