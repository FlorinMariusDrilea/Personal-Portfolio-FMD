// Shared, framework-agnostic types/constants for the contact action. Kept out of
// the "use server" module because those files may only export async functions.

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  // Field-level errors keyed by input name, so the form can highlight them.
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  // Submitted values echoed back so the form can repopulate after React 19's
  // automatic post-action form reset (used as input defaultValues). Left empty
  // on success so the form clears.
  values?: { name: string; email: string; message: string };
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
};
