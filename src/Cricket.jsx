import React from 'react'
import  { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
// import { saveAs } from "file-saver";
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
function Birthday() {
    const [userName, setUserName] = useState("Your Name");
    const [uploadedImage, setUploadedImage] = useState("");
    const fileInputRef = useRef(null);
    const templateRef1 = useRef(null);
    const shareLink = "https://play.google.com/store/apps/details?id=sun.way2sms.hyd.com&pcampaignid=web_share"
  
    const { width, height } = useWindowSize()
    // const handleDownload = async (ref, filename) => {
    //   console.log(ref.current);
    //   if (!ref.current) return;
  
    //   try {
    //     await htmlToImage.toBlob(ref.current).then(function (blob) {
    //       saveAs(blob, `${filename}`);
    //     });
    //   } catch (error) {
    //     console.error("Error capturing image:", error);
    //   }
    // };
  
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setUploadedImage(imageUrl);
      }
    };
  
    const shareImage = async (ref) => {
      const blob = await htmlToImage.toBlob(ref.current);
      const file = new File([blob], "cricket_celebration.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
          files: [file],
          title: "Wishing Team India",
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
    />
      <div
        ref={templateRef1}
        className="!w-full sm:max-w-[400px] min-h-[650px] rounded-lg shadow-lg text-center relative m-0"
      >
        <p
          style={{
            position: "absolute",
            top: "50%",
            left:"-47%",
            transform: "translateY(-50%) rotate(270deg)",
            fontSize: 80,
            color: "rgba(0, 0, 0, 0.15)",
            fontFamily: "Supermercado One",
            letterSpacing: 2,
            zIndex:3
          }}
        >
          way2news
        </p>
        <div className="absolute top-0 w-full  flex flex-col gap-2 justify-center items-center text-[22px] sm:text-[28px] text-blue-700 font-bold bg-white">
            <div>
          <p className='w-full text-center bg-black text-white font-semibold'>Share your Moment</p>
          <img src='/cricket.jpeg' alt='hero' />
          </div>
          <img
            src={uploadedImage || "/person.png"}
            alt="Uploaded Person"
            className="w-full h-48 rounded-md cursor-pointer shadow-lg object-contain"
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

      <img alt='whatsapp' src='/Whatsapp.png' onClick={()=>{shareImage(templateRef1)}} style={{transform: 'translateY(-50%)'}} className='w-12 h-12 '></img>

    </div>
  )
}

export default Birthday