'use client'

import Image from 'next/image'
import { useState } from 'react'

interface Project {
  title: string
  description: string
  tech: string[]
  demo?: string
  github?: string
  longDescription?: string
  image: string
  poster?: string
}

export default function ProjectMedia({ project }: { project: Project }) {
  const [mediaError, setMediaError] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  
  const isVideo = project.image.endsWith('.webm') || project.image.endsWith('.mp4');
  const imageFallback = project.poster ?? project.image.replace('.webm', '.png').replace('.mp4', '.png');
  
  const handleMediaError = (error: any) => {
    console.error('Media error for', project.title, ':', project.image, error);
    setMediaError(true);
    setMediaLoaded(false);
  };
  
  const handleMediaLoad = () => {
    setMediaLoaded(true);
  };

  if (isVideo && !mediaError) {
    return (
      <div className="relative w-full max-w-lg mx-auto group">
        <div className="relative overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200">
          <video
            className="w-full h-auto object-cover"
            autoPlay
            controls
            loop
            muted
            playsInline
            preload="metadata"
            poster={project.poster}
            controlsList="nodownload"
            onLoadedData={handleMediaLoad}
            onError={handleMediaError}
            style={{ aspectRatio: '16/10' }}
          >
            <source src={project.image} type={project.image.endsWith('.mp4') ? 'video/mp4' : 'video/webm'} />
            Your browser does not support the video tag.
          </video>

          {/* Video overlay with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
          
          {/* Decorative frame */}
          <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 pointer-events-none" />
        </div>
      </div>
    );
  }

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
