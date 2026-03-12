"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth() as { user: any; gitHubSignIn: () => Promise<void>; firebaseSignOut: () => Promise<void> };

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
      // Optional: redirect to shopping list after login
      // router.push("/week-8/shopping-list");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">Week 8 – Shopping List Auth</h1>

      {!user && (
        <div className="space-y-2">
          <p>Please log in with GitHub to continue.</p>
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Log in with GitHub
          </button>
        </div>
      )}

      {user && (
        <div className="space-y-4">
          <p>
            Welcome, {user.displayName} ({user.email})
          </p>
          <div className="space-x-2">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Log out
            </button>
            <Link
              href="/week-8/shopping-list"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Go to shopping list
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
