import { Button } from "../ui/button";
import ButtonSettings from "../ButtonSettings/ButtonSettings";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between bg-gray-900 p-2">
      <Button className="bg-green-500 text-black hover:bg-green-600">
        Sua Playlist
      </Button>

      <ButtonSettings />
    </header>
  );
};

export default Header;
