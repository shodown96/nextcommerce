// import { publicUrl } from "@/env.mjs";
import { publicUrl } from "@/lib/constants/paths";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: publicUrl + "/sitemap.xml",
	};
}

// /public/robots.txt

// # Block all crawlers for /accounts
// User-agent: *
// Disallow: /accounts

// # Allow all crawlers
// User-agent: *
// Allow: /

// <!-- public/sitemap.xml -->
//    <xml version="1.0" encoding="UTF-8">
//    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//      <url>
//        <loc>http://www.example.com/foo</loc>
//        <lastmod>2021-06-01</lastmod>
//      </url>
//    </urlset>
//    </xml>