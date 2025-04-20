import axios from 'axios';

export const uploadFile = async (file: File) => {
  const form = new FormData();
  form.append('file', file);
  const { data } = await axios.post('/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data; // metadata retornada
};