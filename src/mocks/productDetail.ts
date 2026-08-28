interface ProductSpec { label: string; value: string; }
interface ResearchBenefit { title: string; desc: string; icon: string; }
interface Testimonial { name: string; role: string; rating: number; text: string; initials: string; }
interface FAQ { q: string; a: string; }
interface RelatedProduct { id: string; name: string; price: number; image: string; purity: string; }
interface ProductDetail {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  sku: string;
  inStock: boolean;
  stockCount: number;
  purity: string;
  molecularWeight: string;
  sequence: string;
  storage: string;
  solubility: string;
  appearance: string;
  images: string[];
  badges: { icon: string; label: string; color: string }[];
  description: string;
  specifications: ProductSpec[];
  researchBenefits: ResearchBenefit[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  relatedProducts: RelatedProduct[];
}

export const wolverineProduct: ProductDetail = {
  id: "wolverine-20mg",
  name: "WOLVERINE – 20MG",
  subtitle: "Premium Research-Grade Peptide Blend",
  price: 110.00,
  originalPrice: 140.00,
  sku: "VK-WLV-20",
  inStock: true,
  stockCount: 14,
  purity: "99.4%",
  molecularWeight: "~8,300 Da",
  sequence: "BPC-157 / TB-500 Blend",
  storage: "-20°C (long-term), 4°C (short-term up to 4 weeks)",
  solubility: "Soluble in sterile water or bacteriostatic water",
  appearance: "Lyophilized white powder",
  images: [
    "https://valkyriepeptides.com/wp-content/uploads/2026/03/Wolverine-20mg-Peptide-450x675.png",
    "https://readdy.ai/api/search-image?query=close%20up%20pharmaceutical%20peptide%20research%20vial%20white%20powder%20lyophilized%20on%20sterile%20laboratory%20surface%20clinical%20clean%20white%20background%20minimal%20product%20photography%20precise%20detail%20sharp%20focus&width=600&height=750&seq=wlv-img2&orientation=portrait",
    "https://readdy.ai/api/search-image?query=laboratory%20certificate%20of%20analysis%20COA%20document%20with%20peptide%20purity%20data%20scientific%20research%20quality%20assurance%20document%20on%20white%20desk%20clinical%20background%20professional%20photography&width=600&height=750&seq=wlv-img3&orientation=portrait",
  ],
  badges: [
    { icon: "ri-shield-check-fill", label: "99%+ Purity", color: "#16a34a" },
    { icon: "ri-map-pin-line", label: "Made in USA", color: "#111" },
    { icon: "ri-award-line", label: "3rd Party Tested", color: "#111" },
    { icon: "ri-flask-line", label: "CoA Included", color: "#111" },
  ],
  description: `Wolverine is Warrior Distributions' flagship research blend, combining two of the most studied peptide compounds in a single lyophilized formulation. Developed for researchers exploring cellular regeneration, structural tissue repair, and actin-myosin interaction pathways.

Each vial contains 20mg of research-grade material verified by independent third-party laboratories. Purity certificates (CoA) are available upon request and are issued by accredited US laboratories.`,
  specifications: [
    { label: "Peptide Content", value: "20mg per vial" },
    { label: "Purity", value: "99.4% (HPLC verified)" },
    { label: "Molecular Weight", value: "~8,300 Da" },
    { label: "Sequence", value: "BPC-157 / TB-500 Blend" },
    { label: "Appearance", value: "Lyophilized white powder" },
    { label: "Solubility", value: "Sterile or bacteriostatic water" },
    { label: "Storage Temp", value: "-20°C (long-term)" },
    { label: "Shelf Life", value: "24 months (properly stored)" },
    { label: "Origin", value: "Lyophilized in the USA" },
    { label: "Testing", value: "HPLC, MS, Endotoxin, Sterility" },
  ],
  researchBenefits: [
    {
      title: "Cellular Regeneration Pathways",
      desc: "BPC-157 component supports research into cellular repair mechanisms and growth factor signaling in musculoskeletal tissues.",
      icon: "ri-heart-pulse-line",
    },
    {
      title: "Actin-Myosin Interaction Studies",
      desc: "TB-500's Thymosin Beta-4 sequence enables research into actin binding, cellular motility, and tissue remodeling dynamics.",
      icon: "ri-microscope-line",
    },
    {
      title: "Anti-Inflammatory Pathways",
      desc: "Extensively studied for its role in modulating inflammatory cytokine expression in controlled in vitro environments.",
      icon: "ri-test-tube-line",
    },
    {
      title: "Angiogenesis Research",
      desc: "Supports investigation of blood vessel formation and endothelial cell migration in research models.",
      icon: "ri-pulse-line",
    },
  ],
  testimonials: [
    {
      name: "Dr. Alan K.",
      role: "Biomedical Research Scientist",
      rating: 5,
      text: "Exceptional purity consistency. HPLC data matches CoA exactly. This is the only supplier I trust for this blend.",
      initials: "AK",
    },
    {
      name: "R. Martinez, MS",
      role: "Laboratory Director",
      rating: 5,
      text: "The lyophilization quality is noticeably superior. Reconstitution is clean and the product behaves exactly as expected in our assays.",
      initials: "RM",
    },
    {
      name: "Prof. S. Chen",
      role: "University Research Lab",
      rating: 5,
      text: "Fast shipping, accurate labeling, verified CoA. I've been ordering Wolverine for 18 months — batch-to-batch consistency is outstanding.",
      initials: "SC",
    },
  ],
  faqs: [
    {
      q: "What is included with my order?",
      a: "Each order includes one vial of Wolverine – 20mg in lyophilized form, along with a Certificate of Analysis (CoA) from our third-party laboratory.",
    },
    {
      q: "How should this peptide be stored?",
      a: "Store lyophilized peptides at -20°C for long-term storage. Once reconstituted, store at 4°C and use within 4 weeks. Avoid repeated freeze-thaw cycles.",
    },
    {
      q: "Is a Certificate of Analysis available?",
      a: "Yes. A CoA from an independent, accredited US laboratory is included with each product, confirming purity, molecular weight, and composition.",
    },
    {
      q: "What solvent should I use for reconstitution?",
      a: "We recommend sterile water for injection or bacteriostatic water. Use the minimal volume required for your research protocol.",
    },
    {
      q: "Is this product intended for human use?",
      a: "No. All Warrior Distributions products are strictly for research use only and are not intended for human consumption, injection, or therapeutic use.",
    },
  ],
  relatedProducts: [
    {
      id: "bpc-157-10mg",
      name: "BPC-157 – 10MG",
      price: 65.00,
      image: "https://valkyriepeptides.com/wp-content/uploads/2026/03/BPC-157_10mg_Peptide-removebg-preview.png",
      purity: "99.2%",
    },
    {
      id: "tesamorelin-10mg",
      name: "TESAMORELIN – 10MG",
      price: 90.00,
      image: "https://valkyriepeptides.com/wp-content/uploads/2026/03/TESAMORELIN-10mg-Peptide-450x675.png",
      purity: "99.1%",
    },
    {
      id: "glp-3-rt-30mg",
      name: "GLP-3 (RT) – 30MG",
      price: 175.00,
      image: "https://valkyriepeptides.com/wp-content/uploads/2026/03/GLP-3-RT-30mg-Peptide-450x675.png",
      purity: "99.3%",
    },
  ],
};

// Generic product detail builder for products without dedicated detail data
function buildGenericProduct(
  slug: string,
  name: string,
  price: number,
  image: string,
  inStock: boolean,
  subtitle: string,
  sequence: string,
  mw: string,
  purity: string,
  contentLabel: string,
  description: string,
  benefits: ResearchBenefit[],
  related: RelatedProduct[]
): ProductDetail {
  return {
    id: slug,
    name,
    subtitle,
    price,
    originalPrice: Math.round(price * 1.25),
    sku: `VK-${slug.toUpperCase().replace(/-/g, "").slice(0, 8)}`,
    inStock,
    stockCount: inStock ? 18 : 0,
    purity,
    molecularWeight: mw,
    sequence,
    storage: "-20°C (long-term), 4°C (short-term up to 4 weeks)",
    solubility: "Soluble in sterile water or bacteriostatic water",
    appearance: "Lyophilized white powder",
    images: [image],
    badges: [
      { icon: "ri-shield-check-fill", label: `${purity} Purity`, color: "#16a34a" },
      { icon: "ri-map-pin-line", label: "Made in USA", color: "#111" },
      { icon: "ri-award-line", label: "3rd Party Tested", color: "#111" },
      { icon: "ri-flask-line", label: "CoA Included", color: "#111" },
    ],
    description,
    specifications: [
      { label: "Peptide Content", value: contentLabel },
      { label: "Purity", value: `${purity} (HPLC verified)` },
      { label: "Molecular Weight", value: mw },
      { label: "Sequence", value: sequence },
      { label: "Appearance", value: "Lyophilized white powder" },
      { label: "Solubility", value: "Sterile or bacteriostatic water" },
      { label: "Storage Temp", value: "-20°C (long-term)" },
      { label: "Shelf Life", value: "24 months (properly stored)" },
      { label: "Origin", value: "Lyophilized in the USA" },
      { label: "Testing", value: "HPLC, MS, Endotoxin, Sterility" },
    ],
    researchBenefits: benefits,
    testimonials: [
      {
        name: "Dr. L. Harrison",
        role: "Molecular Biology Researcher",
        rating: 5,
        text: "Outstanding purity and consistency. CoA matches exactly. This is my go-to supplier for research peptides.",
        initials: "LH",
      },
      {
        name: "M. Reyes, PhD",
        role: "Biochemistry Lab Director",
        rating: 5,
        text: "Batch-to-batch reliability is exceptional. The lyophilization quality sets Warrior apart from other vendors.",
        initials: "MR",
      },
      {
        name: "Prof. T. Nakamura",
        role: "University Research Institute",
        rating: 5,
        text: "Rapid dispatch, accurate labeling, clean reconstitution. Exactly what a research lab needs.",
        initials: "TN",
      },
    ],
    faqs: [
      {
        q: "What is included with my order?",
        a: "Each order includes one vial of lyophilized peptide along with a Certificate of Analysis (CoA) from our third-party accredited laboratory.",
      },
      {
        q: "How should this peptide be stored?",
        a: "Store at -20°C for long-term storage. Once reconstituted, keep at 4°C and use within 4 weeks. Avoid repeated freeze-thaw cycles.",
      },
      {
        q: "Is a Certificate of Analysis available?",
        a: "Yes. A CoA from an independent US laboratory is included with every product, confirming purity, molecular weight, and composition.",
      },
      {
        q: "What solvent should I use for reconstitution?",
        a: "We recommend sterile water for injection or bacteriostatic water. Use the minimal volume required for your research protocol.",
      },
      {
        q: "Is this product intended for human use?",
        a: "No. All Warrior Distributions products are strictly for research use only and are not intended for human consumption, injection, or therapeutic use.",
      },
    ],
    relatedProducts: related,
  };
}

const commonRelated: RelatedProduct[] = [
  {
    id: "wolverine-20mg",
    name: "WOLVERINE – 20MG",
    price: 110.00,
    image: "https://valkyriepeptides.com/wp-content/uploads/2026/03/Wolverine-20mg-Peptide-450x675.png",
    purity: "99.4%",
  },
  {
    id: "bpc-157-10mg",
    name: "BPC-157 – 10MG",
    price: 55.00,
    image: "https://valkyriepeptides.com/wp-content/uploads/2026/03/BPC-157-10mg-Peptide-450x675.png",
    purity: "99.2%",
  },
  {
    id: "tesamorelin-10mg",
    name: "TESAMORELIN – 10MG",
    price: 100.00,
    image: "https://valkyriepeptides.com/wp-content/uploads/2026/03/TESAMORELIN-10mg-Peptide-450x675.png",
    purity: "99.1%",
  },
];

export const productCatalog: Record<string, ProductDetail> = {
  "wolverine-20mg": wolverineProduct,

  "glp-3-rt-10mg": buildGenericProduct(
    "glp-3-rt-10mg",
    "GLP-3 (RT) – 10MG",
    70.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/03/GLP-3-RT-10mg-Peptide-450x675.png",
    true,
    "Research-Grade GLP-3 Receptor Targeting Peptide",
    "Novel GLP Receptor Agonist",
    "~3,350 Da",
    "99.2%",
    "10mg / vial",
    `GLP-3 (RT) is a novel research peptide developed to study glucagon-like peptide receptor interactions. This 10mg formulation is ideal for in vitro binding assays and early-stage mechanistic studies.\n\nEvery vial is lyophilized in the USA and independently third-party tested for purity, identity, and endotoxin levels before release.`,
    [
      { title: "GLP Receptor Binding Studies", desc: "Enables investigation of novel GLP-3 receptor interactions and downstream metabolic signaling pathways.", icon: "ri-microscope-line" },
      { title: "Metabolic Pathway Research", desc: "Supports study of glucose-dependent insulin secretion and energy homeostasis regulation.", icon: "ri-heart-pulse-line" },
      { title: "Incretin Biology", desc: "Facilitates research into incretin hormone mechanisms and gastrointestinal peptide signaling.", icon: "ri-test-tube-line" },
      { title: "Receptor Selectivity Profiling", desc: "Used in comparative receptor selectivity studies across the glucagon peptide superfamily.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "glp-3-rt-30mg": buildGenericProduct(
    "glp-3-rt-30mg",
    "GLP-3 (RT) – 30MG",
    185.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/03/GLP-3-RT-30mg-Peptide-450x675.png",
    true,
    "Research-Grade GLP-3 Receptor Targeting Peptide — Bulk Format",
    "Novel GLP Receptor Agonist",
    "~3,350 Da",
    "99.3%",
    "30mg / vial",
    `GLP-3 (RT) 30MG is the bulk research format of our GLP-3 Receptor Targeting peptide. Designed for extended studies requiring larger quantities with consistent batch quality.\n\nEach vial delivers 30mg of research-grade material, tested by independent US laboratories for purity, identity, endotoxin levels, and sterility.`,
    [
      { title: "GLP Receptor Binding Studies", desc: "Enables investigation of novel GLP-3 receptor interactions and downstream metabolic signaling pathways.", icon: "ri-microscope-line" },
      { title: "Metabolic Pathway Research", desc: "Supports study of glucose-dependent insulin secretion and energy homeostasis regulation.", icon: "ri-heart-pulse-line" },
      { title: "Long-Duration Studies", desc: "Bulk format designed for multi-week research protocols requiring consistent dosing across experimental groups.", icon: "ri-test-tube-line" },
      { title: "Receptor Selectivity Profiling", desc: "Used in comparative receptor selectivity studies across the glucagon peptide superfamily.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "glow-70mg": buildGenericProduct(
    "glow-70mg",
    "GLOW – 70MG",
    150.00,
    "https://valkyriepeptides.com/wp-content/uploads/2024/09/GLOW-70mg-Peptide-450x675.png",
    true,
    "Multi-Peptide Beauty & Skin Research Blend",
    "GHK-Cu / Epithalon / Matrixyl Blend",
    "~4,800 Da",
    "99.1%",
    "70mg / vial",
    `GLOW is Warrior\'s signature skin research blend, combining three of the most studied dermatological peptides into a single formulation. Developed for researchers exploring collagen synthesis pathways, skin barrier integrity, and epigenetic aging mechanisms.\n\nEach 70mg vial is independently tested for purity and identity by certified US laboratories.`,
    [
      { title: "Collagen Synthesis Pathways", desc: "GHK-Cu component supports research into collagen and elastin production signaling.", icon: "ri-heart-pulse-line" },
      { title: "Epigenetic Aging Research", desc: "Epithalon component enables study of telomerase activation and telomere length regulation.", icon: "ri-microscope-line" },
      { title: "Skin Barrier Studies", desc: "Matrixyl sequence facilitates investigation of extracellular matrix remodeling.", icon: "ri-test-tube-line" },
      { title: "Anti-Inflammatory Mechanisms", desc: "Explores cytokine modulation and inflammation pathways in dermal cell models.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "klow-80mg": buildGenericProduct(
    "klow-80mg",
    "KLOW – 80MG",
    180.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/03/KLOW-80mg-Peptide-450x675.png",
    true,
    "Research-Grade Metabolic Peptide Blend",
    "GLP-1 / GIP / Amylin Analog Blend",
    "~5,200 Da",
    "99.2%",
    "80mg / vial",
    `KLOW is a multi-peptide metabolic research formulation combining complementary receptor agonist peptides for comprehensive metabolic pathway investigation.\n\nDeveloped for researchers exploring insulin secretion, energy balance, and satiety hormone interactions. Third-party tested at US-accredited laboratories.`,
    [
      { title: "Metabolic Signaling Research", desc: "Enables study of multi-receptor metabolic cascade interactions and energy homeostasis.", icon: "ri-heart-pulse-line" },
      { title: "Insulin Secretion Pathways", desc: "Supports glucose-stimulated insulin secretion and beta-cell function studies.", icon: "ri-test-tube-line" },
      { title: "Satiety Hormone Studies", desc: "Facilitates research into hypothalamic appetite regulation and neuropeptide signaling.", icon: "ri-microscope-line" },
      { title: "Adipogenesis Research", desc: "Supports investigation of fat cell differentiation and lipid metabolism pathways.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "ghk-cu-100mg": buildGenericProduct(
    "ghk-cu-100mg",
    "GHK-Cu – 100MG",
    110.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/03/GHK-Cu-100mg-Peptide-450x675.png",
    true,
    "Copper Peptide Complex — Research Grade",
    "Gly-His-Lys:Cu(II) Complex",
    "340.4 Da",
    "99.5%",
    "100mg / vial",
    `GHK-Cu (Copper Peptide) is one of the most extensively studied naturally occurring peptides in the scientific literature. This 100mg research-grade vial provides an ample supply for extended studies.\n\nGHK-Cu has been investigated across hundreds of published studies for its roles in tissue remodeling, gene expression modulation, and antioxidant signaling. Lyophilized and tested in the USA.`,
    [
      { title: "Collagen & Elastin Research", desc: "Extensively studied for upregulation of collagen synthesis and extracellular matrix remodeling genes.", icon: "ri-heart-pulse-line" },
      { title: "Gene Expression Studies", desc: "Modulates over 4,000 genes in vitro, making it a valuable tool for transcriptomic research.", icon: "ri-microscope-line" },
      { title: "Antioxidant Pathway Research", desc: "Supports study of superoxide dismutase and other antioxidant enzyme activation pathways.", icon: "ri-test-tube-line" },
      { title: "Wound Healing Models", desc: "Used in cell migration, proliferation, and tissue repair assay models.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "tesamorelin-10mg": buildGenericProduct(
    "tesamorelin-10mg",
    "TESAMORELIN – 10MG",
    100.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/03/TESAMORELIN-10mg-Peptide-450x675.png",
    true,
    "GHRH Analogue — Growth Hormone Research",
    "Trans-3-Hexenoic Acid-GRF(1-44)-NH2",
    "5,135.9 Da",
    "99.1%",
    "10mg / vial",
    `Tesamorelin is a stabilized analogue of Growth Hormone-Releasing Hormone (GHRH) with an extended half-life compared to endogenous GHRH. It is among the most clinically researched GHRH analogues available.\n\nThis 10mg research vial is used in studies exploring pituitary GH secretion, IGF-1 axis regulation, and metabolic effects of growth hormone stimulation. Independently tested in the USA.`,
    [
      { title: "GH Axis Research", desc: "Enables investigation of growth hormone pulsatile release and pituitary somatotroph function.", icon: "ri-heart-pulse-line" },
      { title: "IGF-1 Signaling Studies", desc: "Supports research into IGF-1 production downstream of GH stimulation in liver models.", icon: "ri-microscope-line" },
      { title: "Visceral Adipose Research", desc: "Used in adipose tissue metabolism studies and lipodystrophy models.", icon: "ri-test-tube-line" },
      { title: "Metabolic Regulation", desc: "Facilitates study of glucose metabolism, lipid oxidation, and energy expenditure regulation.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "cjc-ipa-10mg": buildGenericProduct(
    "cjc-ipa-10mg",
    "CJC-1295+Ipamorelin – 10MG",
    95.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/03/CJC_IPA-10mg-Peptide-450x675.png",
    true,
    "Dual GH Secretagogue Research Blend",
    "CJC-1295 / Ipamorelin Combination",
    "~4,600 Da",
    "99.0%",
    "10mg / vial",
    `This dual-peptide formulation combines CJC-1295 (a long-acting GHRH analogue) with Ipamorelin (a selective GH secretagogue) for synergistic growth hormone pathway research.\n\nThe combination is among the most studied GH secretagogue pairs in the literature. Each vial is independently tested for purity and identity by US accredited laboratories.`,
    [
      { title: "Synergistic GH Release Studies", desc: "Enables study of combined GHRH and ghrelin receptor activation on GH pulsatility.", icon: "ri-heart-pulse-line" },
      { title: "Pituitary Function Research", desc: "Supports investigation of somatotroph cell function and GH secretion kinetics.", icon: "ri-microscope-line" },
      { title: "Selective Receptor Profiling", desc: "Ipamorelin component provides highly selective GHSR-1a agonism for clean receptor studies.", icon: "ri-test-tube-line" },
      { title: "IGF-1 Axis Modulation", desc: "Used in longitudinal GH/IGF-1 axis regulation and anabolic signaling studies.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "nad-500mg": buildGenericProduct(
    "nad-500mg",
    "NAD+ – 500MG",
    80.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/03/NAD-500mg-Peptide-450x675.png",
    true,
    "Nicotinamide Adenine Dinucleotide — Research Grade",
    "Nicotinamide Adenine Dinucleotide",
    "663.4 Da",
    "99.6%",
    "500mg / vial",
    `NAD+ (Nicotinamide Adenine Dinucleotide) is a critical coenzyme found in all living cells, playing a fundamental role in energy metabolism and cellular signaling. This 500mg research-grade formulation supports extended laboratory studies.\n\nNAD+ has been investigated extensively across cellular aging, mitochondrial function, and DNA repair research domains. Lyophilized to pharmaceutical-grade purity in the USA.`,
    [
      { title: "Mitochondrial Function Research", desc: "Central role in oxidative phosphorylation and ATP synthesis makes it essential for metabolic studies.", icon: "ri-heart-pulse-line" },
      { title: "Sirtuin Activation Studies", desc: "Enables investigation of NAD+-dependent sirtuin deacylase activity and longevity pathway regulation.", icon: "ri-microscope-line" },
      { title: "DNA Repair Mechanisms", desc: "Supports PARP enzyme activity research in single and double-strand DNA break repair models.", icon: "ri-test-tube-line" },
      { title: "Cellular Aging Research", desc: "Used in studies of NAD+ decline with aging and its effects on cellular senescence.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "nad-1000mg": buildGenericProduct(
    "nad-1000mg",
    "NAD+ – 1000MG",
    110.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/03/NAD-1000mg-Peptide-450x675.png",
    true,
    "Nicotinamide Adenine Dinucleotide — Bulk Research Grade",
    "Nicotinamide Adenine Dinucleotide",
    "663.4 Da",
    "99.6%",
    "1000mg / vial",
    `NAD+ 1000MG is the bulk research format of our NAD+ formulation, providing double the quantity for extended longitudinal studies and higher-throughput assay requirements.\n\nIdeal for multi-group studies or labs requiring consistent NAD+ supply over extended research timelines. Independently tested for purity at US-accredited laboratories.`,
    [
      { title: "Mitochondrial Function Research", desc: "Central role in oxidative phosphorylation and ATP synthesis makes it essential for metabolic studies.", icon: "ri-heart-pulse-line" },
      { title: "Sirtuin Activation Studies", desc: "Enables investigation of NAD+-dependent sirtuin deacylase activity and longevity pathway regulation.", icon: "ri-microscope-line" },
      { title: "High-Throughput Assays", desc: "1000mg bulk format designed for multi-well plate assays and extended research protocols.", icon: "ri-test-tube-line" },
      { title: "Cellular Aging Research", desc: "Used in studies of NAD+ decline with aging and its effects on cellular senescence.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "bpc-157-10mg": buildGenericProduct(
    "bpc-157-10mg",
    "BPC-157 – 10MG",
    55.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/03/BPC-157-10mg-Peptide-450x675.png",
    true,
    "Body Protective Compound — Research Grade",
    "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val (15-aa)",
    "1,419.5 Da",
    "99.2%",
    "10mg / vial",
    `BPC-157 (Body Protective Compound) is one of the most extensively studied peptides in tissue repair and regeneration research. This 15-amino acid sequence derived from human gastric juice has been investigated across hundreds of published studies.\n\nResearch areas include musculoskeletal repair, tendon healing, gastric cytoprotection, and nervous system studies. Independently tested in the USA.`,
    [
      { title: "Tendon & Ligament Repair Models", desc: "Extensively studied for upregulation of growth factor receptors in tendon and ligament healing models.", icon: "ri-heart-pulse-line" },
      { title: "Gastric Cytoprotection Research", desc: "Derived from gastric juice; supports study of gastrointestinal mucosal integrity mechanisms.", icon: "ri-microscope-line" },
      { title: "Angiogenesis Studies", desc: "Facilitates investigation of nitric oxide pathway involvement in blood vessel formation.", icon: "ri-test-tube-line" },
      { title: "Neuroprotective Pathways", desc: "Used in CNS and peripheral nerve injury models exploring neuroprotective signaling.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "tb-500-10mg": buildGenericProduct(
    "tb-500-10mg",
    "TB-500 – 10MG",
    75.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/03/TB-500-10mg-Peptide-450x675.png",
    true,
    "Thymosin Beta-4 Synthetic Analogue",
    "Ac-Ser-Asp-Lys-Pro (Thymosin Beta-4 Fragment 17-23)",
    "~4,964 Da",
    "99.3%",
    "10mg / vial",
    `TB-500 is the synthetic analogue of Thymosin Beta-4, a naturally occurring peptide that plays a critical role in actin regulation and cellular migration. It is among the most studied peptides for tissue repair research.\n\nPublished research covers musculoskeletal recovery, cardiac repair models, and neuroregeneration studies. All Warrior TB-500 is lyophilized and independently tested in the USA.`,
    [
      { title: "Actin Sequestration Research", desc: "Thymosin Beta-4\'s primary function in regulating G-actin enables cell motility and migration studies.", icon: "ri-heart-pulse-line" },
      { title: "Cardiac Repair Models", desc: "Supports investigation of cardiomyocyte survival and regeneration following ischemia in research models.", icon: "ri-microscope-line" },
      { title: "Muscle Repair Studies", desc: "Studied extensively for skeletal muscle fiber regeneration and satellite cell activation mechanisms.", icon: "ri-test-tube-line" },
      { title: "Angiogenesis & Wound Healing", desc: "Supports blood vessel formation research and epithelial cell migration assays.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "sermorelin-10mg": buildGenericProduct(
    "sermorelin-10mg",
    "Sermorelin – 10MG",
    120.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/03/SERMORELIN-10mg-Peptide-450x675.png",
    false,
    "GHRH(1-29) Analogue — Research Grade",
    "GHRH(1-29)-NH2 (Sermorelin)",
    "3,357.9 Da",
    "99.0%",
    "10mg / vial",
    `Sermorelin is a synthetic analogue of the first 29 amino acids of endogenous Growth Hormone-Releasing Hormone (GHRH). It is the shortest fully active fragment of GHRH and stimulates physiological GH release.\n\nUsed extensively in pituitary function research and GH axis studies. Currently out of stock — join our waitlist to be notified when available.`,
    [
      { title: "Pituitary Function Research", desc: "Enables study of endogenous GHRH receptor binding and physiological GH secretion patterns.", icon: "ri-heart-pulse-line" },
      { title: "GH Axis Studies", desc: "Shortest active GHRH fragment — ideal for dose-response studies of the GH/IGF-1 axis.", icon: "ri-microscope-line" },
      { title: "Diagnostic Research Models", desc: "Used in GH deficiency research models and pituitary reserve testing protocols.", icon: "ri-test-tube-line" },
      { title: "Neuroendocrine Research", desc: "Supports investigation of hypothalamic-pituitary signaling and somatotroph cell function.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "mots-c-10mg": buildGenericProduct(
    "mots-c-10mg",
    "MOTS-C – 10MG",
    70.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/03/MOTS-c-10mg-Peptide-450x675.png",
    true,
    "Mitochondrial-Derived Peptide — Research Grade",
    "MRWQEMGYIFYPRKLR (16-aa mitochondrial peptide)",
    "2,174.6 Da",
    "99.1%",
    "10mg / vial",
    `MOTS-c is a mitochondria-derived peptide encoded in the 12S rRNA gene of mitochondrial DNA. It is one of the few peptides with mitochondrial rather than nuclear origin, making it a unique research tool.\n\nInvestigated for its roles in metabolic regulation, insulin sensitization, and cellular stress response. Independently tested in the USA.`,
    [
      { title: "Mitochondrial Biology Research", desc: "Unique mitochondrial origin enables novel studies of retrograde mitochondria-to-nucleus signaling.", icon: "ri-heart-pulse-line" },
      { title: "Insulin Sensitivity Studies", desc: "Explored for AMPK activation pathways and glucose uptake regulation in skeletal muscle models.", icon: "ri-microscope-line" },
      { title: "Cellular Stress Response", desc: "Supports study of adaptive response to metabolic stress and mitochondrial dysfunction.", icon: "ri-test-tube-line" },
      { title: "Longevity Pathway Research", desc: "Investigated for its role in aging and age-related metabolic decline in model organisms.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "glp-1-sm-10mg": buildGenericProduct(
    "glp-1-sm-10mg",
    "GLP-1 (SM) – 10MG",
    75.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/03/GLP-1-SM-10mg-Peptide-450x675.png",
    true,
    "Small Molecule GLP-1 Receptor Agonist Research Peptide",
    "GLP-1 Receptor Agonist Analogue",
    "~3,297 Da",
    "99.2%",
    "10mg / vial",
    `GLP-1 (SM) is a stabilized small-molecule analogue of native GLP-1 designed for enhanced receptor binding selectivity and extended research utility in metabolic studies.\n\nUsed across insulin secretion, beta-cell survival, and satiety signaling research. All Warrior GP-1 is independently tested in US-accredited laboratories.`,
    [
      { title: "GLP-1 Receptor Studies", desc: "Enables investigation of native and allosteric GLP-1 receptor binding interactions.", icon: "ri-heart-pulse-line" },
      { title: "Beta-Cell Function Research", desc: "Supports study of glucose-stimulated insulin secretion and beta-cell survival mechanisms.", icon: "ri-microscope-line" },
      { title: "Satiety Signaling", desc: "Facilitates research into hypothalamic appetite regulation via GLP-1 receptor activation.", icon: "ri-test-tube-line" },
      { title: "Cardioprotective Pathway Studies", desc: "Used in cardiomyocyte protection and cardiac function research models.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "glp-2-tz-30mg": buildGenericProduct(
    "glp-2-tz-30mg",
    "GLP-2 (TZ) – 30MG",
    155.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/03/GLP-2-TZ-30mg-Peptide-450x675.png",
    true,
    "GLP-2 Receptor Targeting Peptide — Bulk Format",
    "Glucagon-Like Peptide-2 Analogue",
    "~3,766 Da",
    "99.2%",
    "30mg / vial",
    `GLP-2 (TZ) is a stabilized analogue of Glucagon-Like Peptide-2 optimized for GLP-2 receptor targeting research. This 30mg bulk format supports extended studies in intestinal biology and gut epithelial function.\n\nPublished research covers intestinal mucosal growth, gut barrier integrity, and enteroendocrine signaling. Independently tested in US laboratories.`,
    [
      { title: "Intestinal Mucosal Growth Research", desc: "GLP-2 is a potent intestinotrophic factor studied for crypt cell proliferation and villus elongation.", icon: "ri-heart-pulse-line" },
      { title: "Gut Barrier Integrity Studies", desc: "Supports investigation of tight junction protein expression and intestinal permeability.", icon: "ri-microscope-line" },
      { title: "Enteroendocrine Signaling", desc: "Enables study of L-cell derived peptide signaling and gut-brain axis interactions.", icon: "ri-test-tube-line" },
      { title: "Short Bowel Research Models", desc: "Used in intestinal adaptation research following bowel resection models.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "pt-141-10mg": buildGenericProduct(
    "pt-141-10mg",
    "PT-141 – 10MG",
    50.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/03/PT-141-10mg-Peptide-450x675.png",
    true,
    "Melanocortin Receptor Agonist — Research Grade",
    "Bremelanotide (PT-141) — Cyclic heptapeptide",
    "1,025.2 Da",
    "99.3%",
    "10mg / vial",
    `PT-141 (Bremelanotide) is a synthetic cyclic heptapeptide analogue of alpha-MSH and a potent agonist of melanocortin receptors (MC1R, MC3R, MC4R). It differs from earlier melanocortin peptides by acting through central neural pathways.\n\nResearch applications include melanocortin receptor pharmacology, central nervous system studies, and cardiovascular research. Independently tested in the USA.`,
    [
      { title: "Melanocortin Receptor Pharmacology", desc: "Enables study of MC1R, MC3R, and MC4R binding selectivity and downstream cAMP signaling.", icon: "ri-heart-pulse-line" },
      { title: "Central Nervous System Research", desc: "Supports investigation of CNS-mediated melanocortin pathways and hypothalamic signaling.", icon: "ri-microscope-line" },
      { title: "Pigmentation Studies", desc: "MC1R agonism enables research into melanogenesis and skin pigmentation pathway regulation.", icon: "ri-test-tube-line" },
      { title: "Cardiovascular Research", desc: "Used in blood pressure and vascular tone modulation studies via melanocortin receptor pathways.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "selank-10mg": buildGenericProduct(
    "selank-10mg",
    "SELANK – 10MG",
    70.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/03/SELANK-10mg-Peptide-450x675.png",
    true,
    "Anxiolytic Nootropic Peptide — Research Grade",
    "Thr-Lys-Pro-Arg-Pro-Gly-Pro (Tuftsin analogue)",
    "751.9 Da",
    "99.1%",
    "10mg / vial",
    `Selank is a synthetic heptapeptide analogue of the immunomodulatory peptide Tuftsin. Developed and studied extensively in Russia, Selank has accumulated a significant body of research in anxiety, cognitive function, and BDNF regulation.\n\nResearch covers GABAergic modulation, neurotrophic factor expression, and immune system interaction. Independently tested in the USA.`,
    [
      { title: "GABAergic System Research", desc: "Supports study of GABA receptor modulation and anxiolytic signaling pathway interactions.", icon: "ri-heart-pulse-line" },
      { title: "BDNF Expression Studies", desc: "Investigated for upregulation of brain-derived neurotrophic factor in neural cell models.", icon: "ri-microscope-line" },
      { title: "Immunomodulation Research", desc: "Tuftsin analogue structure enables study of innate immune signaling and cytokine balance.", icon: "ri-test-tube-line" },
      { title: "Cognitive Function Studies", desc: "Used in learning and memory consolidation research models in rodent studies.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "semax-10mg": buildGenericProduct(
    "semax-10mg",
    "SEMAX – 10MG",
    75.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/03/SEMAX-10mg-Peptide-450x675.png",
    true,
    "ACTH-Derived Nootropic Peptide — Research Grade",
    "Met-Glu-His-Phe-Pro-Gly-Pro (ACTH(4-7)-PGP)",
    "813.0 Da",
    "99.2%",
    "10mg / vial",
    `Semax is a synthetic heptapeptide derived from the ACTH(4-10) sequence with modifications to increase metabolic stability. Originally developed in Russia, it has been extensively studied for neuroprotection, cognitive enhancement, and stroke recovery research.\n\nKey research areas include BDNF expression, cerebral blood flow, and neuroprotective signaling. Independently tested in the USA.`,
    [
      { title: "BDNF & NGF Expression Research", desc: "Semax is studied for potent upregulation of brain-derived and nerve growth factor expression.", icon: "ri-heart-pulse-line" },
      { title: "Neuroprotective Mechanisms", desc: "Supports study of neuronal survival under oxidative stress and ischemic conditions.", icon: "ri-microscope-line" },
      { title: "Cognitive Enhancement Studies", desc: "Used in learning, attention, and memory consolidation research in animal models.", icon: "ri-test-tube-line" },
      { title: "Melanocortin System Research", desc: "ACTH-derived structure enables study of MC4R interactions in the CNS.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "thymosin-alpha-1-10mg": buildGenericProduct(
    "thymosin-alpha-1-10mg",
    "THYMOSIN ALPHA-1 – 10MG",
    85.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/05/Thymosin-Alpha-1-10mg-Peptide-450x675.png",
    true,
    "Immune-Modulating Research Peptide",
    "Ac-Ser-Asp-Ala-Ala-Val-Asp-Thr-Ser-Ser-Glu-Ile-Thr-Thr-Lys-Asp-Leu-Lys-Glu-Lys-Lys-Glu-Val-Val-Glu-Glu-Ala-Glu-Asn-OH",
    "3,108.4 Da",
    "99.1%",
    "10mg / vial",
    `Thymosin Alpha-1 (Tα1) is a naturally occurring 28-amino-acid peptide originally isolated from thymic tissue. It has been studied extensively for its role in immune regulation and T-cell maturation, with a particular focus on innate and adaptive immune signaling pathways.\n\nThis 10mg research vial provides ample supply for multi-study protocols. Lyophilized in the USA and independently verified by certified third-party laboratories for purity, identity, and endotoxin levels.`,
    [
      { title: "T-Cell Activation Research", desc: "Studied for its role in CD4+ and CD8+ T-lymphocyte maturation and immune-response initiation.", icon: "ri-heart-pulse-line" },
      { title: "Innate Immune Signaling", desc: "Supports investigation of Toll-like receptor (TLR) activation and downstream cytokine cascade modulation.", icon: "ri-shield-check-line" },
      { title: "Dendritic Cell Pathway Studies", desc: "Facilitates research into antigen-presenting cell activation and adaptive immunity induction.", icon: "ri-microscope-line" },
      { title: "Inflammation Modulation", desc: "Used in models exploring pro- and anti-inflammatory cytokine balance, including IL-2 and IFN-γ pathways.", icon: "ri-test-tube-line" },
    ],
    commonRelated
  ),

  "hexarelin-10mg": buildGenericProduct(
    "hexarelin-10mg",
    "HEXARELIN – 10MG",
    120.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/05/Hexarelin-10mg-Peptide-450x675.png",
    true,
    "Growth Hormone Secretagogue — Research Grade",
    "His-D-2-MeTrp-Ala-Trp-D-Phe-Lys-NH2",
    "887.1 Da",
    "99.3%",
    "10mg / vial",
    `Hexarelin is a synthetic hexapeptide and potent growth hormone secretagogue (GHS) that acts through GHS-R1a (ghrelin receptor) activation. Among the most potent GHRPs studied in the literature, it is used extensively in research exploring GH secretion dynamics and downstream endocrine signaling.\n\nIndependently tested in the USA for purity, identity, and endotoxin levels. Each vial is lyophilized and sealed for maximum stability.`,
    [
      { title: "GH Secretion Dynamics", desc: "Enables investigation of pulsatile growth hormone release via GHSR-1a receptor activation.", icon: "ri-heart-pulse-line" },
      { title: "Pituitary Function Models", desc: "Used in studies of somatotroph cell activity, GH pulse frequency, and amplitude modulation.", icon: "ri-microscope-line" },
      { title: "GHS Receptor Profiling", desc: "Supports comparative receptor-binding research across the ghrelin secretagogue peptide family.", icon: "ri-test-tube-line" },
      { title: "Cardiac & Metabolic Pathways", desc: "Studied in cardiovascular tissue models exploring GHS receptor activity outside the pituitary axis.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "oxytocin-5mg": buildGenericProduct(
    "oxytocin-5mg",
    "OXYTOCIN – 5MG",
    60.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/05/Oxytocin-5mg-Peptide-450x675.png",
    true,
    "Neuropeptide Hormone — Research Grade",
    "Cys-Tyr-Ile-Gln-Asn-Cys-Pro-Leu-Gly-NH2",
    "1,007.2 Da",
    "99.4%",
    "5mg / vial",
    `Oxytocin is a cyclic nonapeptide hormone produced in the hypothalamus and widely studied for its roles in neuroendocrine signaling, social bonding behavior, and parturition-related pathways. It is among the most extensively characterized peptide hormones in neuroscience research.\n\nThis 5mg research vial is lyophilized in the USA and independently tested for purity, identity, and endotoxin levels by certified third-party laboratories.`,
    [
      { title: "Neuroendocrine Signaling", desc: "Supports research into hypothalamic hormone release and neuropeptide receptor-binding kinetics in CNS models.", icon: "ri-heart-pulse-line" },
      { title: "Social Behavior Research", desc: "Widely used in in-vitro and animal models studying trust, affiliation, and prosocial behavioral signaling.", icon: "ri-microscope-line" },
      { title: "Uterine Contractility Studies", desc: "Facilitates investigation of myometrial smooth muscle activity and parturition-related endocrine pathways.", icon: "ri-test-tube-line" },
      { title: "Anxiolytic Pathway Studies", desc: "Enables research into stress-response modulation and HPA-axis interaction with oxytocin receptor signaling.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "kisspeptin-10-10mg": buildGenericProduct(
    "kisspeptin-10-10mg",
    "KISSPEPTIN-10 – 10MG",
    70.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/05/Kisspeptin-10-10mg-Peptide-450x675.png",
    true,
    "GPR54 Receptor Agonist — Neuroendocrine Research",
    "Tyr-Asn-Trp-Asn-Ser-Phe-Gly-Leu-Arg-Phe-NH2",
    "1,302.5 Da",
    "99.2%",
    "10mg / vial",
    `Kisspeptin-10 is the biologically active C-terminal decapeptide of the kisspeptin family, acting as a potent endogenous agonist at the GPR54 (KISS1R) receptor. It plays a critical upstream role in the hypothalamic-pituitary-gonadal (HPG) axis and GnRH pulse regulation.\n\nThis 10mg vial is lyophilized in the USA and independently tested for purity, identity, and endotoxin levels by accredited third-party laboratories.`,
    [
      { title: "HPG Axis & GnRH Pulse Research", desc: "Kisspeptin-10 is a key upstream regulator of GnRH release, used to study reproductive neuroendocrine feedback.", icon: "ri-heart-pulse-line" },
      { title: "GPR54 Receptor Binding Studies", desc: "Enables precise investigation of KISS1R binding kinetics, internalization, and downstream signaling cascades.", icon: "ri-microscope-line" },
      { title: "Reproductive Endocrinology", desc: "Supports study of LH and FSH secretion dynamics and gonadotropin pulse regulation in vitro.", icon: "ri-test-tube-line" },
      { title: "Metabolic Signaling Pathways", desc: "Emerging research links kisspeptin to energy homeostasis and metabolic hormone cross-talk.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "aod-9604-5mg": buildGenericProduct(
    "aod-9604-5mg",
    "AOD-9604 – 5MG",
    65.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/05/AOD-9604-5mg-Peptide-450x675.png",
    true,
    "hGH Fragment 177-191 — Metabolic Research Peptide",
    "Tyr-Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe (Disulfide bridge: Cys182-Cys189)",
    "1,816.1 Da",
    "99.1%",
    "5mg / vial",
    `AOD-9604 is a synthetic analogue of the C-terminal fragment of human growth hormone (hGH 177-191), modified for enhanced metabolic stability. It has been studied extensively for its lipolytic properties and fat metabolism effects without the growth-promoting or insulin-desensitizing activity of full-length hGH.\n\nThis 5mg research vial is lyophilized in the USA and independently tested by certified third-party laboratories for purity, identity, and endotoxin levels.`,
    [
      { title: "Adipose Tissue & Lipolysis Research", desc: "Studied for its ability to stimulate lipolysis and inhibit lipogenesis via non-GHR mechanisms in fat cell models.", icon: "ri-heart-pulse-line" },
      { title: "hGH Fragment Activity Studies", desc: "Enables comparative research on hGH C-terminal fragment activity vs. full-length GH receptor binding.", icon: "ri-microscope-line" },
      { title: "Cartilage & Bone Research", desc: "Investigated for potential roles in articular cartilage repair signaling and chondrocyte regeneration models.", icon: "ri-test-tube-line" },
      { title: "Beta-3 Adrenergic Pathway Studies", desc: "Supports investigation of β3-adrenoceptor-mediated metabolic effects in adipocyte research models.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "melanotan-2-10mg": buildGenericProduct(
    "melanotan-2-10mg",
    "MELANOTAN II – 10MG",
    50.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/05/Melanotan-2-10mg-Peptide-450x675.png",
    true,
    "Cyclic alpha-MSH Analogue — Melanocortin Research",
    "Ac-Nle-c[Asp-His-D-Phe-Arg-Trp-Lys]-OH (cyclic)",
    "1,024.2 Da",
    "99.3%",
    "10mg / vial",
    `Melanotan II (MT-II) is a synthetic cyclic analogue of alpha-melanocyte-stimulating hormone (α-MSH), engineered for enhanced receptor affinity and metabolic stability. Unlike the linear structure of Melanotan I, the cyclic conformation of MT-II confers potent agonism across multiple melanocortin receptor subtypes.\n\nThis 10mg research vial is lyophilized in the USA and independently tested for purity, identity, and endotoxin levels by accredited third-party laboratories.`,
    [
      { title: "Melanocortin Receptor Studies", desc: "Acts as a potent agonist at MC1R, MC3R, MC4R, and MC5R — enabling multi-receptor binding and selectivity research.", icon: "ri-heart-pulse-line" },
      { title: "Pigmentation Pathway Research", desc: "Supports investigation of melanogenesis signaling, MITF expression, and eumelanin/pheomelanin switching.", icon: "ri-microscope-line" },
      { title: "CNS & Behavioral Research", desc: "MC4R activity enables study of hypothalamic appetite regulation, energy homeostasis, and behavioral signaling.", icon: "ri-test-tube-line" },
      { title: "Sexual Function Signaling", desc: "Used in neuroendocrine research exploring MC receptor-mediated pathways in arousal and erectile function models.", icon: "ri-pulse-line" },
    ],
    commonRelated
  ),

  "bac-water-10ml": buildGenericProduct(
    "bac-water-10ml",
    "BAC WATER – 10ML",
    10.00,
    "https://valkyriepeptides.com/wp-content/uploads/2026/03/BAC-WATER-10ML-450x675.png",
    true,
    "Bacteriostatic Water for Peptide Reconstitution",
    "0.9% Benzyl Alcohol in Sterile Water",
    "N/A",
    "USP Grade",
    "10ml / vial",
    `Bacteriostatic Water (BAC Water) is 0.9% benzyl alcohol in sterile water, USP grade. It is the recommended solvent for reconstituting lyophilized peptides for research use.\n\nThe bacteriostatic agent prevents microbial growth in multi-use vials. Essential for any peptide research lab. Produced in the USA to USP standards.`,
    [
      { title: "Peptide Reconstitution", desc: "Standard solvent for reconstituting lyophilized peptides to desired research concentrations.", icon: "ri-flask-line" },
      { title: "Multi-Use Vial Stability", desc: "0.9% benzyl alcohol prevents microbial contamination in repeatedly accessed research vials.", icon: "ri-shield-check-line" },
      { title: "Isotonic Solution", desc: "Physiologically compatible osmolarity suitable for cell culture and in vitro research protocols.", icon: "ri-test-tube-line" },
      { title: "USP Grade Quality", desc: "Meets United States Pharmacopeia standards for sterile water preparations.", icon: "ri-award-line" },
    ],
    commonRelated
  ),
};

export function getProductBySlug(slug: string): ProductDetail | null {
  return productCatalog[slug] ?? null;
}
