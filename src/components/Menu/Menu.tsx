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
        <Tabs
          defaultValue="controls"
          className="w-full flex flex-col flex-grow overflow-hidden"
        >
          <TabsList className="grid grid-cols-2 mb-md">
            <TabsTrigger value="controls">Controls</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>
          <div className="flex-grow overflow-y-auto pb-12 scrollbar-hidden">
            <TabsContent value="controls">
              <Controls />
            </TabsContent>
            <TabsContent value="gallery">
              <Gallery />
            </TabsContent>
          </div>
        </Tabs>
        <div
          className="absolute bottom-0 left-0 right-0 p-lg"
          style={{
            background:
              "linear-gradient(to top, white 80%, rgba(255,255,255,0))",
          }}
        >
          <Toolbar />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
