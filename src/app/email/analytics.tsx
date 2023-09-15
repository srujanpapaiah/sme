import Card from "../components/emailCard";

export function RenderAnalytics({ tableData }) {
  const smeNames = [
    "Srujan Papaiahgari",
    "Aman Kumar",
    "Parag",
    "Vidya Sagar",
    "Yashraj",
    "Thomas",
    "Sanjay",
  ];

  function countRowsForName(name: string) {
    let count = 0;
    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i][5]?.value === name) {
        count++;
      }
    }
    return {
      name,
      count,
    };
  }

  const result = smeNames.map((name) => countRowsForName(name));

  const maxCountObj = result.reduce((max, obj) => {
    return obj.count > max.count ? obj : max;
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "20px",
      }}
    >
      {result?.map((data) => (
        <Card key={data?.name} {...data} maxCountObj={maxCountObj} />
      ))}
    </div>
  );
}
