import { useState } from "react";
import { supabase } from "@/lib/supabase";
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

import { toast } from "react-toastify";

interface UploadSongFormProps {
  albumId: string;
}

const UploadSongForm = ({ albumId }: UploadSongFormProps) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    let successCount: number = 0;

    if (!files || files.length === 0) {
      toast.info("Selecione ao menos uma música.");
      return;
    }

    setIsLoading(true);

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("audio/")) {
        toast.info(`Arquivo ignorado: ${file.name} não é um áudio.`);
        console.warn(`Arquivo ignorado: ${file.name} não é um áudio.`);
        continue;
      }

      const fileName: string = file.name
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9._-]/g, "");

      const filePath: string = `music/${fileName}`;

      const { data: existingSong } = await supabase
        .from("songs")
        .select("id")
        .eq("name", file.name)
        .eq("album_id", albumId)
        .maybeSingle();

      if (existingSong) {
        toast.error("Música já existe.");
        console.warn(`Música duplicada ignorada: ${file.name}`);
        continue;
      }

      const { error: uploadError } = await supabase.storage
        .from("songs")
        .upload(filePath, file);

      if (uploadError) {
        toast.error(`Erro ao enviar ${file.name}: ${uploadError}`);
        console.error(`Erro ao enviar ${file.name}:`, uploadError);
        continue;
      } else {
        toast.success(`Upload efetuado com sucesso  ${file.name}`);
        console.log(`Upload efetuado com sucesso  ${file.name}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from("songs")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      const { error: insertError } = await supabase.from("songs").insert({
        name: file.name.toString(),
        url: publicUrl.toString(),
        filePath: filePath.toString(),
        album_id: albumId.toString(),
      });

      if (insertError) {
        toast.error(`Erro ao salvar no banco: ${insertError}`);
        console.error("Erro ao salvar no banco:", insertError);
      } else {
        successCount++;
      }
    }

    toast.info(`Músicas enviadas com sucesso: ${successCount}`);

    setIsLoading(false);
    setFiles(null);
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
          <DialogTitle>Adicionar músicas ao seu album</DialogTitle>
          <DialogDescription>
            O nome da música deve ser único e músicas duplicadas seram
            ignoradas. Clique em "Salvar" quando terminar.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
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
              disabled={isLoading || !files?.length}
            >
              {isLoading
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
