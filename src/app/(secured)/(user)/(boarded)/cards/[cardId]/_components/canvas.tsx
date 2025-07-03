"use client";

import ImageWithLoading from "@/components/ImageWithLoading";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getVCardData } from "@/lib/utils";
import { Card } from "@/types/types";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";

export default function Canvas2Card({
  user,
  isQrScanner,
  open,
  onClose,
}: {
  user?: Partial<Card>;
  isQrScanner?: boolean;
  open?: boolean;
  onClose?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dlTimeout, setDlTimeout] = useState(0);

  const handleDownloadImage = async () => {
    const card = cardRef.current;
    if (!card || !user) return;

    html2canvas(card, { scale: 4, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${user?.lastName}.png`;
      link.href = imgData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDlTimeout(2);
    });
  };

  useEffect(() => {
    if (dlTimeout <= 0) return;
    const timeout = setTimeout(() => {
      setDlTimeout((p) => p - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [dlTimeout]);

  if (!open || !user) return null;

  const vCardData = getVCardData(user, true);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col items-center gap-4 p-10 max-w-md rounded-lg shadow-lg border border-neutral-300 dark:border-neutral-700">
        <div
          ref={cardRef}
          className="w-[340px] md:w-[400px] aspect-[1.5882] rounded-xl shadow-md p-5 flex flex-row gap-4 justify-between relative"
          style={{
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            color: "white",
          }}
        >
          {user ? (
            <>
              <div className="flex flex-col justify-between flex-grow">
                <div id="text-top" className="text-black mb-2">
                  <p className="font-extrabold text-lg">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="font-semibold text-base">{user.company}</p>
                  <p className="text-sm italic">{user.position}</p>
                </div>

                {user.profilePictureUrl && (
                  <div className="mt-2 shadow-md rounded-full relative h-[70px] w-[70px] overflow-hidden border-2 border-white">
                    <ImageWithLoading
                      src={user.profilePictureUrl}
                      fill
                      alt="user photo"
                      priority
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="mt-7 space-y-1 text-[10px]">
                  {user.email && <p>📩 {user.email}</p>}
                  {user.number && <p>&#128222;&nbsp;&nbsp;{user.number}</p>}
                </div>
              </div>
              <div className="flex items-center justify-center mt-8 rounded-md overflow-hidden border border-white bg-white p-1 w-[140px] h-[140px]">
                <QRCodeSVG
                  value={vCardData}
                  size={130}
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <MoonLoader
                loading={true}
                color="white"
                size={40}
                aria-label="Loading Spinner"
                data-testid="loader"
                speedMultiplier={0.5}
              />
            </div>
          )}
        </div>

        {!isQrScanner && (
          <button
            onClick={handleDownloadImage}
            className="bg-blueColor hover:bg-buttonColor text-white px-6 py-2 rounded-md active:scale-95 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!user || dlTimeout > 0}
          >
            Download QR Code
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}
