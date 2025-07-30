import { useState, useEffect } from "react";
import { Song } from "../../types/Song";
import { supabase } from "../../lib/supabase";
import InputUpload from "../../components/InputUpload";
import Loading from "../../components/Loading";
import ButtonDeleteSong from "../../components/ButtonDeleteSong";
import { useNavigate } from "react-router";

const DashboardMusicsAnterior = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [loadingDatas, setLoadingDatas] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAuth();
    fetchSongs();
  }, []);

  const fetchAuth = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) {
      navigate("/");
      return;
    }
  };

  const fetchSongs = async () => {
    setLoadingDatas(true);
    const { data, error } = await supabase.from("songs").select("*");
    if (error) {
      alert("Erro ao buscar músicas: " + error);
      console.error("Erro ao buscar músicas:", error);
    } else {
      setLoadingDatas(false);
      setSongs(data || []);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-2 sm:p-6">
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-8">
        🎵 Minhas Músicas
      </h1>

      <div className="text-center mb-10">
        <InputUpload
          fetchSongs={fetchSongs}
          setUploading={setUploading}
          uploading={uploading}
        />
      </div>

      {uploading && <Loading />}

      <section>
        {loadingDatas && <Loading />}

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mx-auto">
          {songs.map((song) => (
            // Esse li vai virar um cart component onde vai ter apenas o nome da musica, o botão de player que vai
            // aparecer o Miniplayer para reproduzir a musica, sera um botão toogle de reproduzir e pausar.
            // também terá um botão de baixar a musica e adicionar a playlist.
            <li
              key={song.id}
              className="bg-gray-800 rounded-lg shadow p-2 sm:p-4 flex justify-between items-center"
            >
              <div className="flex-1">
                <div className="flex justify-between items-center gap-2 mb-4">
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

export default DashboardMusicsAnterior;
