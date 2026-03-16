import { Table } from "./../types/table.js";
import { baseServiceView } from "./base-services.js";

const autoIncrement = async (table: Table) => {
  const data = await baseServiceView<{
    id: number;
  }>(table);

  if (!data) return 1;
  const last = data.length - 1;

  if (last === -1) return 1;
  if (!data[last].id)
    throw new Error(`[CODEBASE FAIL] No id found on ${table} table`);
  return data[last].id + 1;
};

export { autoIncrement };
