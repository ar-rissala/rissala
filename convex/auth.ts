import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { DataModel } from "./_generated/dataModel";

const CustomPassword = Password<DataModel>({
  profile(params) {
    return {
      email: params.email as string,
      pseudo: (params.pseudo as string) || (params.email as string).split("@")[0],
      role: "user",
      preferredLanguage: "fr",
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  },
});

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [CustomPassword],
});
