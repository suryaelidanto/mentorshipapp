import prisma from "@/libs/prisma";
import { Mentorship, Prisma } from "@prisma/client";

type MentorshipWithRelation = Prisma.MentorshipGetPayload<{
  include: { userInfo: true };
}>;

export const getAllMentorships = async () => {
  return await prisma.mentorship.findMany({
    include: {
      userInfo: true,
    },
  });
};

export const getMentorshipById = async (id: number) => {
  return await prisma.mentorship.findUnique({
    where: { id },
  });
};

export const createMentorship = async (
  data: Omit<MentorshipWithRelation, "id">,
) => {
  return prisma.mentorship.create({
    data: {
      institution: data.institution,
      contactLink: data.contactLink,
      description: data.description,
      meetingLink: data.meetingLink,
      position: data.position,
      userInfo: {
        create: {
          id: data.userInfo?.id as string,
          firstName: data.userInfo?.firstName,
          lastName: data.userInfo?.lastName,
          imageUrl: data.userInfo?.imageUrl,
        },
      },
    },
  });
};

export const updateMentorship = async (
  id: number,
  data: Partial<Mentorship>,
) => {
  return await prisma.mentorship.update({
    where: { id },
    data,
  });
};

export const deleteMentorship = async (id: number) => {
  return await prisma.mentorship.delete({
    where: { id },
  });
};
