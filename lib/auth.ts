import { auth } from "@/auth";
import { Role} from "@prisma/client";

interface User{
  id: string,
  email: string,
  role: Role
}


export const currentUser = async (): Promise<User | undefined> => {
  const session = await auth();

  if (session?.user) {
    return {
      email: session.user.email ?? null,
      id: session.user.id,  
      role: session.user.role as Role,
    };
  }
  return undefined;
};
