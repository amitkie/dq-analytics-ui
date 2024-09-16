import { Table } from "react-bootstrap";

const AnalyticsTable = ({
  isBenchmarkSaved = false,
  metrics = [],
  handleWeightChange,
  handleCheckboxChange,
  projectDetails,
  checkStates,
  weights,
  totalWeights
}) => {

  return (
    <Table responsive striped bordered>
      <thead>
        <tr>
          <th className="col-1">Section</th>
          <th className="col-1">Platform</th>
          <th className="col-4">Metric list</th>
          <th className="col-1">Category</th>
          <th className="col-1">Weights ({totalWeights})</th>
          <th className="col-1">Overall</th>
          <th className="col-2">Category based</th>
          <th className="col-1">Benchmarks</th>
        </tr>
      </thead>
      {!isBenchmarkSaved ? (<tbody>
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
                // value={item?.weights || ""}
                // onChange={(e) => handleWeightChange(item, e.target.value)}
                value={weights[item?.metric_id]}
                onChange={(e) => handleWeightChange(item?.metric_id, e.target.value)}
                min="0"
                max="100"
                className={totalWeights > 100 ? "input-error" : ""}
                style={totalWeights > 100 ? { borderColor: 'red' } : {}}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={item.isOverallChecked || false}
                className="c-pointer"
                onChange={(e) => handleCheckboxChange(e, item, "overall")}
              />
            </td>
            <td>
              <input
                type="checkbox"
                className="c-pointer"
                checked={item.isCategoryBasedChecked || false}
                onChange={(e) => handleCheckboxChange(e, item, "categoryBased")}
              />
            </td>
            <td>
              {item.isCategoryBasedChecked ? (
                <Table responsive striped bordered>
                  {item.benchmark.map(({ category, value }, index) => (
                    <>
                      <thead>
                        <tr>
                          <th key={index}>{category}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td key={index}>
                            {isNaN(Number(value))
                              ? "NA"
                              : Number(value).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </>
                  ))}
                </Table>
              ) : item.isOverallChecked ? (
                <>
                  {isNaN(Number(item.benchmark[0]?.value))
                    ? "NA"
                    : Number(item.benchmark[0]?.value).toFixed(2)}
                </>
              ) : (
                "NA"
              )}
            </td>
          </tr>
        ))}
      </tbody>) : (
        <tr>
          <td colSpan="7" className="text-center p-5">
            <strong>Benchmarks and Weights have already been saved for this project. Please use a different project to perform further checks.</strong>
          </td>
        </tr>
      )}
    </Table>
  );
};

export default AnalyticsTable;
