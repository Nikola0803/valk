export default function VeteransCommitment() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-white" style={{ borderBottom: "1px solid #ebebeb" }}>
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-start">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-3">Our Commitment</p>
          <h2
            className="font-black uppercase leading-[0.9] tracking-tight mb-5"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(26px, 3vw, 44px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            AMERICAN-MADE PEPTIDES<br />FOR AMERICA&apos;S HEROES
          </h2>
          <p className="text-[#555] text-sm leading-relaxed mb-4">
            At Warrior Distributions, we believe that those who serve our country deserve our best - and our support. That&apos;s why we&apos;re proud to offer an <strong className="text-[#111]">exclusive 20% lifetime discount</strong> to all active military, veterans, and first responders.
          </p>
          <p className="text-[#555] text-sm leading-relaxed">
            As a <strong className="text-[#111]">100% American company</strong>, we are deeply grateful for the sacrifices made by our military and first responder communities. Your courage, dedication, and selfless service inspire us to give back in every way we can.
          </p>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-3">Our Promise</p>
          <h2
            className="font-black uppercase leading-[0.9] tracking-tight mb-5"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(26px, 3vw, 44px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            OUR COMMITMENT<br />TO YOU
          </h2>
          <p className="text-[#555] text-sm leading-relaxed mb-4">
            Our peptides are proudly <strong className="text-[#111]">manufactured and tested in the United States</strong>, with the same rigorous quality standards and dedication to excellence that you demonstrate in your service to our nation.
          </p>
          <p className="text-[#555] text-sm leading-relaxed">
            Every vial is independently third-party tested for purity, identity, and composition - because you deserve nothing less than the best.
          </p>
        </div>
      </div>
    </section>
  );
}
