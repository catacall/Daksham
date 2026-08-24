import { getPayload } from "payload";
import configPromise from "@payload-config";

export const isFrontendMockMode = !process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET;

const mockProjects = [
  {
    id: 101,
    slug: "ce-la-vie",
    title: "Ce La Vie",
    location: "Sector-34C, Kharghar",
    status: "ongoing",
    coverImage: "/placeholder-project.webp",
    images: ["/placeholder-project.webp"],
    area: "Premium Residences",
    priceRange: "Price on Request",
    reraNumber: "",
    publishedAt: "2025-06-01",
    description:
      "Ce La Vie is a premium residential tower in Sector-34C, Kharghar, offering elegant modern living with world-class amenities.",
    highlights: [
      { point: "Prime Kharghar Location" },
      { point: "Modern Architecture" },
      { point: "Premium Amenities" },
    ],
    amenityPhotos: [],
  },
  {
    id: 102,
    slug: "united-emporio",
    title: "United Emporio",
    location: "Sector-11, Kharghar",
    status: "ongoing",
    coverImage: "/placeholder-project.webp",
    images: ["/placeholder-project.webp"],
    area: "Commercial & Residential",
    priceRange: "Price on Request",
    reraNumber: "",
    publishedAt: "2025-05-15",
    description:
      "United Emporio is a landmark mixed-use development in Sector-11, Kharghar, combining commercial spaces with modern residential living.",
    highlights: [
      { point: "Mixed-Use Development" },
      { point: "Strategic Location" },
      { point: "Premium Finishes" },
    ],
    amenityPhotos: [],
  },
  {
    id: 103,
    slug: "ganesha-greens",
    title: "Ganesha Greens",
    location: "Sector-25, Ulwe",
    status: "ongoing",
    coverImage: "/placeholder-project.webp",
    images: ["/placeholder-project.webp"],
    area: "Green Living Residences",
    priceRange: "Price on Request",
    reraNumber: "",
    publishedAt: "2025-04-20",
    description:
      "Ganesha Greens offers eco-friendly, green living in the rapidly developing Sector-25, Ulwe with excellent connectivity.",
    highlights: [
      { point: "Eco-Friendly Design" },
      { point: "Near Navi Mumbai Airport" },
      { point: "Lush Green Surroundings" },
    ],
    amenityPhotos: [],
  },
  {
    id: 104,
    slug: "orchid-residency",
    title: "Orchid Residency",
    location: "Sector-14, Koparkharane",
    status: "ongoing",
    coverImage: "/placeholder-project.webp",
    images: ["/placeholder-project.webp"],
    area: "Residential Apartments",
    priceRange: "Price on Request",
    reraNumber: "",
    publishedAt: "2025-03-10",
    description:
      "Orchid Residency is a thoughtfully designed residential project in Sector-14, Koparkharane, with modern amenities.",
    highlights: [
      { point: "Well Connected" },
      { point: "Family-Friendly" },
      { point: "Modern Amenities" },
    ],
    amenityPhotos: [],
  },
  {
    id: 105,
    slug: "orchid-heights",
    title: "Orchid Heights",
    location: "Sector-23, Ulwe",
    status: "delivered",
    coverImage: "/placeholder-project.webp",
    images: ["/placeholder-project.webp"],
    area: "High-Rise Residences",
    priceRange: "Price on Request",
    reraNumber: "",
    publishedAt: "2025-02-15",
    description:
      "Orchid Heights offers premium high-rise living in Sector-23, Ulwe with panoramic views and top-tier amenities.",
    highlights: [
      { point: "High-Rise Living" },
      { point: "Panoramic Views" },
      { point: "Near NMIA" },
    ],
    amenityPhotos: [],
  },
];

const mockSiteSettings = {
  brochure: {
    url: "/placeholder-project.webp",
  },
};

function applySelect(docs: any[], select: any) {
  if (!select || typeof select !== "object") {
    return docs;
  }

  return docs.map(doc => {
    const selected: any = {};
    Object.keys(select).forEach(key => {
      if (select[key] && Object.prototype.hasOwnProperty.call(doc, key)) {
        selected[key] = (doc as any)[key];
      }
    });
    return selected;
  });
}

function matchesWhere(project: any, where: any) {
  if (!where || typeof where !== "object") {
    return true;
  }

  if (where.slug?.equals) {
    if (project.slug !== where.slug.equals) {
      return false;
    }
  }

  if (where.status?.equals) {
    if (project.status !== where.status.equals) {
      return false;
    }
  }

  return true;
}

function sortProjects(projects: any[], sort?: string) {
  if (!sort) return projects;

  if (sort === "-publishedAt") {
    return [...projects].sort(
      (a, b) =>
        new Date(b.publishedAt || "").getTime() - new Date(a.publishedAt || "").getTime(),
    );
  }

  return projects;
}

function paginate(docs: any[], options: any = {}) {
  if (options.pagination === false) {
    return {
      docs,
      totalDocs: docs.length,
      totalPages: 1,
      page: 1,
    };
  }

  const page = Number(options.page ?? 1) || 1;
  const limit = Number(options.limit ?? 6) || 6;
  const sortedDocs = docs;
  const totalDocs = sortedDocs.length;
  const totalPages = Math.max(1, Math.ceil(totalDocs / limit));
  const offset = (page - 1) * limit;
  const pageDocs = sortedDocs.slice(offset, offset + limit);

  return {
    docs: pageDocs,
    totalDocs,
    page,
    totalPages,
  };
}

let isSeeded = false;

export async function getPayloadClient() {
  if (!isFrontendMockMode) {
    const payload = await getPayload({ config: configPromise });

    // Run auto-seeding on live database if not already done
    if (!isSeeded) {
      isSeeded = true;
      try {
        // 1. Seed first admin user if users collection is empty
        const users = await payload.find({
          collection: "users" as any,
          limit: 1,
        });
        if (users.totalDocs === 0) {
          console.log("[Seeding] Database is empty. Creating first admin user...");
          await payload.create({
            collection: "users" as any,
            data: {
              email: "anassayyed000@gmail.com",
              password: "RECODD@04",
            },
          });
        }

        // 2. Seed default projects if projects collection is empty
        const projects = await payload.find({
          collection: "projects" as any,
          limit: 1,
        });
        if (projects.totalDocs === 0) {
          console.log("[Seeding] Database is empty. Seeding default projects...");
          for (const p of mockProjects) {
            // Remove mock client ID so database auto-increments
            const { id, coverImage, images, amenityPhotos, ...projectData } = p;
            await payload.create({
              collection: "projects" as any,
              data: {
                ...projectData,
                coverImage: null,
                images: [],
                amenityPhotos: [],
              },
            });
          }
        }
      } catch (err) {
        console.error("[Seeding] Auto-seeding failed:", err);
      }
    }

    return payload;
  }

  return {
    find: async (options: any = {}) => {
      const collection = options.collection;
      if (collection !== "projects") {
        return {
          docs: [],
          totalDocs: 0,
          totalPages: 1,
          page: 1,
        };
      }

      let docs = mockProjects.filter(project => matchesWhere(project, options.where));
      docs = sortProjects(docs, options.sort);
      docs = applySelect(docs, options.select);

      return paginate(docs, options);
    },

    findByID: async ({ collection, id }: any) => {
      if (collection !== "projects") {
        return null;
      }
      return mockProjects.find(project => String(project.id) === String(id)) || null;
    },

    findGlobal: async () => mockSiteSettings,

    auth: async () => ({ user: null }),

    create: async ({ collection, data }: any) => {
      return { id: Date.now(), ...data };
    },

    update: async ({ collection, id, data }: any) => {
      return { id, ...data };
    },

    delete: async ({ collection, id }: any) => ({ id }),
  };
}
