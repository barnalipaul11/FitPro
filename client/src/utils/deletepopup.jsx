import React from "react";

export function DeletePopup({ open, onConfirm, onCancel, title = "Confirm Delete", message = "Are you sure you want to delete this item?" }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}