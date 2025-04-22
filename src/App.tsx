import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Song } from './types/Song';
import Loading from './components/Loading';
import ButtonDeleteSong from './components/ButtonDeleteSong';
import InputUpload from './components/InputUpload';

const App: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [loadingDatas, setLoadingDatas] = useState<boolean>(true);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    setLoadingDatas(true);
    const { data, error } = await supabase.from('songs').select("*");
    if (error) {
      console.error('Erro ao buscar músicas:', error);
    } else {
      setLoadingDatas(false);
      setSongs(data || []);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-2 sm:p-6">
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-8">🎵 Reprodutor de Músicas</h1>

      <div className="text-center mb-6">
        <InputUpload fetchSongs={fetchSongs} setUploading={setUploading} uploading/>
      </div>
      
      {uploading && <Loading />}

      <section>
        {loadingDatas && <Loading />}

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mx-auto">
          {songs.map(song => (
            <li key={song.id} className="bg-gray-800 rounded-lg shadow p-2 sm:p-4 flex justify-between items-center">
              
              <div className="flex-1">

                <div className='flex justify-between items-center gap-2 mb-4'>
                  <p className="text-sm font-semibold mb-2">{song.name}</p>

                  <ButtonDeleteSong fetchSongs={fetchSongs} song={song} />
                </div>

                <audio controls className="w-full text-[2px]">
                  <source src={song.url} type="audio/mpeg" />
                  Seu navegador não suporta o player de áudio.
                </audio>
              </div>

            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default App;