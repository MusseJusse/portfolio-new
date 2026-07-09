import { useEffect, useState } from "preact/hooks";
import { artwork, type Artwork } from "./generatedArtwork";

type ArtworkCollection = {
  id: string;
  label: string;
  items: Artwork[];
};

type WorkSet = {
  label: string;
  items: Artwork[];
};

const artworkCollections: ArtworkCollection[] = [
  {
    id: "paintings",
    label: "Paintings",
    items: [artwork[8], artwork[9], artwork[17], artwork[18]]
  },
  {
    id: "flash-collection",
    label: "Flash collection 1",
    items: [artwork[7], artwork[10], artwork[22]]
  },
  {
    id: "real-work",
    label: "Real work",
    items: [...artwork.slice(19, 22), ...artwork.slice(23, 31)]
  }
];

const sets: WorkSet[] = [
  { label: "Paintings", items: [artwork[8], artwork[9], artwork[17], artwork[18]] },
  { label: "Flash", items: [artwork[0], artwork[6], artwork[7], artwork[10], artwork[12], artwork[13], artwork[15]] },
  { label: "Tattoo work", items: artwork.slice(19, 31) }
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

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

function WorkImage({ item, className = "", caption = false }: { item: Artwork; className?: string; caption?: boolean }) {
  return (
    <figure className={cx("group relative overflow-hidden bg-black/5", className)}>
      <img className="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.035]" src={item.src} alt={item.alt} />
      {caption ? (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4 text-white">
          <p className="text-sm font-semibold">{item.title}</p>
          <p className="mt-1 text-xs text-white/75">{item.medium}</p>
        </figcaption>
      ) : null}
    </figure>
  );
}

function HomePage() {
  const [activeCollectionIndex, setActiveCollectionIndex] = useState<number | null>(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const activeCollection = activeCollectionIndex === null ? null : artworkCollections[activeCollectionIndex];
  const activeItem = activeCollection ? activeCollection.items[activeItemIndex] : null;

  useEffect(() => {
    if (!activeItem) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [activeItem]);

  function openCollection(collectionIndex: number, item: Artwork) {
    const collection = artworkCollections[collectionIndex];
    const nextIndex = collection.items.findIndex((candidate) => candidate.id === item.id);
    setActiveCollectionIndex(collectionIndex);
    setActiveItemIndex(nextIndex >= 0 ? nextIndex : 0);
  }

  function showPrevious() {
    if (!activeCollection) return;
    setActiveItemIndex((current) => (current + activeCollection.items.length - 1) % activeCollection.items.length);
  }

  function showNext() {
    if (!activeCollection) return;
    setActiveItemIndex((current) => (current + 1) % activeCollection.items.length);
  }

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#161b1a]">
      <StyleBlock />
      <section className="mx-auto max-w-[1500px] px-5 py-6 md:px-8">
        <header className="mb-6 grid min-h-[92vh] gap-8 lg:grid-cols-[minmax(650px,0.42fr)_minmax(0,1fr)]">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#63716e]">Aotearoa to Edinburgh</p>
              <h1 className="journey-title mt-7 text-[clamp(4rem,11vw,10rem)] leading-[0.78]">Fauna, feathers, and fine lines</h1>
            </div>
            <div className="mt-10 max-w-md lg:mt-0">
              <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#9b5c44]">Ruby Smythe</p>
                <a className="inline-grid h-8 w-8 place-items-center rounded-full border border-[#161b1a]/15 text-[#63716e] transition hover:border-[#9b5c44] hover:text-[#9b5c44] focus:outline-none focus:ring-2 focus:ring-[#9b5c44] focus:ring-offset-4 focus:ring-offset-[#f7f3ec]" href="https://www.instagram.com/byrubydesigns" target="_blank" rel="noreferrer" aria-label="Ruby Smythe on Instagram, byrubydesigns">
                  <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" stroke-width="1.8" />
                    <circle cx="12" cy="12" r="3.4" stroke="currentColor" stroke-width="1.8" />
                    <circle cx="17" cy="7" r="1.1" fill="currentColor" />
                  </svg>
                </a>
              </div>
              <p className="text-lg leading-8">
                A working archive of tattoo drawings and gouache studies from Ruby Smythe, a New Zealand-born artist based in Edinburgh.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_0.7fr]">
            <button className="tap-target block min-h-[72vh] cursor-zoom-in overflow-hidden rounded-[7px] text-left focus:outline-none focus:ring-2 focus:ring-[#9b5c44] focus:ring-offset-4 focus:ring-offset-[#f7f3ec]" type="button" onClick={() => openCollection(0, artwork[9])}>
              <ImageTile item={artwork[9]} className="h-full min-h-[72vh]" />
            </button>
            <div className="grid gap-4">
              <button className="tap-target block min-h-[34vh] cursor-zoom-in overflow-hidden rounded-[7px] text-left focus:outline-none focus:ring-2 focus:ring-[#9b5c44] focus:ring-offset-4 focus:ring-offset-[#f7f3ec]" type="button" onClick={() => openCollection(1, artwork[7])}>
                <ImageTile item={artwork[7]} className="h-full min-h-[34vh]" />
              </button>
              <button className="tap-target block min-h-[34vh] cursor-zoom-in overflow-hidden rounded-[7px] text-left focus:outline-none focus:ring-2 focus:ring-[#9b5c44] focus:ring-offset-4 focus:ring-offset-[#f7f3ec]" type="button" onClick={() => openCollection(2, artwork[29])}>
                <ImageTile item={artwork[29]} className="h-full min-h-[34vh]" />
              </button>
            </div>
          </div>
        </header>
        <section className="grid gap-5 border-t border-[#161b1a]/15 py-8 md:grid-cols-4">
          {[
            ["01", "New Zealand", "Native softness, bird forms, and botanical memory."],
            ["02", "Edinburgh", "Private appointments, placement-led compositions."],
            ["03", "Expertise", "Creating bespoke pieces inspired by all corners of the natural world."],
            ["04", "Inkdependent Studio", "Tattoo studio in Haymarket, Edinburgh. Taking private appointments and walk-ins."]
          ].map(([step, title, copy]) => (
            <article className="border-l border-[#161b1a]/20 pl-4" key={step}>
              <p className="text-xs uppercase tracking-[0.24em] text-[#9b5c44]">{step}</p>
              <h2 className="mt-5 text-2xl font-semibold">
                {step === "04" ? (
                  <a className="transition hover:text-[#9b5c44] focus:outline-none focus:ring-2 focus:ring-[#9b5c44] focus:ring-offset-4 focus:ring-offset-[#f7f3ec]" href="https://inkdependent.eu/" target="_blank" rel="noreferrer">
                    {title}
                  </a>
                ) : (
                  title
                )}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#63716e]">{copy}</p>
            </article>
          ))}
        </section>
      </section>
      {activeItem ? (
        <div className="fixed inset-0 z-50 grid bg-[#161b1a]/92 px-4 py-5 text-[#f7f3ec] backdrop-blur md:px-8" role="dialog" aria-modal="true" aria-label="Artwork carousel">
          <div className="mx-auto grid h-[calc(100dvh-2.5rem)] w-full max-w-[1320px] grid-rows-[auto_minmax(0,1fr)_auto] gap-4">
            <header className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#d8c3b4]">{activeCollection?.label} / {activeItemIndex + 1} / {activeCollection?.items.length}</p>
                <h2 className="mt-1 text-xl font-semibold">{activeItem.title}</h2>
              </div>
              <button className="tap-target rounded-full border border-white/25 px-4 py-2 text-sm uppercase tracking-[0.18em] hover:bg-white hover:text-[#161b1a] focus:outline-none focus:ring-2 focus:ring-white" type="button" onClick={() => setActiveCollectionIndex(null)}>
                Close
              </button>
            </header>
            <div className="grid min-h-0 place-items-center overflow-hidden">
              <img alt={activeItem.alt} className="max-h-[76vh] max-w-full rounded-[7px] object-contain shadow-[0_30px_90px_rgba(0,0,0,0.45)]" src={activeItem.src} />
            </div>
            <footer className="grid shrink-0 gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <p className="text-sm text-[#d8c3b4]">{activeItem.medium}</p>
              <div className="flex items-center justify-center gap-3">
                <button className="tap-target rounded-full border border-white/25 px-5 py-3 text-sm uppercase tracking-[0.18em] hover:bg-white hover:text-[#161b1a] focus:outline-none focus:ring-2 focus:ring-white" type="button" onClick={showPrevious}>
                  Previous
                </button>
                <button className="tap-target rounded-full border border-white/25 px-5 py-3 text-sm uppercase tracking-[0.18em] hover:bg-white hover:text-[#161b1a] focus:outline-none focus:ring-2 focus:ring-white" type="button" onClick={showNext}>
                  Next
                </button>
              </div>
              <div className="hidden justify-end gap-2 md:flex">
                {activeCollection?.items.map((item, index) => (
                  <button
                    aria-label={"Show " + item.title}
                    className={"tap-target h-12 w-10 overflow-hidden rounded-[3px] border " + (index === activeItemIndex ? "border-white" : "border-white/20 opacity-60")}
                    key={item.id}
                    type="button"
                    onClick={() => setActiveItemIndex(index)}
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

function DarkPortfolioPage() {
  const featuredItems = [artwork[23], artwork[26], artwork[29]];
  const [activeItem, setActiveItem] = useState<Artwork | null>(null);

  useEffect(() => {
    if (!activeItem) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem]);

  return (
    <main className="min-h-screen bg-[#080806] text-[#f7f0df]">
      <StyleBlock />
      <section className="relative isolate min-h-screen overflow-hidden px-5 py-24 md:px-10">
        <img className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45" src={artwork[9].src} alt="" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,rgba(248,217,160,0.22),transparent_32%),linear-gradient(90deg,rgba(8,8,6,0.98),rgba(8,8,6,0.55),rgba(8,8,6,0.88))]" />
        <div className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1500px] items-end gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#e6bd78]">Private tattoo appointments</p>
            <h1 className="display-serif mt-7 text-[clamp(4rem,12vw,12rem)] leading-[0.78]">Ink, bloom, omen.</h1>
          </div>
          <div className="grid gap-5 self-end md:grid-cols-3">
            {featuredItems.map((item) => (
              <button
                aria-label={"View full image of " + item.title}
                className="tap-target block cursor-zoom-in overflow-hidden rounded-[8px] border border-white/10 text-left shadow-[0_30px_90px_rgba(0,0,0,0.45)] transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#e6bd78] focus:ring-offset-4 focus:ring-offset-[#080806] active:scale-[0.985]"
                key={item.id}
                type="button"
                onClick={() => setActiveItem(item)}
              >
                <WorkImage item={item} className="h-[44vh]" caption />
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1500px] gap-6 border-t border-white/10 px-5 py-14 md:grid-cols-3 md:px-10">
        {sets.map((set) => (
          <article className="border-l border-white/15 pl-5" key={set.label}>
            <p className="text-xs uppercase tracking-[0.28em] text-[#e6bd78]">{set.label}</p>
            <p className="mt-5 text-3xl leading-tight">{set.items.length} studies for skin, paper, and placement.</p>
          </article>
        ))}
      </section>
      {activeItem ? (
        <div
          className="lightbox-enter fixed inset-0 z-50 grid bg-[#080806]/94 px-4 py-5 text-[#f7f0df] backdrop-blur-md md:px-8"
          role="dialog"
          aria-modal="true"
          aria-label={"Full image of " + activeItem.title}
          onClick={() => setActiveItem(null)}
        >
          <div className="mx-auto grid h-[calc(100dvh-2.5rem)] w-full max-w-[1280px] grid-rows-[auto_minmax(0,1fr)_auto] gap-4">
            <header className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#e6bd78]">Selected work</p>
                <h2 className="mt-1 text-xl font-semibold">{activeItem.title}</h2>
              </div>
              <button
                className="tap-target rounded-full border border-white/25 px-4 py-2 text-sm uppercase tracking-[0.18em] transition hover:bg-[#f7f0df] hover:text-[#080806] focus:outline-none focus:ring-2 focus:ring-[#f7f0df] active:scale-[0.97]"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveItem(null);
                }}
              >
                Close
              </button>
            </header>
            <div className="grid min-h-0 place-items-center overflow-hidden" onClick={(event) => event.stopPropagation()}>
              <img
                alt={activeItem.alt}
                className="max-h-[78vh] max-w-full rounded-[8px] object-contain shadow-[0_32px_110px_rgba(0,0,0,0.58)]"
                src={activeItem.src}
              />
            </div>
            <footer className="text-sm text-[#e9d2a9]">{activeItem.medium}</footer>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function StyleBlock() {
  return (
    <style>{`
      .journey-title, .display-serif { font-family: Baskerville, "Libre Baskerville", Georgia, serif; font-weight: 400; }
      .display-serif { letter-spacing: -0.035em; }
      .tap-target { touch-action: manipulation; user-select: none; -webkit-user-select: none; }
      @media (prefers-reduced-motion: no-preference) {
        figure img { will-change: transform; }
        .lightbox-enter { animation: lightbox-fade 180ms cubic-bezier(0.23, 1, 0.32, 1); }
        .lightbox-enter img { animation: lightbox-image 220ms cubic-bezier(0.23, 1, 0.32, 1); }
      }
      @keyframes lightbox-fade {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes lightbox-image {
        from { opacity: 0; transform: scale(0.96); }
        to { opacity: 1; transform: scale(1); }
      }
    `}</style>
  );
}

export function App() {
  return window.location.pathname === "/2" ? <DarkPortfolioPage /> : <HomePage />;
}
