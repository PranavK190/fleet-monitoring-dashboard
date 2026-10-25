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
        color: "#F8FAFC",
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
                backgroundColor: "#111B2E",
                borderBottom:
                  "2px solid #334863",
                borderRight:
                  "1px solid #26364D",
                textAlign: "center",
                color: "#7DD3FC",
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
                  backgroundColor: "#142238",
                  borderRight:
                    "1px solid #26364D",
                  borderBottom:
                    "1px solid #26364D",
                  color: "#F8FAFC",
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