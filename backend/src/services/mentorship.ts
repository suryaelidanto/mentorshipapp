import prisma from "@/libs/prisma";
import { Mentorship } from "@prisma/client";

export const getAllMentorships = async (): Promise<Mentorship[]> => {
  return prisma.mentorship.findMany();
};

export const getMentorshipById = async (
  id: number,
): Promise<Mentorship | null> => {
  return prisma.mentorship.findUnique({
    where: { id },
  });
};

export const createMentorship = async (
  data: Omit<Mentorship, "id">,
): Promise<Mentorship> => {
  return prisma.mentorship.create({
    data: {
      ...data,
      // mentorId :
    },
  });
};

export const updateMentorship = async (
  id: number,
  data: Partial<Mentorship>,
): Promise<Mentorship> => {
  return prisma.mentorship.update({
    where: { id },
    data,
  });
};

export const deleteMentorship = async (id: number): Promise<Mentorship> => {
  return prisma.mentorship.delete({
    where: { id },
  });
};
