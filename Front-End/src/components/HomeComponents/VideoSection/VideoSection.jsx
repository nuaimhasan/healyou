import "./VideoSection.css";
import VideoBtn from "./VideoBtn";

export default function VideoSection() {
  return (
    <section className="video_wrap">
      <div className="container">
        <div className="mb-8">
          <VideoBtn />
        </div>

        <h2 className="text-3xl sm:text-5xl font-semibold">
          We Are Best IT <br /> SolutionsVideo And History
        </h2>
      </div>
    </section>
  );
}
