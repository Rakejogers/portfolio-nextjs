'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

interface Project {
  title: string
  description: string
  tech: string[]
  demo?: string
  github?: string
  longDescription?: string
  image: string
}

// Component to handle project media (videos and images)
export default function ProjectMedia({ project, isSafari }: { project: Project, isSafari: boolean }) {
  const [mediaError, setMediaError] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Start paused for better performance
  const [showControls, setShowControls] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isVideo = project.image.endsWith('.webm') || project.image.endsWith('.mp4');
  const imageFallback = project.image.replace('.webm', '.png').replace('.mp4', '.png');
  const posterImage = project.image.replace('.webm', '.png').replace('.mp4', '.png');
  
  const handleMediaError = (error: any) => {
    console.error('Media error for', project.title, ':', project.image, error);
    setMediaError(true);
    setMediaLoaded(false);
  };
  
  const handleMediaLoad = () => {
    setMediaLoaded(true);
  };

  const handleVideoCanPlay = () => {
    setMediaLoaded(true);
  };

  const handleVideoLoadStart = () => {
    setMediaLoaded(false);
    setMediaError(false);
  };

  const togglePlayPause = () => {
    // If video hasn't loaded yet, trigger loading
    if (!shouldLoadVideo) {
      setShouldLoadVideo(true);
      return;
    }
    
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Load video when it comes into view
            setShouldLoadVideo(true);
            // Auto-play after a short delay for better UX
            setTimeout(() => {
              if (videoRef.current && isVideo) {
                videoRef.current.play().catch(() => {
                  // Auto-play failed, that's ok - user can click to play
                  console.log('Auto-play prevented for:', project.title);
                });
              }
            }, 500);
          } else {
            setIsInView(false);
            // Pause video when out of view to save bandwidth
            if (videoRef.current && isPlaying) {
              videoRef.current.pause();
            }
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before coming into view
        threshold: 0.1,
      }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [project.title, isVideo, isPlaying]);

  if (isVideo && !mediaError) {
    return (
      <div ref={containerRef} className="relative w-full max-w-lg mx-auto group">
        <div 
          className="relative overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          onClick={togglePlayPause}
        >
          {/* Poster image for instant display */}
          {!mediaLoaded && (
            <Image
              src={posterImage}
              alt={`${project.title} preview`}
              className="w-full h-auto object-cover"
              style={{ aspectRatio: '16/10' }}
              width={1600}
              height={1000}
            />
          )}
          
          {/* Video element - only load when in view */}
          {shouldLoadVideo && (
            <video
              ref={videoRef}
              className={`w-full h-auto object-cover transition-opacity duration-500 ${mediaLoaded ? 'opacity-100' : 'opacity-0'} ${!mediaLoaded ? 'absolute inset-0' : ''}`}
              muted
              loop
              playsInline
              preload="metadata" // Load metadata quickly for faster startup
              poster={posterImage} // Fallback poster
              crossOrigin="anonymous" // Enable CORS for better caching
              // Performance optimizations
              x-webkit-airplay="allow"
              webkit-playsinline="true"
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              onLoadStart={handleVideoLoadStart}
              onLoadedData={handleMediaLoad}
              onCanPlay={handleVideoCanPlay}
              onError={handleMediaError}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              style={{ aspectRatio: '16/10' }}
            >
              <source src={project.image} type={project.image.endsWith('.mp4') ? 'video/mp4' : 'video/webm'} />
              Your browser does not support the video tag.
            </video>
          )}
          
          {/* Loading spinner - only show when video is loading */}
          {shouldLoadVideo && !mediaLoaded && !mediaError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <div className="bg-white/90 rounded-full p-3 shadow-lg">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              </div>
            </div>
          )}
          
          {/* Play button overlay when poster is shown */}
          {!shouldLoadVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="bg-white/90 rounded-full p-4 shadow-lg backdrop-blur-sm hover:bg-white transition-colors">
                <svg className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="m7 4 10 6-10 6V4z"/>
                </svg>
              </div>
            </div>
          )}
          
          {/* Video controls overlay - only show when video is loaded */}
          {shouldLoadVideo && (
            <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${showControls && mediaLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="bg-white/90 rounded-full p-3 shadow-lg backdrop-blur-sm">
                {isPlaying ? (
                  <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="m7 4 10 6-10 6V4z"/>
                  </svg>
                )}
              </div>
            </div>
          )}
          
          {/* Video overlay with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
          
          {/* Decorative frame */}
          <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 pointer-events-none" />
        </div>
      </div>
    );
  }

  // Fallback to image for Safari or when video fails
  return (
    <div className="relative w-full max-w-lg mx-auto group">
      <div className="relative overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 hover:shadow-3xl transition-shadow duration-300">
        <Image
          src={mediaError ? imageFallback : (isVideo ? imageFallback : project.image)}
          alt={`${project.title} screenshot`}
          className={`w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 ${mediaLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleMediaLoad}
          onError={handleMediaError}
          style={{ aspectRatio: '16/10' }}
          width={1600}
          height={1000}
        />
        
        {/* Loading placeholder */}
        {!mediaLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        )}
        
        {/* Image overlay with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
        
        {/* Decorative frame */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 pointer-events-none" />
      </div>
    </div>
  );
};
