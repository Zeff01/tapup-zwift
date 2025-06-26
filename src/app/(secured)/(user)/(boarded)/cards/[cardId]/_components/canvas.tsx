"use client";

import ImageWithLoading from "@/components/ImageWithLoading";
import { createCardLink } from "@/lib/utils";
import { Users } from "@/types/types";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";

export default function Canvas2Card({
  user,
  isQrScanner,
}: {
  user: Users;
  isQrScanner?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dlTimeout, setDlTimeout] = useState(0);

  const handleDownloadImage = async () => {
    const card = cardRef.current;
    if (!card || !user) return;
    const textTop = document.getElementById("text-top") as HTMLDivElement;
    textTop.style.transform = "translateY(-8px)";
    html2canvas(card, { scale: 4 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      const fileName = `${user?.lastName}.png`;
      link.download = fileName;
      link.href = imgData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      textTop.style.transform = "translateY(0px)";
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

  return (
    <div className="bg-background w-full flex-1 flex flex-col items-center px-2 py-16 gap-y-4">
      <div
        ref={cardRef}
        className={`text-black dark:text-black relative w-[400px] scale-[0.8] lg:scale-100 aspect-[1.5882]  shadow-md rounded-md`}
        style={{ backgroundColor: "white" }}
      >
        {user ? (
          <div className="w-full h-full flex flex-row gap-x-2 justify-between p-5 ">
            <div className="flex-grow flex flex-col justify-between">
              <div id="text-top">
                <p className="text-[12px]">
                  &#128231; &nbsp;&nbsp;{user.email}
                </p>

                <p className="text-[12px]">
                  &#128222; &nbsp;&nbsp;{user.number}
                </p>
              </div>
              <div className="flex flex-col gap-y-[2px]">
                {user.profilePictureUrl && (
                  <div className="shadow-sm rounded-full relative h-[70px] w-[70px] overflow-hidden">
                    <ImageWithLoading
                      src={user.profilePictureUrl}
                      fill
                      alt="user photo"
                      priority
                      className="w-full h-full object-fill"
                    />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm text-black">
                    {user.firstName}&nbsp;{user.lastName}
                  </p>
                  <p className="text-[12px] text-black">{user.position}</p>
                </div>
                <p className="text-[12px] text-black">{user.company}</p>
              </div>
            </div>
            <div>
              <QRCodeSVG value={createCardLink(user.id as string)} size={100} />
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MoonLoader
              loading={true}
              color="gray"
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
          className="bg-custom-purple text-white px-6 py-2 font-semibold rounded-md active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={Boolean(!user || dlTimeout > 0)}
        >
          Convert to PNG
        </button>
      )}
    </div>
  );
}
