const steps = [
  {
    num: "01",
    title: "Submit the Form Below",
    desc: "Fill out the discount request form on this page with your name, email, and service branch or role.",
  },
  {
    num: "02",
    title: "Provide Verification",
    desc: "Email us proof of service - military ID, veteran ID, DD-214, VA card, or official department credentials.",
  },
  {
    num: "03",
    title: "Receive Your Code",
    desc: "We personally review each submission and send your permanent 20% discount code within 24–48 hours.",
  },
  {
    num: "04",
    title: "Save on Every Order",
    desc: "Your code never expires. Use it on every single order, every time - no limits, no fine print.",
  },
];

export default function VeteransHowToClaim() {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-white" style={{ borderBottom: "1px solid #ebebeb" }}>
      <div className="max-w-[1320px] mx-auto">
        <div className="mb-8 md:mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#aaa] mb-3">Simple Process</p>
          <h2
            className="font-black uppercase leading-[0.9] tracking-tight"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(26px, 3vw, 44px)", background: "linear-gradient(135deg, #888 0%, #c0c0c0 35%, #666 60%, #aaa 80%, #777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            HOW TO CLAIM YOUR 20% DISCOUNT
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "#e0e0e0" }}>
          {steps.map((step) => (
            <div key={step.num} className="bg-white p-6 md:p-8 flex flex-col gap-4">
              <span
                className="font-black text-5xl leading-none"
                style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(0,0,0,0.15)", fontFamily: "'Oswald', sans-serif" }}
              >
                {step.num}
              </span>
              <h3 className="font-black text-sm uppercase tracking-tight text-[#111]">{step.title}</h3>
              <p className="text-[#777] text-sm leading-relaxed flex-1">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
