import { getPayload } from "payload";
import configPromise from "@payload-config";

export const isFrontendMockMode = !process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET;

const mockProjects = [
  {
    id: 101,
    slug: "ca-le-via",
    title: "Ca Le Via",
    location: "Sector-34C, Kharghar",
    status: "ongoing",
    coverImage: "/placeholder-project.webp",
    images: ["/placeholder-project.webp"],
    area: "Premium Residences",
    priceRange: "Price on Request",
    reraNumber: "",
    publishedAt: "2025-06-01",
    description:
      "Ca Le Via is a premium residential tower in Sector-34C, Kharghar, offering elegant modern living with world-class amenities.",
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
      "Orchid Residency is a thoughtfully designed residential project in Sector-14, Koparkharane, with modern amenities and excellent connectivity.",
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
    status: "ongoing",
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
  {
    id: 106,
    slug: "orchid-arcade",
    title: "Orchid Arcade",
    location: "Sector-10, Vashi",
    status: "ongoing",
    coverImage: "/placeholder-project.webp",
    images: ["/placeholder-project.webp"],
    area: "Commercial & Retail",
    priceRange: "Price on Request",
    reraNumber: "",
    publishedAt: "2025-01-20",
    description:
      "Orchid Arcade is a prime commercial development in Sector-10, Vashi, offering retail and office spaces in a bustling business hub.",
    highlights: [
      { point: "Prime Vashi Location" },
      { point: "Commercial Hub" },
      { point: "High Footfall Area" },
    ],
    amenityPhotos: [],
  },
  {
    id: 107,
    slug: "orchid-bliss",
    title: "Orchid Bliss",
    location: "Sector-5, Ulwe",
    status: "ongoing",
    coverImage: "/placeholder-project.webp",
    images: ["/placeholder-project.webp"],
    area: "Residential Apartments",
    priceRange: "Price on Request",
    reraNumber: "",
    publishedAt: "2024-12-10",
    description:
      "Orchid Bliss brings comfortable and spacious residential living to Sector-5, Ulwe with thoughtful design and modern amenities.",
    highlights: [
      { point: "Spacious Layouts" },
      { point: "Growing Neighbourhood" },
      { point: "Excellent Connectivity" },
    ],
    amenityPhotos: [],
  },
  {
    id: 108,
    slug: "orchid-homes",
    title: "Orchid Homes",
    location: "Karjat",
    status: "ongoing",
    coverImage: "/placeholder-project.webp",
    images: ["/placeholder-project.webp"],
    area: "Weekend & Residential Homes",
    priceRange: "Price on Request",
    reraNumber: "",
    publishedAt: "2024-11-01",
    description:
      "Orchid Homes offers serene residential living in the lush green surroundings of Karjat, perfect for weekend getaways and family homes.",
    highlights: [
      { point: "Nature Retreat" },
      { point: "Weekend Homes" },
      { point: "Scenic Location" },
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
