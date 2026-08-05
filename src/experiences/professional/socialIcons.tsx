import type { IconType } from "react-icons";
import { SiGithub, SiGmail, SiX } from "react-icons/si";
import { FaLinkedinIn, FaGlobe } from "react-icons/fa6";
import type { SocialKind } from "@/data";

// Brand marks come from react-icons (lucide dropped its brand set), so they
// stay recognisable — a recruiter scans for the octocat, not for a word.
//
// LinkedIn comes from Font Awesome because Simple Icons removed it over
// trademark policy. FaLinkedinIn is the bare "in" glyph, which matches the
// weight of the other bare marks instead of dropping a filled badge among them.
export const socialIcons: Record<SocialKind, IconType> = {
  github: SiGithub,
  linkedin: FaLinkedinIn,
  email: SiGmail,
  twitter: SiX,
  website: FaGlobe,
};
