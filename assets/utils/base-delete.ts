import { baseView } from "./base-view";

/**
 * Options used to identify a record for deletion.
 */
export interface DeleteOptions {
  /** Unique record identifier */
  id: string;
}

/**
 * Soft deletes a record by setting `is_active` to false.
 *
 * @param table - LocalStorage table key.
 * @param options - Delete configuration.
 * @returns void
 */
const baseDelete = (table: string, options: DeleteOptions) => {
  // 1° - INPUT
  const raw: Array<{ id: string; is_active: boolean }> | [] = baseView(table, {
    variant: "list",
  });

  // 2° - PROCESS
  if (!raw) return;
  raw.map((el) => {
    if (el.id !== options.id) return;
    el.is_active = false;
  });

  // 3° - OUTPUT
  localStorage.setItem(table, JSON.stringify(raw));
};

export { baseDelete };
