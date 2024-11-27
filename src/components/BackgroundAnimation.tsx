import React from 'react';

interface BackgroundAnimationProps {
  variant?: 'code' | 'data' | 'network' | 'tech';
}

export default function BackgroundAnimation({ variant = 'code' }: BackgroundAnimationProps) {
  const getAnimationElements = () => {
    switch (variant) {
      case 'code':
        return Array(15).fill(0).map((_, i) => (
          <div
            key={i}
            className={`
              absolute text-blue-100/10 font-mono text-lg
              animate-float-${i % 3}
              ${i % 2 === 0 ? 'animate-pulse' : ''}
            `}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {`{code: ${Math.random().toString(16).slice(2, 8)}}`}
          </div>
        ));
      
      case 'data':
        return Array(20).fill(0).map((_, i) => (
          <div
            key={i}
            className={`
              absolute rounded-full
              animate-float-${i % 3}
              bg-gradient-to-r from-blue-400/5 to-purple-400/5
            `}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ));
      
      case 'network':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {Array(8).fill(0).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/10 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `connect ${Math.random() * 5 + 3}s infinite`,
                }}
              />
            ))}
          </div>
        );
      
      case 'tech':
        return Array(12).fill(0).map((_, i) => (
          <div
            key={i}
            className={`
              absolute text-purple-100/10
              animate-float-${i % 3}
              ${i % 2 === 0 ? 'animate-pulse' : ''}
            `}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <svg
              className="w-12 h-12"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L1.608 6v12L12 24l10.392-6V6L12 0zm-1.2 18.6L4.8 15.6V8.4l6 3v7.2zm1.2-9l-6-3.6L12 3l6 3.6-6 3zm7.2 6l-6 3v-7.2l6-3v7.2z"/>
            </svg>
          </div>
        ));
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {getAnimationElements()}
    </div>
  );
}
