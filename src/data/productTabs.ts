/**
 * Product Tabs Data - auto-generated from product_tabs_full_content.csv
 *
 * Two tab types per product (when available):
 *   coa            - Certificate of Analysis image URLs
 *   additionalInfo - Research / compound description text
 *
 * Look up by WooCommerce product ID.
 */

export interface ProductTabData {
  productName: string;
  /** Array of COA image URLs. Empty array = no COA for this product. */
  coa: string[];
  /** Full additional-information text (uses " | " as bullet separator). */
  additionalInfo: string;
}

const productTabs: Record<number, ProductTabData> = {
  133: {
    productName: "TESAMORELIN – 10MG",
    coa: [
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/1773253842237-3b359788-7187-42c5-a47b-b9efd3fab57b_1.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/1773253842237-3b359788-7187-42c5-a47b-b9efd3fab57b_2.jpg",
    ],
    additionalInfo:
      "Tesamorelin — GHRH Analogue for Endocrine & Metabolic Research. Tesamorelin is a synthetic growth hormone–releasing hormone (GHRH) analogue widely examined in laboratory research for its role in growth hormone (GH) axis signaling and systemic metabolic regulation. Warrior Distributions supplies Tesamorelin as a lyophilized research-grade compound. Research areas: Mechanisms governing GH-axis stimulation and downstream IGF-1 signaling | Metabolic regulation involving lipid mobilization and energy-balance pathways | Endocrine-driven changes in tissue composition | Interactions between GH signaling and neuronal or cognitive pathways. Format: Lyophilized powder. For laboratory research use only.",
  },
  124: {
    productName: "GLP-3 (RT) – 30MG",
    coa: [
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/VP-4892263-Retatrutide-Purity_page-0001.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/VP-4892263-Retatrutide-Purity_page-0002.jpg",
    ],
    additionalInfo:
      "GLP-3 (RT) — Multi-Receptor Research Peptide. GLP-3 (RT) (also referenced as GLP3-RTA or LY-3437943) is a synthetic research peptide evaluated in advanced metabolic and endocrine signaling models. Characterised by interaction with GLP-1, GIP, and glucagon receptor pathways. Provided as lyophilized powder by Warrior Distributions. For laboratory research use only.",
  },
  128: {
    productName: "NAD+ – 500MG",
    coa: [
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/VP-6801827-NAD-Purity-images-0-scaled.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/VP-6801827-NAD-Purity-images-1-scaled.jpg",
    ],
    additionalInfo:
      "NAD+ (Nicotinamide Adenine Dinucleotide) — Cellular Energy & Redox Research Compound (500 mg). NAD+ is a fundamental coenzyme widely examined for its central role in cellular energy metabolism and oxidation-reduction (redox) signaling. Research areas: Electron-transfer reactions essential to metabolic flux | Regulation of oxidative and reductive states within cells | Support of enzymatic pathways tied to cellular repair and adaptation | Mechanisms underlying metabolic resilience and energy-production efficiency. Format: 500 mg lyophilized powder. For laboratory research use only.",
  },
  131: {
    productName: "GHK-Cu – 100MG",
    coa: [
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/VP-4215641-GHK-Cu-Purity-images-0-scaled.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/VP-4215641-GHK-Cu-Purity-images-1-scaled.jpg",
    ],
    additionalInfo:
      "GHK-Cu — Copper Tripeptide Research Compound. GHK-Cu is a copper-binding tripeptide complex widely examined in laboratory research for its involvement in extracellular matrix (ECM) signaling, cellular repair pathways, and redox-related biological processes. Research areas: Gene-expression patterns related to tissue repair and remodeling | Cellular migration and structural adaptation within connective-tissue models | Mechanisms underlying inflammation resolution and antioxidant defense | Cutaneous regeneration pathways and ECM-driven cellular communication. Format: Lyophilized powder. For laboratory research use only.",
  },
  135: {
    productName: "GLOW – 70MG",
    coa: [
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/VP-1143805-GLOW-Purity_page-0001.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/VP-1143805-GLOW-Purity_page-0002.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/VP-1143805-GLOW-Purity_page-0003.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/VP-1143805-GLOW-Purity_page-0004.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/VP-1143805-GLOW-Purity_page-0005.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/VP-1143805-GLOW-Purity_page-0006.jpg",
    ],
    additionalInfo:
      "GLOW — Multi-Component Research Peptide Blend (GHK-Cu 50mg + TB-500 10mg + BPC-157 10mg). Total 70mg per vial in lyophilized form. Components: GHK-Cu (50mg) — fibroblast activation, ECM regulation, antioxidant activity, gene-expression patterns linked to tissue remodeling | TB-500 (10mg) — cellular migration, structural recovery, cytoskeletal organization within soft-tissue models | BPC-157 (10mg) — microvascular signaling, inflammatory modulation, gastrointestinal or connective-tissue repair pathways. Format: Lyophilized powder. For laboratory research use only.",
  },
  137: {
    productName: "WOLVERINE – 20MG",
    coa: [], // No product-specific COA — uses global default
    additionalInfo:
      "WOLVERINE — Dual-Peptide Research Blend (BPC-157 10mg + TB-500 10mg). Total 20mg per vial in lyophilized form. BPC-157 (10mg) — gastric-derived pentadecapeptide studied for angiogenic and microvascular signaling, collagen organization and ECM stability, inflammatory-pathway modulation and cytokine balance, epithelial integrity and nitric-oxide–related signaling. TB-500 (10mg) — synthetic fragment of thymosin beta-4, examined for actin-mediated cell migration and cytoskeletal organization, soft-tissue signaling and structural recovery, ECM remodeling and tissue-repair dynamics. Format: Lyophilized powder. For laboratory research use only.",
  },
  139: {
    productName: "MOTS-C – 10MG",
    coa: [
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/VP-8066324-MOTS-c-Purity-images-0-scaled.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2024/09/VP-8066324-MOTS-c-Purity-images-1-scaled.jpg",
    ],
    additionalInfo:
      "MOTS-C — Mitochondria-Derived Research Peptide. MOTS-C is a mitochondria-encoded peptide widely examined in laboratory research for its role in cellular energy regulation, metabolic signaling, and stress-response pathways. Research areas: AMPK-related signaling and downstream metabolic pathways | Mechanisms of mitochondrial communication and peptide-mediated regulation | Cellular responses to metabolic stress, nutrient shifts, and aging-related signaling | Bioenergetic adaptations associated with exercise-mimetic models. Format: Lyophilized powder. For laboratory research use only.",
  },
  5397: {
    productName: "Sermorelin – 10MG",
    coa: [
      "https://valkyriepeptides.com/wp-content/uploads/2026/03/VP-9912173-Sermorelin-Purity_page-0001.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2026/03/VP-9912173-Sermorelin-Purity_page-0002.jpg",
    ],
    additionalInfo:
      "Sermorelin (GHRH 1-29) — Growth Hormone Axis Research Peptide. Sermorelin is a synthetic analogue of GHRH fragment 1-29, widely utilized in controlled research settings to investigate pituitary-driven GH signaling. Its activity is defined by selective interaction with GHRH receptors, initiating downstream pathways associated with physiological, pulsatile GH secretion. Format: 10mg lyophilized powder. For laboratory research use only.",
  },
  5398: {
    productName: "CJC-1295+Ipamorelin – 10MG",
    coa: [
      "https://valkyriepeptides.com/wp-content/uploads/2026/03/VP-9271992-CJC-1295-no-DAC-Purity_page-0001.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2026/03/VP-9271992-CJC-1295-no-DAC-Purity_page-0002.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2026/03/VP-9271992-CJC-1295-no-DAC-Purity_page-0003.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2026/03/VP-9271992-CJC-1295-no-DAC-Purity_page-0004.jpg",
    ],
    additionalInfo:
      "CJC-1295 (No DAC) 5mg + Ipamorelin 5mg — Dual GH-Pathway Research Peptide. Total 10mg per vial in lyophilized form. CJC-1295 No DAC (GHRH analogue) + Ipamorelin (GHRP) combination enables researchers to evaluate: Frequency and amplitude changes in GH secretion | Synergistic effects on endocrine feedback loops | Broader impacts on metabolic, anabolic, and recovery-related pathways. Format: Lyophilized powder. For laboratory research use only.",
  },
  5399: {
    productName: "BPC-157 – 10MG",
    coa: [
      "https://valkyriepeptides.com/wp-content/uploads/2026/03/VP-6704696-BPC-157-Purity_page-0001.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2026/03/VP-6704696-BPC-157-Purity_page-0002.jpg",
    ],
    additionalInfo:
      "BPC-157 (Body Protection Compound-157) — Research Peptide. Synthetic peptide modeled after a naturally occurring protein fragment found in gastric tissue. Research areas: Musculoskeletal injury and repair (tendon, ligament, muscle studies) | Gastrointestinal lining support including mucosal injury and inflammation models | Post-surgical recovery frameworks | Inflammation-related conditions. Not FDA approved for any medical indication. For laboratory research use only.",
  },
  5400: {
    productName: "TB-500 – 10MG",
    coa: [
      "https://valkyriepeptides.com/wp-content/uploads/2026/03/VP-9645060-TB-500-Purity_page-0001.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2026/03/VP-9645060-TB-500-Purity_page-0002.jpg",
    ],
    additionalInfo:
      "TB-500 — Research Peptide. Synthetic peptide modeled after thymosin beta-4, a naturally occurring protein present in most mammalian cells. Studied for involvement in cellular migration, tissue repair processes, and inflammation-related signaling pathways. Research areas: Muscle, tendon, and ligament injury models | Joint and soft-tissue inflammation studies | Wound-healing and tissue-repair frameworks | Post-operative recovery research | Cardiovascular tissue repair (early animal studies). For laboratory research use only.",
  },
  5401: {
    productName: "PT-141 – 10MG",
    coa: [
      "https://valkyriepeptides.com/wp-content/uploads/2026/03/VP-4885039-PT-141-Purity_page-0001.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2026/03/VP-4885039-PT-141-Purity_page-0002.jpg",
    ],
    additionalInfo:
      "PT-141 (Bremelanotide) — Neuromodulatory Research Peptide. Synthetic peptide studied for its interaction with central melanocortin receptors, particularly within neurological pathways associated with behavioral and neuroendocrine responses. Characteristics: Receptor-specific activation within CNS | Rapid onset of neuromodulatory effects | Activity across both male and female research subjects | Duration of receptor-mediated responses may extend several hours. Not approved for human or veterinary use. Format: Lyophilized powder. For laboratory research use only.",
  },
  5879: {
    productName: "SEMAX – 10MG",
    coa: [
      "https://valkyriepeptides.com/wp-content/uploads/2026/03/Screenshot-2026-03-31-153356.png",
      "https://valkyriepeptides.com/wp-content/uploads/2026/03/Screenshot-2026-03-31-153418.png",
    ],
    additionalInfo:
      "SEMAX — Neuroregulatory Research Peptide. Mechanistic areas: BDNF and NGF-related pathways supporting investigations into neuronal development and synaptic regulation | Neurochemical balance and CNS homeostasis including models of cognitive processing and neural adaptation | Oxidative-stress and hypoxia-response mechanisms | HPA-axis signaling evaluating stress-related endocrine modulation | Energy-metabolism pathways within neural tissue. Amino Acid Sequence: Met-Glu-His-Phe-Pro-Gly-Pro | Molecular Formula: C37H51N9O10S | Molecular Weight: 869.93 g/mol | Form: White lyophilized powder. Format: Lyophilized powder. For laboratory research use only.",
  },
  5889: {
    productName: "GLP-1 (SM) – 10MG",
    coa: [],
    additionalInfo:
      "GLP-1 SM (Semaglutide) — GLP-1 Receptor Agonist Research Peptide (10mg). Synthetic GLP-1 receptor agonist, high-purity lyophilized powder for controlled laboratory research. ≥99% purity. Structural characteristics: High GLP-1R affinity | Resistance to DPP-4 degradation (Aib substitution at position 8) | Extended stability via C-18 fatty-diacid acylation enabling albumin binding | Engagement of PI3K/Akt-related pathways | CNS-associated receptor activity including hypothalamic signaling. Research areas: Metabolic homeostasis | Neuroprotective and CNS-related pathways | Hepatic and metabolic-stress frameworks including NASH-related enzyme-stability studies | Vascular and endothelial integrity including BBB structural assessments. Storage: -20°C. For laboratory research use only.",
  },
  5890: {
    productName: "GLP-2 (TZ) – 30MG",
    coa: [
      "https://valkyriepeptides.com/wp-content/uploads/2026/04/VP-9305820-Tirzepatide-Purity_page-0001.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2026/04/VP-9305820-Tirzepatide-Purity_page-0002.jpg",
    ],
    additionalInfo:
      "GLP-2-TZ — Dual-Receptor Incretin Research Peptide. Synthetic peptide analogue studied for its interaction with GIP and GLP-1 receptors. Molecular Formula: C225H348N48O68 | Molecular Weight: 4813.5 g/mol | CAS Number: 2023788-19-2. Research areas: Dual agonism of GIP and GLP-1 receptors | Receptor-binding kinetics | Metabolic-adaptation models | CNS-associated signaling including hypothalamic receptor engagement | Comparative incretin-analog research. Storage: -20°C. For laboratory research use only.",
  },
  5897: {
    productName: "GLP-3 (RT) – 10MG",
    coa: [],
    additionalInfo:
      "GLP-3 RT — Triple-Receptor Agonist Research Peptide. Synthetic multi-agonist peptide engineered to interact with GLP-1, GIP, and glucagon receptors. Receptor targets: GLP-1R | GIPR | GCGR. Molecular Formula: Approx. C211H328N56O65 | Molecular Weight: ~4.8–5.0 kDa. Research areas: Incretin & glucagon biology | Energy-balance and nutrient-responsive signaling | Hepatic metabolic-pathway regulation | Islet-cell receptor modulation | Neuroendocrine metabolic-axis integration | Comparative multi-receptor pharmacology. Purity: ≥98% (HPLC-verified). Storage: -20°C. For laboratory research use only.",
  },
  5898: {
    productName: "SLU-PP 332 – 5MG",
    coa: [],
    additionalInfo:
      "SLU-PP-332 — Synthetic Small-Molecule Research Compound. Non-peptide heterocyclic compound for use in controlled laboratory environments. Chemical Profile: Molecular Formula: C18H14N2O2 | Compound Class: Synthetic small-molecule | Chemical Type: Non-peptide heterocyclic structure | Molecular Weight: ~290 g/mol. Research areas: Small-molecule mechanistic studies | Biochemical pathway modeling | Synthetic compound comparison assays | In-vitro systems evaluating molecular interactions. Purity: ≥99% (HPLC-verified). For laboratory research use only.",
  },
  5899: {
    productName: "SELANK – 10MG",
    coa: [
      "https://valkyriepeptides.com/wp-content/uploads/2026/04/VP-9715345-Selank-Purity-images-0-scaled.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2026/04/VP-9715345-Selank-Purity-images-1-scaled.jpg",
    ],
    additionalInfo:
      "SELANK — Neuroregulatory Research Peptide. Synthetic heptapeptide analogue derived from endogenous tetrapeptide tuftsin. Widely examined for involvement in neurological signaling, stress-response pathways, and cognitive-associated regulatory mechanisms. Research areas: Neurotransmitter-modulating activity including GABAergic and serotonergic pathways | Neurotrophic-factor expression particularly BDNF-associated signaling | Stress-response regulation including HPA-axis-related transcriptional activity | Cognitive-associated signaling examining markers linked to attention and processing speed | Immune-related pathways including tuftsin-derived immunomodulatory mechanisms. Format: Lyophilized powder. For laboratory research use only.",
  },
  5902: {
    productName: "NAD+ – 1000MG",
    coa: [
      "https://valkyriepeptides.com/wp-content/uploads/2026/04/VP-6690114-NAD-Purity-images-0-scaled.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2026/04/VP-6690114-NAD-Purity-images-1-scaled.jpg",
    ],
    additionalInfo:
      "NAD+ — Cellular Energy & Redox Research Coenzyme. NAD+ (Nicotinamide Adenine Dinucleotide) is an essential coenzyme examined for its central role in cellular energy metabolism, oxidation-reduction (redox) reactions, and DNA-repair-associated enzymatic pathways. Research areas: Electron-transport chain activity supporting mitochondrial respiration | Cofactor roles in the Krebs cycle | Sirtuin activation regulating stress response, inflammation, and metabolic homeostasis | PARP-mediated DNA repair | Age-related metabolic decline. Purity: ≥99% (HPLC-tested) | Storage: 2–8°C. For laboratory research use only.",
  },
  5905: {
    productName: "MELANOTAN 1 – 10MG",
    coa: [],
    additionalInfo:
      "Melanotan-1 — alpha-MSH Analogue for Melanocortin-Receptor Research. Synthetic analogue of alpha-melanocyte-stimulating hormone (α-MSH). 13-amino-acid peptide with two amino-acid substitutions for enhanced receptor affinity and molecular stability. Molecular Formula: C78H111N21O19 | Molecular Weight: 1646.87 g/mol | Other Names: MT-1, Afamelanotide. Receptor targets: MC1R (pigmentation) | MC2R (adrenal signaling) | MC3R (energy homeostasis and appetite) | MC4R (CNS metabolic and behavioral signaling) | MC5R (exocrine pathways). Research focus: MC1R selective affinity | cAMP signaling | MITF expression | downstream enzymatic activity in melanin synthesis. Format: Lyophilized powder. For laboratory research use only.",
  },
  5906: {
    productName: "L-GLUTATHIONE – 1000MG",
    coa: [],
    additionalInfo:
      "L-Glutathione — Tripeptide Antioxidant Research Compound. Naturally occurring tripeptide composed of glutamine, cysteine, and glycine. Structure: γ-glutamyl-cysteinyl-glycine. Molecular Formula: C10H17N3O6S | Molecular Weight: ~307 g/mol. Research areas: Redox-cycling activity (reduced GSH and oxidized GSSG states) | Enzymatic cofactor roles including glutathione peroxidase and glutathione reductase pathways | Protection against reactive oxygen species (ROS) | Maintenance of genomic stability under oxidative conditions | Regulation of intracellular antioxidant networks. Purity: ≥99% (HPLC-verified) | Storage: -20°C. For laboratory research use only.",
  },
  5907: {
    productName: "KLOW – 80MG",
    coa: [
      "https://valkyriepeptides.com/wp-content/uploads/2026/04/VP-9089847-KLOW-Purity_page-0001.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2026/04/VP-9089847-KLOW-Purity_page-0002.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2026/04/VP-9089847-KLOW-Purity_page-0003.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2026/04/VP-9089847-KLOW-Purity_page-0004.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2026/04/VP-9089847-KLOW-Purity_page-0005.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2026/04/VP-9089847-KLOW-Purity_page-0006.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2026/04/VP-9089847-KLOW-Purity_page-0007.jpg",
      "https://valkyriepeptides.com/wp-content/uploads/2026/04/VP-9089847-KLOW-Purity_page-0008.jpg",
    ],
    additionalInfo:
      "KLOW — Multi-Peptide Research Blend (80mg). Blend of four peptides: BPC-157 + GHK-Cu + TB-500 + KPV. Components: BPC-157 — extracellular-matrix dynamics, cell-migration pathways, gastrointestinal-associated research frameworks | GHK-Cu — copper-binding interactions, ECM-related signaling, oxidative-stress response pathways | TB-500 — actin-binding proteins, cytoskeletal organization, cell-motility research models | KPV — inflammatory-signaling pathways, immune-cell response profiles, peptide-mediated regulatory mechanisms. Format: Lyophilized powder, high-purity laboratory-verified. Storage: -20°C. For laboratory research use only.",
  },
  5916: {
    productName: "TESMORELIN IPA – 15MG",
    coa: [],
    additionalInfo:
      "Tesamorelin + Ipamorelin — Dual GH-Axis Research Peptide System. Complementary research peptides examined together for coordinated influence on GH axis signaling, pituitary-mediated pathways, and endocrine-related molecular activity. Tesamorelin (GHRH analogue): Stimulates pituitary GH release through GHRH-receptor activation | Influences IGF-1-related signaling pathways | Provides extended GH-pulse duration. Ipamorelin (selective GHS): Ghrelin-receptor-mediated GH-pulse initiation | Controlled GH-release patterns without affecting cortisol or prolactin | Comparative studies GHS vs GHRH analogues. Format: Lyophilized powder. For laboratory research use only.",
  },
  5917: {
    productName: "BAC WATER – 10ML",
    coa: [],
    additionalInfo:
      "Bacteriostatic Water (BAC Water) — 10mL Research-Grade Diluent. Sterile, non-pyrogenic aqueous solution preserved with 0.9% benzyl alcohol. Used for reconstitution and dilution of lyophilized research compounds. Key features: Sterile, non-pyrogenic | 0.9% benzyl alcohol preservative | Suitable for multi-entry use | Sealed 10mL vial. Specifications: Volume: 10mL | Preservative: 0.9% benzyl alcohol | Appearance: Clear sterile aqueous solution | Storage: Room temperature, protect from direct light. For laboratory research use only.",
  },
  5918: {
    productName: "GHRP-6 – 10MG",
    coa: [],
    additionalInfo:
      "GHRP-6 — Growth Hormone Releasing Peptide-6. Synthetic hexapeptide, growth hormone secretagogue (GHS). Studied for interaction with ghrelin receptor (GHS-R1a) and pituitary-mediated GH signaling. CAS Number: 87616-84-0 | Chemical Formula: C46H56N12O6 | Molecular Weight: 873.03 g/mol | Peptide Sequence: His-D-Trp-Ala-Trp-D-Phe-Lys-NH2. Research areas: Activation of GHS-R1a initiating GH-release signaling | Hypothalamic pathway modulation including somatostatin-related inhibition models | Evaluation of pulsatile GH secretion patterns | Endocrine-regulated metabolic-signaling pathways. Storage: 2–8°C short-term, -20°C long-term. For laboratory research use only.",
  },
  5919: {
    productName: "IGF-1 LR3 – 1MG",
    coa: [],
    additionalInfo:
      "IGF-1 LR3 — Long R3 Insulin-Like Growth Factor-1 (1mg). Synthetic 83-amino-acid polypeptide, long-acting analogue of endogenous IGF-1. Structural modifications: extended N-terminal region and substitution of arginine at position 3 for reduced IGFBP binding. Research areas: Reduced affinity for IGF-binding proteins increasing receptor interaction availability | Extended N-terminal structure with altered receptor-binding kinetics | Autocrine and paracrine signaling models | Tissue-distribution patterns | Comparative potency studies vs endogenous IGF-1. Storage: 2–8°C (long-term: -20°C). For laboratory research use only.",
  },
  5939: {
    productName: "IGF-1 LR3 – 1MG (Copy)",
    coa: [],
    additionalInfo:
      "IGF-1 LR3 — Long R3 Insulin-Like Growth Factor-1 (1mg). Synthetic 83-amino-acid polypeptide, long-acting analogue of endogenous IGF-1. Structural modifications: extended N-terminal region and substitution of arginine at position 3 for reduced IGFBP binding. Research areas: Reduced affinity for IGF-binding proteins increasing receptor interaction availability | Extended N-terminal structure with altered receptor-binding kinetics | Autocrine and paracrine signaling models | Tissue-distribution patterns. Storage: 2–8°C (long-term: -20°C). For laboratory research use only.",
  },
};

export { productTabs };
export default productTabs;

/**
 * Parses the additionalInfo string into structured sections for rendering.
 *
 * Format conventions in the source text:
 *   - " — " separates a name from its subtitle on the first "sentence"
 *   - " | " separates list items within a section
 *   - ". " separates prose sentences / section headers (e.g. "Research areas:")
 *
 * Returns:
 *   title   — the first sentence up to " — " (e.g. "TESAMORELIN")
 *   subtitle — the subtitle after " — " on the first sentence
 *   intro   — descriptive prose before any " | " list
 *   sections — array of { header?: string; items: string[] }
 *   footer  — trailing sentences like "Format: …" and disclaimer
 */
export interface ParsedTabInfo {
  title: string;
  subtitle: string;
  intro: string;
  sections: { header: string; items: string[] }[];
  footer: string[];
}

export function parseAdditionalInfo(text: string): ParsedTabInfo {
  // Split into raw pipe-separated segments first
  const segments = text.split(" | ").map((s) => s.trim());

  const firstSegment = segments[0];
  const restSegments = segments.slice(1);

  // Extract title / subtitle from the first segment's first sentence
  const firstDot = firstSegment.indexOf(". ");
  const firstSentence =
    firstDot !== -1 ? firstSegment.slice(0, firstDot) : firstSegment;
  const remainder =
    firstDot !== -1 ? firstSegment.slice(firstDot + 2) : "";

  const dashIdx = firstSentence.indexOf(" — ");
  const title = dashIdx !== -1 ? firstSentence.slice(0, dashIdx).trim() : firstSentence;
  const subtitle = dashIdx !== -1 ? firstSentence.slice(dashIdx + 3).trim() : "";

  // Everything in the first segment after the title sentence is intro prose,
  // minus any section header that ends with ":"
  // We'll split the remainder on ". " to detect the section header
  const introParts: string[] = [];
  const sections: { header: string; items: string[] }[] = [];
  const footer: string[] = [];

  let currentHeader = "";
  let currentItems: string[] = [];

  const flushSection = () => {
    if (currentHeader || currentItems.length > 0) {
      sections.push({ header: currentHeader, items: currentItems });
      currentHeader = "";
      currentItems = [];
    }
  };

  // Process the remainder of the first segment (after the title sentence)
  if (remainder) {
    // Check if remainder contains a section header (ends with ":")
    const sectionMatch = remainder.match(/^(.*?)([\w\s/-]+:\s*)$/s);
    if (sectionMatch) {
      if (sectionMatch[1].trim()) introParts.push(sectionMatch[1].trim());
      currentHeader = sectionMatch[2].replace(/:$/, "").trim();
    } else {
      // It may end mid-sentence feeding into rest segments
      // Check if the last "sentence" is a section header
      const sentences = remainder.split(". ");
      const lastSentence = sentences[sentences.length - 1];
      if (lastSentence.endsWith(":") && restSegments.length > 0) {
        if (sentences.length > 1) {
          introParts.push(sentences.slice(0, -1).join(". ") + ".");
        }
        currentHeader = lastSentence.slice(0, -1).trim();
      } else {
        introParts.push(remainder);
      }
    }
  }

  // Process rest segments (pipe-separated items)
  for (let i = 0; i < restSegments.length; i++) {
    const seg = restSegments[i];

    // Footer-like sentences appended to the last item
    // E.g. "last item. Format: Lyophilized powder. For laboratory research use only."
    // Detect by checking if we're on the last segment and it has " sentences after items"
    const dotIdx = seg.lastIndexOf(". ");
    const afterDot = dotIdx !== -1 ? seg.slice(dotIdx + 2).trim() : "";
    const beforeDot = dotIdx !== -1 ? seg.slice(0, dotIdx).trim() : seg;

    // A segment is a footer segment if it starts with recognised footer keywords
    const isFooterSegment =
      /^(Format:|Storage:|Purity:|For laboratory|Not FDA|Not approved)/i.test(seg);

    if (isFooterSegment) {
      flushSection();
      // Split on ". " and push each sentence to footer
      seg.split(". ").forEach((s) => {
        const t = s.trim().replace(/\.$/, "");
        if (t) footer.push(t);
      });
      continue;
    }

    // Check if the segment itself ends with a new section header "…: "
    // e.g. "item text. Next Section:"
    if (dotIdx !== -1 && afterDot.endsWith(":") && i < restSegments.length - 1) {
      currentItems.push(beforeDot);
      flushSection();
      currentHeader = afterDot.slice(0, -1).trim();
    } else if (seg.endsWith(":") && i < restSegments.length - 1) {
      // This whole segment is a transition to a new section header
      flushSection();
      currentHeader = seg.slice(0, -1).trim();
    } else {
      // Normal list item, but check for trailing footer sentences
      const footerKeywords = /\. (Format:|Storage:|Purity:|For laboratory|Not FDA|Not approved)/i;
      const footerMatch = seg.match(footerKeywords);
      if (footerMatch && footerMatch.index !== undefined) {
        const itemPart = seg.slice(0, footerMatch.index).trim();
        const footerPart = seg.slice(footerMatch.index + 2).trim();
        if (itemPart) currentItems.push(itemPart);
        flushSection();
        footerPart.split(". ").forEach((s) => {
          const t = s.trim().replace(/\.$/, "");
          if (t) footer.push(t);
        });
      } else {
        currentItems.push(seg);
      }
    }
  }

  flushSection();

  return {
    title,
    subtitle,
    intro: introParts.join(" ").trim(),
    sections,
    footer,
  };
}
