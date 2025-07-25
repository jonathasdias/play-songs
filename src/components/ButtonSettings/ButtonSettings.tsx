import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Settings } from "lucide-react";
import { useNavigate } from "react-router";
import { supabase } from "@/lib/supabase";

const ButtonSettings: React.FC = () => {
  const navigate = useNavigate();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Erro ao fazer logout: " + error.message);
      console.error("Erro ao fazer logout:", error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mr-4">
        <Settings className="text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-extrabold text-base">
          Minha conta
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Instagram</DropdownMenuItem>
        <DropdownMenuItem>Linked-in</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="https://www.github.com/jonathasdias" target="_blank">
            Github
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-red-500 font-bold">
          Sair da Conta
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ButtonSettings;
