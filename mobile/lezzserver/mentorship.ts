import { query, mutation, v } from '@lezzserver/server';
import { db } from './db';

export const listMentorship = query({
  handler: async () => {
    return await db.mentorship.findMany({});
  },
});

export const createMentorship = mutation({
  args: v.object({
    position: v
      .string()
      .max(100, { message: 'Position must be at most 100 characters' }),
    institution: v
      .string()
      .max(100, { message: 'Institution must be at most 100 characters' }),
    description: v
      .string()
      .max(500, { message: 'Description must be at most 500 characters' }),
    meetingLink: v
      .string()
      .url({ message: 'Invalid URL format' })
      .regex(/^https:\/\//, {
        message: 'Meeting link must start with "https://"',
      })
      .max(100, { message: 'Meeting link must be at most 100 characters' }),
    contactLink: v
      .string()
      .url({ message: 'Invalid URL format' })
      .regex(/^https:\/\//, {
        message: 'Contact link must start with "https://"',
      })
      .max(100, { message: 'Contact link must be at most 100 characters' }),
  }),
  handler: async (ctx, data) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error('Not authenticated');
    }

    const { sub } = identity.payload;

    return await db.mentorship.create({
      data: {
        ...data,
        userInfoId : sub
      },
    });
  },
});
