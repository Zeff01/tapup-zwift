"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cardEditorUtils } from "@/constants";
import React from "react";

interface EditorSidebarProps extends React.ComponentProps<any> {}

const EditorSidebar = (props: EditorSidebarProps) => {
  const { functions } = props;
  return (
    <aside className="relative flex w-[20rem] h-full bg-primary">
      <ScrollArea className="w-full" type="scroll">
        <div className="px-4 py-4 flex flex-col gap-2">
          {Object.values(cardEditorUtils).map((item, index) => {
            const Icon = item.icon;
            const f = functions[item.functionName];
            return (
              <div
                key={`util-${index}`}
                className="w-full border rounded-lg py-2 text-primary-foreground flex items-center px-2 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all"
                onClick={f}
              >
                <Icon className="size-6 mr-4" />
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default EditorSidebar;
