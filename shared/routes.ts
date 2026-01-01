import { z } from "zod";
import { insertRegistrationSchema, type InsertRegistration, events, stalls } from './schema';

export { insertRegistrationSchema, type InsertRegistration };

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  events: {
    list: {
      method: 'GET' as const,
      path: '/api/events',
      responses: {
        200: z.array(z.custom<typeof events.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/events/:id',
      responses: {
        200: z.custom<typeof events.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  stalls: {
    list: {
      method: 'GET' as const,
      path: '/api/stalls',
      responses: {
        200: z.array(z.custom<typeof stalls.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/stalls/:id',
      responses: {
        200: z.custom<typeof stalls.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  registrations: {
    create: {
      method: 'POST' as const,
      path: '/api/registrations',
      input: insertRegistrationSchema,
      responses: {
        201: z.object({ message: z.string(), id: z.number() }),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
