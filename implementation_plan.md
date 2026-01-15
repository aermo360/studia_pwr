# Implementation Plan: PWr Praktyczny E-marketing Listing Page

## 1. Project Functionality
- **Dual Application Architecture**: Astro for high-performance frontend, Strapi for flexible content management.
- **Dynamic Content**: Course modules, stats, and graduate profiles managed via CMS.
- **Responsive Design**: Mobile-first approach using Tailwind CSS.

## 2. File Structure
```
/Users/arek/Documents/PWr_Studia/
├── frontend/ (Astro)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── sections/
│   │   │   │   ├── Hero.astro
│   │   │   │   ├── StatsBar.astro
│   │   │   │   ├── CurriculumGrid.astro
│   │   │   │   └── GraduateProfile.astro
│   │   │   └── BaseHead.astro
│   │   ├── layouts/
│   │   │   └── Layout.astro
│   │   ├── pages/
│   │   │   └── index.astro
│   │   ├── lib/
│   │   │   └── strapi.ts (Fetcher utility)
│   │   └── env.d.ts
│   ├── public/
│   └── astro.config.mjs
├── backend/ (Strapi)
│   ├── src/
│   │   ├── api/
│   │   │   ├── course/
│   │   │   ├── module/
│   │   │   └── global-setting/
│   └── .env
```

## 3. Data Models (Strapi)

### Collection: `Module` (Program Blocks)
- `Title` (Text) - e.g., "Strategia"
- `Icon` (Text) - Material Symbol name e.g., "insights"
- `Courses` (Component/Relation) - List of items like "SEO / SEM", "Marketing B2B"

### Collection: `Course` (Optional, if detailed pages needed, otherwise just list items in Module)
- **Decision**: Use a Repeatable Component inside `Module` for simplicity first.

### Collection: `Lecturer`
- `Name` (Text)
- `Role` (Text) - e.g., "Ekspert SEO & Content"
- `Description` (Text)
- `ImageUrl` (Text)

### Single Type: `GlobalSetting`
- `RecruitmentLink` (Text)
- `ContactEmail` (Email)
- `ContactPhone` (Text)
- `DirectorNote` (Rich Text)
- `SemesterCount` (Text)
- `ECTS` (Text)

## 4. Component Strategy
- **Hero**: Static structure, dynamic text/images from Strapi.
- **StatsBar**: Dynamic data from `GlobalSetting`.
- **CurriculumGrid**: Iterates over `Module` collection.
- **LecturersGrid**: Iterates over `Lecturer` collection.
- **GraduateProfile**: Static or Single Type content.

## 5. Next Steps
1. Initialize Astro project in `frontend/`.
2. Initialize Strapi project in `backend/`.
3. Configure Tailwind in Astro.
4. Setup Strapi fetcher.
5. Create `LecturersGrid` component and `wykladowcy.astro` page.
6. Create `Lecturer` content type and seed data.
