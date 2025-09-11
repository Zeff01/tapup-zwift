import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  // Background customization
  backgroundColor?: string;
  backgroundImage?: string;
  // Layout customization
  padding?: "none" | "xs" | "sm" | "md" | "lg";
  maxWidth?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "480px";
  // Overflow behavior
  overflow?: "hidden" | "auto" | "visible";
  overflowX?: "hidden" | "auto" | "visible";
  overflowY?: "hidden" | "auto" | "visible";
  // Flex customization
  flex?: boolean;
  flexDirection?: "row" | "col";
  alignItems?: "start" | "center" | "end" | "stretch";
  justifyContent?: "start" | "center" | "end" | "between" | "around" | "evenly";
  // Height
  minHeight?: "screen" | "full" | "auto" | string;
  // Custom styles for special cases
  style?: React.CSSProperties;
}

const paddingMap = {
  none: "",
  xs: "p-1",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
};

const maxWidthMap = {
  none: "",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "480px": "max-w-[480px]",
};

const overflowMap = {
  hidden: "overflow-hidden",
  auto: "overflow-auto",
  visible: "overflow-visible",
};

const alignItemsMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyContentMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

export const TemplateContainer: React.FC<ContainerProps> = ({
  children,
  className,
  backgroundColor = "bg-white",
  backgroundImage,
  padding = "none",
  maxWidth = "none",
  overflow,
  overflowX,
  overflowY,
  flex = true,
  flexDirection = "col",
  alignItems = "center",
  justifyContent = "between",
  minHeight = "full",
  style = {},
}) => {
  // Build the className dynamically
  const containerClasses = cn(
    // Background
    !backgroundImage && backgroundColor,
    // Layout
    paddingMap[padding],
    // Overflow
    overflow && overflowMap[overflow],
    overflowX && `overflow-x-${overflowX}`,
    overflowY && `overflow-y-${overflowY}`,
    // Flex
    flex && "flex",
    flex && flexDirection === "col" && "flex-col",
    flex && flexDirection === "row" && "flex-row",
    flex && alignItemsMap[alignItems],
    flex && justifyContentMap[justifyContent],
    // Height - ensure min-h-full for proper footer positioning
    minHeight === "screen" && "min-h-screen",
    minHeight === "full" && "min-h-full",
    minHeight === "auto" && "min-h-auto",
    // Text color (default based on background)
    backgroundColor.includes("black") || backgroundColor.includes("neutral-800")
      ? "text-white"
      : "text-black",
    // Custom className
    className
  );

  const innerContainerClasses = cn("w-full mx-auto", maxWidthMap[maxWidth]);

  // Merge custom styles with background image if provided
  const mergedStyles = {
    ...style,
    ...(backgroundImage && {
      backgroundImage: `url("${backgroundImage}")`,
      backgroundSize: "cover",
      backgroundPosition: "top",
    }),
  };

  return (
    <div className={containerClasses} style={mergedStyles}>
      <div
        className={cn(
          innerContainerClasses,
          flex && "flex flex-col flex-grow min-h-full"
        )}
      >
        {children}
      </div>
    </div>
  );
};

// Convenience exports for common template patterns
export const Template1Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <TemplateContainer
    backgroundColor="bg-white"
    padding="sm"
    maxWidth="480px"
    overflow="hidden"
  >
    {children}
  </TemplateContainer>
);

export const Template2Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <TemplateContainer
    backgroundColor="bg-neutral-800"
    padding="sm"
    maxWidth="480px"
  >
    {children}
  </TemplateContainer>
);

export const Template3Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <TemplateContainer backgroundColor="bg-black" padding="none" maxWidth="480px">
    {children}
  </TemplateContainer>
);

export const Template4Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <TemplateContainer backgroundColor="bg-white" padding="none" maxWidth="480px">
    {children}
  </TemplateContainer>
);

export const Template5Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <TemplateContainer
    backgroundColor="bg-white"
    backgroundImage="/assets/template5bg.png"
    padding="none"
    maxWidth="480px"
  >
    {children}
  </TemplateContainer>
);

export const Template6Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <TemplateContainer
    backgroundColor="bg-white"
    padding="none"
    maxWidth="480px"
    overflowY="auto"
    overflowX="hidden"
  >
    {children}
  </TemplateContainer>
);

export const Template7Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <TemplateContainer backgroundColor="bg-white" padding="md" maxWidth="480px">
    {children}
  </TemplateContainer>
);

export const Template8Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <TemplateContainer backgroundColor="bg-white" padding="md" maxWidth="480px">
    {children}
  </TemplateContainer>
);

export const Template9Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <TemplateContainer
    backgroundColor="bg-white"
    padding="none"
    maxWidth="none"
    flex={true}
    flexDirection="col"
    alignItems="stretch"
    justifyContent="start"
  >
    {children}
  </TemplateContainer>
);
