import { useState } from "react";
import { FaPlay } from "react-icons/fa6";
import VideoModal from "./VideoModal";

export default function VideoBtn() {
  const [videoModal, setVideoModal] = useState(false);
  return (
    <div className="relative flex justify-center items-center">
      <button onClick={() => setVideoModal(true)} className="pulse_btn">
        <FaPlay />
      </button>

      <VideoModal videoModal={videoModal} setVideoModal={setVideoModal} />
    </div>
  );
}
