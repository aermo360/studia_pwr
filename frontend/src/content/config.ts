import { defineCollection, z } from 'astro:content';
import { strapiLoader } from "strapi-community-astro-loader";

// Environment check to avoid build errors if not set
// In Docker (Node runtime), we use process.env. In Client (Vite), we use import.meta.env.
const STRAPI_URL = process.env.STRAPI_URL || import.meta.env.PUBLIC_STRAPI_URL || "http://localhost:1337";

const modules = defineCollection({
    loader: strapiLoader({
        contentType: "module", // Singular, loader will pluralize to "modules"
        strapiUrl: STRAPI_URL,
    }),
    schema: z.object({
        title: z.string(),
        icon: z.string(),
        courses: z.array(z.object({
            name: z.string()
        })).optional().default([]),
    })
});

/*
const globalSettings = defineCollection({
    loader: strapiLoader({
        contentType: "global-setting", // Single types usually accessed by singular name
        strapiUrl: STRAPI_URL,
        singleType: true
    }),
    schema: z.object({
        recruitment_link: z.string().optional(),
        contact_email: z.string().optional(),
        contact_phone: z.string().optional(),
        semester_count: z.string().optional(),
        ects: z.string().optional(),
    })
});
*/

const lecturers = defineCollection({
    loader: strapiLoader({
        contentType: "lecturer",
        strapiUrl: STRAPI_URL,
    }),
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
