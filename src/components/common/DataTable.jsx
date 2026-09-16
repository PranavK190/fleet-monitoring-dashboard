function DataTable({
  columns = [],
  data = [],
  renderCell,
  headerFontSize = "32px",
  cellFontSize = "26px",
}) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        color: "white",
      }}
    >
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              style={{
                padding: "20px",
                fontSize: headerFontSize,
                fontWeight: "600",
                borderBottom:
                  "2px solid rgba(255,255,255,0.3)",
                borderRight:
                  "1px solid rgba(255,255,255,0.2)",
                textAlign: "center",
              }}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td
                key={column.key}
                style={{
                  padding: "22px",
                  fontSize: cellFontSize,
                  textAlign: "center",
                  borderRight:
                    "1px solid rgba(255,255,255,0.15)",
                }}
              >
                {renderCell
                  ? renderCell(
                      column.key,
                      row[column.key],
                      row
                    )
                  : row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;