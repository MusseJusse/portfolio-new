import { artwork, type Artwork } from "./generatedArtwork";

const instagramUrl = "https://www.instagram.com/byrubydesigns";
const studioUrl = "https://inkdependent.eu/";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function ConceptNav({ active, light = false }: { active: number; light?: boolean }) {
  return (
    <nav className={"concept-nav " + (light ? "concept-nav--light" : "")} aria-label="Landing page concepts">
      <span>Concept</span>
      {[1, 2, 3, 4, 5].map((number) => (
        <a className={number === active ? "is-active" : ""} href={`/${number}`} aria-current={number === active ? "page" : undefined} key={number} onClick={() => window.scrollTo(0, 0)}>
          {number}
        </a>
      ))}
    </nav>
  );
}

function ArtworkImage({ item, className = "", eager = false }: { item: Artwork; className?: string; eager?: boolean }) {
  return <img className={className} src={item.src} alt={item.alt} loading={eager ? "eager" : "lazy"} />;
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" stroke-width="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5" />
      <circle cx="17.25" cy="6.8" r="1.15" fill="currentColor" />
    </svg>
  );
}

export function FieldNotesLanding() {
  return (
    <main className="field-page">
      <LandingStyles />
      <ConceptNav active={1} />
      <header className="field-header">
        <a className="field-wordmark" href="#top" aria-label="Ruby Smythe, home">Ruby<br />Smythe</a>
        <nav aria-label="Primary navigation">
          <a href="#selected">Selected work</a>
          <a href="#artist">Artist</a>
          <a href={studioUrl} target="_blank" rel="noreferrer">Appointments <Arrow diagonal /></a>
        </nav>
      </header>

      <section id="top" className="field-hero">
        <div className="field-intro">
          <p className="field-kicker">Tattoo · Painting · Drawing</p>
          <h1>Studies from the<br /><em>natural world.</em></h1>
          <p className="field-dek">Fine lines, native birds and botanical forms—drawn in Aotearoa, made in Edinburgh.</p>
          <a className="field-circle-link" href="#selected"><span>Explore<br />the work</span><Arrow /></a>
        </div>
        <figure className="field-main-art">
          <ArtworkImage item={artwork[9]} eager />
          <figcaption><span>01</span> Iris &amp; daffodil / Gouache</figcaption>
        </figure>
        <aside className="field-specimens" aria-label="Selected studies">
          <figure>
            <ArtworkImage item={artwork[2]} eager />
            <figcaption>Swallow / ink</figcaption>
          </figure>
          <figure>
            <ArtworkImage item={artwork[6]} eager />
            <figcaption>Ornamental flower / ink</figcaption>
          </figure>
          <p className="field-note">An evolving archive of work on paper and skin.</p>
        </aside>
      </section>

      <section id="selected" className="field-index">
        <p className="field-index-label">Selected index / 2022—26</p>
        <div className="field-index-row">
          {[
            [artwork[18], "Painting", "Waterlilies"],
            [artwork[22], "Flash", "Stamp collection"],
            [artwork[28], "Tattoo", "Lizard & blossom"]
          ].map(([item, medium, title], index) => (
            <figure key={(item as Artwork).id}>
              <div className="field-index-image"><ArtworkImage item={item as Artwork} /></div>
              <figcaption><span>0{index + 2} / {medium as string}</span><strong>{title as string}</strong></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer id="artist" className="field-footer">
        <p>Ruby Smythe is a New Zealand-born painter and tattoo artist working from Inkdependent Studio, Edinburgh.</p>
        <a href={instagramUrl} target="_blank" rel="noreferrer"><InstagramIcon /> @byrubydesigns</a>
      </footer>
    </main>
  );
}

export function NightBloomLanding() {
  const nightCards = [artwork[23], artwork[27], artwork[29]];

  return (
    <main className="night-page">
      <LandingStyles />
      <ConceptNav active={2} light />
      <header className="night-header">
        <a href="#night-top" className="night-mark">RS<span>✦</span></a>
        <div className="night-location">Aotearoa born<br />Edinburgh based</div>
        <a className="night-instagram" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
      </header>

      <section id="night-top" className="night-hero">
        <ArtworkImage item={artwork[28]} className="night-backdrop" eager />
        <div className="night-wash" />
        <div className="night-title-wrap">
          <p>Artist &amp; tattooer</p>
          <h1>Wild<br /><em>things</em><br />in ink.</h1>
        </div>
        <p className="night-side-note">Fine-line botanicals / fauna / small omens</p>
        <div className="night-actions">
          <a href="#night-work">Enter the archive <Arrow /></a>
          <a href={studioUrl} target="_blank" rel="noreferrer">Book an appointment <Arrow diagonal /></a>
        </div>
      </section>

      <section id="night-work" className="night-work">
        <div className="night-work-heading">
          <p>Selected work / 03</p>
          <h2>Made slowly.<br />Worn forever.</h2>
        </div>
        <div className="night-card-row">
          {nightCards.map((item, index) => (
            <figure className={`night-card night-card-${index + 1}`} key={item.id}>
              <ArtworkImage item={item} />
              <figcaption><span>0{index + 1}</span>{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <footer className="night-footer"><span>Ruby Smythe © 2026</span><span>Inkdependent / Haymarket</span></footer>
    </main>
  );
}

export function FlashWallLanding() {
  return (
    <main className="paper-page">
      <LandingStyles />
      <ConceptNav active={3} />
      <header className="paper-header">
        <a href="#paper-top" className="paper-logo">Ruby’s<br /><span>field notes</span></a>
        <nav aria-label="Primary navigation">
          <a href="#paper-wall">Flash wall</a>
          <a href={studioUrl} target="_blank" rel="noreferrer">Visit the studio</a>
        </nav>
      </header>

      <section id="paper-top" className="paper-hero">
        <div className="paper-copy">
          <p className="paper-stamp">Edinburgh ↔ Aotearoa</p>
          <h1>Drawn from<br />the <span>garden,</span><br />made for you.</h1>
          <p>Original tattoo flash, custom botanical pieces, and paintings by Ruby Smythe.</p>
          <a href={studioUrl} target="_blank" rel="noreferrer">Ask about a piece <Arrow /></a>
        </div>
        <div className="paper-collage" aria-label="A collage of Ruby Smythe's work">
          <figure className="paper-polaroid paper-polaroid-a"><ArtworkImage item={artwork[10]} eager /><figcaption>Flash sheet No. 11</figcaption></figure>
          <figure className="paper-polaroid paper-polaroid-b"><ArtworkImage item={artwork[17]} eager /><figcaption>Peonies in gouache</figcaption></figure>
          <figure className="paper-polaroid paper-polaroid-c"><ArtworkImage item={artwork[24]} eager /><figcaption>For M. / Edinburgh</figcaption></figure>
          <div className="paper-flower" aria-hidden="true">✿</div>
          <p className="paper-scrawl">soft petals,<br />sharp lines</p>
        </div>
      </section>

      <section id="paper-wall" className="paper-wall">
        <div className="paper-wall-title"><span>Pinboard / 2026</span><h2>Fresh from<br />the sketchbook</h2></div>
        {[artwork[0], artwork[11], artwork[15], artwork[21]].map((item, index) => (
          <figure className={`paper-note paper-note-${index + 1}`} key={item.id}>
            <ArtworkImage item={item} />
            <figcaption>{item.title}<span>0{index + 1}</span></figcaption>
          </figure>
        ))}
      </section>
      <footer className="paper-footer"><a href={instagramUrl} target="_blank" rel="noreferrer">Follow the process @byrubydesigns <Arrow diagonal /></a><span>Appointments in Haymarket, Edinburgh</span></footer>
    </main>
  );
}

export function ModernExhibitionLanding() {
  return (
    <main className="exhibit-page">
      <LandingStyles />
      <ConceptNav active={4} />
      <header className="exhibit-header">
        <a className="exhibit-logo" href="#exhibit-top">RS<span>®</span></a>
        <nav aria-label="Primary navigation"><a href="#exhibit-work">Work</a><a href="#exhibit-about">About</a><a href={studioUrl} target="_blank" rel="noreferrer">Book ↗</a></nav>
        <p>Artist / Tattooer<br />EDI—NZ</p>
      </header>

      <section id="exhibit-top" className="exhibit-hero">
        <h1><span>Ruby</span><span>Smythe</span></h1>
        <div className="exhibit-image-main"><ArtworkImage item={artwork[19]} eager /><span>01 / FINISHED WORK</span></div>
        <div className="exhibit-image-small"><ArtworkImage item={artwork[8]} eager /></div>
        <p className="exhibit-statement">Art for bodies<br />and other living things.</p>
        <a className="exhibit-arrow" href="#exhibit-work" aria-label="View selected work"><Arrow /></a>
      </section>

      <section id="exhibit-work" className="exhibit-work">
        <header><p>Selected work</p><p>2022—2026</p><p>Edinburgh, Scotland</p></header>
        <div className="exhibit-strip">
          {[
            [artwork[8], "Gouache", "Iris & daffodil"],
            [artwork[13], "Tattoo", "Peony & dragonfly"],
            [artwork[11], "Drawing", "Tiger study"],
            [artwork[26], "Tattoo", "Shoulder floral"]
          ].map(([item, type, title], index) => (
            <figure key={(item as Artwork).id}>
              <ArtworkImage item={item as Artwork} />
              <figcaption><span>{String(index + 1).padStart(2, "0")}</span><strong>{title as string}</strong><small>{type as string}</small></figcaption>
            </figure>
          ))}
        </div>
      </section>
      <footer id="exhibit-about" className="exhibit-footer"><h2>Have something<br />wild in mind?</h2><a href={studioUrl} target="_blank" rel="noreferrer">Let’s make it <Arrow diagonal /></a></footer>
    </main>
  );
}

export function BotanicalCabinetLanding() {
  return (
    <main className="cabinet-page">
      <LandingStyles />
      <ConceptNav active={5} light />
      <header className="cabinet-header">
        <p>Fine art &amp; tattoo</p>
        <a className="cabinet-brand" href="#cabinet-top"><span>Ruby</span><i>✦</i><span>Smythe</span></a>
        <nav aria-label="Primary navigation"><a href="#cabinet-collection">Collection</a><a href={instagramUrl} target="_blank" rel="noreferrer">Journal ↗</a></nav>
      </header>

      <section id="cabinet-top" className="cabinet-hero">
        <p className="cabinet-eyebrow">From antipodean forests to Edinburgh gardens</p>
        <h1>Nature,<br /><em>kept close.</em></h1>
        <div className="cabinet-oval cabinet-oval-main"><ArtworkImage item={artwork[17]} eager /></div>
        <div className="cabinet-oval cabinet-oval-left"><ArtworkImage item={artwork[8]} eager /></div>
        <div className="cabinet-oval cabinet-oval-right"><ArtworkImage item={artwork[28]} eager /></div>
        <p className="cabinet-copy">Ruby makes intricate botanical and fauna-inspired pieces across paper, paint, and skin.</p>
        <a className="cabinet-button" href={studioUrl} target="_blank" rel="noreferrer">Commission a piece <Arrow /></a>
      </section>

      <section id="cabinet-collection" className="cabinet-collection">
        <header><span>Cabinet No. I</span><h2>Flora / Fauna / Folklore</h2><span>Four recent studies</span></header>
        <div className="cabinet-grid">
          {[artwork[5], artwork[9], artwork[16], artwork[23]].map((item, index) => (
            <figure key={item.id}>
              <div className="cabinet-frame"><ArtworkImage item={item} /></div>
              <figcaption><span>Plate {index + 1}</span><strong>{item.title}</strong></figcaption>
            </figure>
          ))}
        </div>
      </section>
      <footer className="cabinet-footer"><p>Private tattoo appointments<br />at Inkdependent Studio</p><div>✦</div><a href={instagramUrl} target="_blank" rel="noreferrer">@byrubydesigns</a></footer>
    </main>
  );
}

function LandingStyles() {
  return <style>{`
    :root { --landing-ease: cubic-bezier(.23,1,.32,1); }
    html { scroll-behavior: smooth; }
    body { margin: 0; }
    .concept-nav { position: fixed; z-index: 60; top: 14px; right: 16px; display: flex; align-items: center; gap: 4px; padding: 5px; border: 1px solid rgba(19,24,21,.14); border-radius: 999px; background: rgba(247,244,235,.88); color: #171a18; font: 600 10px/1 Arial, sans-serif; letter-spacing: .08em; text-transform: uppercase; backdrop-filter: blur(12px); box-shadow: 0 7px 24px rgba(0,0,0,.08); }
    .concept-nav > span { padding: 0 7px; opacity: .55; }
    .concept-nav a { display: grid; width: 27px; height: 27px; place-items: center; border-radius: 50%; color: inherit; text-decoration: none; transition: color 150ms var(--landing-ease), background-color 150ms var(--landing-ease), transform 150ms var(--landing-ease); }
    .concept-nav a.is-active { background: #171a18; color: #fff; }
    .concept-nav a:active { transform: scale(.93); }
    .concept-nav--light { border-color: rgba(255,255,255,.18); background: rgba(12,17,18,.7); color: #fff; }
    .concept-nav--light a.is-active { background: #f3eee1; color: #111; }
    .field-page, .night-page, .paper-page, .exhibit-page, .cabinet-page { min-height: 100vh; overflow: hidden; }
    .field-page *, .night-page *, .paper-page *, .exhibit-page *, .cabinet-page * { box-sizing: border-box; }
    .field-page a, .night-page a, .paper-page a, .exhibit-page a, .cabinet-page a { color: inherit; }
    .field-page img, .night-page img, .paper-page img, .exhibit-page img, .cabinet-page img { display: block; }

    /* 01 — Field notes */
    .field-page { background: #f2efe5; color: #1c2921; font-family: Arial, Helvetica, sans-serif; }
    .field-header { display: grid; grid-template-columns: 1fr auto; align-items: start; min-height: 104px; padding: 25px 40px 18px; border-bottom: 1px solid rgba(28,41,33,.22); }
    .field-wordmark { width: fit-content; font: 700 20px/.82 Georgia, serif; letter-spacing: -.06em; text-decoration: none; text-transform: uppercase; }
    .field-header nav { display: flex; gap: 36px; padding-right: 290px; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; }
    .field-header nav a { text-decoration: none; }
    .field-hero { display: grid; min-height: calc(100vh - 104px); grid-template-columns: minmax(290px,.75fr) minmax(420px,1.15fr) minmax(240px,.62fr); }
    .field-intro { display: flex; flex-direction: column; padding: 66px 36px 40px 40px; border-right: 1px solid rgba(28,41,33,.22); }
    .field-kicker { margin: 0 0 20px; color: #6e796e; font-size: 10px; letter-spacing: .2em; text-transform: uppercase; }
    .field-intro h1 { margin: 0; font: 400 clamp(3.35rem,5.35vw,6.7rem)/.91 Georgia, "Times New Roman", serif; letter-spacing: -.065em; }
    .field-intro h1 em { color: #a43d2b; font-weight: 400; }
    .field-dek { max-width: 360px; margin: 34px 0 0; font: 15px/1.6 Arial, sans-serif; }
    .field-circle-link { display: flex; width: 126px; height: 126px; align-items: center; justify-content: space-around; margin-top: auto; border: 1px solid #1c2921; border-radius: 50%; padding: 22px; font-size: 11px; line-height: 1.3; text-decoration: none; text-transform: uppercase; transition: background-color 180ms var(--landing-ease), color 180ms var(--landing-ease), transform 150ms var(--landing-ease); }
    .field-circle-link span:last-child { font-size: 20px; }
    .field-circle-link:active { transform: scale(.97); }
    .field-main-art { display: grid; min-width: 0; grid-template-rows: minmax(0,1fr) auto; margin: 0; padding: 18px; border-right: 1px solid rgba(28,41,33,.22); }
    .field-main-art img { width: 100%; height: 100%; min-height: 0; object-fit: cover; }
    .field-main-art figcaption { display: flex; justify-content: space-between; padding-top: 10px; color: #58645b; font-size: 9px; letter-spacing: .12em; text-transform: uppercase; }
    .field-specimens { display: grid; grid-template-rows: 1fr 1fr auto; gap: 14px; padding: 18px 40px 28px 18px; }
    .field-specimens figure { display: grid; min-height: 0; grid-template-rows: minmax(0,1fr) auto; margin: 0; }
    .field-specimens img { width: 100%; height: 100%; min-height: 0; object-fit: cover; filter: saturate(.7); }
    .field-specimens figcaption { padding-top: 6px; color: #6e796e; font-size: 9px; letter-spacing: .11em; text-transform: uppercase; }
    .field-note { max-width: 210px; margin: 10px 0 0; padding-left: 36px; font: italic 17px/1.35 Georgia, serif; }
    .field-index { padding: 90px 40px 120px; border-top: 1px solid rgba(28,41,33,.22); }
    .field-index-label { margin: 0 0 24px; font-size: 10px; letter-spacing: .2em; text-transform: uppercase; }
    .field-index-row { display: grid; grid-template-columns: 1fr 1.3fr .85fr; gap: 14px; }
    .field-index-row figure { margin: 0; }
    .field-index-image { height: clamp(360px,52vw,720px); overflow: hidden; background: #e4dfd2; }
    .field-index-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 700ms var(--landing-ease); }
    .field-index-row figcaption { display: flex; justify-content: space-between; padding-top: 10px; }
    .field-index-row figcaption span { color: #697268; font-size: 9px; letter-spacing: .1em; text-transform: uppercase; }
    .field-index-row figcaption strong { font: 400 14px Georgia, serif; }
    .field-footer { display: grid; grid-template-columns: 1fr auto; gap: 80px; padding: 45px 40px 70px; border-top: 1px solid rgba(28,41,33,.22); }
    .field-footer p { max-width: 620px; margin: 0; font: 400 clamp(1.6rem,3vw,3rem)/1.15 Georgia, serif; }
    .field-footer a { display: flex; align-items: center; gap: 8px; align-self: end; font-size: 12px; }
    .field-footer svg { width: 18px; }

    /* 02 — Night bloom */
    .night-page { background: #091315; color: #f4ecd9; font-family: Arial, Helvetica, sans-serif; }
    .night-header { position: absolute; z-index: 10; top: 0; left: 0; display: grid; width: 100%; grid-template-columns: 1fr auto 1fr; align-items: start; padding: 24px 36px; }
    .night-mark { width: fit-content; color: #d7e477 !important; font: 700 30px/1 Arial, sans-serif; letter-spacing: -.09em; text-decoration: none; }
    .night-mark span { margin-left: 5px; font-size: 11px; vertical-align: top; }
    .night-location { color: rgba(244,236,217,.72); font-size: 9px; line-height: 1.5; letter-spacing: .18em; text-align: center; text-transform: uppercase; }
    .night-instagram { justify-self: end; margin-right: 275px; }
    .night-instagram svg { width: 22px; height: 22px; }
    .night-hero { position: relative; min-height: 100svh; overflow: hidden; }
    .night-backdrop { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 60% center; filter: saturate(.78) contrast(1.05); }
    .night-wash { position: absolute; inset: 0; background: linear-gradient(90deg,rgba(5,15,17,.98) 0%,rgba(5,15,17,.72) 35%,rgba(5,15,17,.08) 68%,rgba(5,15,17,.62) 100%), linear-gradient(0deg,rgba(5,15,17,.78),transparent 45%); }
    .night-title-wrap { position: absolute; z-index: 2; top: 50%; left: 5.5%; transform: translateY(-47%); }
    .night-title-wrap p { margin: 0 0 22px 8px; color: #d7e477; font-size: 10px; letter-spacing: .28em; text-transform: uppercase; }
    .night-title-wrap h1 { margin: 0; font: 400 clamp(5.8rem,12.2vw,13.5rem)/.67 Georgia, serif; letter-spacing: -.075em; }
    .night-title-wrap h1 em { margin-left: .3em; color: #d7e477; font-weight: 400; }
    .night-side-note { position: absolute; z-index: 2; right: 31px; top: 50%; margin: 0; color: rgba(244,236,217,.75); font-size: 9px; letter-spacing: .2em; text-transform: uppercase; transform: rotate(90deg) translateX(50%); transform-origin: right center; }
    .night-actions { position: absolute; z-index: 3; right: 5.5%; bottom: 6%; display: grid; width: min(460px,40vw); grid-template-columns: 1fr 1fr; border-top: 1px solid rgba(244,236,217,.38); }
    .night-actions a { display: flex; min-height: 82px; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(244,236,217,.38); font: 16px/1.2 Georgia, serif; text-decoration: none; }
    .night-actions a + a { padding-left: 28px; border-left: 1px solid rgba(244,236,217,.38); }
    .night-actions span { color: #d7e477; }
    .night-work { min-height: 100vh; padding: 110px 5.5% 150px; }
    .night-work-heading { display: grid; grid-template-columns: 1fr 1.5fr; align-items: start; margin-bottom: -45px; }
    .night-work-heading p { color: #d7e477; font-size: 9px; letter-spacing: .22em; text-transform: uppercase; }
    .night-work-heading h2 { position: relative; z-index: 3; margin: 0; font: 400 clamp(3.7rem,7vw,8rem)/.88 Georgia, serif; letter-spacing: -.055em; }
    .night-card-row { display: grid; grid-template-columns: .9fr 1.25fr .8fr; align-items: end; gap: 26px; }
    .night-card { margin: 0; }
    .night-card img { width: 100%; height: 52vw; max-height: 760px; object-fit: cover; }
    .night-card-1 img { height: 37vw; }
    .night-card-3 img { height: 31vw; }
    .night-card figcaption { display: flex; justify-content: space-between; padding-top: 11px; font: 13px Georgia, serif; }
    .night-card figcaption span { color: #d7e477; font: 9px Arial, sans-serif; }
    .night-footer { display: flex; justify-content: space-between; padding: 30px 5.5% 42px; border-top: 1px solid rgba(244,236,217,.15); color: rgba(244,236,217,.6); font-size: 9px; letter-spacing: .15em; text-transform: uppercase; }

    /* 03 — Flash wall */
    .paper-page { background: #d7ccb0; color: #292621; font-family: "Courier New", monospace; background-image: radial-gradient(rgba(55,45,35,.12) .65px, transparent .65px); background-size: 4px 4px; }
    .paper-header { display: flex; min-height: 112px; align-items: center; justify-content: space-between; padding: 20px 40px; border-bottom: 1px solid rgba(41,38,33,.3); }
    .paper-logo { font: 700 19px/.9 Georgia, serif; letter-spacing: -.03em; text-decoration: none; text-transform: uppercase; transform: rotate(-2deg); }
    .paper-logo span { color: #b8362d; font: italic 16px/1 Georgia, serif; text-transform: none; }
    .paper-header nav { display: flex; gap: 35px; padding-right: 280px; font-size: 10px; text-transform: uppercase; }
    .paper-header nav a { text-decoration-thickness: 1px; text-underline-offset: 4px; }
    .paper-hero { display: grid; min-height: calc(100svh - 112px); grid-template-columns: .78fr 1.22fr; }
    .paper-copy { display: flex; flex-direction: column; align-items: flex-start; padding: 70px 34px 60px 5vw; border-right: 1px solid rgba(41,38,33,.3); }
    .paper-stamp { display: inline-block; margin: 0 0 35px; border: 1px dashed #b8362d; border-radius: 50%; padding: 17px 12px; color: #b8362d; font-size: 9px; letter-spacing: .13em; text-transform: uppercase; transform: rotate(-7deg); }
    .paper-copy h1 { margin: 0; font: 400 clamp(3.8rem,6.8vw,8rem)/.88 Georgia, serif; letter-spacing: -.06em; }
    .paper-copy h1 span { color: #b8362d; font-style: italic; }
    .paper-copy > p:not(.paper-stamp) { max-width: 430px; margin: 30px 0; font-size: 12px; line-height: 1.65; }
    .paper-copy > a { display: flex; width: 100%; justify-content: space-between; margin-top: auto; border-bottom: 1px solid #292621; padding: 14px 0; font-size: 11px; text-decoration: none; text-transform: uppercase; }
    .paper-collage { position: relative; min-height: 750px; overflow: hidden; }
    .paper-polaroid { position: absolute; z-index: 2; margin: 0; background: #f7f1e5; padding: 10px 10px 30px; box-shadow: 0 18px 40px rgba(62,46,30,.18); }
    .paper-polaroid::before { position: absolute; z-index: 3; top: -13px; left: 50%; width: 72px; height: 24px; background: rgba(224,205,157,.72); content: ""; transform: translateX(-50%) rotate(2deg); }
    .paper-polaroid img { width: 100%; height: 100%; object-fit: cover; filter: saturate(.87); }
    .paper-polaroid figcaption { position: absolute; bottom: 8px; left: 13px; font: italic 13px Georgia, serif; }
    .paper-polaroid-a { top: 9%; left: 8%; width: 38%; height: 50%; transform: rotate(-5deg); }
    .paper-polaroid-b { top: 4%; right: 6%; width: 38%; height: 56%; transform: rotate(4deg); }
    .paper-polaroid-c { right: 26%; bottom: -4%; width: 32%; height: 48%; transform: rotate(-1deg); }
    .paper-flower { position: absolute; right: 3%; bottom: 4%; color: #b8362d; font: 100px/1 Georgia, serif; transform: rotate(12deg); }
    .paper-scrawl { position: absolute; left: 4%; bottom: 12%; color: #315e54; font: italic 25px/1.1 "Comic Sans MS", cursive; transform: rotate(-8deg); }
    .paper-wall { display: grid; min-height: 100vh; grid-template-columns: 1fr 1fr 1fr; gap: 55px 28px; padding: 100px 5vw 140px; border-top: 1px solid rgba(41,38,33,.3); }
    .paper-wall-title { align-self: center; }
    .paper-wall-title span { color: #b8362d; font-size: 10px; text-transform: uppercase; }
    .paper-wall-title h2 { margin: 20px 0 0; font: 400 clamp(2.8rem,5vw,5.4rem)/.92 Georgia, serif; letter-spacing: -.05em; }
    .paper-note { position: relative; margin: 0; background: #f5f0e4; padding: 12px 12px 34px; box-shadow: 0 15px 34px rgba(62,46,30,.14); }
    .paper-note::after { position: absolute; top: 7px; left: 50%; width: 7px; height: 7px; border-radius: 50%; background: #b8362d; box-shadow: 0 2px 3px rgba(0,0,0,.28); content: ""; }
    .paper-note img { width: 100%; aspect-ratio: 4/5; object-fit: cover; }
    .paper-note figcaption { display: flex; justify-content: space-between; padding: 10px 3px 0; font: italic 13px Georgia, serif; }
    .paper-note-1 { transform: rotate(2deg); }
    .paper-note-2 { transform: rotate(-1.5deg) translateY(45px); }
    .paper-note-3 { transform: rotate(-2deg); }
    .paper-note-4 { transform: rotate(1.4deg) translateY(25px); }
    .paper-footer { display: flex; justify-content: space-between; padding: 40px 5vw 60px; border-top: 1px solid rgba(41,38,33,.3); font-size: 10px; text-transform: uppercase; }

    /* 04 — Modern exhibition */
    .exhibit-page { background: #f4f3ee; color: #101010; font-family: Arial, Helvetica, sans-serif; }
    .exhibit-header { display: grid; grid-template-columns: 1fr 2fr 1fr; align-items: start; min-height: 118px; padding: 22px 35px; border-bottom: 1px solid #151515; }
    .exhibit-logo { width: fit-content; font-size: 26px; font-weight: 800; letter-spacing: -.1em; text-decoration: none; }
    .exhibit-logo span { color: #f04b31; font-size: 9px; vertical-align: top; }
    .exhibit-header nav { display: flex; justify-content: center; gap: 52px; font-size: 11px; text-transform: uppercase; }
    .exhibit-header nav a { text-decoration: none; }
    .exhibit-header > p { justify-self: end; margin: 0 280px 0 0; font-size: 9px; line-height: 1.5; letter-spacing: .12em; text-align: right; text-transform: uppercase; }
    .exhibit-hero { position: relative; min-height: calc(100svh - 118px); overflow: hidden; }
    .exhibit-hero h1 { position: absolute; z-index: 3; inset: 4.5% 2.3% auto; display: flex; justify-content: space-between; margin: 0; font-size: clamp(6rem,15.7vw,18rem); line-height: .72; letter-spacing: -.095em; text-transform: uppercase; }
    .exhibit-hero h1 span:last-child { color: #f04b31; }
    .exhibit-image-main { position: absolute; z-index: 2; top: 23%; left: 31%; width: 36%; height: 70%; overflow: hidden; }
    .exhibit-image-main img { width: 100%; height: 100%; object-fit: cover; }
    .exhibit-image-main > span { position: absolute; right: 0; bottom: 0; padding: 8px 10px; background: #f4f3ee; font-size: 8px; letter-spacing: .12em; }
    .exhibit-image-small { position: absolute; top: 43%; left: 4%; width: 17%; height: 37%; overflow: hidden; }
    .exhibit-image-small img { width: 100%; height: 100%; object-fit: cover; }
    .exhibit-statement { position: absolute; right: 4%; bottom: 16%; margin: 0; font: 400 clamp(1.5rem,2.5vw,3rem)/1 Georgia, serif; }
    .exhibit-arrow { position: absolute; right: 4%; bottom: 5%; display: grid; width: 58px; height: 58px; place-items: center; border: 1px solid #111; border-radius: 50%; font-size: 24px; text-decoration: none; }
    .exhibit-work { padding: 100px 35px 130px; border-top: 1px solid #151515; }
    .exhibit-work > header { display: grid; grid-template-columns: 1fr 1fr 1fr; padding-bottom: 18px; font-size: 9px; letter-spacing: .16em; text-transform: uppercase; }
    .exhibit-work > header p { margin: 0; }
    .exhibit-work > header p:nth-child(2) { text-align: center; }
    .exhibit-work > header p:last-child { text-align: right; }
    .exhibit-strip { display: grid; grid-template-columns: .85fr 1.15fr .9fr 1.1fr; gap: 8px; }
    .exhibit-strip figure { margin: 0; }
    .exhibit-strip img { width: 100%; height: 50vw; max-height: 700px; object-fit: cover; filter: grayscale(1); transition: filter 220ms ease, transform 500ms var(--landing-ease); }
    .exhibit-strip figure:nth-child(even) img { margin-top: 48px; height: calc(50vw - 48px); }
    .exhibit-strip figcaption { display: grid; grid-template-columns: 25px 1fr; gap: 2px 6px; padding-top: 10px; }
    .exhibit-strip figcaption span, .exhibit-strip figcaption small { font-size: 8px; font-weight: 400; letter-spacing: .1em; text-transform: uppercase; }
    .exhibit-strip figcaption strong { font: 400 14px Georgia, serif; }
    .exhibit-strip figcaption small { grid-column: 2; color: #6d6d68; }
    .exhibit-footer { display: flex; align-items: end; justify-content: space-between; padding: 110px 4vw 90px; background: #f04b31; color: #101010; }
    .exhibit-footer h2 { margin: 0; font-size: clamp(4rem,9vw,10rem); line-height: .79; letter-spacing: -.075em; text-transform: uppercase; }
    .exhibit-footer a { display: flex; min-width: 220px; justify-content: space-between; border-bottom: 1px solid; padding: 16px 0; font: 16px Georgia, serif; text-decoration: none; }

    /* 05 — Botanical cabinet */
    .cabinet-page { background: #173d30; color: #f3ead8; font-family: Georgia, "Times New Roman", serif; }
    .cabinet-header { position: absolute; z-index: 10; top: 0; display: grid; width: 100%; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 22px 38px; border-bottom: 1px solid rgba(243,234,216,.28); }
    .cabinet-header > p { margin: 0; font: 9px Arial, sans-serif; letter-spacing: .16em; text-transform: uppercase; }
    .cabinet-brand { display: flex; align-items: center; gap: 15px; font-size: 22px; letter-spacing: -.04em; text-decoration: none; text-transform: uppercase; }
    .cabinet-brand i { color: #e6c957; font-size: 11px; font-style: normal; }
    .cabinet-header nav { display: flex; justify-self: end; gap: 30px; padding-right: 280px; font: 9px Arial, sans-serif; letter-spacing: .14em; text-transform: uppercase; }
    .cabinet-header nav a { text-decoration: none; }
    .cabinet-hero { position: relative; min-height: 100svh; padding-top: 120px; overflow: hidden; background: radial-gradient(circle at 50% 50%,rgba(54,110,79,.7),transparent 46%); }
    .cabinet-eyebrow { margin: 15px 0 0; color: #e6c957; font: 9px Arial, sans-serif; letter-spacing: .2em; text-align: center; text-transform: uppercase; }
    .cabinet-hero h1 { position: relative; z-index: 4; margin: 4.5vh auto 0; font: 400 clamp(6rem,12vw,13rem)/.72 Georgia, serif; letter-spacing: -.07em; text-align: center; }
    .cabinet-hero h1 em { color: #e6c957; font-weight: 400; }
    .cabinet-oval { position: absolute; overflow: hidden; border: 1px solid rgba(243,234,216,.48); border-radius: 50%; background: #eee7d7; box-shadow: 0 25px 75px rgba(3,15,10,.22); }
    .cabinet-oval img { width: 100%; height: 100%; object-fit: cover; }
    .cabinet-oval-main { z-index: 3; top: 32%; left: 50%; width: min(27vw,440px); height: min(48vw,660px); transform: translateX(-50%); }
    .cabinet-oval-left { top: 47%; left: 7%; width: min(18vw,280px); height: min(28vw,410px); transform: rotate(-7deg); }
    .cabinet-oval-right { top: 39%; right: 6%; width: min(18vw,290px); height: min(29vw,430px); transform: rotate(7deg); }
    .cabinet-copy { position: absolute; left: 6%; bottom: 8%; width: 270px; margin: 0; font-size: 18px; line-height: 1.45; }
    .cabinet-button { position: absolute; right: 6%; bottom: 8%; display: flex; width: 260px; justify-content: space-between; border-bottom: 1px solid #f3ead8; padding: 13px 0; font: 10px Arial, sans-serif; letter-spacing: .12em; text-decoration: none; text-transform: uppercase; }
    .cabinet-collection { padding: 100px 4vw 130px; background: #eee6d3; color: #183d31; }
    .cabinet-collection > header { display: grid; grid-template-columns: 1fr auto 1fr; align-items: end; padding-bottom: 30px; border-bottom: 1px solid rgba(23,61,48,.35); }
    .cabinet-collection > header h2 { margin: 0; font: 400 clamp(2.3rem,4vw,4.8rem)/1 Georgia, serif; letter-spacing: -.045em; text-align: center; }
    .cabinet-collection > header span { font: 9px Arial, sans-serif; letter-spacing: .14em; text-transform: uppercase; }
    .cabinet-collection > header span:last-child { text-align: right; }
    .cabinet-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; padding-top: 40px; }
    .cabinet-grid figure { margin: 0; }
    .cabinet-frame { aspect-ratio: 3/4; overflow: hidden; border: 1px solid rgba(23,61,48,.35); border-radius: 50% 50% 6px 6px; padding: 10px; }
    .cabinet-frame img { width: 100%; height: 100%; border-radius: 50% 50% 2px 2px; object-fit: cover; }
    .cabinet-grid figcaption { display: flex; flex-direction: column; gap: 5px; padding-top: 13px; text-align: center; }
    .cabinet-grid figcaption span { font: 8px Arial, sans-serif; letter-spacing: .14em; text-transform: uppercase; }
    .cabinet-grid figcaption strong { font-size: 15px; font-weight: 400; }
    .cabinet-footer { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 42px 4vw 60px; }
    .cabinet-footer p { margin: 0; font: 9px/1.6 Arial, sans-serif; letter-spacing: .13em; text-transform: uppercase; }
    .cabinet-footer div { color: #e6c957; }
    .cabinet-footer a { justify-self: end; font: 10px Arial, sans-serif; letter-spacing: .13em; text-transform: uppercase; }

    @media (hover: hover) and (pointer: fine) {
      .concept-nav a:hover { background: rgba(25,28,25,.1); }
      .concept-nav--light a:hover { background: rgba(255,255,255,.14); }
      .concept-nav a.is-active:hover { background: #171a18; }
      .concept-nav--light a.is-active:hover { background: #f3eee1; }
      .field-circle-link:hover { background: #1c2921; color: #f2efe5; }
      .field-index-row figure:hover img { transform: scale(1.025); }
      .night-actions a:hover span, .paper-copy > a:hover span, .cabinet-button:hover span { transform: translateX(4px); }
      .exhibit-strip figure:hover img { filter: grayscale(0); transform: scale(.985); }
    }

    @media (max-width: 900px) {
      .concept-nav { top: auto; right: 10px; bottom: 10px; }
      .field-header, .paper-header, .exhibit-header, .cabinet-header { padding-inline: 20px; }
      .field-header nav, .paper-header nav, .cabinet-header nav { padding-right: 0; }
      .night-instagram { margin-right: 0; }
      .exhibit-header > p { margin-right: 0; }
      .field-hero { grid-template-columns: 1fr 1.15fr; }
      .field-specimens { display: none; }
      .paper-hero { grid-template-columns: 1fr; }
      .paper-copy { min-height: 80svh; border-right: 0; border-bottom: 1px solid rgba(41,38,33,.3); }
      .paper-collage { min-height: 760px; }
      .exhibit-hero h1 { flex-direction: column; }
      .exhibit-image-main { left: 34%; width: 46%; }
      .exhibit-statement { bottom: 10%; }
      .cabinet-oval-main { width: 38vw; height: 58vw; }
      .cabinet-oval-left, .cabinet-oval-right { width: 22vw; height: 36vw; }
      .cabinet-grid { grid-template-columns: 1fr 1fr; }
    }

    @media (max-width: 640px) {
      .field-header { min-height: 82px; align-items: start; padding: 19px 18px; }
      .field-header nav { gap: 14px; font-size: 8px; }
      .field-header nav a:nth-child(2) { display: none; }
      .field-hero { min-height: auto; grid-template-columns: 1fr; }
      .field-intro { min-height: 73svh; padding: 50px 18px 26px; border-right: 0; border-bottom: 1px solid rgba(28,41,33,.22); }
      .field-intro h1 { font-size: clamp(3.7rem,18vw,5.2rem); }
      .field-dek { max-width: 310px; }
      .field-circle-link { width: 102px; height: 102px; margin-top: 50px; padding: 15px; }
      .field-main-art { height: 90svh; border-right: 0; }
      .field-index { padding: 70px 18px 85px; }
      .field-index-row { grid-template-columns: 1fr; gap: 45px; }
      .field-index-image { height: 125vw; }
      .field-index-row figure:nth-child(2) .field-index-image { height: 150vw; }
      .field-footer { grid-template-columns: 1fr; gap: 40px; padding: 40px 18px 80px; }
      .night-header { padding: 18px; }
      .night-location { display: none; }
      .night-header { grid-template-columns: 1fr auto; }
      .night-title-wrap { top: 43%; left: 18px; }
      .night-title-wrap h1 { font-size: clamp(5rem,25vw,7.8rem); line-height: .72; }
      .night-side-note { display: none; }
      .night-actions { right: 18px; bottom: 3%; left: 18px; width: auto; grid-template-columns: 1fr; }
      .night-actions a { min-height: 50px; font-size: 14px; }
      .night-actions a + a { border-left: 0; padding-left: 0; }
      .night-work { padding: 75px 18px 100px; }
      .night-work-heading { display: block; margin-bottom: 35px; }
      .night-work-heading h2 { font-size: 3.8rem; }
      .night-card-row { grid-template-columns: 1fr; gap: 50px; }
      .night-card img, .night-card-1 img, .night-card-3 img { height: 125vw; max-height: none; }
      .night-footer { padding-inline: 18px; }
      .paper-header { min-height: 86px; }
      .paper-header nav { gap: 14px; font-size: 8px; }
      .paper-header nav a:first-child { display: none; }
      .paper-copy { min-height: 78svh; padding: 48px 18px 30px; }
      .paper-copy h1 { font-size: clamp(3.7rem,18vw,5rem); }
      .paper-collage { min-height: 700px; }
      .paper-polaroid-a { left: 3%; width: 52%; height: 43%; }
      .paper-polaroid-b { top: 12%; right: -4%; width: 49%; height: 48%; }
      .paper-polaroid-c { right: 16%; bottom: 1%; width: 53%; height: 45%; }
      .paper-scrawl { bottom: 7%; font-size: 18px; }
      .paper-flower { right: -2%; bottom: 2%; font-size: 72px; }
      .paper-wall { grid-template-columns: 1fr; gap: 55px; padding: 75px 24px 110px; }
      .paper-wall-title { margin-bottom: 15px; }
      .paper-note-2, .paper-note-4 { transform: none; }
      .paper-footer { flex-direction: column; gap: 20px; padding-bottom: 80px; }
      .exhibit-header { min-height: 86px; grid-template-columns: 1fr 2fr; }
      .exhibit-header nav { justify-content: end; gap: 17px; font-size: 9px; }
      .exhibit-header > p { display: none; }
      .exhibit-hero { min-height: calc(100svh - 86px); }
      .exhibit-hero h1 { top: 5%; font-size: 24vw; line-height: .75; }
      .exhibit-image-main { top: 30%; left: 27%; width: 65%; height: 58%; }
      .exhibit-image-small { top: 50%; left: 4%; width: 26%; height: 25%; }
      .exhibit-statement { right: auto; bottom: 5%; left: 4%; font-size: 1.3rem; }
      .exhibit-arrow { right: 4%; bottom: 4%; }
      .exhibit-work { padding: 75px 12px 90px; }
      .exhibit-work > header { grid-template-columns: 1fr 1fr; }
      .exhibit-work > header p:nth-child(2) { text-align: right; }
      .exhibit-work > header p:last-child { display: none; }
      .exhibit-strip { grid-template-columns: 1fr 1fr; }
      .exhibit-strip img, .exhibit-strip figure:nth-child(even) img { height: 75vw; margin-top: 0; }
      .exhibit-strip figure:nth-child(even) { margin-top: 38px; }
      .exhibit-footer { display: block; padding: 80px 18px 90px; }
      .exhibit-footer h2 { font-size: 17vw; }
      .exhibit-footer a { margin-top: 50px; }
      .cabinet-header { grid-template-columns: auto 1fr; min-height: 82px; }
      .cabinet-header > p { display: none; }
      .cabinet-brand { justify-self: start; gap: 7px; font-size: 16px; }
      .cabinet-header nav { gap: 15px; font-size: 8px; }
      .cabinet-hero { min-height: 900px; padding-top: 105px; }
      .cabinet-eyebrow { padding-inline: 60px; line-height: 1.5; }
      .cabinet-hero h1 { margin-top: 34px; font-size: 20vw; line-height: .76; }
      .cabinet-oval-main { top: 34%; width: 58vw; height: 87vw; }
      .cabinet-oval-left { top: 56%; left: -6%; width: 36vw; height: 53vw; }
      .cabinet-oval-right { top: 51%; right: -5%; width: 34vw; height: 54vw; }
      .cabinet-copy { bottom: 11%; left: 18px; width: 220px; font-size: 15px; }
      .cabinet-button { right: 18px; bottom: 4%; width: calc(100% - 36px); }
      .cabinet-collection { padding: 75px 14px 90px; }
      .cabinet-collection > header { grid-template-columns: 1fr; gap: 13px; text-align: center; }
      .cabinet-collection > header span:last-child { display: none; }
      .cabinet-collection > header h2 { font-size: 2.45rem; }
      .cabinet-grid { gap: 12px; }
      .cabinet-frame { padding: 5px; }
      .cabinet-footer { padding-bottom: 80px; }
      .cabinet-footer p { font-size: 7px; }
    }

    @media (prefers-reduced-motion: no-preference) {
      .field-intro > *, .night-title-wrap > *, .paper-copy > *, .exhibit-hero h1, .cabinet-hero h1 { animation: landing-rise 700ms var(--landing-ease) both; }
      .field-intro > :nth-child(2), .night-title-wrap > :nth-child(2), .paper-copy > :nth-child(2) { animation-delay: 70ms; }
      .field-intro > :nth-child(3), .paper-copy > :nth-child(3) { animation-delay: 120ms; }
      .field-main-art, .night-actions, .paper-collage, .exhibit-image-main, .cabinet-oval-main { animation: landing-reveal 850ms var(--landing-ease) 100ms both; }
    }
    @keyframes landing-rise { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes landing-reveal { from { opacity: 0; clip-path: inset(0 0 10% 0); } to { opacity: 1; clip-path: inset(0); } }
    @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
  `}</style>;
}
