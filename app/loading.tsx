import "./styles/loading.css";

export default function Loading() {
  return (
    <div className="bowl-loading">
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
            {/* Bowl body */}
            <ellipse cx="80" cy="62" rx="60" ry="34" fill="#FFFFFF" />
            {/* Bowl rim / opening */}
            <ellipse cx="80" cy="38" rx="42" ry="16" fill="#333333" />
          </svg>
        </div>
        {/* Ground shadow - reacts opposite to the bounce */}
        <div className="bowl-shadow" />
      </div>
    </div>
  );
}
