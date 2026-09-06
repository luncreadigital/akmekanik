import { DEFAULT_CONTENT } from "./defaults";
import type { SiteContent } from "../types/content";

/**
 * Ham JSON'u SiteContent ile birleştirir.
 * - Remote veri uygun yapıdayken override olarak kullanılır.
 * - Eksik/kırık alanları sisteme düşürmez; her seviye default'a derin-birleşir.
 */
export function mergeContent(data: unknown): SiteContent {
  if (!data || typeof data !== "object") return DEFAULT_CONTENT;
  const src = data as Partial<SiteContent>;
  return {
    ...DEFAULT_CONTENT,
    ...src,
    company: { ...DEFAULT_CONTENT.company, ...src.company },
    hero: { ...DEFAULT_CONTENT.hero, ...src.hero },
    services: { ...DEFAULT_CONTENT.services, ...src.services, items: src.services?.items ?? DEFAULT_CONTENT.services.items },
    projects: {
      ...DEFAULT_CONTENT.projects,
      ...src.projects,
      current: src.projects?.current ?? DEFAULT_CONTENT.projects.current,
      completed: src.projects?.completed ?? DEFAULT_CONTENT.projects.completed,
    },
    about: {
      ...DEFAULT_CONTENT.about,
      ...src.about,
      points: src.about?.points ?? DEFAULT_CONTENT.about.points,
      tags: src.about?.tags ?? DEFAULT_CONTENT.about.tags,
      stats: src.about?.stats ?? DEFAULT_CONTENT.about.stats,
      board: src.about?.board ?? DEFAULT_CONTENT.about.board,
    },
    process: { ...DEFAULT_CONTENT.process, ...src.process, steps: src.process?.steps ?? DEFAULT_CONTENT.process.steps },
    contact: {
      ...DEFAULT_CONTENT.contact,
      ...src.contact,
      info: src.contact?.info ?? DEFAULT_CONTENT.contact.info,
      form: { ...DEFAULT_CONTENT.contact.form, ...src.contact?.form },
      services: src.contact?.services ?? DEFAULT_CONTENT.contact.services,
    },
    footer: { ...DEFAULT_CONTENT.footer, ...src.footer, services: src.footer?.services ?? DEFAULT_CONTENT.footer.services },
    navigation: {
      ...DEFAULT_CONTENT.navigation,
      ...src.navigation,
      links: src.navigation?.links ?? DEFAULT_CONTENT.navigation.links,
    },
  };
}
