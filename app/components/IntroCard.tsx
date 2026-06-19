export function IntroCard() {
  return (
    <section className="intro-card" aria-label="Introduction">
      <p>
        Hey there, I&apos;m <strong className="intro-keyword">Gc</strong> 👋
        <br />
        Welcome to my{" "}
        <strong className="intro-keyword">magic bowl</strong> 🔮!
      </p>

      <p>
        I love building things, and lately, I&apos;ve been getting really into{" "}
        <span className="intro-link">
          <strong className="intro-keyword">AI</strong> &amp;{" "}
          <strong className="intro-keyword">LLMs</strong>
        </span>
        .
      </p>

      <p>
        Off the screen, I stay active by hitting the{" "}
        <span className="intro-link intro-link--green">
          <strong className="intro-keyword">gym</strong>
        </span>{" "}
        💪🏻 and playing{" "}
        <span className="intro-link intro-link--red">
          <strong className="intro-keyword">snooker</strong>
        </span>{" "}
        🎱.
      </p>

      <p>
        Besides that, I spend my downtime reading up on{" "}
        <span className="intro-link intro-link--amber">
          <strong className="intro-keyword">philosophy</strong>
        </span>
        ,{" "}
        <span className="intro-link intro-link--teal">
          <strong className="intro-keyword">history</strong>
        </span>
        , and{" "}
        <span className="intro-link intro-link--red">
          <strong className="intro-keyword">self-improvement</strong>
        </span>{" "}
        📚.
      </p>
    </section>
  );
}
