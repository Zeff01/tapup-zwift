export const Divider = () => {
  return (
    <div className="flex items-center py-3 w-full">
      <div className="flex-grow h-px bg-gradient-to-r from-transparent via-black to-black"></div>
      <span className="px-2  text-gray-500">or</span>
      <div className="flex-grow h-px bg-gradient-to-r from-black via-black to-transparent"></div>
    </div>
  );
};
