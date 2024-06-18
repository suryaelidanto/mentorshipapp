import prisma from "@/libs/prisma";

export const check = async (userId: string) => {
  return !!(await prisma.userInfo.count({
    where: {
      id: userId,
    },
  }));
};
