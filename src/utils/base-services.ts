import { Table } from "../types/table";

const baseServiceView = async <IResponseData>(
  endpoint: Table,
): Promise<Array<IResponseData> | null> => {
  const response = localStorage.getItem(endpoint);
  if (!response) return null;
  return JSON.parse(response);
};

const baseServiceDelete = async (endpoint: Table, id: number) => {
  const response = (
    await baseServiceView<{ id: number; is_active: boolean }>(endpoint)
  )?.map((el) => {
    if (el.id === id) el.is_active = false;
  });
  if (!response) return null;

  localStorage.setItem(endpoint, JSON.stringify(response));
  window.location.reload();
};

const baseServiceRemove = async (endpoint: Table, id: number) => {
  const response = (await baseServiceView<{ id: number }>(endpoint))?.filter(
    (el) => {
      el.id !== id;
    },
  );
  if (!response) return null;

  localStorage.setItem(endpoint, JSON.stringify(response));
  window.location.reload();
};

export { baseServiceView, baseServiceDelete, baseServiceRemove };
