const CardSkeleton = () => {
  return (
    <div className="relative aspect-[1.586/1] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
      {/* Card Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        {/* Logo */}
        <div className="w-20 h-20 bg-gray-200 animate-pulse mb-2" />

        {/* Text under logo */}
        <div className="w-12 h-3 bg-gray-200 animate-pulse" />

        {/* NFC Icon */}
        <div className="absolute top-4 right-4">
          <div className="w-4 h-4 bg-gray-200 rounded-sm animate-pulse" />
        </div>

        {/* Bottom powered by */}
        <div className="absolute bottom-6">
          <div className="w-16 h-2 bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const CardSkeleton2 = () => {
  return (
    <div className="relative aspect-[1.586/1] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
      {/* Card Content */}
      <div className="absolute inset-0 p-6">
        {/* Top text sections */}
        <div className="flex flex-col gap-1.5">
          <div className="w-32 h-4 bg-gray-200 animate-pulse" />
          <div className="w-24 h-3 bg-gray-200 animate-pulse" />
        </div>

        {/* QR Code */}
        <div className="absolute top-6 right-6">
          <div className="w-12 h-12 bg-gray-200 rounded-sm animate-pulse" />
        </div>

        {/* Bottom logo */}
        <div className="absolute bottom-6 left-6">
          <div className="flex items-center gap-1">
            <div className="w-8 h-3 bg-gray-200 animate-pulse" />
            <div className="w-4 h-3 bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { CardSkeleton, CardSkeleton2 };
