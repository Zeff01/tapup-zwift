export const Divider = () => {
  return (
    <div className="flex items-center py-3">
      <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-400 to-gray-400"></div>
      <span className="px-3  text-gray-500">or</span>
      <div className="flex-grow h-px bg-gradient-to-r from-gray-400 via-gray-400 to-transparent"></div>
    </div>
  );
};
