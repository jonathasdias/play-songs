import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Song } from './types/Song';

const App: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    const { data, error } = await supabase.from('songs').select("*");
    if (error) {
      console.error('Erro ao buscar músicas:', error);
    } else {      
      setSongs(data || []);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);

    for (const file of files) {
      
      if (!file.type.startsWith('audio/')) {
        console.warn(`Arquivo ignorado: ${file.name} não é um áudio.`);
        continue;
      }

      const filePath = `music/${file.name.trim()}`;

      const { error: uploadError } = await supabase.storage.from('songs').upload(filePath, file);

      if (uploadError) {
        console.error('Erro no upload:', uploadError);
        continue;
      }

      const { data: publicUrlData } = supabase.storage.from('songs').getPublicUrl(filePath);
      const publicUrl = publicUrlData.publicUrl;

      const { error: insertError } = await supabase.from('songs').insert({
        'name': file.name.toString(),
        'url': publicUrl.toString(),
        'filePath': filePath.toString(),
      });

      if (insertError) {
        console.error('Erro ao salvar no banco:', insertError);
      }
    }

    setUploading(false);
    fetchSongs();
  };

  const deleteSong = async (song: Song) => {
    const confirm = window.confirm(`Deseja deletar a música "${song.name}"?`);
    if (!confirm) return;
  
    try {
      // Remover do Storage
      const { error: storageError } = await supabase.storage.from("songs").remove([song.filePath]);

      if (storageError) {
        console.error("Erro ao remover do storage:", storageError);
        return;
      }
  
      // Remover do banco de dados
      const { error: dbError } = await supabase.from("songs").delete().eq("id", song.id);
      if (dbError) {
        console.error("Erro ao remover do banco de dados:", dbError);
        return;
      }
  
      fetchSongs(); // Atualiza a lista após exclusão
    } catch (error) {
      console.error("Erro ao deletar a música:", error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">🎵 Reprodutor de Músicas</h1>

      <div className="flex justify-center mb-6">
        <input
          type="file"
          accept="audio/*"
          multiple
          onChange={handleUpload}
          disabled={uploading}
          className="p-2 bg-gray-800 border border-gray-600 rounded cursor-pointer"
        />
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {songs.map(song => (
          <div key={song.id} className="bg-gray-800 rounded-lg shadow p-4 flex justify-between items-center">
            <div className="flex-1">
              <p className="text-lg font-semibold mb-2">{song.name}</p>
              <audio controls className="w-full">
                <source src={song.url} type="audio/mpeg" />
                Seu navegador não suporta o player de áudio.
              </audio>
            </div>
            <button
              onClick={() => deleteSong(song)}
              className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              ❌ Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;