// Front Card Component (NFC/Tap Card)
const FrontCard = () => (
  <div
    className="absolute w-full h-full rounded-lg [backface-visibility:hidden] 
    bg-gradient-to-br from-foreground/90 
    via-green-900 to-foreground/90 border-2 border-purple-500"
  >
    <div className="p-6 flex flex-col justify-between h-full">
      <div className="text-right text-white">NFC</div>
      <div className="text-center">
        <div className="text-white text-2xl">Tap Up</div>
      </div>
      <div className="flex justify-between items-end">
        <div className="text-white text-sm">Powered By</div>
        <div className="w-16 h-16 bg-white rounded-lg border-2 border-orange-500">
          {/* QR Code placeholder */}
        </div>
      </div>
    </div>
  </div>
);

export default FrontCard;
