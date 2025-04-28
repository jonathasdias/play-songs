import { useState, useEffect } from "react";
import { Song } from "../../types/Song";
import { supabase } from "../../lib/supabase";
import InputUpload from "../../components/InputUpload";
import Loading from "../../components/Loading";
import ButtonDeleteSong from "../../components/ButtonDeleteSong";
import { useNavigate } from "react-router";

const Dashboard = () => {
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
      console.error("Erro ao buscar músicas:", error);
    } else {
      setLoadingDatas(false);
      setSongs(data || []);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Erro ao fazer logout:", error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-2 sm:p-6">
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition w-full mt-4"
      >
        Sair da Conta
      </button>
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-8">
        🎵 Reprodutor de Músicas
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

export default Dashboard;