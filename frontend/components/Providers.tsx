// frontend/src/components/Providers.tsx
"use client";

import { AuthProvider } from "@/lib/auth";
import { DeleteConfirmationProvider } from "./ConfirmDeleteDialog/confirmDelete";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DeleteConfirmationProvider>{children}</DeleteConfirmationProvider>
    </AuthProvider>
  );
}
