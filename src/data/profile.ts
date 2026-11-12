export interface ProfileData {
  name: string;
  tagline: string;
  roles: string;
  location: string;
  shortBio: string;
  extendedBio: string;
  disciplines: string[];
  contact: {
    heading: string;
    description: string;
    email: string;
    githubUrl: string;
    githubUsername: string;
    linkedinUrl: string;
    linkedinUsername: string;
    resumeUrl: string;
    location: string;
    availability: string;
  };
}

export const PROFILE_DATA: ProfileData = {
  name: "HARISH MADURAIMANI",
  tagline: "// FROM CIRCUITS AND CODE TO AI PRODUCTS, STARTUPS, AND BRAND EXPERIENCES.",
  roles: "ENGINEER / PRODUCT BUILDER / ENTREPRENEUR",
  location: "CHENNAI / GLOBAL",
  shortBio:
    "Multidisciplinary engineer and product builder exploring AI, embedded systems, robotics, software and design to turn ideas into real products.",
  extendedBio:
    "I work across hardware, software, AI and design, combining engineering fundamentals with product thinking to build practical technology solutions.\n\nMy work spans embedded systems, robotics, PCB design, computer vision, machine learning, LLM/NLP systems, web development, UI/UX, branding and startup experimentation. Projects such as SafeNest, RoboCore, InfoSense, ElectroLab, ParkQ, Buzzes AI, CertZ, RSNA Knee AI and SiPO Copilot AI reflect my interest in building across different industries and technology domains.",
  disciplines: [
    "1. STARTUPS & PRODUCT",
    "2. EMBEDDED SYSTEMS",
    "3. AI / MACHINE LEARNING",
    "4. ROBOTICS & AUTOMATION",
    "5. PCB & ELECTRONICS",
    "6. SOFTWARE & WEB",
    "7. UI/UX & GRAPHIC DESIGN",
    "8. BRAND DESIGN",
  ],
  contact: {
    heading: "LET'S BUILD SOMETHING MEANINGFUL.",
    description:
      "Open to product development, startup collaboration, engineering projects, AI integration, PCB/embedded systems and branding or design work.",
    email: "harishmaduraimani@gmail.com",
    githubUrl: "https://github.com/harishmaduraimani",
    githubUsername: "harishmaduraimani",
    linkedinUrl: "https://www.linkedin.com/in/harish-maduraimani-s-9638a032b/",
    linkedinUsername: "harish-maduraimani",
    resumeUrl: "https://acrobat.adobe.com/id/urn:aaid:sc:AP:05529f9f-a1f2-405b-9b5f-a17db7e269f3",
    location: "BASE LAB: Chennai, India / Remote",
    availability: "AVAILABLE FOR EMBEDDED & ROBOTICS PROJECTS // 2026",
  },
};
