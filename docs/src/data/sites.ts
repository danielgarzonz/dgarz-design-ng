export interface RealSite {
  name: string;
  url: string;
  desc: string;
  /** Optional screenshot under /public */
  image?: string;
  tags?: string[];
}

/** Webs reales que usan dgarz design. Añade entradas aquí. */
export const REAL_SITES: RealSite[] = [];
