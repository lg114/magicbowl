export interface Project {
  name: string;
  desc: string;
  tech: string[];
  status: "active" | "working on" | "archived";
  repo?: string;
  demo?: string;
  featured?: boolean;
}
