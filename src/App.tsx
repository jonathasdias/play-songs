import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Song } from './types/Song';

const App: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const { data } = await axios.get<Song[]>(`${backendUrl}/songs`);
      setSongs(data);
    } catch (error) {
      console.error('Erro ao buscar músicas:', error);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('audio', file));

    try {
      await axios.post(`${backendUrl}/upload`, formData);
      fetchSongs();
    } catch (err) {
      console.error('Erro no upload:', err);
    }
  };

  const deleteSong = async (id: number) => {
    if (!window.confirm('Deseja deletar essa música?')) return;

    try {
      await axios.delete(`${backendUrl}/songs/${id}`);
      fetchSongs();
    } catch (err) {
      console.error('Erro ao deletar música:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">🎵 Reprodutor de Músicas</h1>

      <div className="flex justify-center mb-6">
        <input
          type="file"
          accept="audio/*"
          multiple
          onChange={handleUpload}
          className="p-2 border rounded bg-gray-700 cursor-pointer"
        />
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {songs.map(song => (
          <div key={song.id} className="bg-gray-700 rounded shadow p-4 flex justify-between items-center">
            <div className="flex-1">
              <p className="font-semibold mb-1">{song.name}</p>
              <audio controls className="w-full">
                <source src={`${backendUrl}/audio/${song.id}`} type="audio/mpeg" />
                Seu navegador não suporta o elemento <code>audio</code>.
              </audio>
            </div>
            <button
              onClick={() => deleteSong(song.id)}
              className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Delete
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;