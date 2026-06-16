"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { FC, PropsWithChildren, ReactNode } from "react";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

// Define the shape of the data passed to confirmDelete
export interface DeleteConfirmOptions {
  title?: string;
  message?: string; // Allows rich text or simple strings
  confirmText?: string;
  cancelText?: string;
}

interface DeleteConfirmationState {
  /**
   * Opens the delete confirmation dialog.
   * @param options - Configuration for the dialog
   * @returns A Promise that resolves if confirmed, rejects if cancelled
   */
  confirmDelete: (options?: DeleteConfirmOptions) => Promise<void>;
}

const DeleteConfirmationContext = createContext<DeleteConfirmationState | null>(null);

export const useDeleteConfirmation = () => {
  const context = useContext(DeleteConfirmationContext);
  if (!context) {
    throw new Error("useDeleteConfirmation must be used within a DeleteConfirmationProvider");
  }
  return context;
};

export const DeleteConfirmationProvider: FC<PropsWithChildren> = ({ children }) => {
  // State to control dialog visibility and content
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<DeleteConfirmOptions>({});

  // Store the resolve/reject functions for the Promise
  const [promiseState, setPromiseState] = useState<{
    resolve: () => void;
    reject: () => void;
  } | null>(null);

  /**
   * Triggers the confirmation dialog.
   */
  const confirmDelete = useCallback((options: DeleteConfirmOptions = {}) => {
    return new Promise<void>((resolve, reject) => {
      setOptions(options);
      setPromiseState({ resolve, reject });
      setIsOpen(true);
    });
  }, []);

  /**
   * Handles the "Confirm" action.
   */
  const resetDialog = useCallback(() => {
    setIsOpen(false);
    setPromiseState(null);
    // Clear options after a short delay to allow UI transition if needed,
    // or immediately. Immediate is usually fine for simple dialogs.
    setTimeout(() => setOptions({}), 0);
  }, []);

  const handleConfirm = useCallback(() => {
    if (promiseState?.resolve) {
      promiseState.resolve();
    }
    resetDialog();
  }, [promiseState, resetDialog]);

  /**
   * Handles the "Cancel" action or close event.
   */
  const handleCancel = useCallback(() => {
    if (promiseState?.reject) {
      // Rejecting with undefined is standard for user cancellation,
      // but you can pass a specific error message if needed.
      promiseState.reject();
    }
    resetDialog();
  }, [promiseState, resetDialog]);

  const value = { confirmDelete };

  return (
    <DeleteConfirmationContext.Provider value={value}>
      {children}
      {/* The Dialog Component */}
      <ConfirmDeleteDialog
        open={isOpen}
        title={options.title || "Confirm Deletion"}
        description={
          options.message ||
          "Are you sure you want to delete this item? This action cannot be undone."
        }
        confirmationText={options.confirmText || "Delete"}
        cancellationText={options.cancelText || "Cancel"}
        onConfirm={handleConfirm} // Assuming your ConfirmDialog accepts onConfirm/onCancel or onClick logic
        onCancel={handleCancel} // Adjust based on your actual UI component's props
      />
    </DeleteConfirmationContext.Provider>
  );
};

// Helper Consumer (Optional, usually not needed with the hook)
export const DeleteConfirmationConsumer: FC<
  PropsWithChildren<{ children: (state: DeleteConfirmationState | null) => ReactNode }>
> = ({ children }) => {
  return (
    <DeleteConfirmationContext.Consumer>
      {(context) => children(context)}
    </DeleteConfirmationContext.Consumer>
  );
};
