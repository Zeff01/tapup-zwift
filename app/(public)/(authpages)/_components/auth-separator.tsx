export const Separator = () => {
  return (
    <div className="flex items-center py-3 mt-2 w-full">
      <div className="flex-grow h-px bg-gradient-to-r from-transparent via-foreground to-foreground"></div>
      <span className="px-2 text-xs text-gray-500 italic">or</span>
      <div className="flex-grow h-px bg-gradient-to-r from-foreground via-foreground to-transparent"></div>
    </div>
  );
};
