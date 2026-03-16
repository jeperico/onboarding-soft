const renderVoidTable = (tableId: string, columns: number) => {
  const table = document.querySelector(tableId);
  if (!table) return;

  const row = document.createElement("tr");
  for (let i = 0; i < columns; i++)
    row.appendChild(document.createElement("td"));
  table.appendChild(row);
};

export { renderVoidTable };
