# Container Component Usage Guide

## Overview
The Container component provides a flexible wrapper for all templates, handling common layout patterns like padding, max-width, background colors, and overflow behavior.

## Basic Usage

### Generic Container
```tsx
import { TemplateContainer } from "@/components/templates/templatesComponents";

const MyTemplate = () => {
  return (
    <TemplateContainer
      backgroundColor="bg-white"
      padding="sm"
      maxWidth="480px"
      minHeight="screen"
    >
      {/* Your template content */}
    </TemplateContainer>
  );
};
```

### Pre-configured Template Containers
```tsx
import { Template1Container } from "@/components/templates/templatesComponents";

const Template1 = () => {
  return (
    <Template1Container>
      {/* Your template content */}
    </Template1Container>
  );
};
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| backgroundColor | string | "bg-white" | Tailwind background color class |
| backgroundImage | string | - | URL for background image |
| padding | "none" \| "xs" \| "sm" \| "md" \| "lg" | "none" | Container padding |
| maxWidth | "none" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "480px" | "none" | Maximum width constraint |
| overflow | "hidden" \| "auto" \| "visible" | - | General overflow behavior |
| overflowX | "hidden" \| "auto" \| "visible" | - | Horizontal overflow |
| overflowY | "hidden" \| "auto" \| "visible" | - | Vertical overflow |
| flex | boolean | true | Enable flex layout |
| flexDirection | "row" \| "col" | "col" | Flex direction |
| alignItems | "start" \| "center" \| "end" \| "stretch" | "center" | Flex align items |
| justifyContent | "start" \| "center" \| "end" \| "between" \| "around" \| "evenly" | "between" | Flex justify content |
| minHeight | "screen" \| "auto" \| string | "screen" | Minimum height |
| style | React.CSSProperties | {} | Custom inline styles |
| className | string | - | Additional CSS classes |

## Template-Specific Configurations

### Template1 & Template2
- Small padding (`p-2`)
- Max width 480px
- White/Dark backgrounds

### Template3 & Template4
- No padding
- Max width 480px
- Black/White backgrounds

### Template5
- Background image support
- No padding
- Max width 480px

### Template6
- Scrollable content (overflow-y-auto)
- Hidden horizontal overflow
- No padding

### Template7 & Template8
- Medium padding (`p-4`)
- Max width 480px

### Template9
- No max width constraint
- No padding
- Dark mode support
- Different flex alignment

## Example: Refactoring Template1

### Before:
```tsx
return (
  <div className="bg-white text-black p-2 flex flex-col items-center overflow-hidden justify-between min-h-screen">
    <div className="w-full mx-auto max-w-[480px]">
      {/* Content */}
    </div>
  </div>
);
```

### After:
```tsx
import { Template1Container } from "@/components/templates/templatesComponents";

return (
  <Template1Container>
    {/* Content */}
  </Template1Container>
);
```

## Custom Configurations

For templates with unique requirements:

```tsx
<TemplateContainer
  backgroundColor="bg-gradient-to-b from-blue-500 to-purple-600"
  padding="lg"
  maxWidth="2xl"
  style={{ 
    backgroundImage: 'url("/custom-pattern.png")',
    backgroundBlendMode: "overlay" 
  }}
>
  {/* Content */}
</TemplateContainer>
```