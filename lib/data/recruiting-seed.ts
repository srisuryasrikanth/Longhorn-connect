import type { SeedAlumniProfile } from "@/lib/types";

type RecruitingSeedRow = {
  fullName: string;
  company: string;
  jobTitle: string;
  location: string;
  companyDomain: string;
  linkedInUrl: string;
  postMbaFit: "High" | "Medium" | "Low";
  rationale: string;
};

const BIG_TECH_COMPANIES = new Set([
  "Amazon",
  "Anthropic",
  "Coder",
  "Dell Technologies",
  "GE HealthCare",
  "Google",
  "HubSpot",
  "Indeed",
  "Meta",
  "Rakuten",
  "ServiceNow",
  "Vultr"
]);

const FORTUNE_500_COMPANIES = new Set([
  "Cook Children's Health Care System",
  "Diamond Offshore",
  "Ford Motor Company",
  "GE HealthCare",
  "James Hardie",
  "Lowe's Companies, Inc.",
  "Northwestern Mutual",
  "The Hershey Company"
]);

const INVESTING_COMPANIES = new Set(["Freestone Capital Management", "Mercuria Energy America", "Vista Equity Partners"]);

const STARTUP_COMPANIES = new Set(["Atticus", "Just Appraised"]);

const STAFFING_KEYWORDS = [
  "recruit",
  "talent acquisition",
  "executive search",
  "staffing",
  "search firm",
  "searchlight",
  "career services"
];

const STAR_COUNT_BY_FIT: Record<RecruitingSeedRow["postMbaFit"], number> = {
  High: 18,
  Medium: 12,
  Low: 8
};

const recruitingSeedRows: RecruitingSeedRow[] = [
  { "fullName": "Juan Manuel Trevino Cerna", "company": "Google", "jobTitle": "Technical Recruiter, AI/ML", "location": "Austin, Texas Metropolitan Area", "companyDomain": "google.com", "linkedInUrl": "https://www.linkedin.com/in/juanmanueltrevinocerna/", "postMbaFit": "High", "rationale": "Google - top tech employer for MBAs (PM, strategy, BD, marketing). AI/ML recruiter is highly relevant." },
  { "fullName": "Maria Kryuchkova", "company": "Meta", "jobTitle": "Senior Technical Rectuiter (Infra Data Center FacOps)", "location": "Austin, Texas Metropolitan Area", "companyDomain": "meta.com", "linkedInUrl": "https://www.linkedin.com/in/maria-kryuchkova-830848b5/", "postMbaFit": "High", "rationale": "Meta - major MBA employer (PM, data, strategy, ops). Infra recruiter narrows the function but brand fit is strong." },
  { "fullName": "Scott Wu", "company": "Rakuten", "jobTitle": "General Manager, Conversational AI; Director, AI Safety Engineering", "location": "Greater Seattle Area, United States", "companyDomain": "", "linkedInUrl": "https://www.linkedin.com/in/scottwu/", "postMbaFit": "High", "rationale": "Rakuten - global tech/commerce company; AI leadership roles attractive to MBAs." },
  { "fullName": "Katie Curran", "company": "Amazon", "jobTitle": "Director of North America Sourcing", "location": "Seattle, Washington, United States", "companyDomain": "amazon.com", "linkedInUrl": "https://www.linkedin.com/in/katie-curran-35081b/", "postMbaFit": "High", "rationale": "Amazon - large MBA employer (Pathways, senior PM, operations leadership)." },
  { "fullName": "Hannah Voss", "company": "HubSpot", "jobTitle": "Technical Sourcing Recruiter", "location": "Austin, Texas, United States", "companyDomain": "hubspot.com", "linkedInUrl": "https://www.linkedin.com/in/hannahelizabethkayvoss/", "postMbaFit": "High", "rationale": "HubSpot - established SaaS company that hires MBAs in PM, marketing, and strategy." },
  { "fullName": "Dani Brown", "company": "Google", "jobTitle": "Recruiter", "location": "Austin, Texas, United States", "companyDomain": "google.com", "linkedInUrl": "https://www.linkedin.com/in/danigodino/", "postMbaFit": "High", "rationale": "Google - Austin-based generalist recruiter." },
  { "fullName": "Janice Dupré", "company": "Lowe's Companies, Inc.", "jobTitle": "Executive Vice President of Human Resources & Chief Diversity Officer", "location": "Charlotte Metro", "companyDomain": "lowes.com", "linkedInUrl": "https://www.linkedin.com/in/janice-dupré-0410ab1/", "postMbaFit": "High", "rationale": "Lowe's - Fortune 500 retailer with structured MBA leadership programs; EVP HR is a senior contact." },
  { "fullName": "McKenzie Cornish", "company": "The Hershey Company", "jobTitle": "Senior Talent Acquisition Recruiter - Supply Chain & Engineering", "location": "United States, United States", "companyDomain": "thehersheycompany.com", "linkedInUrl": "https://www.linkedin.com/in/mckenzie-cornish-710933b5/", "postMbaFit": "High", "rationale": "Hershey - CPG company with MBA brand, finance, and supply chain pathways." },
  { "fullName": "Natallia Miniuk, SPHR", "company": "James Hardie", "jobTitle": "Manager, Early Career Recruitment", "location": "Dallas-Fort Worth Metroplex, United States", "companyDomain": "", "linkedInUrl": "https://www.linkedin.com/in/natallia-miniuk/", "postMbaFit": "High", "rationale": "James Hardie - building products company with early-career hiring relevant for an MBA pipeline." },
  { "fullName": "Nathan Srulowitz", "company": "Indeed", "jobTitle": "Principal Technical Recruiter - Global R&D", "location": "Austin, Texas, United States", "companyDomain": "indeed.com", "linkedInUrl": "https://www.linkedin.com/in/nathan-srulowitz-71a1401b/", "postMbaFit": "High", "rationale": "Indeed - major tech employer; principal R&D recruiter signals seniority." },
  { "fullName": "Stacy Garrison", "company": "Dell Technologies", "jobTitle": "Executive Talent Acquisition Recruiter", "location": "Austin, Texas, United States", "companyDomain": "dell.com", "linkedInUrl": "https://www.linkedin.com/in/stacy-garrison-7995593/", "postMbaFit": "High", "rationale": "Dell - Fortune 500 tech HQ in Austin with structured MBA hiring in strategy, finance, and PM." },
  { "fullName": "Rachel Robillard", "company": "Northwestern Mutual", "jobTitle": "Talent Acquisition Specialist", "location": "Los Angeles, California, United States", "companyDomain": "northwesternmutual.com", "linkedInUrl": "https://www.linkedin.com/in/rachelrobillard/", "postMbaFit": "High", "rationale": "Northwestern Mutual - Fortune 500 financial services employer with established MBA programs." },
  { "fullName": "Nick B.", "company": "Anthropic", "jobTitle": "GTM Recruiting", "location": "Austin, Texas, United States", "companyDomain": "", "linkedInUrl": "https://www.linkedin.com/in/nicholasbludau/", "postMbaFit": "High", "rationale": "Anthropic - top AI lab; GTM recruiter is directly relevant for MBA commercial and strategy roles." },
  { "fullName": "Ellen D.", "company": "Dell Technologies", "jobTitle": "Talent Acquisition, Sr Technical Recruiter - Embracing Diversity for Workplace Success", "location": "Austin, Texas Metropolitan Area, United States", "companyDomain": "dell.com", "linkedInUrl": "https://www.linkedin.com/in/ellen-d-0913816/", "postMbaFit": "High", "rationale": "Dell - senior technical recruiter at a major Austin employer." },
  { "fullName": "Melissa Thompson", "company": "Ford Motor Company", "jobTitle": "Global Head of Talent Acquisition", "location": "McKinney, Texas, United States", "companyDomain": "ford.com", "linkedInUrl": "https://www.linkedin.com/in/mcthompson1/", "postMbaFit": "High", "rationale": "Ford - Fortune 500 automaker with structured MBA programs in strategy, finance, and product." },
  { "fullName": "Cas Fangmbeng", "company": "Vista Equity Partners", "jobTitle": "Director | Head of Experienced Hire Recruiting", "location": "Austin, Texas Metropolitan Area", "companyDomain": "vistaequitypartners.com", "linkedInUrl": "https://www.linkedin.com/in/casfangmbeng/", "postMbaFit": "High", "rationale": "Vista Equity Partners - top PE firm; experienced-hire recruiting is a prime MBA contact point." },
  { "fullName": "Lauren Martinez", "company": "ServiceNow", "jobTitle": "Manager, Talent Acquisition - Early in Career Recruiting", "location": "Houston, Texas, United States", "companyDomain": "servicenow.com", "linkedInUrl": "https://www.linkedin.com/in/lauren-martinez-5b1228a7/", "postMbaFit": "High", "rationale": "ServiceNow - enterprise SaaS leader with strong MBA hiring in PM, strategy, and GTM." },
  { "fullName": "Vaishnavi Venugopal", "company": "GE HealthCare", "jobTitle": "Lead Technical Recruiter(Science & Technology Org)", "location": "San Jose, California, United States", "companyDomain": "gehealthcare.com", "linkedInUrl": "https://www.linkedin.com/in/vaishnavi-venugopal/", "postMbaFit": "High", "rationale": "GE HealthCare - healthcare technology company with structured MBA programs." },
  { "fullName": "Amy Yu", "company": "Atticus", "jobTitle": "Head of People & Talent", "location": "Marina del Rey, California, United States", "companyDomain": "atticus.com", "linkedInUrl": "https://www.linkedin.com/in/amy-yu-3478185b/", "postMbaFit": "Medium", "rationale": "Atticus - legal-tech startup; Head of People hires across functions, including ops and strategy." },
  { "fullName": "Rodrigo Malta", "company": "McCombs School of Business, The University of Texas at Austin", "jobTitle": "Assistant Dean, MBA Marketing, Recruiting and Admissions", "location": "Austin, Texas, United States", "companyDomain": "utexas.edu", "linkedInUrl": "https://www.linkedin.com/in/sitti-nurlina-2042b3174/", "postMbaFit": "Medium", "rationale": "McCombs admissions - useful networking contact, even though it is not a post-MBA employer." },
  { "fullName": "Matt Gass", "company": "Just Appraised", "jobTitle": "Sr Recruiter", "location": "Denver Metropolitan Area, United States", "companyDomain": "justappraised.com", "linkedInUrl": "https://www.linkedin.com/in/matt-gass/", "postMbaFit": "Medium", "rationale": "Just Appraised - govtech startup with some MBA-suitable ops and PM roles." },
  { "fullName": "Nidhi Somani", "company": "Surescripts", "jobTitle": "Technical Recruiter", "location": "O'Fallon, Missouri, United States", "companyDomain": "surescripts.com", "linkedInUrl": "https://www.linkedin.com/in/nidhisomanikabra/", "postMbaFit": "Medium", "rationale": "Surescripts - healthcare technology company with some MBA roles in PM and strategy." },
  { "fullName": "Brooke Donohue", "company": "Diamond Offshore", "jobTitle": "Director, Global HR Operations & Talent", "location": "Houston, Texas, United States", "companyDomain": "noblecorp.com", "linkedInUrl": "https://www.linkedin.com/in/brooke-donohue-97a39a12/", "postMbaFit": "Medium", "rationale": "Diamond Offshore - energy services employer with some MBA strategy and finance roles." },
  { "fullName": "Nicole Bowers", "company": "Freestone Capital Management", "jobTitle": "Managing Director, People - Talent Acquisition", "location": "Seattle, Washington, United States", "companyDomain": "", "linkedInUrl": "https://www.linkedin.com/in/nicole-bowers-3394511a/", "postMbaFit": "Medium", "rationale": "Freestone Capital - wealth management firm with MBA fit in investor relations and product management, but at a smaller scale." },
  { "fullName": "Kim Cummings, SPHR, SCP, CDE", "company": "Cook Children's Health Care System", "jobTitle": "Vice President HR Operations and Talent", "location": "Dallas-Fort Worth Metroplex", "companyDomain": "cookchildrens.org", "linkedInUrl": "https://www.linkedin.com/in/kimcummings/", "postMbaFit": "Medium", "rationale": "Cook Children's - large health system with some MBA administration and strategy fellowships." },
  { "fullName": "Evonne B.", "company": "McCarthy Building Companies, Inc.", "jobTitle": "Talent Acquisition Business Partner", "location": "Dallas-Fort Worth Metroplex, United States", "companyDomain": "mccarthy.com", "linkedInUrl": "https://www.linkedin.com/in/evonnebrazell/", "postMbaFit": "Medium", "rationale": "McCarthy Building - large construction firm with some MBA operations and project roles." },
  { "fullName": "John Christopher Beam, MBA", "company": "RigUp", "jobTitle": "Upstream Oil & Gas Recruiter", "location": "Austin, Texas, United States", "companyDomain": "rigup.com", "linkedInUrl": "https://www.linkedin.com/in/john-christopher-beam-mba-695489252/", "postMbaFit": "Medium", "rationale": "RigUp/Workrise - Austin energy-tech company with PM and operations roles for MBAs." },
  { "fullName": "Connor Brim", "company": "Coder", "jobTitle": "Recruiting Manager", "location": "Austin, Texas, United States", "companyDomain": "coder.com", "linkedInUrl": "https://www.linkedin.com/in/connorbrim/", "postMbaFit": "Medium", "rationale": "Coder - Austin developer-tools startup with PM and GTM roles plausible for MBAs." },
  { "fullName": "Heather McCullough", "company": "Vultr", "jobTitle": "Technical Talent Acquisition Specialist, The Everywhere Cloud // We're hiring!", "location": "Houston, Texas, United States", "companyDomain": "vultr.com", "linkedInUrl": "https://www.linkedin.com/in/heather-mccullough-84455620/", "postMbaFit": "Medium", "rationale": "Vultr - cloud infrastructure company with MBA fit in product and marketing." },
  { "fullName": "Michael Jarvis", "company": "Litera", "jobTitle": "Head, Global Talent Acquisition", "location": "Fort Worth, Texas, United States", "companyDomain": "litera.com", "linkedInUrl": "https://www.linkedin.com/in/michael-jarvis-b566272/", "postMbaFit": "Medium", "rationale": "Litera - legal-tech company with PM and strategy roles for MBAs." },
  { "fullName": "Arta Brending", "company": "Mercuria Energy America", "jobTitle": "Head of Human Resources , North America", "location": "Houston, Texas, United States", "companyDomain": "", "linkedInUrl": "https://www.linkedin.com/in/arta-brending-bb230330/", "postMbaFit": "Medium", "rationale": "Mercuria - global commodities trader with MBA fit in finance and trading operations." },
  { "fullName": "Emily Phipps, CTR", "company": "evolv Consulting", "jobTitle": "Director: Talent Acquisition", "location": "United States, United States", "companyDomain": "evolvconsulting.com", "linkedInUrl": "https://www.linkedin.com/in/emilyadele/", "postMbaFit": "Low", "rationale": "Boutique consulting and staffing firm with limited structured post-MBA hiring." },
  { "fullName": "John Zink", "company": "Taurean", "jobTitle": "Founder", "location": "Manhattan Beach, California, United States", "companyDomain": "taureanco.com", "linkedInUrl": "https://www.linkedin.com/in/zinkjohn/", "postMbaFit": "Low", "rationale": "Taurean - small founder-led firm, not a typical MBA destination." },
  { "fullName": "Susan Nordqvist", "company": "Broadband Dynamics", "jobTitle": "Director Talent Acquisition", "location": "Scottsdale, Arizona, United States", "companyDomain": "broadbanddynamics.com", "linkedInUrl": "https://www.linkedin.com/in/susan-nordqvist-56a42787/", "postMbaFit": "Low", "rationale": "Broadband Dynamics - small niche firm with limited post-MBA roles." },
  { "fullName": "Warren Edwards", "company": "River of Talent", "jobTitle": "Founder", "location": "San Jose, California, United States", "companyDomain": "riveroftalent.com", "linkedInUrl": "https://www.linkedin.com/in/warrenfromaustin/", "postMbaFit": "Low", "rationale": "River of Talent - staffing and search firm." },
  { "fullName": "Anna Kessler", "company": "The Xela Group", "jobTitle": "Director of Recruiting", "location": "United States", "companyDomain": "thexelagroup.com", "linkedInUrl": "https://www.linkedin.com/in/anna-kessler-047852115/", "postMbaFit": "Low", "rationale": "The Xela Group - recruiting agency." },
  { "fullName": "Emma James", "company": "ABC Global Tech Solutions", "jobTitle": "Vice President Talent Acquisition", "location": "Jacksonville, Florida, United States", "companyDomain": "", "linkedInUrl": "https://www.linkedin.com/in/emma-james-69a5483b7/", "postMbaFit": "Low", "rationale": "ABC Global Tech Solutions - small or unclear employer." },
  { "fullName": "Edgar Guzman", "company": "Volks Resources", "jobTitle": "Recruitment Manager", "location": "Dallas-Fort Worth Metroplex, United States", "companyDomain": "volksresources.com", "linkedInUrl": "https://www.linkedin.com/in/edgar-guzman-mba-85b40411/", "postMbaFit": "Low", "rationale": "Volks Resources - staffing firm." },
  { "fullName": "Abigail Barry", "company": "ABLOG Executive Search", "jobTitle": "Product Marketing, Logistics, Engineering and Supply Chain Recruiter", "location": "Houston, Texas, United States", "companyDomain": "", "linkedInUrl": "https://www.linkedin.com/in/abigail-barry-574320347/", "postMbaFit": "Low", "rationale": "ABLOG - executive search firm." },
  { "fullName": "Casey Wolters", "company": "OVERWATCH", "jobTitle": "Vice President Recruiting Operations & Delivery", "location": "Austin, Texas Metropolitan Area, United States", "companyDomain": "", "linkedInUrl": "https://www.linkedin.com/in/casey-wolters-lion-a522292/", "postMbaFit": "Low", "rationale": "OVERWATCH - niche recruiting and services firm." },
  { "fullName": "Alex Novakovic", "company": "MMI Industries", "jobTitle": "Talent Acquisition Manager", "location": "Fort Lauderdale, Florida, United States", "companyDomain": "", "linkedInUrl": "https://www.linkedin.com/in/alexnovakovic/", "postMbaFit": "Low", "rationale": "MMI Industries - small industrial firm." },
  { "fullName": "Anthony Halfman", "company": "Oakland County, Michigan Government", "jobTitle": "Human Resources Analyst - Talent Acquisition", "location": "Troy, Michigan, United States", "companyDomain": "oakgov.com", "linkedInUrl": "https://www.linkedin.com/in/anthonyhalfman/", "postMbaFit": "Low", "rationale": "County government HR with a public sector analyst focus." },
  { "fullName": "Tiffany Clanton", "company": "Advanced Call Center Technologies, LLC", "jobTitle": "Vice President Of Recruiting", "location": "Dallas-Fort Worth Metroplex, United States", "companyDomain": "", "linkedInUrl": "https://www.linkedin.com/in/tiffany-clanton-6808b78/", "postMbaFit": "Low", "rationale": "Call center services firm with limited MBA fit." },
  { "fullName": "Franny Oxford", "company": "Texas United Management Corporation", "jobTitle": "Senior Director of Human Resources", "location": "Houston, Texas, United States", "companyDomain": "", "linkedInUrl": "https://www.linkedin.com/in/frannyoxford/", "postMbaFit": "Low", "rationale": "Texas United Management - small private holding company." },
  { "fullName": "John Hagan", "company": "Hagan Law Group LLC", "jobTitle": "Board Certified Labor and Employment Attorney", "location": "Dallas-Fort Worth Metroplex", "companyDomain": "", "linkedInUrl": "https://www.linkedin.com/in/john-hagan-a3b4064/", "postMbaFit": "Low", "rationale": "Solo law practice rather than a corporate hiring channel." },
  { "fullName": "Robin Lilly", "company": "Unity Search", "jobTitle": "Senior Sales Representative - Recruiting Solutions", "location": "Dallas-Fort Worth Metroplex, United States", "companyDomain": "unitysearch.com", "linkedInUrl": "https://www.linkedin.com/in/robinlilly/", "postMbaFit": "Low", "rationale": "Unity Search - staffing firm." },
  { "fullName": "Damien Richburg, MBA, CFA", "company": "recruitAbility", "jobTitle": "Vice President - Direct Hire & Contract Recruiting Services", "location": "Austin, Texas Metropolitan Area, United States", "companyDomain": "therecruitability.com", "linkedInUrl": "https://www.linkedin.com/in/damienrichburg/", "postMbaFit": "Low", "rationale": "recruitAbility - staffing firm." },
  { "fullName": "Derek Felderhoff, MBA, SHRM-SCP, CPSP", "company": "512Financial", "jobTitle": "Director of People & Operations", "location": "Austin, Texas, United States", "companyDomain": "", "linkedInUrl": "https://www.linkedin.com/in/derek-felderhoff-mba-shrm-scp-cpsp-80960213/", "postMbaFit": "Low", "rationale": "512Financial - small Austin employer." },
  { "fullName": "Michelle Villarreal", "company": "VillaSource", "jobTitle": "Senior Executive Recruiter", "location": "Port Lavaca, Texas, United States", "companyDomain": "", "linkedInUrl": "https://www.linkedin.com/in/michelle-villarreal-6b151036/", "postMbaFit": "Low", "rationale": "VillaSource - executive search firm." },
  { "fullName": "Ella I.", "company": "TechTeems", "jobTitle": "Technical Recruiter", "location": "Austin, Texas, United States", "companyDomain": "techteems.com", "linkedInUrl": "https://www.linkedin.com/in/ella-i-8a603229a/", "postMbaFit": "Low", "rationale": "TechTeems - small staffing firm." },
  { "fullName": "Andrew Duquet", "company": "SearchLight Systems (Semiconductor & Systems Recruiting)", "jobTitle": "Owner / Recruiter", "location": "San Francisco Bay Area", "companyDomain": "selfemployed.com", "linkedInUrl": "https://www.linkedin.com/in/andrew-duquet-06237b4a/", "postMbaFit": "Low", "rationale": "SearchLight - semiconductor recruiting boutique." },
  { "fullName": "Zachary White", "company": "Technicon Design", "jobTitle": "Client Manager/Recruiter", "location": "Mocksville, North Carolina, United States", "companyDomain": "technicondesign.com", "linkedInUrl": "https://www.linkedin.com/in/zachary-white-308449142/", "postMbaFit": "Low", "rationale": "Technicon Design - engineering staffing." },
  { "fullName": "James Mancha", "company": "ReMarkable Career", "jobTitle": "Recruiting Manager", "location": "Austin, Texas, United States", "companyDomain": "", "linkedInUrl": "https://www.linkedin.com/in/jamesmancha/", "postMbaFit": "Low", "rationale": "ReMarkable Career - career services firm." },
  { "fullName": "Paula Harvey, SHRM-SCP", "company": "Schulte Building Systems, Inc.", "jobTitle": "Vice President Human Resources/Safety", "location": "Hockley, Texas, United States", "companyDomain": "sbslp.com", "linkedInUrl": "https://www.linkedin.com/in/paula-harvey-shrm-scp-sphr-gphr-1b34771/", "postMbaFit": "Low", "rationale": "Schulte Building - mid-size private firm with narrower MBA fit." },
  { "fullName": "Katey McGregor Ross", "company": "Tactacam LLC", "jobTitle": "Chief Human Resources Officer | HR & Corporate Communications Leader", "location": "Austin, Texas, United States", "companyDomain": "", "linkedInUrl": "https://www.linkedin.com/in/kateymcgregor/", "postMbaFit": "Low", "rationale": "Tactacam - small consumer hardware firm." },
  { "fullName": "Clémence Clédat", "company": "Frenchfounders", "jobTitle": "Principal - Recruitment practice", "location": "United States, United States", "companyDomain": "", "linkedInUrl": "https://www.linkedin.com/in/clã©mence-clã©dat-26698221/", "postMbaFit": "Low", "rationale": "Frenchfounders - networking and recruitment practice." },
  { "fullName": "Stephanie Wing", "company": "WING & ASSOCIATES, LLC EXECUTIVE SEARCH", "jobTitle": "Co-Owner/Recruiter", "location": "United States, United States", "companyDomain": "wingassociates.com", "linkedInUrl": "https://www.linkedin.com/in/stephanie-wing-a53273b/", "postMbaFit": "Low", "rationale": "Wing & Associates - executive search firm." },
  { "fullName": "Diyaa Dossani", "company": "Communication Council", "jobTitle": "Recruitment Captain", "location": "Dallas-Fort Worth Metroplex", "companyDomain": "utexas.org", "linkedInUrl": "https://www.linkedin.com/in/diyaavdossani/", "postMbaFit": "Low", "rationale": "Communication Council - small or unclear organization." }
];

function normalizeSeedText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function slugify(value: string): string {
  return normalizeSeedText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeLocation(value: string): string {
  const normalized = normalizeSeedText(value)
    .replace(", United States", "")
    .replace("United States, United States", "United States");

  const replacements: Record<string, string> = {
    "Austin, Texas": "Austin, TX",
    "Austin, Texas Metropolitan Area": "Austin, TX",
    "Charlotte Metro": "Charlotte, NC",
    "Dallas-Fort Worth Metroplex": "Dallas-Fort Worth, TX",
    "Dallas-Fort Worth Metroplex, United States": "Dallas-Fort Worth, TX",
    "Denver Metropolitan Area, United States": "Denver, CO",
    "Fort Worth, Texas": "Fort Worth, TX",
    "Greater Seattle Area, United States": "Seattle, WA",
    "Hockley, Texas": "Hockley, TX",
    "Houston, Texas": "Houston, TX",
    "Jacksonville, Florida": "Jacksonville, FL",
    "Los Angeles, California": "Los Angeles, CA",
    "Manhattan Beach, California": "Manhattan Beach, CA",
    "Marina del Rey, California": "Marina del Rey, CA",
    "McKinney, Texas": "McKinney, TX",
    "Mocksville, North Carolina": "Mocksville, NC",
    "O'Fallon, Missouri": "O'Fallon, MO",
    "Port Lavaca, Texas": "Port Lavaca, TX",
    "San Francisco Bay Area": "San Francisco Bay Area",
    "San Jose, California": "San Jose, CA",
    "Scottsdale, Arizona": "Scottsdale, AZ",
    "Seattle, Washington": "Seattle, WA",
    "Troy, Michigan": "Troy, MI",
    "United States": "Remote"
  };

  return replacements[normalized] ?? normalized;
}

function includesKeyword(value: string, keywords: string[]): boolean {
  return keywords.some((keyword) => value.includes(keyword));
}

function inferCompanyType(row: RecruitingSeedRow): string {
  const company = normalizeSeedText(row.company);
  const haystack = normalizeSeedText(`${row.company} ${row.jobTitle} ${row.rationale} ${row.companyDomain}`).toLowerCase();

  if (row.companyDomain === "utexas.edu" || row.companyDomain === "utexas.org" || haystack.includes("school of business")) {
    return "Education";
  }

  if (haystack.includes("government") || haystack.includes("county")) {
    return "Public Sector";
  }

  if (INVESTING_COMPANIES.has(company)) {
    return "Investing";
  }

  if (includesKeyword(haystack, STAFFING_KEYWORDS)) {
    return "Staffing & Search";
  }

  if (BIG_TECH_COMPANIES.has(company)) {
    return "Big Tech";
  }

  if (FORTUNE_500_COMPANIES.has(company) || haystack.includes("fortune 500")) {
    return "Fortune 500";
  }

  if (STARTUP_COMPANIES.has(company) || haystack.includes("startup")) {
    return "Startup";
  }

  if (haystack.includes("consulting")) {
    return "Consulting";
  }

  if (haystack.includes("health system")) {
    return "Healthcare";
  }

  return "Growth Stage";
}

function inferIndustry(row: RecruitingSeedRow): string {
  const haystack = normalizeSeedText(`${row.company} ${row.jobTitle} ${row.rationale} ${row.companyDomain}`).toLowerCase();

  if (includesKeyword(haystack, STAFFING_KEYWORDS)) {
    return "Talent Acquisition";
  }

  if (haystack.includes("school of business") || row.companyDomain === "utexas.edu" || row.companyDomain === "utexas.org") {
    return "Education";
  }

  if (haystack.includes("government") || haystack.includes("county")) {
    return "Public Sector";
  }

  if (haystack.includes("health") || haystack.includes("medical")) {
    return "Healthcare";
  }

  if (haystack.includes("equity") || haystack.includes("capital") || haystack.includes("financial") || haystack.includes("commodities")) {
    return "Finance";
  }

  if (haystack.includes("oil") || haystack.includes("gas") || haystack.includes("energy")) {
    return "Energy";
  }

  if (haystack.includes("law") || haystack.includes("legal")) {
    return "Legal";
  }

  if (haystack.includes("building") || haystack.includes("construction")) {
    return "Construction";
  }

  if (haystack.includes("hardware") || haystack.includes("semiconductor")) {
    return "Hardware";
  }

  if (haystack.includes("retail") || haystack.includes("consumer")) {
    return "Consumer";
  }

  if (haystack.includes("call center")) {
    return "Business Services";
  }

  if (
    haystack.includes("tech") ||
    haystack.includes("software") ||
    haystack.includes("cloud") ||
    haystack.includes("saas") ||
    haystack.includes("ai")
  ) {
    return "Technology";
  }

  return "Business Services";
}

function inferFocus(row: RecruitingSeedRow, industry: string): string {
  const haystack = normalizeSeedText(`${row.jobTitle} ${row.rationale}`).toLowerCase();

  if (haystack.includes("finance") || haystack.includes("equity") || haystack.includes("capital") || haystack.includes("trading")) {
    return "Finance";
  }

  if (haystack.includes("supply chain") || haystack.includes("operations")) {
    return "Operations";
  }

  if (haystack.includes("product") || haystack.includes("pm")) {
    return "Product Management";
  }

  if (haystack.includes("marketing") || haystack.includes("gtm")) {
    return "Marketing";
  }

  if (haystack.includes("strategy")) {
    return "Strategy";
  }

  if (industry === "Healthcare") {
    return "Healthcare Administration";
  }

  if (industry === "Energy") {
    return "Energy Operations";
  }

  if (industry === "Finance") {
    return "Finance";
  }

  return "Talent Acquisition";
}

function buildHelpTopics(focus: string, industry: string, fit: RecruitingSeedRow["postMbaFit"]): string {
  return [...new Set(["MBA recruiting", focus, industry, `${fit.toLowerCase()} fit roles`])].join(",");
}

function buildBio(row: RecruitingSeedRow): string {
  const companyDomain = row.companyDomain ? ` Domain: ${row.companyDomain}.` : "";
  return `${row.fullName} is a ${row.jobTitle} at ${row.company}. ${normalizeSeedText(row.rationale)}${companyDomain} LinkedIn: ${row.linkedInUrl}`;
}

function buildRecruitingSeedProfiles(rows: RecruitingSeedRow[]): SeedAlumniProfile[] {
  return rows.map((row) => {
    const companyType = inferCompanyType(row);
    const industry = inferIndustry(row);
    const major = inferFocus(row, industry);
    const slug = slugify(row.fullName);

    return {
      slug,
      fullName: normalizeSeedText(row.fullName),
      currentJobTitle: normalizeSeedText(row.jobTitle),
      company: normalizeSeedText(row.company),
      companyType,
      industry,
      location: normalizeLocation(row.location),
      degree: "",
      major,
      graduationYear: 0,
      email: `contact-${slug}@longhorn.invalid`,
      bio: buildBio(row),
      helpTopics: buildHelpTopics(major, industry, row.postMbaFit),
      starCount: STAR_COUNT_BY_FIT[row.postMbaFit]
    };
  });
}

export const recruitingSeedProfiles: SeedAlumniProfile[] = buildRecruitingSeedProfiles(recruitingSeedRows);
