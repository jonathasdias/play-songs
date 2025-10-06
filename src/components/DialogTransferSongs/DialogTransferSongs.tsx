import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useTransferAllSongs } from "@/hooks/useTransferAllSongs";
import { useTransferSong } from "@/hooks/useTransferSong";
import { toast } from "react-toastify";
import { Album } from "@/types/Album";
import { RiFileTransferFill, RiFolderTransferLine } from "react-icons/ri";

interface DialogTransferSongsProps {
  albums: Album[];
  fromAlbumId?: string; // se fornecido, move TODAS as músicas
  songId?: string; // se fornecido, move apenas UMA música
}

export function DialogTransferSongs({
  albums,
  fromAlbumId,
  songId,
}: DialogTransferSongsProps) {
  const [toAlbumId, setToAlbumId] = useState("");
  const { mutate: transferAll, isPending: isTransferringAll } =
    useTransferAllSongs();
  const { mutate: transferSong, isPending: isTransferringOne } =
    useTransferSong();

  const handleTransfer = () => {
    if (!toAlbumId) {
      toast.warn("Selecione um álbum de destino!");
      return;
    }

    if (fromAlbumId === toAlbumId) {
      toast.warn("Escolha um álbum diferente para transferir!");
      return;
    }

    if (songId) {
      // transferir uma música
      transferSong(
        { songId, toAlbumId },
        {
          onSuccess: () => toast.success("Música transferida com sucesso!"),
          onError: (err) => toast.error(`Erro: ${(err as Error).message}`),
        }
      );
    } else if (fromAlbumId) {
      // transferir todas as músicas
      transferAll(
        { fromAlbumId, toAlbumId },
        {
          onSuccess: () =>
            toast.success("Todas as músicas foram transferidas!"),
          onError: (err) => toast.error(`Erro: ${(err as Error).message}`),
        }
      );
    }
  };

  const isPending = isTransferringAll || isTransferringOne;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-white text-black hover:bg-gray-100 transition"
          variant="secondary"
          title={songId ? "Mover música" : "Mover todas as músicas"}
          aria-label={songId ? "Mover música" : "Mover todas as músicas"}
        >
          {songId ? (
            <RiFolderTransferLine size={18} />
          ) : (
            <RiFileTransferFill size={18} />
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {songId ? "Transferir música" : "Transferir todas as músicas"}
          </DialogTitle>
          <DialogDescription>
            Clique em Confirmar transferência após escolher o album.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <label className="text-sm font-medium">
            Selecione o álbum de destino:
          </label>
          <Select onValueChange={setToAlbumId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Escolher álbum..." />
            </SelectTrigger>
            <SelectContent>
              {albums &&
                albums.map((album) => (
                  <SelectItem key={album.id} value={album.id}>
                    {album.title}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="mt-4">
          <Button disabled={isPending} onClick={handleTransfer}>
            {isPending ? "Transferindo..." : "Confirmar transferência"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
