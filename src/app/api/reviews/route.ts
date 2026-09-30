import { NextResponse } from "next/server";

export interface Review {
  name: string;
  initials: string;
  text: string;
  rating: number;
  date: string;
}

// ─── 24hr in-memory cache ─────────────────────────────────────────────────────
let cache: { data: Review[]; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

// ─── Real reviews scraped from napleselectrical.com / Trustindex ──────────────
const FALLBACK_REVIEWS: Review[] = [
  {
    name: "Antonio Gjorgjievski",
    initials: "AG",
    rating: 5,
    date: "4 days ago",
    text: "We needed a few recessed lights and outlets added during our bathroom remodel, and Philip really came through. His team scheduled us within a few days, sent a professional estimate with every item clearly listed, and notified us when they were on their way. The work was completed as planned, and the whole process was easy. I'd definitely recommend Philip to anyone looking for electrical work done right!",
  },
  {
    name: "Jennifer Rice",
    initials: "JR",
    rating: 5,
    date: "4 days ago",
    text: "They did great work removing and replacing all the fire alarm smoke detectors and hanging a brand-new, beautiful chandelier. They were very professional and cleaned up right after themselves. Definitely highly recommend!",
  },
  {
    name: "Lisa Badolato",
    initials: "LB",
    rating: 5,
    date: "1 week ago",
    text: "A+ experience all around. Phil and his staff are exceptional. Quick response and fixed everything needed and fair. I highly recommend. Do not hesitate to call this company. They were outstanding.",
  },
  {
    name: "Ed Megyesi",
    initials: "EM",
    rating: 5,
    date: "2 weeks ago",
    text: "Great company! Do not hesitate to call them. Worked with Phil, the owner. He was very knowledgeable and transparent. Diagnosed the issue I was having and fixed it immediately upon arrival. Will definitely call them the next time. Thank you Phil!",
  },
  {
    name: "Wayne Mullin",
    initials: "WM",
    rating: 5,
    date: "2 weeks ago",
    text: "Excellent service from Naples Electrical. They responded promptly and professionally, replaced and installed a new GFI outlet, and completed the repair in a timely manner. The work was done exactly as estimated, with no surprises on the price. Highly recommend!",
  },
  {
    name: "lynn Drexler",
    initials: "LD",
    rating: 5,
    date: "2 weeks ago",
    text: "I used Naples electrical to hang a number of chandeliers in my clients million dollar Home the two guys were so pleasant and cooperative and did a fabulous job. I would totally recommend this company to anyone looking for an electrician.",
  },
  {
    name: "Julie Spitzmiller",
    initials: "JS",
    rating: 5,
    date: "1 week ago",
    text: "Excellent human communication as well as tech usage, prompt, prepared, able to locate problem and provide guidance on next steps!",
  },
  {
    name: "Michael Bogert",
    initials: "MB",
    rating: 5,
    date: "1 week ago",
    text: "Fast, efficient, fair pricing, and professional. Highly recommend.",
  },
  {
    name: "Renea Tucker",
    initials: "RT",
    rating: 5,
    date: "6 days ago",
    text: "The job was a little more challenging in an older house and electrical panel. Required a trip to home depot but Raymond did a great job and did it well. Highly recommend.",
  },
  {
    name: "Dejan Petrovic",
    initials: "DP",
    rating: 5,
    date: "5 days ago",
    text: "Great Work, On Time Highly Recommend!!!",
  },
];

function makeInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
}

/** Strip HTML tags and decode basic entities */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Extract attribute value from a tag */
function attr(tag: string, name: string): string {
  const m = new RegExp(`${name}="([^"]*)"`, "i").exec(tag);
  return m ? m[1] : "";
}

async function fetchLiveReviews(): Promise<Review[]> {
  const res = await fetch("https://napleselectrical.com", {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      Accept: "text/html,application/xhtml+xml",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();

  const reviews: Review[] = [];

  // Trustindex pre-renders review items for crawlers:
  // <div class="ti-review-item"> … </div>
  const itemRe =
    /<div[^>]+class="[^"]*ti-review-item[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;

  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(html)) !== null) {
    const block = m[1];

    // Reviewer name  – inside .ti-name
    const nameM = /<[^>]+class="[^"]*ti-name[^"]*"[^>]*>([\s\S]*?)<\/[^>]+>/i.exec(block);
    const name = nameM ? stripHtml(nameM[1]) : "";
    if (!name) continue;

    // Review text – inside .ti-review-body or .ti-text
    const textM =
      /<[^>]+class="[^"]*(?:ti-review-body|ti-text|ti-review-text)[^"]*"[^>]*>([\s\S]*?)<\/[^>]+>/i.exec(block);
    const text = textM ? stripHtml(textM[1]) : "";
    if (!text) continue;

    // Date – inside <time> or .ti-review-header span
    const dateM = /<time[^>]*>([\s\S]*?)<\/time>/i.exec(block);
    const date = dateM ? stripHtml(dateM[1]) : "";

    // Stars – count filled star SVGs
    const starCount = (block.match(/ti-star-filled|ti-stars-filled/gi) || []).length || 5;

    reviews.push({
      name,
      initials: makeInitials(name),
      text,
      rating: Math.min(starCount, 5),
      date,
    });
  }

  return reviews;
}

export async function GET() {
  // Serve from cache if fresh
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json({ reviews: cache.data, source: "cache" });
  }

  try {
    const live = await fetchLiveReviews();
    const reviews = live.length >= 3 ? live : FALLBACK_REVIEWS;
    cache = { data: reviews, fetchedAt: Date.now() };
    return NextResponse.json({
      reviews,
      source: live.length >= 3 ? "live" : "fallback",
      total: reviews.length,
    });
  } catch {
    if (!cache) cache = { data: FALLBACK_REVIEWS, fetchedAt: Date.now() };
    return NextResponse.json({
      reviews: cache.data,
      source: "fallback",
      total: cache.data.length,
    });
  }
}
