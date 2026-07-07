"use client";

import { useEffect, useState } from "react";
import "../styles/loading.css";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExiting(true), 4_500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {children}
      <div className={`bowl-loading${exiting ? " exit" : ""}`}>
        <div className="bowl-scene">
          <div className="bowl-float">
            <svg
              className="bowl-svg"
              width="160"
              height="100"
              viewBox="0 0 160 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="80" cy="62" rx="60" ry="34" fill="#FFFFFF" />
              <ellipse cx="80" cy="38" rx="42" ry="16" fill="#333333" />
            </svg>
          </div>
          <div className="bowl-shadow" />
        </div>
      </div>
    </>
  );
}
