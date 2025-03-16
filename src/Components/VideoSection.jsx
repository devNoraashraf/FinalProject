import React from "react";
import vedio from '../assets/vid.mp4'
const VideoSection = () => {
  return (
    <div className=" w-full h-screen mt-24" dir='rtl'>
      <video className=" w-full h-screen object-cover   "   autoPlay
        muted
        loop
        playsInline>
        <source src={vedio} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoSection;
