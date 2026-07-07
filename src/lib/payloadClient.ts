import { getPayload } from "payload";
import configPromise from "@payload-config";

export const isFrontendMockMode = !process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET;

const mockProjects = [
  {
    id: 101,
    slug: "skyline-heights",
    title: "Skyline Heights",
    location: "Vashi, Navi Mumbai",
    status: "ongoing",
    coverImage: "/OH.jpg",
    images: ["/OH.jpg", "/OA.jpg"],
    area: "2, 3 & 4 BHK",
    priceRange: "₹1.45 Cr - ₹2.95 Cr",
    reraNumber: "P51800020079",
    publishedAt: "2025-03-15",
    description:
      "Skyline Heights is a premium residential destination in Vashi, offering modern amenities, elegant finishes, and high-rise lake views.",
    highlights: [
      { point: "Infinity pool with lounge deck" },
      { point: "Premium clubhouse and gym" },
      { point: "Fiber-ready smart homes" },
    ],
    amenityPhotos: ["/OBjpg.jpg", "/UE-6.jpg"],
  },
  {
    id: 102,
    slug: "sai-world-city",
    title: "Sai World City",
    location: "Panvel, Navi Mumbai",
    status: "delivered",
    coverImage: "/CLVjpg.jpg",
    images: ["/CLVjpg.jpg", "/OR-1.jpg"],
    area: "3 BHK Spacious Homes",
    priceRange: "₹1.10 Cr - ₹1.75 Cr",
    reraNumber: "P51800001111",
    publishedAt: "2024-09-30",
    description:
      "Sai World City is a delivered landmark in Panvel with family-friendly spaces, lush landscaping, and strong community living.",
    highlights: [
      { point: "Landscaped gardens" },
      { point: "Children's play area" },
      { point: "Excellent connectivity" },
    ],
    amenityPhotos: ["/UE-6.jpg"],
  },
  {
    id: 103,
    slug: "paradise-mall",
    title: "Paradise Mall",
    location: "Kharghar, Navi Mumbai",
    status: "ongoing",
    coverImage: "/OA.jpg",
    images: ["/OA.jpg", "/OBjpg.jpg"],
    area: "Premium Retail & Office Spaces",
    priceRange: "₹40L - ₹95L",
    reraNumber: "P51800002222",
    publishedAt: "2025-01-10",
    description:
      "Paradise Mall brings best-in-class retail, dining, and commercial spaces to Kharghar in a sleek, contemporary destination.",
    highlights: [
      { point: "High street retail" },
      { point: "Multiplex auditorium" },
      { point: "Ample parking" },
    ],
    amenityPhotos: ["/OR-1.jpg"],
  },
];

const mockSiteSettings = {
  brochure: {
    url: "/placeholder-project.jpg",
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

export async function getPayloadClient() {
  if (!isFrontendMockMode) {
    return getPayload({ config: configPromise });
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
