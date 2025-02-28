import React from 'react'
import  { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

function Birthday() {
    const [userName, setUserName] = useState("Your Name");
    const [uploadedImage, setUploadedImage] = useState("");
    const fileInputRef = useRef(null);
    const templateRef1 = useRef(null);
    const shareLink = "https://play.google.com/store/apps/details?id=sun.way2sms.hyd.com&pcampaignid=web_share"
  
  
    const { width, height } = useWindowSize()
  
    const handleDownload = async (ref, filename) => {
      console.log(ref.current);
      if (!ref.current) return;
  
      try {
        await htmlToImage.toBlob(ref.current).then(function (blob) {
          saveAs(blob, `${filename}`);
        });
      } catch (error) {
        console.error("Error capturing image:", error);
      }
    };
  
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setUploadedImage(imageUrl);
      }
    };
  
    const shareImage = async (ref) => {
      const blob = await htmlToImage.toBlob(ref.current);
      const file = new File([blob], "sankranti_wish.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
          files: [file],
          title: "Happy Birthday SuperStar!",
          text: 'Create Yours:',
          url:  shareLink
        });
      } else {
        alert("Sharing not supported on this device.");
      }
    };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6 w-full">
       <Confetti 
  width={width} 
  height={height} 
  wind={0.02} 
  gravity={0.05} 
  numberOfPieces={10} 
  drawShape={(ctx) => {
    // Creating a gradient for a 3D effect
    const gradient = ctx.createRadialGradient(0, 0, 5, 0, 0, 20);
    gradient.addColorStop(0, "#ff4d4d"); // Light center
    gradient.addColorStop(1, "#b30000"); // Dark edges

    // Draw balloon ellipse
    ctx.beginPath();
    ctx.ellipse(0, 0, 15, 20, 0, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.closePath();

    // Balloon highlight
    ctx.beginPath();
    ctx.arc(-5, -8, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fill();
    ctx.closePath();

    // Balloon string
    ctx.beginPath();
    ctx.moveTo(0, 20);
    ctx.lineTo(0, 30);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }}
/>

      <div
        ref={templateRef1}
        className="!w-full sm:max-w-[400px] min-h-[650px] rounded-lg shadow-lg text-center relative"
      >
        <p
          style={{
            position: "absolute",
            top: "50%",
            left:"-47%",
            transform: "translateY(-50%) rotate(270deg)",
            fontSize: 80,
            color: "rgba(255, 230, 5, 0.15)",
            fontFamily: "Supermercado One",
            letterSpacing: 2,
            zIndex:3
          }}
        >
          way2news
        </p>
        <div className="absolute top-0 w-full  flex flex-col gap-2 justify-center items-center text-[22px] sm:text-[28px] text-blue-700 font-bold bg-white">
          <img src='/mahesh.jpg' alt='hero' />
          <img
            src={uploadedImage || "/person.png"}
            alt="Uploaded Person"
            className="w-48 h-48 rounded-md cursor-pointer shadow-lg object-contain"
            onClick={() => fileInputRef.current.click()}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="font-bold text-center w-full max-w-[200px] border-none outline-none text-lg sm:text-xl text-yellow-400 px-2 py-1 rounded-md uppercase tracking-wide"
            placeholder="Your Name"
          />
        </div>

        <div className="absolute bottom-0 bg-black min-h-[50px] w-full p-2 flex items-center justify-center gap-2 sm:gap-4">
          <p className="text-white font-semibold m-0 text-sm sm:text-base">
            No.1 తెలుగు న్యూస్ డైలీ. డౌన్లోడ్
          </p>
          <img src="/logo.svg" className="h-6 sm:h-9" alt="logo" />
        </div>
      </div>

      <div className="flex sm:flex-row gap-4">
        <button
          onClick={() => handleDownload(templateRef1, "birthday_wish.png")}
          className="bg-orange-500 text-white px-4 py-2 rounded shadow w-full sm:w-auto"
        >
          Download Wishes
        </button>
        <button
          onClick={() =>
            shareImage(templateRef1)
          }
          className="bg-green-500 text-white px-4 py-2 rounded shadow w-full sm:w-auto"
        >
          Share on WhatsApp
        </button>
      </div>
    </div>
  )
}

export default Birthday