import { Badge } from "lucide-react";
import { Card } from "../../ui/card";
import { Input } from "../../ui/input";

const Gallery = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <Input placeholder="Search..." />
        <select className="border px-2 py-1 rounded-md">
          <option>All</option>
          <option>Visual</option>
          <option>Physics</option>
        </select>
      </div>
      {[1, 2, 3].map((_, i) => (
        <Card key={i} className="p-4 border-2 border-green-500">
          <h4 className="font-bold">Day 0{i} - Project Name</h4>
          <p className="text-sm">Description description description</p>
          <div className="flex gap-1 mt-2">
            <Badge>Category</Badge>
            <Badge>Category</Badge>
            <Badge>Category</Badge>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Gallery;
