import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Controls from "./Controls/Controls";
import Gallery from "./Gallery/Gallery";

interface MenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Menu = ({ isOpen, setIsOpen }: MenuProps) => {
  const isMobile = true;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Menu</Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "left"}
        className="p-4 w-full max-w-sm"
      >
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
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
