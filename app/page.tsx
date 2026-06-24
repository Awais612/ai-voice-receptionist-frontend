import Link from "next/link";

const SERVICES = [
  { icon: "🛢️", title: "Oil Change", desc: "Quick lube & filter, in and out." },
  { icon: "🛑", title: "Brake Work", desc: "Pads, rotors & inspections." },
  { icon: "🔧", title: "Tune-Ups", desc: "Keep her running smooth." },
  { icon: "🔋", title: "Batteries", desc: "Test, charge & replace." },
  { icon: "🛞", title: "Tires", desc: "Rotate, balance & swap." },
  { icon: "⚙️", title: "Diagnostics", desc: "We chase down the noise." },
];

const STEPS = [
  { n: "01", title: "Ring us up", desc: "Hit call and start talking — no menus, no hold music." },
  { n: "02", title: "Tell Ava", desc: "Your name, your vehicle, the service you need." },
  { n: "03", title: "Get booked", desc: "Ava checks the calendar and locks in your slot." },
];

// Tiles for the brutalist type-collage grid (no photos — color + big type).
const TILES = [
  { word: "drive", bg: "bg-ink", fg: "text-lime", style: "outline" as const },
  { word: "🔧", bg: "bg-lime", fg: "text-ink", style: "icon" as const },
  { word: "book", bg: "bg-orange", fg: "text-ink", style: "outline" as const },
  { word: "🚗", bg: "bg-forest", fg: "text-lime", style: "icon" as const },
  { word: "fix", bg: "bg-lime-soft", fg: "text-ink", style: "solid" as const },
  { word: "tune", bg: "bg-ink", fg: "text-orange", style: "outline" as const },
  { word: "⚙️", bg: "bg-stone", fg: "text-ink", style: "icon" as const },
  { word: "save", bg: "bg-lime", fg: "text-ink", style: "solid" as const },
  { word: "📞", bg: "bg-orange", fg: "text-ink", style: "icon" as const },
];

function Tile({ word, bg, fg, style }: (typeof TILES)[number]) {
  return (
    <div
      className={`${bg} ${fg} aspect-square flex items-center justify-center overflow-hidden`}
    >
      {style === "icon" ? (
        <span className="text-4xl sm:text-5xl">{word}</span>
      ) : (
        <span
          className={`font-display font-extrabold lowercase text-3xl sm:text-4xl md:text-5xl ${
            style === "outline" ? "outline-word" : ""
          }`}
        >
          {word}
        </span>
      )}
    </div>
  );
}

export default function LandingPage() {
  return (
    <>
      {/* NAV */}
      <header className="border-b-2 border-ink">
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">
          <Link href="/" className="font-display font-black leading-[0.85] text-2xl tracking-tight">
            auto
            <br />
            CARE<span className="align-super text-xs">™</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-7 text-sm">
            <a href="#services" className="hidden sm:inline hover:text-orange">Services</a>
            <a href="#how" className="hidden sm:inline hover:text-orange">How it works</a>
            <Link
              href="/call"
              className="bold-btn bg-lime font-display font-bold px-5 py-2.5"
            >
              Call Ava →
            </Link>
          </div>
        </nav>
      </header>

      {/* HERO — split: copy left, type-collage right */}
      <section className="border-b-2 border-ink">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2">
          {/* Left */}
          <div className="px-5 sm:px-8 py-12 sm:py-16 lg:py-24 lg:border-r-2 border-ink flex flex-col justify-center">
            <h1 className="font-display font-black leading-[0.95] tracking-tight text-5xl sm:text-6xl lg:text-7xl">
              Get your car fixed without the phone-tag headache.
            </h1>
            <p className="mt-6 font-display text-lg sm:text-xl">
              <span className="marker font-bold">
                No menus, no hold music, no waiting.
              </span>
            </p>
            <p className="mt-6 text-ink/80 max-w-md leading-relaxed">
              Meet <strong>Ava</strong> — AutoCare’s AI voice receptionist. Just
              talk, and she’ll book, check, or cancel your repair appointment.
              Any time, day or night.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/call"
                className="bold-btn bg-ink text-cream font-display font-bold text-lg px-7 py-3.5"
              >
                🔧 Start a call
              </Link>
              <a
                href="#how"
                className="bold-btn bg-paper font-display font-bold text-lg px-7 py-3.5"
              >
                How it works
              </a>
            </div>
          </div>

          {/* Right — collage */}
          <div className="grid grid-cols-3 grid-rows-3 border-t-2 lg:border-t-0 border-ink">
            {TILES.map((t, i) => (
              <div
                key={i}
                className="border-ink [&:not(:nth-child(3n))]:border-r-2 [&:nth-child(-n+6)]:border-b-2"
              >
                <Tile {...t} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2 className="font-display font-black text-4xl sm:text-5xl tracking-tight">
            What we wrench on
          </h2>
          <p className="mt-2 text-ink/70">Full-service shop. Honest work. Fair prices.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bold-card bg-paper p-6 flex items-start gap-4 hover:bg-lime-soft transition-colors"
              >
                <span className="text-4xl">{s.icon}</span>
                <div>
                  <h3 className="font-display font-bold text-xl">{s.title}</h3>
                  <p className="text-ink/75 text-sm mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-ink text-cream border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2 className="font-display font-black text-4xl sm:text-5xl tracking-tight text-lime">
            Book in 3 steps
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {STEPS.map((step) => (
              <div key={step.n} className="bold-card border-cream bg-ink p-7">
                <div className="font-display font-black text-5xl text-lime">{step.n}</div>
                <h3 className="font-display font-bold text-2xl mt-4">{step.title}</h3>
                <p className="text-cream/70 text-sm mt-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOURS + CTA */}
      <section className="border-b-2 border-ink">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2">
          {/* Hours */}
          <div className="px-5 sm:px-8 py-14 sm:py-20 md:border-r-2 border-ink">
            <h3 className="font-display font-black text-3xl tracking-tight">Shop hours</h3>
            <ul className="mt-5 divide-y-2 divide-ink/15 max-w-sm">
              {[
                ["Mon – Fri", "9:00 – 17:00"],
                ["Saturday", "9:00 – 17:00"],
                ["Sunday", "Closed"],
              ].map(([d, h]) => (
                <li key={d} className="flex justify-between py-2">
                  <span>{d}</span>
                  <span className="font-display font-bold">{h}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm">
              <span className="marker">…but Ava takes calls 24/7.</span>
            </p>
          </div>

          {/* CTA */}
          <div className="bg-lime px-5 sm:px-8 py-14 sm:py-20 flex flex-col justify-center">
            <h2 className="font-display font-black text-5xl sm:text-6xl leading-[0.95] tracking-tight">
              Ready to roll?
            </h2>
            <p className="mt-4 font-display text-lg max-w-sm">
              Skip the wait. Let Ava book your next appointment in under a minute.
            </p>
            <Link
              href="/call"
              className="bold-btn bg-ink text-cream font-display font-bold text-lg px-8 py-4 mt-7 self-start"
            >
              📞 Call the shop
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <span className="font-display font-black text-lg">autoCARE™</span>
        <span className="text-ink/60">Honest auto repair · Seattle, WA</span>
        <Link href="/admin" className="hover:text-orange font-display font-bold">
          Staff login →
        </Link>
      </footer>
    </>
  );
}
