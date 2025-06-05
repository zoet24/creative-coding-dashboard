import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useActiveProject } from "../../context/ActiveProjectContext";
import { useIsMobile } from "../../hooks/useIsMobile";
import ProjectCarousel from "../ProjectCarousel/ProjectCarousel";
import Toolbar from "../Toolbar/Toolbar";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Controls from "./Controls/Controls";
import Gallery from "./Gallery/Gallery";

interface MenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Menu = ({ isOpen, setIsOpen }: MenuProps) => {
  const { config: activeProject } = useActiveProject();
  const isMobile = useIsMobile();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Menu</Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "left"}
        className="p-4 w-full max-w-sm flex flex-col h-full"
      >
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
        <div className="hidden md:block mt-auto">
          <Toolbar />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
