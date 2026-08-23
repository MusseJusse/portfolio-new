import { Route, Router, Routes } from "lakebed/client";
import { useEffect, useRef, useState } from "preact/hooks";
import { artwork, type Artwork } from "./generatedArtwork";
import rubyBrandIconSource from "./rubyBrandIcon";
import tiktokSansSource from "./tiktokSansFont";

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

const finishedTattooItems = artwork.filter((item) => item.medium === "Finished tattoo");
const paintingItems = artwork.filter((item) => item.medium.includes("Gouache"));
const flashItems = artwork.filter((item) => item.medium !== "Finished tattoo" && !item.medium.includes("Gouache"));

const sets: WorkSet[] = [
  { label: "Paintings", items: paintingItems },
  { label: "Flash", items: flashItems },
  { label: "Tattoo work", items: finishedTattooItems }
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function lockDocumentScroll() {
  const previousBodyOverflow = document.body.style.overflow;
  const previousBodyPaddingRight = document.body.style.paddingRight;
  const previousHtmlOverflow = document.documentElement.style.overflow;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";

  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  return () => {
    document.body.style.overflow = previousBodyOverflow;
    document.body.style.paddingRight = previousBodyPaddingRight;
    document.documentElement.style.overflow = previousHtmlOverflow;
  };
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

    const unlockDocumentScroll = lockDocumentScroll();

    return () => {
      unlockDocumentScroll();
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
  const [selectedSetIndex, setSelectedSetIndex] = useState(0);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState({ scale: 1, x: 0, y: 0 });
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const zoomGestureRef = useRef<
    | {
        mode: "pinch";
        distance: number;
        centerX: number;
        centerY: number;
        scale: number;
        x: number;
        y: number;
      }
    | {
        mode: "pan";
        x: number;
        y: number;
        translateX: number;
        translateY: number;
      }
    | null
  >(null);
  const ignoreNextClickRef = useRef(false);
  const selectedSet = sets[selectedSetIndex];
  const activeItem = activeItemIndex === null ? null : selectedSet.items[activeItemIndex];

  useEffect(() => {
    document.documentElement.classList.add("dark-portfolio-root");
    document.body.classList.add("dark-portfolio-root");

    return () => {
      document.documentElement.classList.remove("dark-portfolio-root");
      document.body.classList.remove("dark-portfolio-root");
    };
  }, []);

  useEffect(() => {
    if (!activeItem) return;

    const unlockDocumentScroll = lockDocumentScroll();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveItemIndex(null);
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      unlockDocumentScroll();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem]);

  useEffect(() => {
    setLightboxZoom({ scale: 1, x: 0, y: 0 });
    zoomGestureRef.current = null;
  }, [activeItem?.id]);

  function openFeaturedWork(item: Artwork) {
    const finishedSetIndex = sets.findIndex((set) => set.items.some((candidate) => candidate.id === item.id));
    const nextSetIndex = finishedSetIndex >= 0 ? finishedSetIndex : selectedSetIndex;
    const nextSet = sets[nextSetIndex];
    const nextIndex = nextSet.items.findIndex((candidate) => candidate.id === item.id);
    setSelectedSetIndex(nextSetIndex);
    setActiveItemIndex(nextIndex >= 0 ? nextIndex : 0);
  }

  function showPrevious() {
    setActiveItemIndex((current) => {
      if (current === null) return current;
      return (current + selectedSet.items.length - 1) % selectedSet.items.length;
    });
  }

  function showNext() {
    setActiveItemIndex((current) => {
      if (current === null) return current;
      return (current + 1) % selectedSet.items.length;
    });
  }

  function selectSet(nextSetIndex: number) {
    setSelectedSetIndex(nextSetIndex);
    setActiveItemIndex(0);
  }

  function getTouchDistance(first: Touch, second: Touch) {
    return Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY);
  }

  function getTouchCenter(first: Touch, second: Touch) {
    return {
      x: (first.clientX + second.clientX) / 2,
      y: (first.clientY + second.clientY) / 2
    };
  }

  function clampZoom(scale: number) {
    return Math.min(4, Math.max(1, scale));
  }

  function clampLightboxPan(scale: number, x: number, y: number) {
    const maxX = (window.innerWidth * (scale - 1)) / 2;
    const maxY = (window.innerHeight * (scale - 1)) / 2;

    return {
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y))
    };
  }

  function handleLightboxTouchStart(event: TouchEvent) {
    if (event.touches.length === 2) {
      const first = event.touches[0];
      const second = event.touches[1];
      const center = getTouchCenter(first, second);

      event.preventDefault();
      event.stopPropagation();
      touchStartRef.current = null;
      zoomGestureRef.current = {
        mode: "pinch",
        distance: getTouchDistance(first, second),
        centerX: center.x,
        centerY: center.y,
        scale: lightboxZoom.scale,
        x: lightboxZoom.x,
        y: lightboxZoom.y
      };
      return;
    }

    const touch = event.touches[0];
    if (!touch) return;

    if (lightboxZoom.scale > 1) {
      event.preventDefault();
      event.stopPropagation();
      touchStartRef.current = null;
      zoomGestureRef.current = {
        mode: "pan",
        x: touch.clientX,
        y: touch.clientY,
        translateX: lightboxZoom.x,
        translateY: lightboxZoom.y
      };
      return;
    }

    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleLightboxTouchMove(event: TouchEvent) {
    const gesture = zoomGestureRef.current;
    if (!gesture) return;

    event.preventDefault();
    event.stopPropagation();
    ignoreNextClickRef.current = true;

    if (gesture.mode === "pinch" && event.touches.length >= 2) {
      const first = event.touches[0];
      const second = event.touches[1];
      const center = getTouchCenter(first, second);
      const nextScale = clampZoom((gesture.scale * getTouchDistance(first, second)) / gesture.distance);
      const nextPan = clampLightboxPan(nextScale, gesture.x + (center.x - gesture.centerX), gesture.y + (center.y - gesture.centerY));

      setLightboxZoom({
        scale: nextScale,
        x: nextPan.x,
        y: nextPan.y
      });
      return;
    }

    if (gesture.mode === "pan" && event.touches.length === 1) {
      const touch = event.touches[0];
      const nextPan = clampLightboxPan(lightboxZoom.scale, gesture.translateX + touch.clientX - gesture.x, gesture.translateY + touch.clientY - gesture.y);

      setLightboxZoom({
        scale: lightboxZoom.scale,
        x: nextPan.x,
        y: nextPan.y
      });
    }
  }

  function handleLightboxTouchEnd(event: TouchEvent) {
    if (zoomGestureRef.current) {
      event.preventDefault();
      event.stopPropagation();
      zoomGestureRef.current = null;

      setLightboxZoom((current) => {
        if (current.scale <= 1.02) return { scale: 1, x: 0, y: 0 };

        const nextPan = clampLightboxPan(current.scale, current.x, current.y);
        return { ...current, x: nextPan.x, y: nextPan.y };
      });
      return;
    }

    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    touchStartRef.current = null;

    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const isHorizontalSwipe = Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4;

    if (!isHorizontalSwipe) return;

    ignoreNextClickRef.current = true;
    event.preventDefault();
    event.stopPropagation();

    if (deltaX < 0) {
      showNext();
    } else {
      showPrevious();
    }
  }

  function closeLightboxFromBackdrop() {
    if (ignoreNextClickRef.current) {
      ignoreNextClickRef.current = false;
      return;
    }

    setActiveItemIndex(null);
  }

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
                onClick={() => openFeaturedWork(item)}
              >
                <WorkImage item={item} className="h-[44vh]" caption />
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1500px] border-t border-white/10 px-5 py-14 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {sets.map((set, index) => (
            <button
              aria-label={"Open " + set.label + " collection"}
              className="tap-target group border-l border-white/15 pl-5 text-left transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[#e6bd78] focus:outline-none focus:ring-2 focus:ring-[#e6bd78] focus:ring-offset-4 focus:ring-offset-[#080806] active:scale-[0.985]"
              key={set.label}
              type="button"
              onClick={() => selectSet(index)}
            >
              <p className="text-xs uppercase tracking-[0.28em] text-[#e6bd78]">{set.label}</p>
              <p className="mt-5 text-3xl leading-tight">{set.items.length} studies for skin, paper, and placement.</p>
            </button>
          ))}
        </div>
      </section>
      {activeItem ? (
        <div
          className="lightbox-enter fixed inset-0 z-50 grid cursor-grab bg-[#0a0a08]/72 text-[#f7f0df] backdrop-blur-[2px] md:px-8 md:py-4"
          role="dialog"
          aria-modal="true"
          aria-label={"Full image of " + activeItem.title}
          onClick={closeLightboxFromBackdrop}
        >
          <div className="relative mx-auto grid h-dvh w-full max-w-[1500px] place-items-center md:h-[calc(100dvh-2rem)]">
            <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-4 p-3 md:p-0">
              <div className="pointer-events-auto px-1 py-1 text-sm font-semibold tabular-nums text-[#f7f0df] drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] md:text-base">
                {(activeItemIndex ?? 0) + 1}/{selectedSet.items.length}
              </div>
              <button
                aria-label="Close image"
                className="pointer-events-auto tap-target grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-black/35 text-[#f7f0df]/85 shadow-[0_10px_40px_rgba(0,0,0,0.28)] ring-1 ring-white/10 backdrop-blur-md transition-[background-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#f7f0df] hover:text-[#080806] focus:outline-none focus:ring-2 focus:ring-[#f7f0df] active:scale-[0.94]"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveItemIndex(null);
                }}
              >
                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                </svg>
              </button>
            </header>
            <div
              className="absolute inset-0 z-10 grid touch-none place-items-center overflow-hidden md:px-20"
              onClick={closeLightboxFromBackdrop}
              onTouchStart={handleLightboxTouchStart}
              onTouchMove={handleLightboxTouchMove}
              onTouchEnd={handleLightboxTouchEnd}
            >
              <img
                alt={activeItem.alt}
                className="lightbox-image h-auto max-h-full w-full cursor-default select-none object-contain shadow-[0_42px_140px_rgba(0,0,0,0.7)] md:max-h-[86dvh] md:w-auto md:max-w-full"
                src={activeItem.src}
                style={{
                  transform: `translate3d(${lightboxZoom.x}px, ${lightboxZoom.y}px, 0) scale(${lightboxZoom.scale})`,
                  transformOrigin: "center",
                  transition: zoomGestureRef.current ? "none" : "transform 160ms cubic-bezier(0.23, 1, 0.32, 1)"
                }}
                onClick={(event) => event.stopPropagation()}
              />
            </div>
            <button
              aria-label="Show previous image"
              className="tap-target group absolute bottom-0 left-0 top-0 z-20 grid w-10 cursor-pointer place-items-center text-[#f7f0df]/80 transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-[#f7f0df] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#f7f0df] md:w-14"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
            >
              <svg aria-hidden="true" className="h-9 w-9 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-active:scale-[0.9]" viewBox="0 0 24 24" fill="none">
                <path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <button
              aria-label="Show next image"
              className="tap-target group absolute bottom-0 right-0 top-0 z-20 grid w-10 cursor-pointer place-items-center text-[#f7f0df]/80 transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-[#f7f0df] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#f7f0df] md:w-14"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
            >
              <svg aria-hidden="true" className="h-9 w-9 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-active:scale-[0.9]" viewBox="0 0 24 24" fill="none">
                <path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center px-12">
              <div className="pointer-events-auto hidden max-w-full cursor-default items-center gap-2 overflow-x-auto rounded-full bg-black/35 px-3 py-2 shadow-[0_12px_46px_rgba(0,0,0,0.35)] ring-1 ring-white/10 backdrop-blur-md md:flex" onClick={(event) => event.stopPropagation()}>
                {selectedSet.items.map((item, index) => (
                  <button
                    aria-label={"Show " + item.title}
                    className={cx(
                      "tap-target h-11 w-9 shrink-0 overflow-hidden rounded-[3px] transition-[opacity,transform,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus:outline-none focus:ring-2 focus:ring-[#e6bd78] active:scale-[0.94]",
                      index === activeItemIndex ? "opacity-100 shadow-[0_0_0_2px_#e6bd78]" : "opacity-45 hover:opacity-85"
                    )}
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

type GalleryArtwork = {
  fileName: string;
  src: string;
  title: string;
  aspectRatio: string;
  year?: 2022 | 2026;
};

type GalleryCategoryId = "tattoo" | "drawings" | "paintings";

type GalleryCategory = {
  id: GalleryCategoryId;
  label: string;
  items: GalleryArtwork[];
};

const tattooArtworkSource: ReadonlyArray<{ fileName: string; title?: string; aspectRatio?: string }> = [
  { fileName: "IMG_6601.webp", title: "Tattoo 13" },
  { fileName: "IMG_3554.webp", title: "Tattoo 12" },
  { fileName: "IMG_3112.webp", title: "Tattoo 11" },
  { fileName: "IMG_2526.webp", title: "Tattoo 10" },
  { fileName: "IMG_2522.webp", title: "Tattoo 09" },
  { fileName: "IMG_2233.webp", title: "Tattoo 08" },
  { fileName: "IMG_1356.webp", title: "Tattoo 07" },
  { fileName: "IMG_1220.webp", title: "Tattoo 06" },
  { fileName: "IMG_1163.webp", title: "Tattoo 05", aspectRatio: "2 / 3" },
  { fileName: "IMG_0545.webp", title: "Tattoo 04", aspectRatio: "1 / 1" },
  { fileName: "IMG_0502.webp", title: "Tattoo 03", aspectRatio: "2 / 3" },
  { fileName: "7 kererū.webp", title: "Kererū" },
  { fileName: "1 floral forearm piece.webp", title: "Floral Forearm" }
];

const tattooArtwork = tattooArtworkSource.map(({ fileName, title, aspectRatio }, index) => ({
  fileName,
  src: `https://raw.githubusercontent.com/MusseJusse/portfolio-new/master/client/assets/tattoo/${encodeURIComponent(fileName)}`,
  title: title ?? `Artwork No. ${String(index + 1).padStart(2, "0")}`,
  aspectRatio: aspectRatio ?? "3 / 4"
}));

const drawingAspectRatios = [
  "3 / 4", "3 / 4", "4 / 5", "3 / 4", "3 / 4", "3 / 4", "4 / 5", "3 / 4", "4 / 5", "3 / 4",
  "3 / 4", "3 / 4", "3 / 4", "3 / 4", "3 / 4", "3 / 4", "3 / 4", "3 / 4", "3 / 4", "3 / 4",
  "3 / 4", "3 / 4", "3 / 4", "3 / 4", "1800 / 1546", "1 / 1", "1 / 1", "4 / 5"
] as const;

const drawingArtwork = drawingAspectRatios.map((aspectRatio, index) => {
  const itemNumber = String(index + 1).padStart(2, "0");
  const fileName = `drawing-${itemNumber}.webp`;

  return {
    fileName,
    src: `https://raw.githubusercontent.com/MusseJusse/portfolio-new/master/client/assets/handdrawn%20flash/web/${fileName}`,
    title: `Drawing ${itemNumber}`,
    aspectRatio
  };
});

const paintingArtworkSource = [
  { title: "Painting 01", aspectRatio: "1273 / 1800", year: 2026 },
  { title: "Painting 02", aspectRatio: "1044 / 1501", year: 2026 },
  { title: "Painting 03", aspectRatio: "1055 / 1510", year: 2026 },
  { title: "Kererū", aspectRatio: "1 / 1", year: 2022 },
  { title: "Kākā", aspectRatio: "1 / 1", year: 2022 },
  { title: "Tūī", aspectRatio: "1 / 1", year: 2022 },
  { title: "Bird studies", aspectRatio: "1800 / 1273", year: 2022 }
] as const;

const paintingArtwork = paintingArtworkSource.map(({ title, aspectRatio, year }, index) => {
  const itemNumber = String(index + 1).padStart(2, "0");
  const fileName = `painting-${itemNumber}.webp`;

  return {
    fileName,
    src: `https://raw.githubusercontent.com/MusseJusse/portfolio-new/master/client/assets/painting/web/${fileName}`,
    title,
    aspectRatio,
    year
  };
});

const galleryCategories: GalleryCategory[] = [
  { id: "tattoo", label: "Tattoo", items: tattooArtwork },
  { id: "drawings", label: "Drawings", items: drawingArtwork },
  { id: "paintings", label: "Paintings", items: paintingArtwork }
];

const soniaLaiLogoSource = rubyBrandIconSource;

function SoniaInspiredPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<GalleryCategoryId>("tattoo");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const galleryItemRefs = useRef<Array<HTMLElement | null>>([]);
  const paintingYearDividerRef = useRef<HTMLHeadingElement | null>(null);
  const selectedCategory = galleryCategories.find((category) => category.id === selectedCategoryId) ?? galleryCategories[0];
  const soniaInspiredArtwork = selectedCategory.items;
  const paintingYearBreakIndex = soniaInspiredArtwork.findIndex((item) => item.year === 2022);

  function showPrevious() {
    setActiveIndex((current) => (current === null ? current : (current + soniaInspiredArtwork.length - 1) % soniaInspiredArtwork.length));
  }

  function showNext() {
    setActiveIndex((current) => (current === null ? current : (current + 1) % soniaInspiredArtwork.length));
  }

  useEffect(() => {
    document.documentElement.classList.add("sonia-inspired-root");
    document.body.classList.add("sonia-inspired-root");

    return () => {
      document.documentElement.classList.remove("sonia-inspired-root");
      document.body.classList.remove("sonia-inspired-root");
    };
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const unlockDocumentScroll = lockDocumentScroll();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      unlockDocumentScroll();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const unlockDocumentScroll = lockDocumentScroll();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      setMobileMenuOpen(false);
      mobileMenuButtonRef.current?.focus();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      unlockDocumentScroll();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    gallery.classList.remove("is-ready");
    let layoutFrame = 0;

    function scheduleLayout() {
      cancelAnimationFrame(layoutFrame);
      layoutFrame = requestAnimationFrame(() => {
        const items = galleryItemRefs.current.filter((item): item is HTMLElement => item !== null);
        const isMobile = window.innerWidth <= 640;
        const columnCount = window.innerWidth >= 900 ? 3 : 2;
        const horizontalGap = isMobile ? 2 : 11;
        const verticalGap = 28;
        const itemWidth = (gallery.clientWidth - horizontalGap * (columnCount - 1)) / columnCount;

        items.forEach((item) => {
          item.style.width = `${itemWidth}px`;
        });

        function layoutItems(group: HTMLElement[], startY: number) {
          const columnHeights = Array.from({ length: columnCount }, () => startY);

          group.forEach((item, index) => {
            const columnIndex = index % columnCount;
            const x = columnIndex * (itemWidth + horizontalGap);
            const y = columnHeights[columnIndex];

            item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            columnHeights[columnIndex] = y + item.offsetHeight + verticalGap;
          });

          return Math.max(...columnHeights) - verticalGap;
        }

        const yearDivider = paintingYearDividerRef.current;
        let galleryBottom: number;

        if (yearDivider && paintingYearBreakIndex > 0) {
          const firstYearBottom = layoutItems(items.slice(0, paintingYearBreakIndex), 0);
          const dividerY = firstYearBottom + (isMobile ? 48 : 64);
          const viewportWidth = document.documentElement.clientWidth;
          const dividerPageInset = viewportWidth * 0.0405;
          const dividerX = dividerPageInset - gallery.getBoundingClientRect().left;

          yearDivider.style.width = `${viewportWidth - dividerPageInset * 2}px`;
          yearDivider.style.transform = `translate3d(${dividerX}px, ${dividerY}px, 0)`;

          const secondYearStart = dividerY + yearDivider.offsetHeight + (isMobile ? 24 : 32);
          galleryBottom = layoutItems(items.slice(paintingYearBreakIndex), secondYearStart);
        } else {
          galleryBottom = layoutItems(items, 0);
        }

        gallery.style.height = `${galleryBottom}px`;
        gallery.classList.add("is-ready");
      });
    }

    const resizeObserver = new ResizeObserver(scheduleLayout);
    resizeObserver.observe(gallery);
    galleryItemRefs.current.forEach((item) => {
      if (item) resizeObserver.observe(item);
    });
    if (paintingYearDividerRef.current) resizeObserver.observe(paintingYearDividerRef.current);
    scheduleLayout();

    return () => {
      cancelAnimationFrame(layoutFrame);
      resizeObserver.disconnect();
    };
  }, [selectedCategoryId]);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  function selectCategory(categoryId: GalleryCategoryId) {
    if (categoryId === selectedCategoryId) return;

    galleryRef.current?.classList.remove("is-ready");
    setActiveIndex(null);
    setSelectedCategoryId(categoryId);
    galleryItemRefs.current = [];
  }

  return (
    <main id="top" className="min-h-screen bg-white text-[#191919]">
      <StyleBlock />
      <header className="sonia-header relative" aria-label="Primary">
        <button
          ref={mobileMenuButtonRef}
          className={cx("sonia-menu-button", mobileMenuOpen && "is-open")}
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="sonia-mobile-menu"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className="sonia-socials" role="group" aria-label="Social links">
          <a href="https://www.instagram.com/byrubydesigns" target="_blank" rel="noreferrer" aria-label="Ruby Smythe on Instagram">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" stroke-width="1.8" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8" />
              <circle cx="17.4" cy="6.8" r="1.15" fill="currentColor" />
            </svg>
          </a>
          <a href="https://inkdependent.eu/" target="_blank" rel="noreferrer" aria-label="Inkdependent Studio">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <path d="M4 10.5 12 4l8 6.5V20H4v-9.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
              <path d="M9.5 20v-6h5v6" stroke="currentColor" stroke-width="1.7" />
            </svg>
          </a>
        </div>

        <div className="sonia-brand">
          <a className="sonia-brand-mark" href="#top" aria-label="Ruby Smythe, back to top">
            <span className="sonia-brand-image">
              <img src={soniaLaiLogoSource} alt="" />
            </span>
            <span className="sonia-brand-name">ruby smythe</span>
            <span className="sonia-brand-subtitle">tattoo, painting &amp; drawing</span>
          </a>
          <nav className="sonia-main-nav" aria-label="Portfolio sections">
            {galleryCategories.map((category) => (
              <button
                className={cx(category.id === selectedCategoryId && "active")}
                key={category.id}
                type="button"
                aria-pressed={category.id === selectedCategoryId}
                onClick={() => selectCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
            <a href="https://inkdependent.eu/" target="_blank" rel="noreferrer">Purchase</a>
            <a href="#about">About</a>
          </nav>
        </div>

        <div
          id="sonia-mobile-menu"
          className={cx("sonia-mobile-menu", mobileMenuOpen && "is-open")}
          role="dialog"
          aria-modal={mobileMenuOpen}
          aria-hidden={!mobileMenuOpen}
          aria-label="Site menu"
        >
          <nav className="sonia-mobile-nav" aria-label="Portfolio sections">
            {galleryCategories.map((category) => (
              <button
                className={cx(category.id === selectedCategoryId && "active")}
                key={category.id}
                type="button"
                tabIndex={mobileMenuOpen ? 0 : -1}
                aria-pressed={category.id === selectedCategoryId}
                onClick={() => {
                  selectCategory(category.id);
                  closeMobileMenu();
                  mobileMenuButtonRef.current?.focus();
                }}
              >
                {category.label}
              </button>
            ))}
            <a href="https://inkdependent.eu/" target="_blank" rel="noreferrer" tabIndex={mobileMenuOpen ? 0 : -1} onClick={closeMobileMenu}>Purchase</a>
            <a href="#about" tabIndex={mobileMenuOpen ? 0 : -1} onClick={closeMobileMenu}>About</a>
          </nav>
          <div className="sonia-mobile-socials" role="group" aria-label="Social links">
            <a href="https://www.instagram.com/byrubydesigns" target="_blank" rel="noreferrer" tabIndex={mobileMenuOpen ? 0 : -1} aria-label="Ruby Smythe on Instagram" onClick={closeMobileMenu}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" stroke-width="1.8" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8" />
                <circle cx="17.4" cy="6.8" r="1.15" fill="currentColor" />
              </svg>
            </a>
            <a href="https://inkdependent.eu/" target="_blank" rel="noreferrer" tabIndex={mobileMenuOpen ? 0 : -1} aria-label="Inkdependent Studio" onClick={closeMobileMenu}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="M4 10.5 12 4l8 6.5V20H4v-9.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
                <path d="M9.5 20v-6h5v6" stroke="currentColor" stroke-width="1.7" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <section id="work" className="sonia-gallery" aria-label={`${selectedCategory.label} work`}>
        {selectedCategoryId === "paintings" ? <h2 className="sonia-gallery-year-heading">2026</h2> : null}
        <div className="sonia-gallery-grid" ref={galleryRef}>
          {soniaInspiredArtwork.flatMap((item, itemIndex) => [
            selectedCategoryId === "paintings" && itemIndex === paintingYearBreakIndex ? (
              <h2 className="sonia-gallery-year-divider" key="paintings-2022" ref={paintingYearDividerRef}>2022</h2>
            ) : null,
            (
              <figure
                className="sonia-gallery-item"
                key={item.fileName}
                ref={(element) => {
                  galleryItemRefs.current[itemIndex] = element;
                }}
              >
                <button type="button" onClick={() => setActiveIndex(itemIndex)} aria-label={`View full image of ${item.title}`}>
                  <img src={item.src} alt={`${item.title}, artwork by Ruby Smythe`} loading={itemIndex > 6 ? "lazy" : "eager"} style={{ aspectRatio: item.aspectRatio }} />
                </button>
                <figcaption>{item.title}</figcaption>
              </figure>
            )
          ])}
        </div>
      </section>

      <footer id="about" className="sonia-footer">
        <p>Ruby Smythe is a New Zealand-born painter and tattoo artist based in Edinburgh.</p>
        <a href="https://www.instagram.com/byrubydesigns" target="_blank" rel="noreferrer">@byrubydesigns</a>
      </footer>

      {activeIndex !== null ? (
        <div className="sonia-lightbox" role="dialog" aria-modal="true" aria-label={`Full image of ${soniaInspiredArtwork[activeIndex].title}`} onClick={() => setActiveIndex(null)}>
          <button className="sonia-lightbox-close" type="button" aria-label="Close full image" onClick={() => setActiveIndex(null)}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5 5 19" stroke="currentColor" stroke-width="1.5" /></svg>
          </button>
          <button
            className="sonia-lightbox-arrow sonia-lightbox-previous"
            type="button"
            aria-label="Show previous image"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m15 4-8 8 8 8" stroke="currentColor" stroke-width="1.5" /></svg>
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={soniaInspiredArtwork[activeIndex].src} alt={`${soniaInspiredArtwork[activeIndex].title}, artwork by Ruby Smythe`} />
            <figcaption>{soniaInspiredArtwork[activeIndex].title}</figcaption>
          </figure>
          <button
            className="sonia-lightbox-arrow sonia-lightbox-next"
            type="button"
            aria-label="Show next image"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m9 4 8 8-8 8" stroke="currentColor" stroke-width="1.5" /></svg>
          </button>
        </div>
      ) : null}
    </main>
  );
}

function StyleBlock() {
  return (
    <style>{`
      @font-face {
        font-family: "TikTok Sans Variable";
        src: url("${tiktokSansSource}") format("woff2");
        font-style: oblique 0deg 6deg;
        font-weight: 300 900;
        font-display: swap;
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      .journey-title, .display-serif { font-family: Baskerville, "Libre Baskerville", Georgia, serif; font-weight: 400; }
      .display-serif { letter-spacing: -0.035em; }
      .dark-portfolio-root { background: #080806; overscroll-behavior: none; scrollbar-width: none; }
      .dark-portfolio-root::-webkit-scrollbar { display: none; }
      .sonia-inspired-root { background: #fff; font-family: "TikTok Sans Variable", Arial, sans-serif; font-weight: 400; scroll-behavior: smooth; }
      .sonia-header { min-height: 326px; }
      .sonia-menu-button, .sonia-mobile-menu { display: none; }
      .sonia-socials { position: absolute; top: 146px; left: 4.1%; display: flex; align-items: center; gap: 23px; }
      .sonia-socials a, .sonia-socials span { display: grid; width: 32px; height: 32px; place-items: center; color: #111; transition: color 160ms ease, transform 160ms ease; }
      .sonia-socials a:hover { color: #a64d49; transform: translateY(-2px); }
      .sonia-socials svg { width: 24px; height: 24px; }
      .sonia-brand { position: absolute; top: 49px; left: 50%; display: flex; transform: translateX(-50%); flex-direction: column; align-items: center; }
      .sonia-brand-mark { display: flex; min-width: 230px; flex-direction: column; align-items: center; color: #151515; text-decoration: none; }
      .sonia-brand-image { position: relative; display: block; width: 180px; height: 180px; overflow: hidden; border: 0; border-radius: 0; }
      .sonia-brand-image img { position: absolute; inset: 0; width: 100%; max-width: none; height: 100%; object-fit: contain; }
      .sonia-brand-name { position: relative; margin-top: 12px; font-size: 27px; line-height: 1; letter-spacing: .065em; white-space: nowrap; }
      .sonia-brand-subtitle { margin-top: 5px; color: #b85854; font-family: "TikTok Sans Variable", Arial, sans-serif; font-size: 14px; font-style: oblique 6deg; font-variation-settings: "slnt" -6; line-height: 1; letter-spacing: .04em; }
      .sonia-main-nav { display: flex; gap: 27px; margin-top: 25px; font-size: 16px; }
      .sonia-main-nav a, .sonia-main-nav button { border: 0; padding: 0; background: transparent; color: #303030; font: inherit; text-decoration: none; cursor: pointer; }
      .sonia-main-nav a:hover, .sonia-main-nav button:hover { color: #a64d49; }
      .sonia-main-nav .active { border-bottom: 1px solid currentColor; }
      .sonia-gallery { padding: 48px 16px 44px; background: #fff; }
      .sonia-gallery-grid { position: relative; width: 100%; max-width: 1800px; margin-inline: auto; }
      .sonia-gallery-item { position: absolute; top: 0; left: 0; margin: 0; opacity: 0; }
      .sonia-gallery-year-heading { width: 100%; max-width: 1800px; margin: 0 auto 22px; color: #383838; font-family: Georgia, "Times New Roman", serif; font-size: 14px; font-weight: 400; line-height: 1.25; }
      .sonia-gallery-year-divider { position: absolute; top: 0; left: 0; margin: 0; border-top: 1px solid #dedbd5; padding-top: 18px; color: #383838; font-family: Georgia, "Times New Roman", serif; font-size: 14px; font-weight: 400; line-height: 1.25; opacity: 0; }
      .sonia-gallery-grid.is-ready .sonia-gallery-item, .sonia-gallery-grid.is-ready .sonia-gallery-year-divider { opacity: 1; }
      .sonia-gallery-item button { display: block; width: 100%; overflow: hidden; border: 0; padding: 0; background: #fff; cursor: zoom-in; }
      .sonia-gallery-item img { display: block; width: 100%; height: auto; transition: transform 500ms cubic-bezier(.2,.7,.2,1), filter 300ms ease; }
      .sonia-gallery-item button:hover img { transform: scale(1.018); filter: saturate(1.04); }
      .sonia-gallery-item button:focus-visible { outline: 2px solid #a64d49; outline-offset: 3px; }
      .sonia-gallery-item figcaption { padding-top: 14px; color: #353535; font-family: Georgia, "Times New Roman", serif; font-size: 14px; line-height: 1.25; }
      .sonia-footer { display: flex; justify-content: space-between; gap: 24px; margin: 0 4.05%; border-top: 1px solid #dedbd5; padding: 44px 0 58px; color: #383838; font-size: 12px; line-height: 1.7; }
      .sonia-footer a { color: inherit; text-underline-offset: 4px; }
      .sonia-lightbox { position: fixed; inset: 0; z-index: 80; display: grid; place-items: center; padding: 38px 80px 28px; background: rgba(255,255,255,.96); cursor: zoom-out; animation: sonia-lightbox-in 170ms ease-out; }
      .sonia-lightbox figure { display: grid; max-height: 100%; margin: 0; grid-template-rows: minmax(0, 1fr) auto; gap: 12px; cursor: default; }
      .sonia-lightbox figure img { max-width: min(76vw, 860px); max-height: calc(100dvh - 108px); object-fit: contain; }
      .sonia-lightbox figcaption { color: #333; font-size: 12px; text-align: center; }
      .sonia-lightbox-close, .sonia-lightbox-arrow { position: absolute; display: grid; width: 44px; height: 44px; place-items: center; border: 0; background: transparent; color: #222; cursor: pointer; }
      .sonia-lightbox-close { top: 22px; right: 24px; }
      .sonia-lightbox-arrow { top: 50%; transform: translateY(-50%); }
      .sonia-lightbox-previous { left: 22px; }
      .sonia-lightbox-next { right: 22px; }
      .sonia-lightbox-close svg, .sonia-lightbox-arrow svg { width: 25px; height: 25px; }
      .tap-target { touch-action: manipulation; user-select: none; -webkit-user-select: none; }
      @media (max-width: 640px) {
        .sonia-header { min-height: 232px; }
        .sonia-brand { z-index: 90; top: 30px; }
        .sonia-brand-image { width: 120px; height: 120px; }
        .sonia-brand-name { margin-top: 10px; font-size: 24px; }
        .sonia-socials, .sonia-main-nav { display: none; }
        .sonia-menu-button {
          position: absolute;
          z-index: 100;
          top: 59px;
          left: 19px;
          display: grid;
          width: 52px;
          height: 52px;
          place-content: center;
          gap: 6px;
          border: 0;
          padding: 0;
          background: transparent;
          color: #191919;
          cursor: pointer;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        .sonia-menu-button span {
          display: block;
          width: 34px;
          height: 1px;
          background: currentColor;
          transform-origin: center;
          transition: transform 380ms cubic-bezier(.65,0,.35,1), opacity 240ms ease-in-out;
        }
        .sonia-menu-button.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .sonia-menu-button.is-open span:nth-child(2) { opacity: 0; }
        .sonia-menu-button.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .sonia-menu-button.is-open { position: fixed; }
        .sonia-menu-button:focus-visible { outline: 2px solid #a64d49; outline-offset: 2px; }
        .sonia-mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 80;
          display: grid;
          min-height: 100dvh;
          grid-template-rows: 1fr auto 1fr;
          background: #fff;
          color: #191919;
          opacity: 0;
          pointer-events: none;
          transform: scale(.985);
          transform-origin: 46px 85px;
          visibility: hidden;
          will-change: opacity, transform;
          transition:
            opacity 380ms cubic-bezier(.65,0,.35,1),
            transform 380ms cubic-bezier(.65,0,.35,1),
            visibility 0s linear 380ms;
        }
        .sonia-mobile-menu.is-open {
          opacity: 1;
          pointer-events: auto;
          transform: scale(1);
          visibility: visible;
          transition-delay: 0s;
        }
        .sonia-mobile-nav {
          align-self: center;
          grid-row: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 17px;
          padding-top: 36px;
          font-size: clamp(2.6rem, 12vw, 3.25rem);
          line-height: 1.18;
          letter-spacing: -.025em;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 380ms cubic-bezier(.65,0,.35,1), transform 380ms cubic-bezier(.65,0,.35,1);
        }
        .sonia-mobile-menu.is-open .sonia-mobile-nav { opacity: 1; transform: translateY(0); transition-delay: 45ms; }
        .sonia-mobile-nav a, .sonia-mobile-nav button { border: 0; padding: 0; background: transparent; color: inherit; font: inherit; text-decoration: none; cursor: pointer; }
        .sonia-mobile-nav a:active, .sonia-mobile-nav button:active { transform: scale(.97); }
        .sonia-mobile-nav a:focus-visible, .sonia-mobile-nav button:focus-visible { outline: 2px solid #a64d49; outline-offset: 6px; }
        .sonia-mobile-socials {
          align-self: end;
          grid-row: 3;
          display: flex;
          justify-content: center;
          gap: 21px;
          padding-bottom: max(34px, env(safe-area-inset-bottom));
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 380ms cubic-bezier(.65,0,.35,1), transform 380ms cubic-bezier(.65,0,.35,1);
        }
        .sonia-mobile-menu.is-open .sonia-mobile-socials { opacity: 1; transform: translateY(0); transition-delay: 45ms; }
        .sonia-mobile-socials a {
          display: grid;
          width: 44px;
          height: 44px;
          place-items: center;
          color: inherit;
        }
        .sonia-mobile-socials svg { width: 23px; height: 23px; }
        .sonia-mobile-socials a:active { transform: scale(.92); }
        .sonia-mobile-socials a:focus-visible { outline: 2px solid #a64d49; outline-offset: 2px; }
        .sonia-gallery { padding: 32px 4.05% 86px; }
        .sonia-footer { flex-direction: column; }
        .sonia-lightbox { padding: 64px 42px 28px; }
        .sonia-lightbox figure img { max-width: calc(100vw - 84px); }
        .sonia-lightbox-previous { left: 0; }
        .sonia-lightbox-next { right: 0; }
      }
      @media (prefers-reduced-motion: no-preference) {
        figure img { will-change: transform; }
        .lightbox-enter { animation: lightbox-fade 180ms cubic-bezier(0.23, 1, 0.32, 1); }
        .lightbox-image { animation: lightbox-image 240ms cubic-bezier(0.23, 1, 0.32, 1); }
      }
      @keyframes lightbox-fade {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes lightbox-image {
        from { opacity: 0; transform: scale(0.96); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes sonia-lightbox-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @media (prefers-reduced-motion: reduce) {
        .sonia-menu-button span { transition: none; }
        .sonia-mobile-menu { transform: none; transition: opacity 160ms linear, visibility 0s linear 160ms; }
        .sonia-mobile-menu.is-open { transition-delay: 0s; }
        .sonia-mobile-nav, .sonia-mobile-socials { transform: none; transition: opacity 160ms linear; }
      }
      @media (prefers-reduced-transparency: reduce) {
        .sonia-mobile-menu { background: #fff; }
      }
    `}</style>
  );
}

export function App() {
  useEffect(() => {
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/webp";
    favicon.href = rubyBrandIconSource;
    favicon.dataset.rubyFavicon = "true";
    document.head.appendChild(favicon);

    return () => {
      favicon.remove();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/2" element={<DarkPortfolioPage />} />
        <Route path="/3" element={<SoniaInspiredPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
