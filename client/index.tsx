import { Route, Router, Routes } from "lakebed/client";
import { useState } from "preact/hooks";
import { artwork, type Artwork } from "./generatedArtwork";

const fineLine = artwork.slice(0, 8);
const painted = artwork.slice(8, 10);
const blueFlash = artwork.slice(10, 17);
const featured = [artwork[13], artwork[8], artwork[12], artwork[1], artwork[16], artwork[14]];

function ImageTile({ item, className = "", caption = true }: { item: Artwork; className?: string; caption?: boolean }) {
  return (
    <figure className={"group relative overflow-hidden " + className}>
      <img alt={item.alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]" src={item.src} />
      {caption ? (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 text-white">
          <p className="text-sm font-medium leading-tight">{item.title}</p>
          <p className="mt-1 text-xs leading-tight text-white/75">{item.medium}</p>
        </figcaption>
      ) : null}
    </figure>
  );
}

function InlineMark({ dark = false }: { dark?: boolean }) {
  return (
    <span className={"inline-grid h-10 w-10 place-items-center rounded-full border text-[11px] uppercase tracking-[0.24em] " + (dark ? "border-white/25 text-white" : "border-black/20 text-black")}>
      NZ
    </span>
  );
}

function VariantOne() {
  return (
    <main className="min-h-screen bg-[#eef1ea] text-[#1a1d18] selection:bg-[#d55b3f] selection:text-white">
      <StyleBlock />
      <section className="mx-auto grid min-h-screen max-w-[1480px] grid-cols-1 gap-8 px-5 py-6 md:grid-cols-[0.32fr_0.68fr] md:px-8 lg:px-12">
        <aside className="flex flex-col justify-between border-b border-[#1a1d18]/20 pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-8">
          <div>
            <div className="flex items-center justify-between">
              <InlineMark />
              <p className="max-w-36 text-right text-xs uppercase leading-relaxed tracking-[0.22em] text-[#596456]">Edinburgh tattooing and botanical painting</p>
            </div>
            <h1 className="atelier-title mt-12 text-[clamp(4rem,14vw,12rem)] leading-[0.78] tracking-normal">Fine line, held lightly.</h1>
          </div>
          <div className="mt-10 grid gap-5 text-sm leading-relaxed text-[#3f493c]">
            <p>
              A New Zealand-born painter and tattoo artist working in Edinburgh, drawing floral forms with a restrained hand and a painter's sense of colour.
            </p>
            <dl className="grid grid-cols-3 border-y border-[#1a1d18]/15 py-4 text-xs uppercase tracking-[0.18em]">
              <div><dt className="text-[#7d8876]">Focus</dt><dd className="mt-1">Floral</dd></div>
              <div><dt className="text-[#7d8876]">Skin</dt><dd className="mt-1">Fine line</dd></div>
              <div><dt className="text-[#7d8876]">Paper</dt><dd className="mt-1">Gouache</dd></div>
            </dl>
          </div>
        </aside>
        <div className="grid gap-5 lg:grid-cols-[0.58fr_0.42fr]">
          <ImageTile item={artwork[13]} className="min-h-[68vh] rounded-[2px] shadow-[0_30px_80px_rgba(46,54,43,0.18)]" />
          <div className="grid gap-5">
            <ImageTile item={artwork[8]} className="min-h-[38vh] rounded-[2px]" />
            <div className="grid grid-cols-2 gap-5">
              {fineLine.slice(1, 5).map((item) => (
                <ImageTile key={item.id} item={item} className="aspect-[4/5] rounded-[2px]" caption={false} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function VariantTwo() {
  return (
    <main className="min-h-screen bg-[#11110f] text-[#f7f1e4]">
      <StyleBlock />
      <section className="mx-auto grid max-w-[1500px] gap-8 px-4 py-5 md:px-8 lg:grid-cols-[340px_1fr]">
        <header className="sticky top-0 z-10 border-b border-[#f7f1e4]/15 bg-[#11110f]/90 py-5 backdrop-blur lg:top-5 lg:h-[calc(100vh-2.5rem)] lg:border-b-0 lg:border-r lg:pr-8">
          <div className="flex items-center justify-between">
            <InlineMark dark />
            <p className="text-xs uppercase tracking-[0.28em] text-[#9fb7c4]">Private flash archive</p>
          </div>
          <h1 className="flash-title mt-12 text-[clamp(3.6rem,9vw,7.8rem)] leading-[0.82]">Botanical marks for skin.</h1>
          <p className="mt-8 max-w-sm text-sm leading-7 text-[#d8d0bd]">
            Fine-line flash, floral studies, skulls, moths and birds composed for quiet permanence. Drawn from an Edinburgh studio with a Pacific-born eye for native forms.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.16em] text-[#11110f]">
            <span className="bg-[#d8f0e2] px-3 py-3">Fine line</span>
            <span className="bg-[#f0d574] px-3 py-3">Custom florals</span>
            <span className="bg-[#b9d1e8] px-3 py-3">Flash days</span>
            <span className="bg-[#f2eee6] px-3 py-3">Gouache</span>
          </div>
        </header>
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-5">
          {[...blueFlash, ...fineLine].map((item, index) => (
            <figure className={(index % 5 === 1 ? "md:row-span-2 " : "") + "group border border-[#f7f1e4]/12 bg-[#f7f1e4] p-2 text-[#11110f]"} key={item.id}>
              <div className={index % 5 === 1 ? "aspect-[4/6]" : "aspect-[4/5]"}>
                <img alt={item.alt} className="h-full w-full object-cover transition duration-500 group-hover:contrast-125" src={item.src} />
              </div>
              <figcaption className="flex min-h-16 items-end justify-between gap-3 pt-3">
                <span className="text-xs uppercase leading-tight tracking-[0.14em]">{item.title}</span>
                <span className="text-lg leading-none text-[#406676]">+</span>
              </figcaption>
            </figure>
          ))}
        </section>
      </section>
    </main>
  );
}

function VariantThree() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-[#18202f]">
      <StyleBlock />
      <section className="relative isolate overflow-hidden">
        <div className="absolute left-0 top-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_20%_15%,rgba(234,190,57,0.34),transparent_28%),radial-gradient(circle_at_78%_6%,rgba(77,101,191,0.20),transparent_26%)]" />
        <div className="mx-auto grid min-h-screen max-w-[1440px] gap-8 px-5 py-8 md:px-10 lg:grid-cols-[1fr_0.92fr]">
          <div className="flex flex-col justify-between">
            <header>
              <p className="text-xs uppercase tracking-[0.32em] text-[#536383]">Gouache, flora, fine-line tattooing</p>
              <h1 className="gouache-title mt-8 max-w-4xl text-[clamp(4rem,12vw,11rem)] leading-[0.82]">Flowers with a pulse.</h1>
            </header>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {painted.concat([artwork[12]]).map((item) => (
                <ImageTile key={item.id} item={item} className="aspect-[4/5] rounded-[6px] shadow-[0_22px_60px_rgba(30,40,70,0.16)]" />
              ))}
            </div>
          </div>
          <aside className="grid content-between gap-8 rounded-[8px] border border-[#18202f]/10 bg-white/70 p-5 shadow-[0_35px_90px_rgba(31,45,74,0.12)] backdrop-blur">
            <ImageTile item={artwork[9]} className="min-h-[46vh] rounded-[5px]" />
            <div>
              <p className="max-w-xl text-xl leading-8">
                The portfolio direction is painterly and crisp: saturated iris blue, daffodil yellow, and disciplined ink drawings, made for collectors who want delicate tattoos that still feel alive.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs uppercase tracking-[0.18em] text-[#536383]">
                <span className="border-y border-[#18202f]/15 py-3">Edinburgh</span>
                <span className="border-y border-[#18202f]/15 py-3">New Zealand</span>
                <span className="border-y border-[#18202f]/15 py-3">Floral</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function VariantFour() {
  return (
    <main className="min-h-screen bg-[#e9ded7] text-[#20211d]">
      <StyleBlock />
      <section className="mx-auto max-w-[1420px] px-5 py-6 md:px-8">
        <header className="grid gap-8 border-b border-[#20211d]/20 pb-8 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#6d7165]">Edinburgh appointment studio</p>
            <h1 className="ledger-title mt-5 max-w-5xl text-[clamp(3.8rem,10vw,9rem)] leading-[0.88]">Soft work, exact line.</h1>
          </div>
          <div className="grid content-end gap-5">
            <p className="text-lg leading-8">
              A booking-led portfolio for a painter and tattoo artist specialising in fine-line florals, gouache references, and delicate custom placement.
            </p>
            <div className="grid grid-cols-3 overflow-hidden rounded-[6px] border border-[#20211d]/20 text-xs uppercase tracking-[0.16em]">
              <span className="bg-[#20211d] px-3 py-4 text-[#e9ded7]">Consult</span>
              <span className="px-3 py-4">Draw</span>
              <span className="px-3 py-4">Tattoo</span>
            </div>
          </div>
        </header>
        <section className="grid gap-5 py-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="grid gap-5">
            <ImageTile item={artwork[14]} className="min-h-[54vh] rounded-[6px]" />
            <div className="grid grid-cols-2 gap-5">
              <ImageTile item={artwork[2]} className="aspect-[4/5] rounded-[6px]" caption={false} />
              <ImageTile item={artwork[5]} className="aspect-[4/5] rounded-[6px]" caption={false} />
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {featured.map((item) => (
              <article className="rounded-[6px] border border-[#20211d]/15 bg-[#f8f1eb] p-3" key={item.id}>
                <img alt={item.alt} className="aspect-[4/4.7] w-full rounded-[4px] object-cover" src={item.src} />
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-base font-semibold">{item.title}</h2>
                    <p className="mt-1 text-sm text-[#6d7165]">{item.medium}</p>
                  </div>
                  <span className="rounded-full border border-[#20211d]/20 px-3 py-1 text-xs uppercase tracking-[0.16em]">skin</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function VariantFive() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : artwork[activeIndex];

  function openArtwork(item: Artwork) {
    const nextIndex = artwork.findIndex((candidate) => candidate.id === item.id);
    setActiveIndex(nextIndex >= 0 ? nextIndex : 0);
  }

  function showPrevious() {
    setActiveIndex((current) => current === null ? 0 : (current + artwork.length - 1) % artwork.length);
  }

  function showNext() {
    setActiveIndex((current) => current === null ? 0 : (current + 1) % artwork.length);
  }

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#161b1a]">
      <StyleBlock />
      <section className="mx-auto max-w-[1500px] px-5 py-6 md:px-8">
        <header className="grid min-h-[92vh] gap-8 lg:grid-cols-[0.42fr_0.58fr]">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#63716e]">Aotearoa to Edinburgh</p>
              <h1 className="journey-title mt-7 text-[clamp(4rem,11vw,10rem)] leading-[0.78]">Flowers, wings, and fine lines</h1>
            </div>
            <p className="max-w-md text-lg leading-8">
              A working archive of tattoo drawings and gouache studies from a New Zealand-born artist based in Edinburgh.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_0.7fr]">
            <button className="block min-h-[72vh] cursor-zoom-in overflow-hidden rounded-[7px] text-left focus:outline-none focus:ring-2 focus:ring-[#9b5c44] focus:ring-offset-4 focus:ring-offset-[#f7f3ec]" type="button" onClick={() => openArtwork(artwork[9])}>
              <ImageTile item={artwork[9]} className="h-full min-h-[72vh]" />
            </button>
            <div className="grid gap-4">
              <button className="block min-h-[34vh] cursor-zoom-in overflow-hidden rounded-[7px] text-left focus:outline-none focus:ring-2 focus:ring-[#9b5c44] focus:ring-offset-4 focus:ring-offset-[#f7f3ec]" type="button" onClick={() => openArtwork(artwork[0])}>
                <ImageTile item={artwork[0]} className="h-full min-h-[34vh]" />
              </button>
              <button className="block min-h-[34vh] cursor-zoom-in overflow-hidden rounded-[7px] text-left focus:outline-none focus:ring-2 focus:ring-[#9b5c44] focus:ring-offset-4 focus:ring-offset-[#f7f3ec]" type="button" onClick={() => openArtwork(artwork[14])}>
                <ImageTile item={artwork[14]} className="h-full min-h-[34vh]" />
              </button>
            </div>
          </div>
        </header>
        <section className="grid gap-5 border-t border-[#161b1a]/15 py-8 md:grid-cols-4">
          {[
            ["01", "New Zealand", "Native softness, bird forms, and botanical memory."],
            ["02", "Drawing table", "Pencil-weight precision before a needle ever touches skin."],
            ["03", "Edinburgh", "Private appointments, placement-led compositions."],
            ["04", "Collected marks", "Fine-line florals and gouache studies for people who keep looking."]
          ].map(([step, title, copy]) => (
            <article className="border-l border-[#161b1a]/20 pl-4" key={step}>
              <p className="text-xs uppercase tracking-[0.24em] text-[#9b5c44]">{step}</p>
              <h2 className="mt-5 text-2xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#63716e]">{copy}</p>
            </article>
          ))}
        </section>
      </section>
      {activeItem ? (
        <div className="fixed inset-0 z-50 grid bg-[#161b1a]/92 px-4 py-5 text-[#f7f3ec] backdrop-blur md:px-8" role="dialog" aria-modal="true" aria-label="Artwork carousel">
          <div className="mx-auto grid h-full w-full max-w-[1320px] grid-rows-[auto_1fr_auto] gap-4">
            <header className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#d8c3b4]">{activeIndex + 1} / {artwork.length}</p>
                <h2 className="mt-1 text-xl font-semibold">{activeItem.title}</h2>
              </div>
              <button className="rounded-full border border-white/25 px-4 py-2 text-sm uppercase tracking-[0.18em] hover:bg-white hover:text-[#161b1a] focus:outline-none focus:ring-2 focus:ring-white" type="button" onClick={() => setActiveIndex(null)}>
                Close
              </button>
            </header>
            <div className="grid min-h-0 place-items-center">
              <img alt={activeItem.alt} className="max-h-full max-w-full rounded-[7px] object-contain shadow-[0_30px_90px_rgba(0,0,0,0.45)]" src={activeItem.src} />
            </div>
            <footer className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <p className="text-sm text-[#d8c3b4]">{activeItem.medium}</p>
              <div className="flex items-center justify-center gap-3">
                <button className="rounded-full border border-white/25 px-5 py-3 text-sm uppercase tracking-[0.18em] hover:bg-white hover:text-[#161b1a] focus:outline-none focus:ring-2 focus:ring-white" type="button" onClick={showPrevious}>
                  Previous
                </button>
                <button className="rounded-full border border-white/25 px-5 py-3 text-sm uppercase tracking-[0.18em] hover:bg-white hover:text-[#161b1a] focus:outline-none focus:ring-2 focus:ring-white" type="button" onClick={showNext}>
                  Next
                </button>
              </div>
              <div className="hidden justify-end gap-2 md:flex">
                {artwork.map((item, index) => (
                  <button
                    aria-label={"Show " + item.title}
                    className={"h-12 w-10 overflow-hidden rounded-[3px] border " + (index === activeIndex ? "border-white" : "border-white/20 opacity-60")}
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                  >
                    <img alt="" className="h-full w-full object-cover" src={item.src} />
                  </button>
                ))}
              </div>
            </footer>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function StyleBlock() {
  return (
    <style>{`
      .atelier-title { font-family: "Iowan Old Style", "Palatino Linotype", Palatino, serif; font-weight: 500; }
      .flash-title { font-family: Impact, "Arial Black", sans-serif; font-weight: 900; text-transform: uppercase; }
      .gouache-title { font-family: Georgia, "Times New Roman", serif; font-style: italic; font-weight: 500; }
      .ledger-title { font-family: "Avenir Next Condensed", "Arial Narrow", sans-serif; font-weight: 700; text-transform: uppercase; }
      .journey-title { font-family: Baskerville, "Libre Baskerville", Georgia, serif; font-weight: 400; }
      @media (prefers-reduced-motion: no-preference) {
        figure img { will-change: transform; }
      }
    `}</style>
  );
}

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VariantOne />} />
        <Route path="/1" element={<VariantOne />} />
        <Route path="/2" element={<VariantTwo />} />
        <Route path="/3" element={<VariantThree />} />
        <Route path="/4" element={<VariantFour />} />
        <Route path="/5" element={<VariantFive />} />
        <Route path="*" element={<VariantOne />} />
      </Routes>
    </Router>
  );
}
