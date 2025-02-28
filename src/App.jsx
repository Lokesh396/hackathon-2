import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import banner from "/background.jpeg";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";

const App = () => {
  const [userName, setUserName] = useState("Your Name");
  const [timeLeft, setTimeLeft] = useState("Calculating...");
  const [uploadedImage, setUploadedImage] = useState("");
  const fileInputRef = useRef(null);
  const templateRef1 = useRef(null);
  const templateRef2 = useRef(null);
  const sankrantiDate = new Date("March 1, 2025 00:00:00").getTime();
  const shareLink = "http:172.16.21.9:5173";

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = sankrantiDate - now;
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft("Happy Sankranti!");
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${days} Days ${hours} Hours ${minutes} Mins`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const shareImage = async (ref, message) => {
    const blob = await htmlToImage.toBlob(ref.current);
    const file = new File([blob], "sankranti_wish.png", { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        files: [file],
        title: "Happy Sankranti!",
        text: `${message} \nCreate yours: ${shareLink}`,
      });
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6 w-full">
      <div
        ref={templateRef1}
        style={{
          aspectRatio: "9 / 16",
          backgroundImage: `url(${banner})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="!w-full sm:max-w-[400px] rounded-lg shadow-lg text-center relative download-preview'"
      >
        <p
          style={{
            position: "absolute",
            top: "50%",
            left:"-50%",
            transform: "translateY(-50%) rotate(270deg)",
            fontSize: 80,
            color: "rgba(0, 0, 0, 0.1)",
            fontFamily: "Supermercado One",
            letterSpacing: 2,
          }}
        >
          way2news
        </p>
        <div className="absolute top-[15%] sm:top-[15%] left-1/2 transform -translate-x-1/2 !max-w-[300px] flex flex-col gap-4 justify-center items-center text-[22px] sm:text-[28px] text-blue-700 font-bold">
          <p className="text-center">
            మీకు మీ కుటుంబ సబ్యులకు సంక్రాతి శుభాకాంక్షలు
          </p>
          <p>ఇట్లు </p>
          <img
            src={uploadedImage || "/person.png"}
            alt="Uploaded Person"
            className="w-28 h-28 sm:w-28 sm:h-28 rounded-full cursor-pointer shadow-lg object-contain"
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
            className="text-purple-700 font-bold text-center w-full max-w-[200px] bg-transparent border-none outline-none"
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

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => handleDownload(templateRef1, "sankranti_wish.png")}
          className="bg-orange-500 text-white px-4 py-2 rounded shadow w-full sm:w-auto"
        >
          Download Wishes
        </button>
        <button
          onClick={() =>
            shareImage(templateRef1, "Happy Sankranti! Celebrate with us!")
          }
          className="bg-green-500 text-white px-4 py-2 rounded shadow w-full sm:w-auto"
        >
          Share on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default App;
