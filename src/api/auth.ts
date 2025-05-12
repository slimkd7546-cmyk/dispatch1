import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignIn,
  signOut as firebaseSignOut,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export type UserRole =
  | "admin"
  | "dispatcher"
  | "officer"
  | "reviewer"
  | "connect"
  | "driver";

export interface AuthUser {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  role: UserRole;
}

/**
 * Handle Firebase errors
 */
const handleFirebaseError = (error: any) => {
  console.error("Firebase error:", error);
  return {
    error: {
      message: error.message || "An unknown error occurred",
      code: error.code || "unknown",
    },
  };
};

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await firebaseSignIn(auth, email, password);
    const user = userCredential.user;

    // Fetch user profile data
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      throw new Error("User profile not found");
    }

    const userData = userDoc.data();

    return {
      user: {
        id: user.uid,
        email: user.email!,
        fullName: userData.fullName,
        avatarUrl: userData.avatarUrl,
        role: userData.role as UserRole,
      },
      session: { user: userCredential.user },
    };
  } catch (error) {
    return handleFirebaseError(error);
  }
};

/**
 * Sign up with email and password
 */
export const signUpWithEmail = async (
  email: string,
  password: string,
  fullName: string,
  role: UserRole = "dispatcher",
) => {
  try {
    // Create auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Update profile with display name
    await updateProfile(user, { displayName: fullName });

    // Create profile in users collection
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      email: email,
      fullName: fullName,
      role: role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return {
      user: {
        id: user.uid,
        email: user.email!,
        fullName,
        role,
      },
      session: { user: userCredential.user },
    };
  } catch (error) {
    return handleFirebaseError(error);
  }
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error) {
    return handleFirebaseError(error);
  }
};

/**
 * Get the current user
 */
export const getCurrentUser = async (): Promise<{
  user: AuthUser | null;
  error?: any;
}> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return { user: null };

    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
    if (!userDoc.exists()) {
      return { user: null };
    }

    const userData = userDoc.data();

    return {
      user: {
        id: currentUser.uid,
        email: currentUser.email!,
        fullName: userData.fullName,
        avatarUrl: userData.avatarUrl,
        role: userData.role as UserRole,
      },
    };
  } catch (error) {
    return { user: null, error };
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
  userId: string,
  updates: {
    fullName?: string;
    avatarUrl?: string;
    role?: UserRole;
  },
) => {
  try {
    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    if (updates.fullName !== undefined) updateData.fullName = updates.fullName;
    if (updates.avatarUrl !== undefined)
      updateData.avatarUrl = updates.avatarUrl;
    if (updates.role !== undefined) updateData.role = updates.role;

    // Update the user document
    await updateDoc(doc(db, "users", userId), updateData);

    // Get the updated user data
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) {
      throw new Error("User not found");
    }

    const userData = userDoc.data();

    return {
      user: {
        id: userId,
        email: userData.email,
        fullName: userData.fullName,
        avatarUrl: userData.avatarUrl,
        role: userData.role as UserRole,
      },
    };
  } catch (error) {
    return handleFirebaseError(error);
  }
};
