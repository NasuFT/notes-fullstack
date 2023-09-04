import axios from "axios";

const API_URL = "http://localhost:8000/notes";

export const fetchNotes = async () => {
  return axios(`${API_URL}`);
};

export const createNote = async (data?: { title?: string; note?: string }) => {
  return axios.post(`${API_URL}`, data);
};

export const deleteNote = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
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
  return axios.post(`${API_URL}`, { id, title, note });
};

export const batchUpdate = async (
  updates: Map<number, { title?: string; note?: string }>
) => {
  const data = Array.from(updates.entries(), ([key, update]) => ({
    ...update,
    id: key,
  }));

  return axios.put(`${API_URL}/batch`, data, {
    params: {
      batch: true,
    },
  });
};
