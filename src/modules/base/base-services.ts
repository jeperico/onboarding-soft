import { Table } from "../../types/table";

const serviceView = async <IResponseData>(
  endpoint: Table,
): Promise<Array<IResponseData> | null> => {
  const response = localStorage.getItem(endpoint);
  if (!response) return null;
  return JSON.parse(response);
};

const serviceDelete = async (endpoint: Table, id: number) => {
  const response = await serviceView<{ id: number; is_active: boolean }>(
    endpoint,
  );
  const payload = await response?.map((el) => {
    console.log(id, el);
    if (el.id === id) el.is_active = false;
  });
  if (!payload) return null;

  localStorage.setItem(endpoint, JSON.stringify(response));
  window.location.reload();
};

const serviceRemove = async (endpoint: Table, id: number) => {
  const response = (await serviceView<{ id: number }>(endpoint))?.filter(
    (el) => {
      el.id !== id;
    },
  );
  if (!response) return null;

  localStorage.setItem(endpoint, JSON.stringify(response));
  window.location.reload();
};

export { serviceView, serviceDelete, serviceRemove };
