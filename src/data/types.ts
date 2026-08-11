// Single source of truth for portfolio content.
// These types are presentation-agnostic: the data says what is true, the
// sections decide how to render it.
//
// Projects come in two shapes on purpose. A reader gives the page under a
// minute, so showing ten equal cards means none of them gets read — and a wall
// of half-finished side projects reads as "starts things, doesn't finish them".
// `Project` is the handful that carry the argument; `LabProject` is the rest,
// framed as finished experiments rather than abandoned products.

export type SkillCategory = "language" | "frontend" | "backend" | "tooling";

export interface Skill {
  name: string;
  category: SkillCategory;
  /**
   * Icon slug resolved by the icon map (see components/skills/skillIcons).
   * Binary "I've worked with this" — no skill-level percentages on purpose.
   */
  icon: string;
}

export type ProjectStatus = "live" | "beta" | "wip" | "archived";

/** Who the project was built for — it changes how a reader weighs it. */
export type ProjectKind = "product" | "tool";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  /** One line. Shown on the card header. */
  summary: string;
  /** A paragraph of context: what problem it solves and for whom. */
  description: string;
  /**
   * The technical decisions worth defending in an interview. This is what
   * separates "I used React" from "I know why I did it this way".
   * Each entry is a decision, not a feature.
   */
  highlights: string[];
  stack: string[];
  status: ProjectStatus;
  kind: ProjectKind;
  links: ProjectLink[];
  /** Pulls the project to the top and gives it a wider card. One or two max. */
  featured?: boolean;
  /** Path under /public or imported asset url. */
  image?: string;
}

/**
 * A one-line entry for the lab section: something built to understand how it
 * works, not to ship. No status badge on purpose — an experiment doesn't owe
 * anyone a roadmap, and `wip` on six cards is what makes the set read badly.
 */
export interface LabProject {
  id: string;
  title: string;
  /** What it does and, ideally, what it taught. One sentence. */
  summary: string;
  stack: string[];
  /** Only when the code is public. A lab entry does not need a link to earn its place. */
  url?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  /** What the product actually does — context the reader doesn't have. */
  context: string;
  /** Human-readable, for display. */
  period: string;
  /**
   * Machine-readable start, `YYYY-MM`. The hero derives the years-of-experience
   * figure from this so it can never drift from the dates shown right below it
   * — a recruiter who does the arithmetic has to land on the same number.
   */
  startDate: string;
  location: string;
  /** Same contract as Project.highlights: decisions and scope, not chores. */
  highlights: string[];
  stack: string[];
  current?: boolean;
}

export type SocialKind = "github" | "linkedin" | "email" | "twitter" | "website";

export interface Social {
  kind: SocialKind;
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  role: string;
  /** One-liner for the hero. */
  tagline: string;
  /** A few sentences for the about section. */
  bio: string;
  location: string;
  /** Availability line for recruiters. Keep it current or delete it. */
  availability: string;
  /** Path under /public to the downloadable CV. */
  cvUrl: string;
  socials: Social[];
}
