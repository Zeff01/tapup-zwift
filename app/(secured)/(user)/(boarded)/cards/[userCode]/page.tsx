// "use client";
// import { QRCodeSVG } from "qrcode.react";
// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";
// import html2canvas from "html2canvas";
// import { getUserBySubId } from "@/src/lib/firebase/store/users.action";
// import { Users } from "@/src/lib/firebase/store/users.type";
// import { useParams, useRouter } from "next/navigation";
// import MoonLoader from "react-spinners/MoonLoader";
// import { toast } from "react-toastify";

// export default function Card() {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const [user, setUser] = useState<Users | null>(null);
//   const [dlTimeout, setDlTimeout] = useState(0);
//   const { userCode } = useParams() as { userCode: string };
//   const router = useRouter();

//   const userDataHandler = async () => {
//     const data = await getUserBySubId(userCode);
//     if (!data) {
//       toast.error("user not found.");
//       setTimeout(() => {
//         router.push("/");
//       }, 500);
//       return;
//     }
//     setUser(data);
//   };

//   const handleDownloadImage = async () => {
//     const card = cardRef.current;
//     if (!card || !user) return;
//     const textTop = document.getElementById("text-top") as HTMLDivElement;
//     textTop.style.transform = "translateY(-8px)";
//     await html2canvas(card, { scale: 1.1 }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");

//       // Create a link element
//       const link = document.createElement("a");

//       // Set the download attribute with a filename
//       const fileName = `${user?.lastName}.png`;
//       link.download = fileName;

//       // Set the href attribute to the image data URL
//       link.href = imgData;

//       // Append the link to the body (required for Firefox)
//       document.body.appendChild(link);

//       // Trigger a click event on the link to start the download
//       link.click();

//       // Remove the link from the document
//       document.body.removeChild(link);
//     });
//     textTop.style.transform = "translateY(0px)";
//     setDlTimeout(2); // cannot click button for 3 seconds
//   };

//   useEffect(() => {
//     if (!userCode) return;
//     userDataHandler();
//   }, []);

//   useEffect(() => {
//     if (dlTimeout <= 0) return;
//     const timeout = setTimeout(() => {
//       setDlTimeout((p) => p - 1);
//     }, 1000);
//     return () => clearTimeout(timeout);
//   }, [dlTimeout]);

//   return (
//     <div className="bg-custom-black w-full flex-1 flex flex-col items-center px-2 py-16 gap-y-4">
//       {/* w-[350px] */}
//       <div
//         ref={cardRef}
//         className={`text-black dark:text-black relative w-[400px] scale-[0.8] lg:scale-100 aspect-[1.5882]  shadow-md rounded-md`}
//         style={{ backgroundColor: "white" }}
//       >
//         {user ? (
//           <div className="w-full h-full flex flex-row gap-x-2 justify-between p-5 ">
//             <div className="flex-grow flex flex-col justify-between">
//               <div id="text-top">
//                 <p className="text-[12px]">
//                   &#128231; &nbsp;&nbsp;{user.email}
//                 </p>

//                 <p className="text-[12px]">
//                   &#128222; &nbsp;&nbsp;{user.number}
//                 </p>
//               </div>
//               <div className="flex flex-col gap-y-[2px]">
//                 {user.profilePictureUrl && (
//                   <Image
//                     src={user.profilePictureUrl}
//                     width={70}
//                     height={70}
//                     alt="user photo"
//                     style={{ objectFit: "cover" }}
//                     priority
//                     className="w-[70px] h-[70px] shadow-sm rounded-full"
//                   />
//                 )}
//                 <div>
//                   <p className="font-semibold text-sm text-black">
//                     {user.firstName}&nbsp;{user.lastName}
//                   </p>
//                   <p className="text-[12px] text-black">{user.position}</p>
//                 </div>
//                 <p className="text-[12px] text-black">{user.company}</p>
//               </div>
//             </div>
//             <div>
//               <QRCodeSVG value={user.user_link as string} size={100} />
//             </div>
//           </div>
//         ) : (
//           <div className="w-full h-full flex items-center justify-center">
//             <MoonLoader
//               loading={true}
//               color="gray"
//               size={40}
//               aria-label="Loading Spinner"
//               data-testid="loader"
//               speedMultiplier={0.5}
//             />
//           </div>
//         )}
//       </div>
//       <button
//         onClick={handleDownloadImage}
//         className="bg-custom-purple text-white px-6 py-2 font-semibold rounded-md active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
//         disabled={Boolean(!user || dlTimeout > 0)}
//       >
//         Convert to PNG
//       </button>
//     </div>
//   );
// }


'use client';

import { useRef, useEffect, useState } from 'react';
import { Users } from '@/src/lib/firebase/store/users.type';
import { useParams, useRouter } from 'next/navigation';
import { getUserBySubId } from '@/src/lib/firebase/store/users.action';
import { toast } from 'react-toastify';
//@ts-ignore
import QRCode from 'qrcode';

export default function BusinessCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [user, setUser] = useState<Users | null>(null);
  const { userCode } = useParams() as { userCode: string };
  const router = useRouter();

  const userDataHandler = async () => {
    const data = await getUserBySubId(userCode);
    if (!data) {
      toast.error('user not found.');
      setTimeout(() => {
        router.push('/');
      }, 500);
      return;
    }
    setUser(data);
  };

  console.log(user)
  useEffect(() => {
    if (userCode) userDataHandler();
  }, [userCode]);

  useEffect(() => {
    if (!user) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const drawCard = async () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Load and draw profile image
        const profileImg = document.createElement('img');
        // profileImg.crossOrigin = 'Anonymous';
        profileImg.src = user?.profilePictureUrl || '/assets/profileImage.png';
        // profileImg.src = '/assets/profileImage.png';
  

        await new Promise<void>((resolve) => {
          profileImg.onload = () => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(80, 160, 40,0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(profileImg, 40, 120, 80,80);
            ctx.restore();
            resolve();
          };
        });

        ctx.fillStyle = '#333';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(user.firstName + ' ' + user.lastName, 40, 230);

        ctx.font = '18px Arial';
        ctx.fillText(user.position || 'No Position', 40, 255);
        ctx.fillText(user.company || 'No Company', 40, 280);

     
        ctx.font = '16px Arial';
        ctx.fillText('✉ ' + user.email, 40, 40);
        ctx.fillText('📱' + user.number, 40, 65);
        
        const qrCodeData = `${user?.user_link}`;
         QRCode.toDataURL(qrCodeData, {
          width: 100,
          margin: 1,
        }).then((qrCodeImg:string) => {
          const qrImage = new Image();
          qrImage.src = qrCodeImg;

          qrImage.onload = () => {
            const qrX = 370; 
            const qrY = 20;
            ctx.drawImage(qrImage, qrX, qrY, 200, 200);

            console.log('QR Code added to canvas');
          };
        }).catch((error:Error) => {
          console.error('Error generating QR code:', error);
        });
      };
      drawCard();
    }
  }, [user]);

  const saveCard = () => {
    const link = document.createElement('a');
    link.download = 'business-card.png';
    link.href = canvasRef.current?.toDataURL('image/png') ?? '';
    link.click()
  };

  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
          <canvas
            ref={canvasRef}
            width={600}
            height={340}
        className="bg-white shadow-lg rounded-lg mb-4 relative scale-50 md:scale-100"
        id='canvas'
      />
          <button
            onClick={saveCard}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save Card
          </button>
  
   
    </div>
)}

