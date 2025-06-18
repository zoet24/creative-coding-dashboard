import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useActiveProject } from "../../context/ActiveProjectContext";
import ProjectCarousel from "../ProjectCarousel/ProjectCarousel";
import Toolbar from "../Toolbar/Toolbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Controls from "./Controls/Controls";
import Gallery from "./Gallery/Gallery";
import MenuTrigger from "./MenuTrigger/MenuTrigger";

interface MenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Menu = ({ isOpen, setIsOpen }: MenuProps) => {
  const { config: activeProject } = useActiveProject();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <MenuTrigger type="open" setIsOpen={() => setIsOpen(true)} />
      <SheetContent
        side="left"
        className="p-lg w-full flex flex-col h-full max-w-[80vw]"
      >
        <MenuTrigger type="close" setIsOpen={() => setIsOpen(false)} />
        {activeProject && <ProjectCarousel />}
        <Tabs defaultValue="controls" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="controls">Controls</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>
          <TabsContent value="controls">
            <Controls />
          </TabsContent>
          <TabsContent value="gallery">
            <Gallery />
          </TabsContent>
        </Tabs>
        <div className="mt-auto">
          <Toolbar />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
