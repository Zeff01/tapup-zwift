import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Canvas, FabricObject } from "fabric";
import Image from "next/image";
import React, { useState, useEffect } from "react";

function Settings({ canvas }: { canvas: Canvas | null }) {
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [objects, setObjects] = useState({
    width: "",
    height: "",
    diameter: "",
    text: "",
    color: "",
    image: "",
  });

  // console.log(canvas);

  useEffect(() => {
    if (!canvas) return;
    canvas.on("selection:created", (event) => {
      handleObjectSelection(event.selected[0]);
    });

    canvas.on("selection:updated", (event) => {
      handleObjectSelection(event.selected[0]);
    });

    canvas.on("selection:cleared", () => {
      setSelectedObject(null);
      clearSettings();
    });

    canvas.on("object:modified", (event) => {
      handleObjectSelection(event.target);
    });

    canvas.on("object:scaling", (event) => {
      handleObjectSelection(event.target);
    });
  }, [canvas]);

  const handleObjectSelection = (object: any) => {
    if (!object) return;
    setSelectedObject(object);
    const objectTypeLookup = {
      rect: () => {
        setObjects((prev) => ({
          ...prev,
          width: `${Math.round(object.width * object.scaleX)}`,
          height: `${Math.round(object.height * object.scaleY)}`,
          color: object.fill as string,
          diameter: "",
          text: "",
        }));
      },
      circle: () => {
        setObjects((prev) => ({
          ...prev,
          width: "",
          height: "",
          color: object.fill as string,
          diameter: `${Math.round(object.radius * 2 * object.scaleX)}`,
          text: "",
        }));
      },
      text: () => {
        setObjects((prev) => ({
          ...prev,
          width: `${Math.round(object.width * object.scaleX)}`,
          height: `${Math.round(object.height * object.scaleY)}`,
          color: "",
          diameter: "",
          text: object.text as string,
        }));
      },
      triangle: () => {
        setObjects((prev) => ({
          ...prev,
          width: `${Math.round(object.width * object.scaleX)}`,
          height: `${Math.round(object.height * object.scaleY)}`,
          color: object.fill as string,
          diameter: "",
          text: "",
        }));
      },
      image: () => {
        setObjects((prev) => ({
          ...prev,
          width: `${Math.round(object.width * object.scaleX)}`,
          height: `${Math.round(object.height * object.scaleY)}`,
          color: "",
          diameter: "",
          text: "",
          image: object._originalElement.currentSrc as string,
        }));
      },
    };

    const f = (objectTypeLookup as { [key: string]: () => void })[object.type];
    if (!f) return;
    f();
  };

  const clearSettings = () => {
    setObjects({
      width: "",
      height: "",
      diameter: "",
      color: "",
      text: "",
      image: "",
    });
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas) return;
    const value = e.target.value.replace(/,/g, "");
    const intValue = parseInt(value, 10);

    setObjects((prev) => ({
      ...prev,
      width: value,
    }));

    if (selectedObject && selectedObject.type === "circle") return;

    if (
      selectedObject &&
      (selectedObject.type === "text" || selectedObject.type === "image") &&
      intValue >= 0
    ) {
      selectedObject.set({
        scaleX: intValue / selectedObject.width,
      });
      canvas.renderAll();
      return;
    }

    if (selectedObject && intValue >= 0) {
      selectedObject.set({
        width: intValue / selectedObject.scaleX,
      });
      canvas.renderAll();
    }
  };
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas) return;
    const value = e.target.value.replace(/,/g, "");
    const intValue = parseInt(value, 10);

    setObjects((prev) => ({
      ...prev,
      height: value,
    }));

    if (selectedObject && selectedObject.type === "circle") return;

    if (
      selectedObject &&
      (selectedObject.type === "text" || selectedObject.type === "image") &&
      intValue >= 0
    ) {
      selectedObject.set({
        scaleY: intValue / selectedObject.height,
      });
      canvas.renderAll();
      return;
    }

    if (selectedObject && intValue >= 0) {
      selectedObject.set({
        height: intValue / selectedObject.scaleY,
      });
      canvas.renderAll();
    }
  };
  const handleDiameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas) return;
    const value = e.target.value.replace(/,/g, "");
    const intValue = parseInt(value, 10);

    setObjects((prev) => ({
      ...prev,
      diameter: value,
    }));

    if (selectedObject && selectedObject.type === "circle" && intValue >= 0) {
      selectedObject.set({ radius: intValue / 2 / selectedObject.scaleX });
      canvas.renderAll();
    }
  };
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas) return;
    const value = e.target.value;

    setObjects((prev) => ({
      ...prev,
      color: value,
    }));

    if (selectedObject) {
      selectedObject.set({ fill: value });
      canvas.renderAll();
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas) return;
    const value = e.target.value;

    setObjects((prev) => ({
      ...prev,
      text: value,
    }));

    if (selectedObject && selectedObject.type === "text") {
      selectedObject.set({ text: value });
      canvas.renderAll();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas) return;

    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      // if (selectedObject && selectedObject.type === "image") {
      //   selectedObject.set({ src: e.target?.result });
      //   canvas.renderAll();
      // }
    };
    reader.readAsDataURL(file);
  };

  const controlsLookup = {
    rect: RectControls,
    circle: CircleControls,
    text: TextControls,
    triangle: TriangleControls,
    image: ImageControls,
  };

  const Controls =
    controlsLookup[
      (selectedObject?.type as keyof typeof controlsLookup) || ""
    ] || (() => null);

  if (!selectedObject) return null;

  return (
    <div className="absolute bg-primary text-white w-60 rounded-md top-5 left-5 px-4 py-2">
      <h1 className="text-xl">Properties</h1>
      <div className="relative py-2 flex flex-col rounded-md border-primary-foreground/20 gap-2">
        <Controls
          objects={objects}
          f={{
            handleWidthChange,
            handleHeightChange,
            handleDiameterChange,
            handleColorChange,
            handleTextChange,
          }}
        />
      </div>
    </div>
  );
}

export default Settings;

interface EditorSidebarProps extends React.ComponentProps<any> {}

const RectControls = ({ ...props }: EditorSidebarProps) => {
  const {
    objects,
    f: { handleWidthChange, handleHeightChange, handleColorChange },
  } = props;
  return (
    <>
      <label htmlFor="height" className="text-xs">
        Height
      </label>
      <Input
        id="height"
        type="number"
        value={objects.width}
        onChange={handleWidthChange}
      />
      <label htmlFor="width" className="text-xs">
        Width
      </label>
      <Input
        id="width"
        type="number"
        value={objects.height}
        onChange={handleHeightChange}
      />
      <label htmlFor="color" className="text-xs">
        Color
      </label>
      <div
        className="flex cursor-pointer border py-2 px-2 rounded-md border-primary-foreground/20"
        onClick={(e) => {
          e.stopPropagation();
          const el: any = e.target;
          el?.children[2]?.click();
        }}
      >
        <span
          key={objects.color}
          className="w-6 h-6 rounded-sm mr-2 pointer-events-none"
          style={{
            backgroundColor: objects.color,
          }}
        />
        <p key={`p-${objects.color}`} className="pointer-events-none">
          {objects.color}
        </p>
        <Input
          id="color"
          type="color"
          value={objects.width}
          onChange={handleColorChange}
          className="pointer-events-none invisible w-0 h-0"
        />
      </div>
    </>
  );
};

const CircleControls = ({ ...props }: EditorSidebarProps) => {
  const {
    objects,
    f: { handleDiameterChange, handleColorChange },
  } = props;
  return (
    <>
      <label htmlFor="diameter" className="text-xs">
        Diameter
      </label>
      <Input
        id="diameter"
        type="number"
        value={objects.diameter}
        onChange={handleDiameterChange}
      />
      <label htmlFor="color" className="text-xs">
        Color
      </label>
      <div
        className="flex cursor-pointer border py-2 px-2 rounded-md border-primary-foreground/20"
        onClick={(e) => {
          e.stopPropagation();
          const el: any = e.target;
          el?.children[2]?.click();
        }}
      >
        <span
          key={objects.color}
          className="w-6 h-6 rounded-sm mr-2 pointer-events-none"
          style={{
            backgroundColor: objects.color,
          }}
        />
        <p key={`p-${objects.color}`} className="pointer-events-none">
          {objects.color}
        </p>

        <Input
          id="color"
          type="color"
          value={objects.width}
          onChange={handleColorChange}
          className="pointer-events-none invisible w-0 h-0"
        />
      </div>
    </>
  );
};

const TextControls = ({ ...props }: EditorSidebarProps) => {
  const {
    objects,
    f: { handleTextChange, handleWidthChange, handleHeightChange },
  } = props;
  return (
    <>
      <label htmlFor="text" className="text-xs">
        Text
      </label>
      <Textarea
        id="text"
        className="bg-transparent resize-none border-primary-foreground/20"
        value={objects.text}
        onChange={handleTextChange}
      />
      <label htmlFor="width" className="text-xs">
        Width
      </label>
      <Input
        id="width"
        type="number"
        value={objects.width}
        onChange={handleWidthChange}
      />
      <label htmlFor="height" className="text-xs">
        Height
      </label>
      <Input
        id="height"
        type="number"
        value={objects.height}
        onChange={handleHeightChange}
      />
    </>
  );
};

const TriangleControls = ({ ...props }: EditorSidebarProps) => {
  const {
    objects,
    f: { handleWidthChange, handleHeightChange, handleColorChange },
  } = props;
  return (
    <>
      <label htmlFor="width" className="text-xs">
        Width
      </label>
      <Input
        id="width"
        type="number"
        value={objects.width}
        onChange={handleWidthChange}
      />
      <label htmlFor="height" className="text-xs">
        Height
      </label>
      <Input
        id="height"
        type="number"
        value={objects.height}
        onChange={handleHeightChange}
      />
      <label htmlFor="color" className="text-xs">
        Color
      </label>
      <div
        className="flex cursor-pointer border py-2 px-2 rounded-md border-primary-foreground/20"
        onClick={(e) => {
          e.stopPropagation();
          const el: any = e.target;
          el?.children[2]?.click();
        }}
      >
        <span
          key={objects.color}
          className="w-6 h-6 rounded-sm mr-2 pointer-events-none"
          style={{
            backgroundColor: objects.color,
          }}
        />
        <p key={`p-${objects.color}`} className="pointer-events-none">
          {objects.color}
        </p>

        <Input
          id="color"
          type="color"
          value={objects.width}
          onChange={handleColorChange}
          className="pointer-events-none invisible w-0 h-0"
        />
      </div>
    </>
  );
};

const ImageControls = ({ ...props }: EditorSidebarProps) => {
  const {
    objects,
    f: { handleWidthChange, handleHeightChange, handleImageChange },
  } = props;
  return (
    <>
      <div className="size-24 relative">
        <Image
          src={objects.image}
          className="object-contain h-full w-full"
          alt="image-preview"
          fill
        />
      </div>
      {/* <Input type="file" value={objects.image} onChange={handleImageChange} /> */}
      <label htmlFor="width" className="text-xs">
        Width
      </label>
      <Input
        id="width"
        type="number"
        value={objects.width}
        onChange={handleWidthChange}
      />
      <label htmlFor="height" className="text-xs">
        Height
      </label>
      <Input
        id="height"
        type="number"
        value={objects.height}
        onChange={handleHeightChange}
      />
    </>
  );
};
