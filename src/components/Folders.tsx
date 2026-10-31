import { testimonials } from "@/lib/data";

function Star() {
  return (
    <svg viewBox="0 0 20 20" className="star" aria-hidden="true">
      <path d="M10 1.6 12.5 7l5.9.5-4.5 3.9 1.4 5.8L10 14.1 4.7 17.2l1.4-5.8L1.6 7.5 7.5 7Z" fill="currentColor" />
    </svg>
  );
}

/* Section 7 — folder cards: ink shell + star tab, white quote paper,
   glossy yellow flap with location, name + verified tick and a bookmark. */
export default function Folders() {
  return (
    <section className="folders-sec" id="voices" aria-label="Testimonials">
      <div className="folders-head">
        <h2>See what our<br />clients say about us</h2>
      </div>
      <div className="folders-grid">
        {testimonials.map((t) => (
          <article className="folder" key={t.name}>
            <div className="folder-tab" aria-hidden="true">
              <span className="stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}</span>
            </div>
            <div className="folder-paper"><p>“{t.quote}”</p></div>
            <div className="folder-flap">
              <span className="folder-loc micro">{t.loc} ◎</span>
              <span className="folder-bookmark" aria-hidden="true">＋</span>
              <span className="folder-name">
                {t.name}
                <svg className="verified" viewBox="0 0 24 24" role="img" aria-label="Verified">
                  <path d="M12 1.8 14.7 4h3.4l1 3.2 2.7 2-1 3.3 1 3.3-2.7 2-1 3.2h-3.4L12 22.2 9.3 20H5.9l-1-3.2-2.7-2 1-3.3-1-3.3 2.7-2 1-3.2h3.4Z" fill="#111" />
                  <path d="m8.4 12.2 2.4 2.4 4.8-5" fill="none" stroke="#FFD60A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </article>
        ))}
      </div>
      <p className="folders-note micro">Sample layout — real client stories are published only with permission and verified results.</p>
    </section>
  );
}
