import React from 'react';
import './_offline.scss';

export default function Offline({ children }) {
  return (
    <>
      <div className="offline" />
      <div className="offline__overlay" />
      {children}
    </>
  );
}
