"use client";

import React, { useRef, useState, useEffect } from "react";
import EditorSidebar from "./_components/editor-sidebar";
import {
  Canvas,
  Circle,
  FabricImage,
  FabricObject,
  FabricText,
  Image,
  Rect,
  Triangle,
  util,
} from "fabric";
import Settings from "./_components/settings";

type Props = {};

const CardEditor = (props: Props) => {
  const mainCanvasRef = useRef(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  useEffect(() => {
    if (!mainCanvasRef.current) return;
    const initCanvas = new Canvas(mainCanvasRef.current, {
      width: 324,
      height: 204,
    });
    initCanvas.backgroundColor = "#fff";

    initCanvas.requestRenderAll();

    const saveCanvasState = () => {
      const json = initCanvas?.toJSON();
      localStorage.setItem("canvasState", JSON.stringify(json));
    };

    const deleteCanvasObjects = (e: any) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        initCanvas.getActiveObjects().forEach((object) => {
          initCanvas.remove(object);
        });
        initCanvas.discardActiveObject();
        initCanvas.requestRenderAll();
      }
    };
    window.addEventListener("keydown", deleteCanvasObjects);
    window.addEventListener("beforeunload", saveCanvasState);

    const savedState = localStorage.getItem("canvasState");

    if (savedState) {
      util.enlivenObjects(JSON.parse(savedState).objects).then((objects) => {
        objects.forEach((object) => {
          if (object instanceof FabricObject) {
            initCanvas.add(object);
          } else {
            console.error("Unsupported object type:", object);
          }
        });
      });
      initCanvas.requestRenderAll();
    }

    setCanvas(initCanvas);

    return () => {
      window.removeEventListener("keydown", deleteCanvasObjects);
      window.removeEventListener("beforeunload", saveCanvasState);
      initCanvas.dispose();
    };
  }, []);

  const addText = () => {
    if (!canvas) return;
    const text = new FabricText("Hello", {
      left: 100,
      top: 100,
      width: 100,
      height: 100,
    });

    canvas.add(text);
  };
  const addCircle = () => {
    if (!canvas) return;
    const circle = new Circle({
      left: 100,
      top: 100,
      radius: 20,
      fill: "#2F4DC6",
    });
    canvas.add(circle);
  };
  const addRectangle = () => {
    if (!canvas) return;
    const text = new Rect({
      left: 100,
      top: 100,
      width: 30,
      height: 20,
      fill: "#2F4DC6",
    });
    canvas.add(text);
  };
  const addTriangle = () => {
    if (!canvas) return;
    const text = new Triangle({
      left: 100,
      top: 100,
      width: 40,
      height: 40,
      fill: "#2F4DC6",
    });

    canvas.add(text);
  };

  const addImage = () => {
    if (!canvas) return;
    const img = document.createElement("img");
    img.src = "/images/default.jpg";
    img.onload = () => {
      const desiredWidth = 150;
      const desiredHeight =
        desiredWidth / (img.naturalWidth / img.naturalHeight);
      const scaleX = desiredWidth / img.naturalWidth;
      const scaleY = desiredHeight / img.naturalHeight;
      const imgInstance = new FabricImage(img, {
        left: 100,
        top: 100,
        scaleX: scaleX,
        scaleY: scaleY,
      });
      canvas.add(imgInstance);
    };
  };

  return (
    <main className="h-full flex overflow-hidden relative">
      <div className="flex-1 bg-primary/50 flex items-center justify-center">
        <canvas
          key={"canvas"}
          className="z-50 rounded-md shadom-md"
          id="canvasMain"
          ref={mainCanvasRef}
        />
      </div>
      <EditorSidebar
        functions={{ addText, addCircle, addRectangle, addTriangle, addImage }}
      />
      <Settings canvas={canvas} />
    </main>
  );
};

export default CardEditor;
