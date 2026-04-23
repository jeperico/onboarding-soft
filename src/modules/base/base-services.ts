import { Table } from "../../types/table.js";

const serviceView = async <IResponseData>(
  endpoint: Table,
): Promise<Array<IResponseData> | null> => {
  const response = localStorage.getItem(endpoint);
  if (!response) return null;
  return JSON.parse(response);
};

const serviceDelete = async <
  IService extends { id: number; is_active?: boolean },
>(
  endpoint: Table,
  id: number,
  beforeDelete?: (id: number) => Promise<boolean>,
) => {
  const confirm = window.confirm("Are you sure you want to delete this item?");
  if (!confirm) return;

  if (beforeDelete) {
    const canDelete = await beforeDelete(id);
    if (!canDelete) return;
  }

  const data = await serviceView<IService>(endpoint);
  if (!data) return null;

  const hasIsActive = data.some((item) => "is_active" in item);
  let updatedData = [];

  if (hasIsActive) {
    updatedData = data.map((item) =>
      item.id === id ? { ...item, is_active: false } : item,
    );
  } else {
    updatedData = data.filter((item) => item.id !== id);
  }

  const stillExists = updatedData.find((item) => item.id === id);

  if (!hasIsActive && stillExists) {
    alert("Error removing item.");
    return;
  }

  localStorage.setItem(endpoint, JSON.stringify(updatedData));
};

export { serviceView, serviceDelete };
