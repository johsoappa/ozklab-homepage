import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ozklab.kr/",
    },
    {
      url: "https://ozklab.kr/flow-check",
    },
  ];
}
