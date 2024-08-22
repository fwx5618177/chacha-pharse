import React, { useEffect } from "react";

const App: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      initializePhaserGame(canvasRef.current);
    }

    return () => {
      destroyPhaserGame();
    };
  }, []);

  return (
    <div id="app">
      <canvas ref={canvasRef} id="canvas"></canvas>
    </div>
  );
};

export default App;
