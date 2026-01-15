import { defineCollection, z } from 'astro:content';
import { strapiLoader } from "strapi-community-astro-loader";

// Environment check to avoid build errors if not set
// In Docker (Node runtime), we use process.env. In Client (Vite), we use import.meta.env.
const STRAPI_URL = process.env.STRAPI_URL || import.meta.env.PUBLIC_STRAPI_URL || "http://localhost:1337";

console.log("ASTRO CONFIG: Using Strapi URL:", STRAPI_URL);

// Custom simple loader to bypass library issues
const customStrapiLoader = (contentType: string) => async () => {
    const url = `${STRAPI_URL}/api/${contentType}`;
    console.log(`[CustomLoader] Fetching ${url}`);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        // Strapi 5 returns { data: [...] } or { data: { ... } } for single types
        // The collection loader expects an array of items.
        // We map 'documentId' to 'id' for compatibility if needed, but Astro handles ID generation.
        if (Array.isArray(json.data)) {
            return json.data.map((item: any) => ({
                ...item,
                id: item.documentId || item.id // Use documentId as stable ID if available
            }));
        }
        return [];
    } catch (e) {
        console.error(`[CustomLoader] Error fetching ${contentType}:`, e);
        throw e;
    }
};

const modules = defineCollection({
    loader: customStrapiLoader("modules"), // Strapi 5 API is pluralized
    schema: z.object({
        title: z.string(),
        icon: z.string(),
        courses: z.array(z.object({
            name: z.string()
        })).optional().default([]),
    })
});

const lecturers = defineCollection({
    loader: customStrapiLoader("lecturers"),
    schema: z.object({
        name: z.string(),
        role: z.string(),
        description: z.string().optional(),
        image_url: z.string().optional(),
    })
});

export const collections = {
    modules,
    lecturers,
    // 'global-setting': globalSettings
};
