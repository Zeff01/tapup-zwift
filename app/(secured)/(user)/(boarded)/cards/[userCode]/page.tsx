"use client";

import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { getUserBySubId } from "@/src/lib/firebase/store/users.action";
import { Users } from "@/src/lib/firebase/store/users.type";
import { useParams, useRouter } from "next/navigation";
import MoonLoader from "react-spinners/MoonLoader";
import { toast } from "react-toastify";

export default function Card() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<Users | null>(null);
  const [dlTimeout, setDlTimeout] = useState(0);
  const { userCode } = useParams() as { userCode: string };
  const router = useRouter();

  const userDataHandler = async () => {
    const data = await getUserBySubId(userCode);
    if (!data) {
      toast.error("user not found.");
      setTimeout(() => {
        router.push("/cards");
      }, 500);
      return;
    }
    setUser(data);
  };

  const handleDownloadImage = async () => {
    const card = cardRef.current;
    if (!card || !user) return;
    const textTop = document.getElementById("text-top") as HTMLDivElement;
    textTop.style.transform = "translateY(-8px)";
    await html2canvas(card, { scale: 4 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Create a link element
      const link = document.createElement("a");

      // Set the download attribute with a filename
      const fileName = `${user?.lastName}.png`;
      link.download = fileName;

      // Set the href attribute to the image data URL
      link.href = imgData;

      // Append the link to the body (required for Firefox)
      document.body.appendChild(link);

      // Trigger a click event on the link to start the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    });
    textTop.style.transform = "translateY(0px)";
    setDlTimeout(2); // cannot click button for 3 seconds
  };

  useEffect(() => {
    if (!userCode) return;
    userDataHandler();
  }, []);

  useEffect(() => {
    if (dlTimeout <= 0) return;
    const timeout = setTimeout(() => {
      setDlTimeout((p) => p - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [dlTimeout]);

  return (
    <div className="bg-custom-black w-full flex-1 flex flex-col items-center px-2 py-16 gap-y-4">
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
                    <Image
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
              <QRCodeSVG value={user.user_link as string} size={100} />
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
      <button
        onClick={handleDownloadImage}
        className="bg-custom-purple text-white px-6 py-2 font-semibold rounded-md active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={Boolean(!user || dlTimeout > 0)}
      >
        Convert to PNG
      </button>
    </div>
  );
}
