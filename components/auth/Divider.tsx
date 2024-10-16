export const Divider = () => {
  return (
    <div className="flex items-center pb-4">
      <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-400 to-gray-400"></div>
      <span className="px-3 text-[20px] text-gray-500">or</span>
      <div className="flex-grow h-px bg-gradient-to-r from-gray-400 via-gray-400 to-transparent"></div>
    </div>
  );
};
