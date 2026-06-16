import site from "@content/site.json";

export const resolveHandle = (template: string): string =>
  template.replace("{handle}", site.artist.handle);
