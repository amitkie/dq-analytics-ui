import { Table } from "react-bootstrap";

const AnalyticsTable = ({
  metrics = [],
  handleWeightChange,
  handleCheckboxChange,
  projectDetails,
  checkStates,
}) => {
  return (
    <Table responsive striped bordered>
      <thead>
        <tr>
          <th className="col-1">Section</th>
          <th className="col-1">Platform</th>
          <th className="col-4">Metric list</th>
          <th className="col-1">Category</th>
          <th className="col-1">Weights</th>
          <th className="col-1">Overall</th>
          <th className="col-2">Category based</th>
          <th className="col-1">Benchmarks</th>
        </tr>
      </thead>
      <tbody>
        {metrics?.map((item, ind) => (
          <tr key={item.metric_id}>
            <td>{item?.section?.name}</td>
            <td>{item?.platform?.name}</td>
            <td>{item?.metric_name}</td>
            <td>{projectDetails?.categories?.join(", ")}</td>
            {/* <td>{item?.weights}</td> */}
            <td>
              <input
                type="number"
                value={item?.weights || ""}
                onChange={(e) => handleWeightChange(item, e.target.value)}
                min="0"
                max="100"
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={item.isOverallChecked || false}
                onChange={(e) => handleCheckboxChange(e, item, "overall")}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={item.isCategoryBasedChecked || false}
                onChange={(e) => handleCheckboxChange(e, item, "categoryBased")}
              />
            </td>
            <td>
              {item.isCategoryBasedChecked ? (
                <Table responsive striped bordered>
                  {item.benchmark.map(({ category, result }, index) => (
                    <>
                      <thead>
                        <tr>
                          <th key={index}>{category}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td key={index}>
                            {isNaN(Number(result))
                              ? "NA"
                              : Number(result).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </>
                  ))}
                </Table>
              ) : item.isOverallChecked ? (
                <>
                  {isNaN(Number(item.benchmark[0].result))
                    ? "NA"
                    : Number(item.benchmark[0].result).toFixed(2)}
                </>
              ) : (
                "NA"
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AnalyticsTable;
