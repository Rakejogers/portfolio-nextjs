import React from 'react';

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background to-background/60" />
      <div className="grid-background" />
    </div>
  );
};

export default Background;

