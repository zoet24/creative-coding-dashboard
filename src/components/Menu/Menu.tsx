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
        <Button
          variant="ghost"
          className={`bg-gray-200 hover:bg-gray-300 p-0 rounded-lg ${
            isMobile
              ? "w-screen h-lg rounded-b-none absolute bottom-0"
              : "h-screen w-lg rounded-l-none absolute bottom-0"
          } `}
        >
          <div
            className={`bg-gray-400 rounded ${
              isMobile ? "w-1/2 h-sm" : "h-1/2 w-sm"
            } `}
          ></div>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "left"}
        className={`p-lg w-full flex flex-col  ${
          isMobile ? "h-[95vh]" : "h-full max-w-sm"
        }`}
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
        {!isMobile && (
          <div className="mt-auto">
            <Toolbar />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
