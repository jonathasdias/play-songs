import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormEvent, useState } from "react";
import Loading from "../Loading";
import { useCreateAlbum } from "@/hooks/useCreateAlbum";
import { useUser } from "@/hooks/useUser";

interface CreateAlbumFormType {
  className?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateAlbumForm = ({ className, setOpen }: CreateAlbumFormType) => {
  const [titleAlbum, setTitleAlbum] = useState<string>("");

  const { data: user, error: userError } = useUser();
  const { mutate: criarAlbum, isPending, error } = useCreateAlbum();

  async function handleCreateAlbum(e: FormEvent) {
    e.preventDefault();

    if (titleAlbum.trim() === "") {
      alert("O título não pode ser vazio");
      return;
    }

    if (userError || !user) {
      console.error("Usuário não autenticado");
      alert("Você precisa estar logado para criar um álbum.");
      return;
    }

    criarAlbum({ title: titleAlbum, user_id: user?.id });
    setTitleAlbum("");

    if (error) {
      console.error("Erro ao criar álbum:", error.message);
      alert("Erro ao criar álbum");
    } else {
      alert("Álbum criado com sucesso!");
      setOpen(false);
    }
  }

  return (
    <form
      onSubmit={handleCreateAlbum}
      className={cn("grid items-start gap-6", className)}
    >
      <div className="grid gap-3">
        <Label htmlFor="titleAlbum">Titulo do album</Label>
        <Input
          type="text"
          id="titleAlbum"
          onChange={(e) => setTitleAlbum(e.target.value)}
          minLength={2}
          maxLength={30}
          required
        />
      </div>
      {isPending ? <Loading /> : <Button type="submit">Criar</Button>}
    </form>
  );
};

export default CreateAlbumForm;
