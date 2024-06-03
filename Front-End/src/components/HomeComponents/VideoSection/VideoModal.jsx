import { MdOutlineClose } from "react-icons/md";

export default function VideoModal({ videoModal, setVideoModal }) {
  return (
    <div
      className={`modal w-full lg:w-2/3 md:w-[80%] h-80 md:h-[500px] mx-auto mt-20 md:mt-0 ${
        videoModal && "modal_show"
      }`}
    >
      <button
        onClick={() => setVideoModal(false)}
        className="absolute -top-3 md:-top-6 -right-3 md:-right-6 z-50 bg-secondary w-6 h-6 rounded-full flex justify-center items-center"
      >
        <MdOutlineClose />
      </button>

      {videoModal && (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/TwR20LAdX44?si=4yCjckymC0Ejn0Ok"
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay"
          allowfullscreen
        ></iframe>
      )}
    </div>
  );
}
