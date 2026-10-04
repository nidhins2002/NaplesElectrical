export interface FAQItem {
  question: string;
  answer: string;
}

export interface BenefitItem {
  title: string;
  desc: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  tagline: string;
  heroImage: string;
  badge: string;
  category: "residential" | "commercial";
  metaTitle: string;
  metaDescription: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: BenefitItem[];
  faqs: FAQItem[];
  disabled?: boolean;
}

export const SERVICES: ServiceData[] = [
  // RESIDENTIAL SERVICES
  {
    slug: "lighting-installation",
    title: "Custom Interior & Exterior Lighting",
    tagline: "Transform your home ambiance with modern, energy-efficient lighting solutions.",
    heroImage: "/images/lighting-installation.jpg",
    badge: "Popular Residential Service",
    category: "residential",
    metaTitle: "Custom Interior & Exterior Lighting Installation Naples FL | Naples Electrical",
    metaDescription: "Professional recessed lighting, chandeliers, landscape lighting, and LED upgrades in Naples, Marco Island, and Bonita Springs. Licensed & insured electricians.",
    description: "Recessed lighting, accent LEDs, chandeliers, and outdoor landscape illumination tailored for coastal homes.",
    longDescription: "Lighting defines the atmosphere and functionality of your SWFL luxury home. Naples Electrical specializes in high-end interior lighting designs—including low-profile recessed cans, custom chandeliers, under-cabinet LED strips—as well as weather-resistant exterior accent and landscape lighting that withstands Florida's tropical environment.",
    features: [
      "Low-voltage LED landscape & architectural lighting",
      "Recessed pot light & downlight retrofits",
      "Custom chandelier, pendant & linear island fixtures",
      "Under-cabinet & cove ambient LED accent lighting",
      "Smart dimmer switch & automated lighting scene integration",
      "Pool deck, lanai & patio perimeter illumination"
    ],
    benefits: [
      { title: "Energy Efficiency", desc: "Reduce electricity bills by up to 80% with premium dimmable LED fixtures." },
      { title: "Enhanced Home Value", desc: "Modern lighting updates significantly boost aesthetic appeal and resale value." },
      { title: "Coastal Weather Resistance", desc: "Marine-grade stainless steel & brass exterior fixtures designed for salt air." }
    ],
    faqs: [
      {
        question: "How long does a typical recessed lighting installation take?",
        answer: "Most standard room installations (4–8 lights with dimmers) can be completed within a single day with minimal disruption to your home."
      },
      {
        question: "Can you upgrade existing halogen lighting to energy-efficient LEDs?",
        answer: "Yes! We specialize in retrofitting old halogen and incandescent fixtures with modern high-CRI LEDs that cut energy use while improving light quality."
      },
      {
        question: "Do you offer smart lighting controls like Lutron Caséta?",
        answer: "Absolutely. We regularly install Lutron Caséta, Control4, and other smart switches allowing mobile phone and voice control of all home lighting scenes."
      },
      {
        question: "What kind of landscape lighting lasts best in Naples salt air?",
        answer: "We recommend solid brass or copper low-voltage LED fixtures sealed against moisture and salt spray, which come with long-term manufacturer warranties."
      },
      {
        question: "Are your electricians licensed and insured in Collier County?",
        answer: "Yes, Naples Electrical holds State Certified Electrical Contractor License #EC13016758 and full liability & worker's comp insurance."
      }
    ]
  },
  {
    slug: "electrical-repairs",
    title: "Troubleshooting & Fast Repairs",
    tagline: "Rapid diagnostic and repair services for tripping breakers, flickering lights, and outages.",
    heroImage: "/images/electrical-repairs.jpg",
    badge: "Emergency Service Available",
    category: "residential",
    metaTitle: "Electrical Repairs & Troubleshooting Naples FL | Naples Electrical",
    metaDescription: "Fix tripping breakers, buzzing outlets, burning odors, or flickering lights fast in Naples & SWFL. Same-day emergency repairs by master electricians.",
    description: "Rapid diagnostics for tripping breakers, dead outlets, buzzing panels, and mystery power failures.",
    longDescription: "Electrical issues aren't just inconvenient—they can pose severe fire and shock risks. Our master electricians carry state-of-the-art diagnostic equipment to quickly pinpoint open neutrals, overloaded circuits, faulty arc-fault breakers, and hidden wire damage caused by Florida humidity or pests.",
    features: [
      "Thermal imaging inspection to locate hidden hot spots",
      "Circuit breaker & fuse replacement",
      "GFCI / AFCI safety fault troubleshooting",
      "Flickering light & voltage drop diagnosis",
      "Burnt outlet, switch, & junction box repairs",
      "Complete electrical safety hazard resolution"
    ],
    benefits: [
      { title: "Peace of Mind", desc: "Eliminate immediate fire and shock hazards with safe, code-compliant repairs." },
      { title: "Rapid Response", desc: "Same-day service options and prompt emergency response throughout Naples." },
      { title: "Transparent Pricing", desc: "Upfront pricing with no hidden fees before any repair work starts." }
    ],
    faqs: [
      {
        question: "Why does my breaker keep tripping even after resetting it?",
        answer: "A breaker that repeatedly trips usually indicates a short circuit, ground fault, or overloaded circuit. Continually resetting it can cause panel damage—call us to diagnose the root cause."
      },
      {
        question: "What should I do if an outlet emits a burning smell or warm faceplate?",
        answer: "Turn off the corresponding circuit breaker immediately and do not use the outlet. Contact Naples Electrical right away for an urgent safety dispatch."
      },
      {
        question: "Do you offer 24/7 emergency electrical service in Naples?",
        answer: "Yes, we have emergency electricians on call to assist with power loss, dangerous sparking, or severe breaker failure."
      },
      {
        question: "Can loose wiring cause lights to flicker throughout the house?",
        answer: "Yes. Loose main neutral wires or corroded panel bus bars frequently cause whole-house flickering, especially when large appliances kick on."
      },
      {
        question: "How do you charge for diagnostic troubleshooting?",
        answer: "We charge a standard dispatch and diagnostic fee. Once our electrician pinpoints the issue, we provide a clear fixed-price quote for approval before repairing."
      }
    ]
  },
  {
    slug: "panel-upgrades",
    title: "Electrical Panel & Heavy-Up Services",
    tagline: "Safely upgrade your home's main panel to 200A or 400A to support modern power demands.",
    heroImage: "/images/panel-upgrades.jpg",
    badge: "Essential Home Upgrade",
    category: "residential",
    disabled: true,
    metaTitle: "Electrical Panel Upgrades 200A/400A Naples FL | Naples Electrical",
    metaDescription: "Upgrade outdated panels, replace Federal Pacific/Zinsco boards, and increase service capacity to 200A/400A in Naples, FL. Full permitting & FPL coordination.",
    description: "200A / 400A service upgrades, surge protection, and replacement of outdated/recalled panels.",
    longDescription: "Older Naples homes and condos often have 100A or 150A panels that struggle to power modern air conditioning, EV chargers, pool heaters, and induction cooktops. We specialize in upgrading main breaker panels to 200A or 400A service, replacing hazardous recalled panels (FPE, Zinsco, Challenger), and installing whole-home surge suppressors.",
    features: [
      "Main panel upgrade from 100A/150A to 200A/400A",
      "Federal Pacific (FPE) & Zinsco dangerous panel replacement",
      "Subpanel installation for additions, garages, & pool equipment",
      "Type 1 & Type 2 Whole-House Surge Protection installation",
      "FPL (Florida Power & Light) service entrance coordination",
      "Complete Collier County permit handling & inspection management"
    ],
    benefits: [
      { title: "Expanded Capacity", desc: "Power high-draw equipment like EV chargers, heat pumps, and hot tubs safely." },
      { title: "Insurance Approval", desc: "Many FL home insurers reject coverage for homes with obsolete or 100A panels." },
      { title: "Surge Defense", desc: "Protect sensitive luxury electronics against Naples lightning strikes." }
    ],
    faqs: [
      {
        question: "How do I know if I need a panel upgrade?",
        answer: "Signs include a 100A service rating, lack of open breaker slots, frequent breaker trips, flickering when AC turns on, or having a hazardous brand like Federal Pacific or Zinsco."
      },
      {
        question: "How long is my power shut off during a panel replacement?",
        answer: "Power is typically disconnected for 4 to 6 hours on the day of installation while we swap the main panel and coordinate hookup with FPL."
      },
      {
        question: "Do you take care of the Collier County permits and utility approval?",
        answer: "Yes, we handle the entire process—permitting, plan submittal, utility coordination with FPL, and final county inspection."
      },
      {
        question: "What is whole-home surge protection and why is it needed in SWFL?",
        answer: "Naples is in America's lightning capital. A whole-home surge protector absorbs massive voltage spikes at the main panel before they destroy appliances, TVs, and smart systems."
      },
      {
        question: "Will a panel upgrade increase my home's resale value?",
        answer: "Yes! A modern 200A panel with clear labeling and whole-house surge protection is a major selling point for Florida homebuyers."
      }
    ]
  },
  {
    slug: "ceiling-fan-installation",
    title: "Ceiling & Exhaust Fan Installation",
    tagline: "Keep your indoor and outdoor living spaces cool and ventilated year-round.",
    heroImage: "/images/ceiling-fans.jpg",
    badge: "Comfort & Efficiency",
    category: "residential",
    disabled: true,
    metaTitle: "Ceiling Fan & Exhaust Fan Installation Naples FL | Naples Electrical",
    metaDescription: "Professional ceiling fan installation on high ceilings, lanais, and bedrooms in Naples. Includes fan bracing, smart controls, and bathroom exhaust venting.",
    description: "Heavy-duty box installation, high ceiling mounts, lanai fans, and smart wall switches.",
    longDescription: "Ceiling fans are essential for comfort and energy conservation in South Florida's warm climate. Our technicians safely install indoor fans on vault/cathedral ceilings, outdoor damp/wet rated fans on screened lanais and pergolas, as well as high-efficiency bathroom exhaust fans to eliminate humidity and prevent mold.",
    features: [
      "UL-listed ceiling fan support box installation",
      "High, vaulted & cathedral ceiling fan mounting",
      "Outdoor lanai, patio, & gazebos fan installations (Damp & Wet rated)",
      "Downrod sizing & precision dynamic blade balancing",
      "Multi-speed wall controls & smart remote pairing",
      "Quiet bathroom humidity-sensing exhaust fan installation"
    ],
    benefits: [
      { title: "Lower Cooling Costs", desc: "Create a wind-chill effect allowing you to raise thermostat settings by 4 degrees." },
      { title: "Vibration-Free Mounting", desc: "Proper fan-rated junction boxes prevent dangerous wobbling and humming." },
      { title: "Lanai Comfort", desc: "Keep bugs away and air circulating during warm coastal evenings." }
    ],
    faqs: [
      {
        question: "Can you install a ceiling fan where there is currently only a light fixture?",
        answer: "Yes! Standard light fixture boxes cannot support fan weight. We replace the light box with a heavy-duty, fan-rated steel brace box anchored to ceiling joists."
      },
      {
        question: "What fan rating is needed for an outdoor lanai in Naples?",
        answer: "Screened lanais require at least a 'Damp-Rated' fan, while open pergolas or areas exposed to rain require a 'Wet-Rated' fan to withstand Florida humidity."
      },
      {
        question: "How high off the floor should a ceiling fan be hung?",
        answer: "For optimal airflow, fan blades should sit 8 to 9 feet off the floor. For high 12ft+ ceilings, we supply and fit custom extended downrods."
      },
      {
        question: "Do you install smart ceiling fans compatible with Alexa/Google Home?",
        answer: "Yes, we install smart ceiling fans (Hunter Simpleconnect, Modern Forms, etc.) and smart wall switches for remote control."
      },
      {
        question: "Why is my ceiling fan wobbling or clicking?",
        answer: "Wobbling usually stems from an unrated mounting box, loose mounting hardware, or unbalanced blades. We can diagnose and re-hang fans securely."
      }
    ]
  },
  {
    slug: "ev-charger-installation",
    title: "EV Charger Installation (Level 2)",
    tagline: "Charge your electric vehicle up to 7x faster with a dedicated home Level 2 charging station.",
    heroImage: "/images/ev-charger.jpg",
    badge: "Certified EV Installers",
    category: "residential",
    disabled: true,
    metaTitle: "Level 2 EV Charger Installation Naples FL | Tesla, ChargePoint, JuiceBox",
    metaDescription: "Professional Level 2 EV charging station installation in Naples & SWFL. Tesla Wall Connector, ChargePoint, 240V NEMA 14-50 outlets. Permitted & certified.",
    description: "Tesla Wall Connectors, ChargePoint, JuiceBox, and NEMA 14-50 outlet installations.",
    longDescription: "Charge your EV overnight in your garage or driveway. Naples Electrical provides turnkey Level 2 charging solutions for all electric vehicles including Tesla, Rivian, Ford Lightning, BMW, Porsche, and Hyundai. We calculate panel load, run high-gauge 240V copper lines, install hardwired chargers or NEMA 14-50 outlets, and manage county permits.",
    features: [
      "Tesla Wall Connector & Universal Wall Connector installation",
      "240V / 50A & 60A high-speed dedicated circuit runs",
      "NEMA 14-50 & NEMA 6-50 industrial receptacle installation",
      "Panel load calculation & subpanel additions if required",
      "Dual EV charger installation with dynamic load management",
      "Garage, carport, & outdoor weatherproof pedestals"
    ],
    benefits: [
      { title: "Fast Overnight Charging", desc: "Gain 30–44 miles of range per hour compared to 3–4 miles with standard 120V." },
      { title: "Safety & Reliability", desc: "Proper wire gauge, breaker sizing, and GFCI protection prevent garage overheating." },
      { title: "Tax Credit Eligible", desc: "Professional installations qualify for federal tax incentives and local utility rebates." }
    ],
    faqs: [
      {
        question: "How fast will a Level 2 charger charge my electric car?",
        answer: "A 48A / 240V Level 2 charger adds approximately 35 to 45 miles of range per hour, fully charging most EV batteries overnight in 4 to 8 hours."
      },
      {
        question: "Do I need to upgrade my electrical panel for an EV charger?",
        answer: "It depends on your current panel capacity and home electrical loads. We conduct an NEC load calculation to determine if your panel has space or if a subpanel/upgrade is required."
      },
      {
        question: "Should I install a hardwired charger or a NEMA 14-50 outlet?",
        answer: "Hardwired chargers allow higher amperage (up to 48A continuous), are more weather-resistant outdoors, and avoid plug connection points. Outlets offer portability if you move."
      },
      {
        question: "Is a permit required for EV charger installation in Naples / Collier County?",
        answer: "Yes, Collier County requires an electrical permit for 240V high-amp EV charger circuits. We pull all required permits and schedule the final inspection."
      },
      {
        question: "Can you install an EV charger on an outdoor driveway or carport?",
        answer: "Yes, using NEMA 4X weather-sealed enclosures or outdoor-rated charging pedestals built to endure heavy rain and sun exposure."
      }
    ]
  },
  {
    slug: "outlet-switch-upgrades",
    title: "Outlet, Switch & GFCI Upgrades",
    tagline: "Enhance safety and convenience with modern USB outlets, GFCI protection, and smart switches.",
    heroImage: "/images/electrical-repairs.jpg",
    badge: "Home Safety Upgrade",
    category: "residential",
    disabled: true,
    metaTitle: "Outlet, Switch & GFCI Upgrades Naples FL | Naples Electrical",
    metaDescription: "Upgrade outdated receptacles, tamper-resistant outlets, USB-C wall ports, and kitchen/bath GFCI devices in Naples homes. Certified electricians.",
    description: "Child-safe tamper resistant outlets, USB-A/C ports, smart dimmers, and GFCI damp location protection.",
    longDescription: "Outdated, worn-out, or loose outlets are major electrical fire triggers. We upgrade homes across Naples with sleek screwless faceplates, high-speed USB-C charging receptacles, tamper-resistant safety outlets, and life-saving GFCI/AFCI breakers required in kitchens, baths, garages, and outdoors near pools.",
    features: [
      "Tamper-resistant (TR) safety receptacle replacement",
      "Built-in USB-A & 60W USB-C fast-charging wall outlets",
      "GFCI (Ground Fault Circuit Interrupter) protection for wet areas",
      "Decora rocker switch & slider dimmer conversions",
      "Lutron Caséta & smart Wi-Fi switch integration",
      "Pop-up counter outlets for kitchen islands & outdoor kitchens"
    ],
    benefits: [
      { title: "Code Compliance", desc: "Bring older homes up to current NEC standards for moisture & child safety." },
      { title: "Modern Convenience", desc: "Charge devices directly from wall outlets without bulky charging bricks." },
      { title: "Fire Prevention", desc: "Replace worn receptacles that produce dangerous heat and arcing." }
    ],
    faqs: [
      {
        question: "Where are GFCI outlets required in a home?",
        answer: "Under NEC codes, GFCI protection is mandatory in kitchens, bathrooms, garages, exterior walls, crawl spaces, unfinished basements, and within 6ft of sinks/pools."
      },
      {
        question: "Why do plugs fall out loosely from my wall outlets?",
        answer: "Internal contact springs wear out over time. Loose plugs create electrical resistance, arcing, and heat—replacing the receptacle resolves the hazard."
      },
      {
        question: "Can you replace 2-prong outlets with grounded 3-prong outlets?",
        answer: "Yes. In older homes without ground wires, we can install GFCI-protected 3-prong outlets or re-wire circuits to provide safe equipment grounding."
      },
      {
        question: "Do USB wall outlets consume power when nothing is plugged in?",
        answer: "Modern quality USB receptacles consume negligible standby power (less than 0.1 Watts), making them extremely efficient."
      },
      {
        question: "What is the difference between GFCI and AFCI breakers?",
        answer: "GFCI protects people from electric shocks in wet areas, while AFCI (Arc Fault) protects against electrical fires caused by damaged internal wiring."
      }
    ]
  },
  {
    slug: "smart-home-wiring",
    title: "Smart Home & Automation Infrastructure",
    tagline: "Future-proof your luxury home with automated lighting, motorized shades, and smart controls.",
    heroImage: "/images/panel-upgrades.jpg",
    badge: "Luxury Living Technology",
    category: "residential",
    disabled: true,
    metaTitle: "Smart Home Wiring & Automation Naples FL | Naples Electrical",
    metaDescription: "Professional installation of smart lighting systems, smart panel monitoring, video doorbell hardwiring, and automated controls in Naples FL.",
    description: "Whole-home smart automation, smart panel meters, motorized shade power, and video doorbells.",
    longDescription: "Elevate your Naples home with seamlessly integrated smart home technology. We install neutral wire infrastructure for smart switches, hardwire video doorbells and security cameras, set up smart energy monitoring (Span/Leviton panels), and wire motorized hurricane blinds and indoor shades.",
    features: [
      "Lutron, Control4, & Crestron lighting infrastructure wiring",
      "SPAN & Leviton smart electrical panel installation",
      "Hardwired Ring, Nest, & Arlo video doorbell/camera power",
      "Motorized window shade & hurricane shutter control wiring",
      "Whole-home smart hub & repeater network optimization",
      "Automated outdoor lighting timer & photo sensor programming"
    ],
    benefits: [
      { title: "Energy Monitoring", desc: "Track circuit-level electricity consumption in real time from your smartphone." },
      { title: "Remote Home Management", desc: "Control lights, AC schedules, and security remotely while away from your seasonal residence." },
      { title: "Enhanced Security", desc: "Simulate occupancy with automated lighting scenes while traveling." }
    ],
    faqs: [
      {
        question: "Does my home need a neutral wire for smart switches?",
        answer: "Most modern smart switches require a neutral wire. If your home has older wiring, we can run neutral wires or use zero-neutral smart switches like Lutron Caséta."
      },
      {
        question: "What is a SPAN Smart Panel and why install one?",
        answer: "SPAN panels replace traditional breaker boxes, allowing you to monitor and control every circuit via smartphone, automatically prioritize power during outages, and maximize solar/battery systems."
      },
      {
        question: "Can you hardwire my video doorbell so I don't have to recharge batteries?",
        answer: "Yes, we install 16V–24V door chime transformers and low-voltage wiring so your Ring or Nest doorbell receives continuous power."
      },
      {
        question: "Do you wire motorized indoor shades and outdoor lanai screens?",
        answer: "Yes, we run hidden low-voltage or line-voltage power lines behind drywall and lanais for motorized shade motors."
      },
      {
        question: "Can smart home automation work when I am away from Naples during summer?",
        answer: "Yes! As long as your home internet remains active, you can monitor power usage, receive moisture alerts, and trigger light schedules from anywhere globally."
      }
    ]
  },
  {
    slug: "safety-inspections",
    title: "Whole-Home Electrical Safety Inspections",
    tagline: "Comprehensive 50-point electrical inspections for home purchases, insurance, and peace of mind.",
    heroImage: "/images/electrical-repairs.jpg",
    badge: "Preventative Protection",
    category: "residential",
    disabled: true,
    metaTitle: "Electrical Safety Inspection Naples FL | Home Buyer & Insurance Audit",
    metaDescription: "Comprehensive 50-point electrical inspection in Naples, FL. Infrared thermal scanning, insurance certification, dock power audit & NEC code check.",
    description: "Detailed 50-point inspection covering panels, grounding, GFCI protection, dock wiring, and thermal imaging.",
    longDescription: "Whether purchasing a new waterfront property in Naples, preparing for hurricane season, or fulfilling home insurance inspection requirements (4-Point Inspection), our master electricians execute rigorous 50-point diagnostic audits to discover hidden wiring defects, corrosion, overloading, and code violations.",
    features: [
      "Infrared thermal imaging scan of main panel & subpanels",
      "Main grounding electrode system & bonding test",
      "GFCI / AFCI protection test on all damp & wet location outlets",
      "Dock, boat lift, & pool equipment electrical safety audit",
      "Aluminum wiring & ungrounded circuit evaluation",
      "Written inspection report with itemized repair recommendations"
    ],
    benefits: [
      { title: "Insurance Compliance", desc: "Satisfy 4-Point inspection requirements for Florida homeowners insurance policies." },
      { title: "Fire Hazard Elimination", desc: "Catch dangerous hot spots and loose bus bar connections before fires occur." },
      { title: "Home Buyer Leverage", desc: "Use detailed inspection findings during real estate purchase negotiations." }
    ],
    faqs: [
      {
        question: "What is included in a 50-point electrical safety inspection?",
        answer: "We test panel connections with thermal imaging, verify main ground rods, test every outlet for correct polarity & GFCI tripping, check attic/crawlspace wiring, inspect dock/pool bonding, and audit surge protection."
      },
      {
        question: "Do Florida insurance companies require electrical inspections for older homes?",
        answer: "Yes. Most Florida insurers require a 4-Point Inspection for homes older than 20–30 years to verify panel type, wiring age, and absence of active hazards."
      },
      {
        question: "What is thermal imaging electrical inspection?",
        answer: "Our FLIR thermal camera detects invisible heat generated by loose wire connections, overloaded breakers, or corroded terminals before they melt insulation or start fires."
      },
      {
        question: "Do you inspect dock wiring and boat lift electrical systems in Naples?",
        answer: "Yes! Coastal dock power is highly vulnerable to corrosion and dangerous stray electrical currents in water. We perform full marine electrical safety checks."
      },
      {
        question: "How long does a home electrical inspection take?",
        answer: "A complete inspection of a standard Naples single-family home typically takes 1.5 to 2.5 hours, followed by a written photo report."
      }
    ]
  },

  // COMMERCIAL SERVICES
  {
    slug: "commercial-electrical-service",
    title: "Commercial Electrical Contracting & Builds",
    tagline: "Turnkey electrical design, installation, and fit-outs for retail, office, and commercial spaces.",
    heroImage: "/images/panel-upgrades.jpg",
    badge: "Licensed Commercial Contractor",
    category: "commercial",
    disabled: true,
    metaTitle: "Commercial Electrical Contractor Naples FL | Office & Retail Builds",
    metaDescription: "Full-service commercial electrical contracting in Naples, FL. Storefront construction, office build-outs, 3-phase power, and LED conversions. Licensed & bonded.",
    description: "Complete commercial electrical builds, office build-outs, retail lighting, and 3-phase power distribution.",
    longDescription: "Naples Electrical delivers high-performance electrical installations for commercial properties across Southwest Florida. From new retail storefront construction and office suite build-outs to restaurant kitchen power drops and warehouse 3-phase systems, our commercial team handles engineering blueprints, permitting, and strict OSHA-compliant execution.",
    features: [
      "Commercial 3-Phase power distribution & transformer sizing",
      "Office tenant improvements & interior spatial power routing",
      "Restaurant commercial kitchen equipment electrical hookups",
      "Retail display lighting & illuminated exterior sign wiring",
      "Emergency backup generator backup circuit integration",
      "Dedicated server room / IT rack isolated ground circuits"
    ],
    benefits: [
      { title: "On-Time Project Delivery", desc: "We align tightly with GC timelines to ensure your business opens on schedule." },
      { title: "OSHA & Code Compliant", desc: "Rigorous adherence to NEC Commercial Codes and local Collier County guidelines." },
      { title: "Minimal Business Disruption", desc: "Flexible scheduling, including after-hours and weekend shift options." }
    ],
    faqs: [
      {
        question: "Do you work with General Contractors on commercial commercial build-outs?",
        answer: "Yes, we partner regularly with commercial GCs, architects, and business owners on retail, medical office, restaurant, and industrial projects throughout SWFL."
      },
      {
        question: "What electrical information do you need to bid on a commercial project?",
        answer: "We can review architectural electrical plans (E-sheets), single-line diagrams, fixture schedules, or conduct an on-site walkthrough for leasehold improvements."
      },
      {
        question: "Can you install 3-phase power for commercial equipment?",
        answer: "Yes, we design and install 120/208V and 277/480V 3-phase main distribution panels, step-down transformers, and heavy equipment disconnects."
      },
      {
        question: "Are your commercial electricians insured for large commercial jobs?",
        answer: "Yes, Naples Electrical maintains high-limit commercial liability insurance, umbrella coverage, and full worker's compensation."
      },
      {
        question: "Do you offer after-hours service for operational businesses?",
        answer: "Absolutely. We perform night and weekend work so your business operations and customer traffic remain completely uninterrupted."
      }
    ]
  },
  {
    slug: "commercial-panel-upgrades",
    title: "3-Phase Commercial Panel & Service Upgrades",
    tagline: "Expand electrical service capacity to support high-demand machinery and commercial facilities.",
    heroImage: "/images/panel-upgrades.jpg",
    badge: "Heavy Industrial Power",
    category: "commercial",
    disabled: true,
    metaTitle: "Commercial 3-Phase Panel Upgrades Naples FL | Naples Electrical",
    metaDescription: "Upgrade commercial electrical panels, main switchgear, and 480V 3-phase power systems in Naples. Certified commercial master electricians.",
    description: "400A to 2000A 3-phase switchgear upgrades, transformer installations, and power distribution.",
    longDescription: "As your commercial enterprise grows, electrical demands grow with it. Adding commercial HVAC units, high-draw manufacturing machinery, heavy refrigeration, or EV chargers requires robust main switchgear. We upgrade commercial service panels from 400A up to 2000A, install dry-type step-down transformers, and balance phase loads.",
    features: [
      "400A, 800A, 1200A, & 2000A commercial main switchgear installation",
      "120/208V & 277/480V 3-Phase panelboard upgrades",
      "Step-down & step-up dry-type transformer installations",
      "Commercial surge protective devices (SPD Type 1 & Type 2)",
      "Phase balancing to prevent motor burnouts and voltage drop",
      "Subpanel additions for high-amperage equipment loads"
    ],
    benefits: [
      { title: "Prevent Costly Downtime", desc: "Modern switchgear prevents main breaker tripping and equipment brownouts." },
      { title: "Equipment Longevity", desc: "Balanced 3-phase voltage protects expensive motors, chillers, and CNC machines." },
      { title: "Future Capacity", desc: "Scale facility operations without power bottleneck constraints." }
    ],
    faqs: [
      {
        question: "What size panel upgrade does my commercial building need?",
        answer: "We calculate your facility's total connected load (HVAC, lighting, equipment, future expansion factor) according to NEC Article 220 to specify the exact main switchgear size."
      },
      {
        question: "How long does a commercial main panel replacement take?",
        answer: "With careful planning and utility shutdown coordination (FPL), main switchgear cutovers are typically executed over a weekend or overnight within 8 to 14 hours."
      },
      {
        question: "What is load balancing in 3-phase electrical systems?",
        answer: "Load balancing ensures electrical current is distributed evenly across all three hot legs (A, B, C phase). Imbalanced phases overheat transformers and waste power."
      },
      {
        question: "Do commercial panel upgrades require utility transformer upgrades?",
        answer: "If your requested load exceeds FPL's pad-mounted transformer rating, we coordinate transformer upsizing directly with FPL engineers."
      },
      {
        question: "Do you install industrial surge protection on commercial switchgear?",
        answer: "Yes, we install high-kA surge suppressors directly at the main service disconnect to protect sensitive commercial automation and server racks."
      }
    ]
  },
  {
    slug: "commercial-lighting",
    title: "Commercial LED Retrofits & Exterior Lighting",
    tagline: "Reduce facility operating costs and enhance security with commercial high-bay & parking lot LED lighting.",
    heroImage: "/images/lighting-installation.jpg",
    badge: "Energy Saving Solutions",
    category: "commercial",
    disabled: true,
    metaTitle: "Commercial LED Lighting Retrofits Naples FL | Parking Lot & High-Bay",
    metaDescription: "Upgrade commercial warehouses, parking lots, retail stores, and offices to energy-saving LED lighting in Naples FL. Rebate assistance & maintenance.",
    description: "High-bay LED warehouse lights, parking lot pole fixtures, wall packs, and interior office LED troffers.",
    longDescription: "Commercial lighting represents up to 40% of a business's monthly energy bill. Naples Electrical replaces inefficient fluorescent troffers, metal halide warehouse high-bays, and sodium vapor parking lot lights with high-efficiency LED systems. We handle bucket-truck pole repairs, wall pack security lights, and automated lighting control panels.",
    features: [
      "Warehouse high-bay LED fixture conversions (UFO & linear)",
      "Parking lot light pole repair, LED retrofits, & photocell controls",
      "Exterior security lighting & perimeter wall pack installation",
      "Office LED flat-panel troffer installations (0-10V dimmable)",
      "Emergency egress exit sign & battery backup lighting audits",
      "Commercial occupancy sensor & daylight harvesting controls"
    ],
    benefits: [
      { title: "Up to 70% Energy Reduction", desc: "Drastically reduce monthly electricity consumption and HVAC cooling loads." },
      { title: "Zero Maintenance Hassle", desc: "Long-life commercial LEDs (50,000+ hours) eliminate frequent bulb/ballast replacements." },
      { title: "Enhanced Property Security", desc: "Bright, uniform illumination deters crime and reduces liability in parking areas." }
    ],
    faqs: [
      {
        question: "How much can my business save by retrofitting to commercial LED lighting?",
        answer: "Most commercial facilities achieve a 50% to 75% drop in lighting electricity costs, with typical payback periods on investment between 12 and 24 months."
      },
      {
        question: "Do you have bucket truck capability for high parking lot light poles?",
        answer: "Yes, our fleet includes lift equipment to service high light poles, high-bay warehouse ceilings, and building facade wall packs safely."
      },
      {
        question: "What are 0-10V dimmable LED troffers?",
        answer: "0-10V is the commercial standard for smooth LED dimming, allowing offices to adjust brightness levels based on natural daylight to maximize power savings."
      },
      {
        question: "Are emergency exit lights legally required to be tested regularly?",
        answer: "Yes, OSHA and NFPA 101 require emergency egress lighting and exit signs to undergo annual 90-minute battery backup tests."
      },
      {
        question: "Do you help with FPL commercial lighting rebate applications?",
        answer: "Yes! FPL offers rebates for business LED retrofits. We assist with fixture specification documentation to help maximize your cash rebate."
      }
    ]
  },
  {
    slug: "code-compliance-inspections",
    title: "Commercial Code Compliance & Safety Audits",
    tagline: "Ensure your commercial facility complies with NEC, OSHA, and local Collier County fire codes.",
    heroImage: "/images/electrical-repairs.jpg",
    badge: "Risk Mitigation",
    category: "commercial",
    disabled: true,
    metaTitle: "Commercial Electrical Code Compliance & Audits Naples FL",
    metaDescription: "Commercial electrical inspection, OSHA violation correction, emergency exit testing, and thermal panelling audits in Naples & SWFL commercial buildings.",
    description: "Detailed safety audits for commercial buildings, tenant transitions, and fire marshal compliance.",
    longDescription: "Avoid costly fire marshal fines, business shutdowns, or insurance cancellation. Our commercial electricians perform thorough NEC and OSHA code compliance audits for commercial landlords, building managers, and prospective buyers. We audit main panelboard balancing, emergency lighting, equipment grounding, and hazardous wiring.",
    features: [
      "NFPA 70 / NEC commercial code violation corrections",
      "OSHA electrical hazard audits & lockout/tagout labeling",
      "Emergency lighting 90-minute battery discharge testing",
      "Infrared thermal imaging scan of commercial switchgear",
      "Commercial tenant turn safety checks prior to lease signing",
      "Grounding electrode & equipment bonding impedance verification"
    ],
    benefits: [
      { title: "Pass Inspections Easily", desc: "Clear municipal and fire marshal inspections on the first attempt." },
      { title: "Minimize Liability", desc: "Prevent workplace electrical shocks, arc flash risks, and fire hazards." },
      { title: "Commercial Property Value", desc: "Maintain code-compliant electrical infrastructure to protect property value." }
    ],
    faqs: [
      {
        question: "What are the most common commercial electrical code violations in Naples?",
        answer: "Common violations include missing junction box covers, unlabelled breaker panels, overloaded power strips, defective emergency exit batteries, and lack of GFCI protection in commercial restrooms/kitchens."
      },
      {
        question: "What is an Arc Flash Risk Assessment?",
        answer: "An assessment that identifies potential explosive electrical arc hazards on high-voltage commercial panels, ensuring proper warning labels and PPE guidelines are established per NFPA 70E."
      },
      {
        question: "How often should commercial electrical switchgear be thermally scanned?",
        answer: "Insurance carriers and industry best practices recommend annual thermal infrared scans for all commercial panels and main disconnects."
      },
      {
        question: "Can you fix code violations issued by the Collier County Fire Marshal?",
        answer: "Yes, we prioritize rapid corrections for fire marshal correction notices so your commercial occupancy permit remains valid."
      },
      {
        question: "Do you provide written compliance reports for commercial property managers?",
        answer: "Yes, you receive a formal digital report containing thermal imagery, photo evidence, and prioritized repair action items."
      }
    ]
  },
  {
    slug: "ev-charging-stations",
    title: "Commercial & Fleet EV Charging Stations",
    tagline: "Attract luxury tenants, customers, and power your commercial vehicle fleet with Level 2 & Level 3 chargers.",
    heroImage: "/images/ev-charger.jpg",
    badge: "Commercial Infrastructure",
    category: "commercial",
    disabled: true,
    metaTitle: "Commercial EV Charging Station Installation Naples FL | Fleet & Retail",
    metaDescription: "Turnkey commercial EV charging installation for hotels, HOAs, shopping plazas, and commercial fleets in Naples FL. Level 2 & DC Fast Charging setup.",
    description: "Multi-port Level 2 chargers, networked payment stations, HOA/Condo solutions, and fleet charging.",
    longDescription: "EV charging is now a key amenity for Naples shopping plazas, luxury resorts, commercial office parks, and HOA communities. Naples Electrical installs commercial networked EV stations (ChargePoint, Blink, Tesla Commercial) featuring RFID access, point-of-sale billing, dynamic load sharing, and tough vandal-resistant bollards.",
    features: [
      "Dual-port Level 2 commercial pedestal charging stations",
      "DC Fast Charger (Level 3) infrastructure preparation",
      "Networked payment billing & automated access control integration",
      "HOA & Condo deeded parking spot EV charger wiring",
      "Commercial fleet electric vehicle charging management",
      "Bollard installation, concrete pads, & ADA stall striping"
    ],
    benefits: [
      { title: "Attract High-Value Customers", desc: "EV drivers shop longer and spend more at commercial venues while charging." },
      { title: "New Revenue Stream", desc: "Set custom charging electricity rates to generate recurring profit." },
      { title: "Sustainability Branding", desc: "Demonstrate environmental leadership to tenants, guests, and investors." }
    ],
    faqs: [
      {
        question: "How do commercial EV charging stations generate revenue for property owners?",
        answer: "Networked chargers allow you to set custom per-kWh or hourly usage fees. The software automatically processes user credit cards and deposits revenues directly to your account."
      },
      {
        question: "What electrical capacity is needed for multiple commercial EV chargers?",
        answer: "A standard dual-port Level 2 charger requires an 80A 208/240V dedicated circuit. We use smart load management software to share power across multiple ports without overloading panels."
      },
      {
        question: "Do you install EV charging stations for Naples HOA and Condo associations?",
        answer: "Yes! We specialize in Florida Senate Bill 714 compliant EV installations for condo garages and HOA shared parking lots."
      },
      {
        question: "What is the difference between Level 2 and Level 3 DC Fast Chargers?",
        answer: "Level 2 (208/240V AC) adds 25-40 miles of range per hour (ideal for offices/hotels). Level 3 DC Fast Charging (480V DC) charges an EV to 80% in 20-30 minutes (ideal for highway stops/fleets)."
      },
      {
        question: "Are there federal tax credits available for commercial EV charger installations?",
        answer: "Yes, the Alternative Fuel Vehicle Refueling Property Credit (Section 30C) offers federal tax incentives up to 30% of total project costs for qualifying commercial installations."
      }
    ]
  },
  {
    slug: "tenant-improvement-wiring",
    title: "Tenant Improvement & Space Remodel Wiring",
    tagline: "Custom electrical reconfiguration for new commercial lease tenants and floorplan updates.",
    heroImage: "/images/electrical-repairs.jpg",
    badge: "Leasehold Modernization",
    category: "commercial",
    disabled: true,
    metaTitle: "Tenant Improvement Electrical Wiring Naples FL | Leasehold Remodels",
    metaDescription: "Electrical wiring for tenant build-outs, office floorplan reconfigurations, retail leasehold improvements, and medical suites in Naples, FL.",
    description: "Office wall reconfigurations, power pole drops, floor box cutouts, and subpanel customization.",
    longDescription: "When commercial tenants move into new space or reconfigure existing floorplans, electrical systems must be restructured. We install floor poke-through boxes, power poles, drop-ceiling wiring tracks, dedicated equipment circuits, and architectural accent lighting customized to modern workplace layouts.",
    features: [
      "Poke-through floor box & flush floor trench raceway installation",
      "Power pole drops for open-office workstation pods",
      "Commercial conference room AV & HDMI/power floor box integration",
      "Subpanel relocation & tenant sub-meter installation",
      "POS cash wrap & retail counter dedicated power lines",
      "Medical office & dental suite specialized branch wiring"
    ],
    benefits: [
      { title: "Tailored to Lease Needs", desc: "Power layouts precisely configured to your specific business operations." },
      { title: "Clean Modern Aesthetics", desc: "Concealed conduit and sleek architectural floor boxes eliminate tripping cables." },
      { title: "Fast Construction Turnaround", desc: "Efficient scheduling to shorten your leasehold rent-free build period." }
    ],
    faqs: [
      {
        question: "What is an electrical power pole drop?",
        answer: "Power poles are vertical aluminum columns that drop power and data cabling down from the ceiling plenum into open-office cubicle islands without tearing up concrete floors."
      },
      {
        question: "Can you install floor outlets in concrete slab office floors?",
        answer: "Yes, we core-drill concrete slabs or cut trench raceways to install flush, heavy-duty metallic floor boxes for conference tables and desks."
      },
      {
        question: "Do tenant improvements require separate sub-metering?",
        answer: "Multi-tenant commercial landlords frequently request sub-meters so each tenant pays exclusively for their own electrical consumption."
      },
      {
        question: "How do you handle low-voltage cabling alongside power lines?",
        answer: "We run low-voltage data/CAT6 lines in separate conduit or divided raceways to prevent electromagnetic interference with computer networks."
      },
      {
        question: "Can electrical build-out costs be amortized in commercial lease agreements?",
        answer: "Yes, commercial landlords frequently offer Tenant Improvement Allowances (TIA) to fund our electrical build-out services."
      }
    ]
  },
  {
    slug: "preventative-maintenance",
    title: "Commercial Preventative Electrical Maintenance",
    tagline: "Proactive testing, thermal scanning, and servicing to prevent catastrophic facility outages.",
    heroImage: "/images/panel-upgrades.jpg",
    badge: "Uptime Assurance",
    category: "commercial",
    disabled: true,
    metaTitle: "Commercial Electrical Maintenance Naples FL | Preventative Service Plans",
    metaDescription: "Scheduled commercial electrical maintenance, annual thermal scanning, transformer servicing, and power quality checks for SWFL facilities.",
    description: "Scheduled thermal imaging, breaker testing, connection torquing, and emergency lighting checks.",
    longDescription: "Unplanned electrical downtime costs businesses thousands of dollars per hour. Our Commercial Maintenance Contracts provide routine thermal scanning of distribution panels, breaker exercise testing, terminal re-torquing, power quality monitoring, and emergency lighting verification to stop failures before they interrupt your business.",
    features: [
      "Annual or bi-annual FLIR thermal imaging diagnostic reports",
      "Main switchgear connection torque verification per manufacturer specs",
      "Power quality analysis (harmonics, voltage sag, power factor check)",
      "Commercial generator automatic transfer switch (ATS) testing",
      "Transformer oil & winding temperature inspection",
      "Priority 24/7 emergency dispatch for contract clients"
    ],
    benefits: [
      { title: "Maximized Equipment Uptime", desc: "Prevent expensive unexpected power shutdowns during business hours." },
      { title: "Lower Insurance Premiums", desc: "Many commercial insurers grant discounts for certified preventative maintenance logs." },
      { title: "Extended Equipment Lifespan", desc: "Proper torque and cooling prevent expensive switchgear component burnout." }
    ],
    faqs: [
      {
        question: "What is included in a Commercial Electrical Preventative Maintenance Plan?",
        answer: "Plans include scheduled thermal camera audits, mechanical torquing of bus bar bolts, panel cleaning/dust removal, voltage/current logging, and emergency lighting battery checks."
      },
      {
        question: "Why do electrical connections loose torque over time?",
        answer: "Thermal expansion and contraction from Florida heat, along with vibration, causes wire connections to loosen over time, leading to high electrical resistance and potential fires."
      },
      {
        question: "How does power factor correction help commercial facilities?",
        answer: "Low power factor results in utility penalties on your FPL bill. Correcting power factor with capacitor banks reduces peak demand fees."
      },
      {
        question: "What frequency is recommended for commercial thermal scanning?",
        answer: "Commercial facilities, manufacturing plants, and high-rise condos should undergo infrared thermal scanning at least once every 12 months."
      },
      {
        question: "Do maintenance contract clients get priority response during hurricane recovery?",
        answer: "Yes! Contract clients receive top priority for emergency generator hookups, flood assessment, and rapid restoration following storm events."
      }
    ]
  },
  {
    slug: "emergency-commercial-repairs",
    title: "24/7 Commercial Emergency Electrical Repairs",
    tagline: "Rapid-response emergency repair team for power outages, equipment trips, and severe faults.",
    heroImage: "/images/electrical-repairs.jpg",
    badge: "24/7 Emergency Dispatch",
    category: "commercial",
    disabled: true,
    metaTitle: "24/7 Commercial Emergency Electrician Naples FL | Fast Dispatch",
    metaDescription: "Immediate emergency electrical service for Naples businesses. Main breaker failure, power outage, storm damage, and equipment line repairs. Call (239) 484-1808.",
    description: "Immediate emergency response for commercial outages, burning panels, storm damage, and equipment trips.",
    longDescription: "When an electrical crisis threatens your business, restaurant food inventory, server rooms, or medical equipment, delay is not an option. Naples Electrical dispatches licensed commercial master electricians equipped with heavy-duty diagnostic gear and spare parts to restore power safely and quickly.",
    features: [
      "Rapid dispatch throughout Naples, Marco Island, & Bonita Springs",
      "Commercial main breaker & fused disconnect emergency replacement",
      "Storm & hurricane electrical damage emergency stabilization",
      "Temporary emergency generator hookups & manual transfer switches",
      "Burnt bus bar & melted feeder wire emergency repairs",
      "Utility FPL emergency service reconnect coordination"
    ],
    benefits: [
      { title: "Immediate Dispatch", desc: "Dedicated emergency hotline answered by local technicians, not distant call centers." },
      { title: "Inventory Protection", desc: "Keep walk-in coolers, freezers, and critical IT equipment powered during faults." },
      { title: "Safe Code Execution", desc: "Emergency repairs completed safely and fully compliant with NEC standards." }
    ],
    faqs: [
      {
        question: "What qualifies as a commercial electrical emergency?",
        answer: "Scenarios include total business power loss, buzzing or smoking main switchgear, burning smell from panels, tripped main breakers that won't reset, or storm water entering electrical rooms."
      },
      {
        question: "How fast can an emergency electrician arrive at my Naples business?",
        answer: "Our typical emergency response time in Naples, Bonita Springs, and Marco Island is within 60 to 90 minutes of your call."
      },
      {
        question: "Can you provide temporary power if the main utility feed is damaged?",
        answer: "Yes, we can deploy mobile generator hookups and temporary distribution panels to power critical loads while permanent repairs take place."
      },
      {
        question: "What should my staff do if a commercial electrical panel starts smoking?",
        answer: "Evacuate the immediate area, call 911 if active fire is visible, and contact Naples Electrical immediately. If safe, trip the main exterior disconnect."
      },
      {
        question: "Are emergency repair services available on weekends and holidays?",
        answer: "Yes, our emergency repair team is active 24 hours a day, 365 days a year, including all major holidays."
      }
    ]
  }
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getAllSlugs(): string[] {
  return SERVICES.map((service) => service.slug);
}
