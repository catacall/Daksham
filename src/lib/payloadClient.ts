import { getPayload } from "payload";
import configPromise from "@payload-config";
import { mockProjects, mockSiteSettings, seedDatabase } from "./seed";

export const isFrontendMockMode = !process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET;


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
    const payload = await getPayload({ config: configPromise });
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
