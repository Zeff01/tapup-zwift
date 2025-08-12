export const Separator = () => {
  return (
    <div className="flex items-center gap-4 py-2 w-full">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-gray-300 dark:to-gray-700"></div>
      <span className="text-xs text-muted-foreground font-medium">OR</span>
      <div className="flex-1 h-px bg-gradient-to-r from-gray-300 dark:from-gray-700 via-gray-300 dark:via-gray-700 to-transparent"></div>
    </div>
  );
};
