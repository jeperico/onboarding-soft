import { baseView } from "./base-view.js";
import { Table } from "./../types/table.js";

const autoIncrement = (table: Table) => {
  const data:
    | Array<{
        id: number;
      }>
    | [] = baseView(table, { variant: "list" });

  const last = data.length - 1;

  if (last === -1) return 1;
  if (!data[last].id)
    throw new Error(`[CODEBASE FAIL] No id found on ${table} table`);
  return data[last].id + 1;
};

export { autoIncrement };
