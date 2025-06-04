import { useState } from "react";
import { Button } from "./components/ui/button";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button>Click me</Button>
    </>
  );
}

export default App;
