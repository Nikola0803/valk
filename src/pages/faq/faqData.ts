export type FAQItem = { q: string; a: string };
export type FAQCategory = { label: string; icon: string; items: FAQItem[] };

export const faqCategories: FAQCategory[] = [
  {
    label: "About Peptides",
    icon: "ri-flask-line",
    items: [
      {
        q: "What are peptides?",
        a: "Peptides are short chains of amino acids linked by peptide bonds. They serve as the building blocks for proteins and play a critical role in many biological processes. In research settings, synthetic peptides are used to study cellular signaling, protein interactions, and other biochemical mechanisms.",
      },
      {
        q: "What is the difference between a peptide and a protein?",
        a: "Peptides are typically shorter chains of amino acids (usually fewer than 50), while proteins are longer and more complex. The distinction influences how they are lyophilized, stored, and behave in research environments.",
      },
      {
        q: "Are your peptides synthetic or naturally derived?",
        a: "All Warrior Distributions products are manufactured using solid-phase peptide synthesis (SPPS) and then lyophilized. This ensures precise amino acid sequences, high reproducibility, and consistent purity across batches.",
      },
    ],
  },
  {
    label: "Purity & Testing",
    icon: "ri-shield-check-line",
    items: [
      {
        q: "Are your Peptides third-party tested?",
        a: "Yes. All Warrior Distributions products undergo rigorous third-party testing through accredited independent laboratories. Testing includes HPLC purity analysis, mass spectrometry identity confirmation, endotoxin testing, sterility testing, and heavy metal screening. Certificates of Analysis (COAs) are available for each product.",
      },
      {
        q: "What purity levels do your peptides meet?",
        a: "Our peptides are manufactured to achieve 99%+ purity as verified by HPLC analysis. Each batch is tested individually and must pass all quality control criteria before being released for sale.",
      },
      {
        q: "Do you provide Certificates of Analysis (COAs)?",
        a: "Yes. When available, products include supporting documentation such as Certificates of Analysis (COAs) outlining purity, composition, and quality control results. You can view all COAs on our dedicated COA page.",
      },
      {
        q: "How do I know your products are made in the USA?",
        a: "Warrior Distributions Peptides are lyophilized and quality-tested entirely within the United States. We work exclusively with domestic manufacturing partners and third-party testing labs to ensure our supply chain never leaves US soil.",
      },
    ],
  },
  {
    label: "Ordering & Payment",
    icon: "ri-shopping-cart-line",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) as well as other payment options displayed at checkout. All transactions are SSL encrypted for your security.",
      },
      {
        q: "Can I change or cancel my order?",
        a: "Orders can be modified or cancelled within a short window after placement. Please contact our support team as quickly as possible at (541)-709-5434 or via our contact form. Once an order has been processed and shipped, modifications may not be possible.",
      },
      {
        q: "Do you offer bulk pricing?",
        a: "Volume-based pricing may be offered on certain products. Please reach out to our support team directly to inquire about bulk order pricing for research institutions or multi-unit purchases.",
      },
      {
        q: "Is there a military or first responder discount?",
        a: "Yes. Active Military, Veterans, and First Responders receive a 20% discount for life. Contact us through our contact form or by phone with proof of service to receive your personal discount code.",
      },
    ],
  },
  {
    label: "Shipping & Delivery",
    icon: "ri-truck-line",
    items: [
      {
        q: "How fast do you ship?",
        a: "Orders are typically shipped within 1–2 business days following processing. Delivery times vary by carrier and destination. You will receive tracking information via email once your order has been dispatched.",
      },
      {
        q: "Is international shipping available?",
        a: "We currently offer US domestic shipping only. We ship to all 50 states. International shipping is not available at this time.",
      },
      {
        q: "How are peptides packaged for shipping?",
        a: "All lyophilized peptides are shipped in sealed, labeled vials. All lyophilized peptides are shipped in sealed, labeled vials with protective packaging to maintain product integrity during transit.",
      },
      {
        q: "What if my order arrives damaged?",
        a: "If your order arrives damaged, please contact us within 48 hours of delivery with photos of the damage and your order number. We will arrange a replacement or refund at no cost to you.",
      },
    ],
  },
  {
    label: "Storage & Handling",
    icon: "ri-temp-cold-line",
    items: [
      {
        q: "How should I store peptides?",
        a: "Lyophilized (freeze-dried) peptides should be stored at -20°C in a frost-free freezer, protected from light and moisture. Once reconstituted, store at 4°C and use within 28 days. Do not refreeze reconstituted peptides. Always follow the product-specific storage instructions included with your order.",
      },
      {
        q: "How do I reconstitute a lyophilized peptide?",
        a: "Reconstitution should be performed using bacteriostatic water (BAC water). Add BAC water slowly and gently swirl - never vortex or shake vigorously. The volume of BAC water used will determine the final concentration. Always work in a clean, sterile environment.",
      },
      {
        q: "What is the shelf life of your peptides?",
        a: "Properly stored lyophilized peptides remain stable for 24 months or longer. Once reconstituted, peptides should be used within 28 days when stored at 4°C. Always check the product label for specific expiration and storage guidance.",
      },
    ],
  },
  {
    label: "Research Use Only",
    icon: "ri-microscope-line",
    items: [
      {
        q: "Are your products safe for human use?",
        a: "All products are sold strictly for research use only. They are NOT intended for human consumption, injection, or any form of medical or therapeutic use. These products are sold exclusively to qualified researchers and laboratories for in vitro and laboratory research purposes.",
      },
      {
        q: "Who can purchase from Warrior Distributions Peptides?",
        a: "Our products are intended for purchase by qualified scientists, researchers, and authorized representatives of research institutions. By purchasing, you confirm you are 18+ years of age and will use the products only for legitimate in vitro research purposes in a controlled laboratory environment.",
      },
      {
        q: "Are Warrior Distributions Peptides FDA approved?",
        a: "No. Our products are research chemicals and have not been evaluated or approved by the FDA. They are not intended to diagnose, treat, cure, or prevent any disease or medical condition. Warrior Distributions is a research chemical supplier, not a pharmaceutical company or compounding pharmacy.",
      },
    ],
  },
];
