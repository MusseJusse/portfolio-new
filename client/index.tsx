import { artwork, type Artwork } from "./generatedArtwork";

type WorkSet = {
  label: string;
  items: Artwork[];
};

const sets: WorkSet[] = [
  { label: "Paintings", items: [artwork[8], artwork[9], artwork[17], artwork[18]] },
  { label: "Flash", items: [artwork[0], artwork[6], artwork[7], artwork[10], artwork[12], artwork[13], artwork[15]] },
  { label: "Tattoo work", items: artwork.slice(19, 31) }
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
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
            {[artwork[12], artwork[16], artwork[28]].map((item) => (
              <WorkImage key={item.id} item={item} className="h-[44vh] rounded-[8px] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.45)]" caption />
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
    </main>
  );
}

function StyleBlock() {
  return (
    <style>{`
      .display-serif { font-family: Baskerville, "Libre Baskerville", Georgia, serif; font-weight: 400; letter-spacing: -0.035em; }
      @media (prefers-reduced-motion: no-preference) {
        figure img { will-change: transform; }
      }
    `}</style>
  );
}

export function App() {
  return <HomePage />;
}
