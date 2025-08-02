import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUploadSongsByAlbumId } from "@/hooks/useUploadSongsByAlbumId";

interface UploadSongFormProps {
  albumId: string;
}

const UploadSongForm = ({ albumId }: UploadSongFormProps) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const { mutate: uploadSongs, isPending } = useUploadSongsByAlbumId();

  const handleUpload = () => {
    if (!files || files.length === 0) {
      return;
    }

    uploadSongs({ files, albumId });
    setFiles(null); // Limpa o estado após o envio
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-white text-black" variant="secondary">
          + Adicionar Músicas
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar músicas ao seu álbum</DialogTitle>
          <DialogDescription>
            O nome da música deve ser único. Músicas duplicadas serão ignoradas.
            Clique em "Salvar" quando terminar.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input
            type="file"
            multiple
            accept="audio/*"
            onChange={(e) => setFiles(e.target.files)}
            className="cursor-pointer"
          />

          <div className="flex justify-between items-center">
            <Button
              type="button"
              onClick={handleUpload}
              disabled={isPending || !files?.length}
            >
              {isPending
                ? "Enviando músicas..."
                : `Salvar ${files?.length || 0} música(s)`}
            </Button>

            <Button type="reset" onClick={() => setFiles(null)}>
              Resetar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadSongForm;
