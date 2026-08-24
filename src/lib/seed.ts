export const mockProjects = [
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

export const mockSiteSettings = {
  brochure: {
    url: "/placeholder-project.webp",
  },
};

let seedingPromise: Promise<void> | null = null;

export function seedDatabase(payload: any): Promise<void> {
  if (seedingPromise) return seedingPromise;

  seedingPromise = (async () => {
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
        console.log("[Seeding] First admin user created.");
      }

      // 2. Seed default projects if projects collection is empty
      const projects = await payload.find({
        collection: "projects" as any,
        limit: 1,
      });
      if (projects.totalDocs === 0) {
        console.log("[Seeding] Database is empty. Seeding default projects...");
        for (const p of mockProjects) {
          await payload.create({
            collection: "projects" as any,
            data: {
              ...p,
              coverImage: null,
              images: [],
              amenityPhotos: [],
            },
          });
        }
        console.log("[Seeding] Default projects seeded.");
      }
    } catch (err) {
      console.error("[Seeding] Auto-seeding failed:", err);
    }
  })();

  return seedingPromise;
}
