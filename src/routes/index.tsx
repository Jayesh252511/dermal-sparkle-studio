import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Expand, Menu, Pause, Play, Volume2, VolumeX, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import video1 from "@/assets/dermexcel-1.mp4.asset.json";
import video2 from "@/assets/dermexcel-2.mp4.asset.json";
import video3 from "@/assets/dermexcel-3.mp4.asset.json";
import video4 from "@/assets/dermexcel-4.mp4.asset.json";
import video5 from "@/assets/dermexcel-5.mp4.asset.json";
import video6 from "@/assets/dermexcel-6.mp4.asset.json";
import video7 from "@/assets/dermexcel-7.mp4.asset.json";
import video8 from "@/assets/dermexcel-8.mp4.asset.json";
import poster1 from "@/assets/dermexcel-poster-1.jpg.asset.json";
import poster2 from "@/assets/dermexcel-poster-3.jpg.asset.json";
import poster3 from "@/assets/dermexcel-poster-2.jpg.asset.json";
import poster4 from "@/assets/dermexcel-poster-5.jpg.asset.json";
import poster5 from "@/assets/dermexcel-poster-6.jpg.asset.json";
import poster6 from "@/assets/dermexcel-poster-4.jpg.asset.json";
import poster7 from "@/assets/dermexcel-poster-7.jpg.asset.json";
import poster8 from "@/assets/dermexcel-poster-8.jpg.asset.json";

const videos = [video1.url, video2.url, video3.url, video4.url, video5.url, video6.url, video7.url, video8.url];
const posters = [poster1.url, poster2.url, poster3.url, poster4.url, poster5.url, poster6.url, poster7.url, poster8.url];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dermexcel — Small team, big results" },
      { name: "description", content: "Discover Dermexcel through our moving skincare stories." },
      { property: "og:title", content: "Dermexcel — Small team, big results" },
      { property: "og:description", content: "Discover Dermexcel through our moving skincare stories." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  return `${minutes}:${Math.floor(value % 60).toString().padStart(2, "0")}`;
}

function Index() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const playerRef = useRef<HTMLVideoElement>(null);
  const playerShellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeVideo === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setActiveVideo(null);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeVideo]);

  const openVideo = (index: number) => {
    setActiveVideo(index);
    setIsPlaying(true);
    setIsMuted(false);
    setCurrentTime(0);
  };

  const togglePlay = async () => {
    const video = playerRef.current;
    if (!video) return;
    if (video.paused) {
      await video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = playerRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const enterFullscreen = async () => {
    const shell = playerShellRef.current;
    if (shell?.requestFullscreen) await shell.requestFullscreen();
  };

  return (
    <main className="showcase-shell">
      <div className="grain" aria-hidden="true" />
      <header className="site-nav">
        <a className="brand" href="#top" aria-label="Dermexcel home">
          <span className="brand-mark" aria-hidden="true" />
          <span>DERMEXCEL</span>
        </a>
        <nav className="desktop-links" aria-label="Primary navigation">
          <a href="#films">Products</a>
          <a href="#films">Treatment plans</a>
          <a href="#films">Diagnosis</a>
        </nav>
        <Button variant="nav" className="desktop-contact" onClick={() => document.querySelector("#films")?.scrollIntoView({ behavior: "smooth" })}>
          Contact <span aria-hidden="true">↗</span>
        </Button>
        <Button variant="nav" size="icon" className="mobile-menu" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <Menu />}
        </Button>
        {menuOpen && (
          <nav className="mobile-links" aria-label="Mobile navigation">
            <a href="#films" onClick={() => setMenuOpen(false)}>Products</a>
            <a href="#films" onClick={() => setMenuOpen(false)}>Treatment plans</a>
            <a href="#films" onClick={() => setMenuOpen(false)}>Diagnosis</a>
            <a href="#films" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
        )}
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="hero-kicker">Small team,</p>
          <h1>big results</h1>
        </div>

        <div className="video-stage" id="films" aria-label="Dermexcel video gallery">
          {videos.map((src, index) => (
            <button
              type="button"
              className="video-tile"
              key={src}
              onClick={() => openVideo(index)}
              aria-label={`Play Dermexcel film ${index + 1} with sound`}
            >
              <video src={src} poster={posters[index]} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
              <span className="tile-shine" aria-hidden="true" />
              <span className="tile-play"><Play fill="currentColor" /> <span>Play with sound</span></span>
            </button>
          ))}
        </div>

        <div className="hero-foot">
          <span>8 films · Dermal intelligence</span>
          <span className="scroll-cue"><span aria-hidden="true">↓</span> Tap a film to listen</span>
        </div>
      </section>

      {activeVideo !== null && (
        <div className="player-backdrop" role="dialog" aria-modal="true" aria-label={`Dermexcel film ${activeVideo + 1}`} onMouseDown={(event) => event.target === event.currentTarget && setActiveVideo(null)}>
          <div className="player-shell" ref={playerShellRef}>
            <video
              ref={playerRef}
              className="player-video"
              src={videos[activeVideo]}
              poster={posters[activeVideo]}
              autoPlay
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
              onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
            />
            <div className="player-topline">
              <div><span className="player-dot" /> DERMEXCEL <span className="film-number">FILM {String(activeVideo + 1).padStart(2, "0")}</span></div>
              <Button variant="player" size="icon" onClick={() => setActiveVideo(null)} aria-label="Close video"><X /></Button>
            </div>
            <button className="player-center" type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause video" : "Play video"}>
              {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
            </button>
            <div className="player-controls">
              <Button variant="player" size="icon" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>{isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</Button>
              <span className="timecode">{formatTime(currentTime)}</span>
              <input
                className="video-progress"
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={currentTime}
                aria-label="Video progress"
                onChange={(event) => {
                  const nextTime = Number(event.target.value);
                  if (playerRef.current) playerRef.current.currentTime = nextTime;
                  setCurrentTime(nextTime);
                }}
              />
              <span className="timecode">{formatTime(duration)}</span>
              <Button variant="player" size="icon" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>{isMuted ? <VolumeX /> : <Volume2 />}</Button>
              <Button variant="player" size="icon" className="fullscreen-control" onClick={enterFullscreen} aria-label="Enter fullscreen"><Expand /></Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}