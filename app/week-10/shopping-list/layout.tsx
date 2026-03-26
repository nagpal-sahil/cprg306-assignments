// app/week-10/layout.tsx
import { ReactNode } from "react";
import { AuthContextProvider } from "../_utils/auth-context";

export default function Week10Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  );
}