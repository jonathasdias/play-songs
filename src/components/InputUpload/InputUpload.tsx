import { useRef } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "../ui/button";

interface InputUploadProps {
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchSongs: () => Promise<void>;
  uploading: boolean;
}

type inputElement = HTMLInputElement;

const InputUpload: React.FC<InputUploadProps> = ({
  fetchSongs,
  setUploading,
  uploading,
}) => {
  const inputRef = useRef<inputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);

    for (const file of files) {
      if (!file.type.startsWith("audio/")) {
        console.warn(`Arquivo ignorado: ${file.name} não é um áudio.`);
        continue;
      }

      const fileName: string = file.name
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9._-]/g, "");

      const filePath: string = `music/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("songs")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Erro no upload:", uploadError);
        continue;
      }

      const { data: publicUrlData } = supabase.storage
        .from("songs")
        .getPublicUrl(filePath);
      const publicUrl = publicUrlData.publicUrl;

      const { error: insertError } = await supabase.from("songs").insert({
        name: file.name.toString(),
        url: publicUrl.toString(),
        filePath: filePath.toString(),
      });

      if (insertError) {
        console.error("Erro ao salvar no banco:", insertError);
      }
    }

    setUploading(false);
    fetchSongs();
  };

  return (
    <>
      <Button
        className="py-6 px-6 text-xl bg-white text-black"
        title="Adicionar Música"
        aria-label="Adicionar Música"
        variant="secondary"
        onClick={() => inputRef.current?.click()}
      >
        + Adicionar Música
      </Button>
      <input
        type="file"
        ref={inputRef}
        accept="audio/*"
        multiple
        onChange={handleUpload}
        disabled={uploading}
        className="hidden"
      />
    </>
  );
};

export default InputUpload;
