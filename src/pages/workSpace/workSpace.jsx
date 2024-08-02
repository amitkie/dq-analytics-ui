import React, { useEffect, useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import SideBar from "../../components/sidebar/SideBar";
import Modal from "react-bootstrap/Modal";
import ButtonComponent from "../../common/button/button";
import { AiOutlinePlus } from "react-icons/ai";
import InputComponent from "../../common/input/input";
import TableComponent from "../../components/tableComponent/TableComponent";
import Table from "react-bootstrap/Table";
import {
  getAllBrands,
  getAllCategories,
  getAllPlatforms,
  getAllMetrics,
  getAllFrequencies,
  getAllCategoriesByBrandIds,
  getAllMetricsByPlatformId
} from "../../services/userService";
import MultiSelectDropdown from "../../components/MultiSelectDropdown/MultiSelectDropdown";

import "./workSpace.scss";

export default function WorkSpace() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedMetrics, setselectedMetrics] = useState([]);
  const [selectedFrequencies, setselectedFrequencies] = useState([]);
  const [isBrandsDisabled, setIsBrandsDisabled] = useState(true);
  const [isMetrcsDisabled, setIsMetrcsDisabled] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(
          categoriesData.data.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))
        );

        const brandsData = await getAllBrands();
        setBrands(
          brandsData.data.map((brand) => ({
            value: brand.id,
            label: brand.name,
          }))
        );

        const platformsData = await getAllPlatforms();
        setPlatforms(
          platformsData.data.map((platform) => ({
            value: platform.id,
            label: platform.name,
          }))
        );
        const frequenciesData = await getAllFrequencies();
        setFrequencies(
          frequenciesData.data.map((frequencies) => ({
            value: frequencies.id,
            label: frequencies.name,
          }))
        );
        const metricsData = await getAllMetrics();
        setMetrics(
          metricsData.data.map((metrics) => ({
            value: metrics.id,
            label: metrics.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const handleCategoryChange = (selectedOptions) => {
  //   console.log(selectedOptions);
  //   setSelectedCategories(selectedOptions);
  // };

  const handleCategoryChange = async (selectedOptions) => {
    setSelectedCategories(selectedOptions);
    setIsBrandsDisabled(selectedOptions.length === 0);

    if (selectedOptions.length > 0) {
      try {
        const categoryIds = selectedOptions.map((option) => option.value);
        const brandsData = await getAllCategoriesByBrandIds(categoryIds);
        setBrands(
          brandsData.data.map((brand) => ({
            value: brand.id,
            label: brand.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    }
  };

  const handleBrandChange = (selectedOptions) => {
    setSelectedBrands(selectedOptions);
  };

  const handlePlatformChange = async (selectedOptions) => {
    setSelectedPlatforms(selectedOptions);
    setIsMetrcsDisabled(selectedOptions.length === 0);

    if(selectedOptions.length > 0){
      try {
        const platformIds = selectedOptions.map((option) => option.value);
        const metricsData = await getAllMetricsByPlatformId(platformIds);
        setMetrics(
          metricsData.data.map((platform) => ({
            value : platform.id,
            label : platform.name
          }))
        )
      } catch (error) {
        
      }
    }
  };

  const handleMetricsChange = (selectedOptions) => {
    setselectedMetrics(selectedOptions);
  };

  const handleFrequenciesChange = (selectedOptions) => {
    setselectedFrequencies(selectedOptions);
  };

  return (
    <>
      <div className="row g-0">
        <div className="col-1">
          <SideBar />
        </div>
        <div className="col-11">
          <div className="workspace-container">
            <h2 className="page-title mt-4 ml-3">Workspace</h2>
            <button type="button" class="create-workspace" onClick={handleShow}>
              <AiOutlinePlus className="create-workspace-icon" /> Create Project
            </button>
            <Modal
              size="xl"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={show}
              onHide={handleClose}
              className="modal-height"
            >
              <Modal.Header closeButton>
                <Modal.Title>Create Project</Modal.Title>
              </Modal.Header>
              <Modal.Body className="pb-5">
                <div className="project-name mb-4">
                  <InputComponent
                    id={"userEmail"}
                    inputLabel={"Project Name"}
                    inputType={"email"}
                    placeholder={"Digital Assessment"}
                  />
                </div>
                <div className="select-options-container">
                  <small>*All fields are mandatory</small>
                  <div className="row mb-4">
                    <div className="col">
                      {/* <select className="Select-input" name="category">
                        <option value="Select Category">Select Category</option>
                        <option value="Beauty">Beauty</option>
                        <option value="haircare">Hair care</option>
                        <option value="food">Food</option>
                        <option value="baby">Baby</option>
                        <option value="Male grooming">Male Grooming</option>
                      </select> */}
                      <MultiSelectDropdown
                        options={categories}
                        selectedValues={selectedCategories}
                        onChange={handleCategoryChange}
                        placeholder="Select Categories"
                      />
                    </div>
                    <div className="col">
                      <MultiSelectDropdown
                        options={brands}
                        selectedValues={selectedBrands}
                        onChange={handleBrandChange}
                        placeholder="Select Brands"
                      />
                    </div>
                    <div className="col">
                      <MultiSelectDropdown
                        options={platforms}
                        selectedValues={selectedPlatforms}
                        onChange={handlePlatformChange}
                        placeholder="Select Platforms"
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col">
                      <MultiSelectDropdown
                        options={metrics}
                        selectedValues={selectedMetrics}
                        onChange={handleMetricsChange}
                        placeholder="Select Metrics"
                      />
                    </div>
                    <div className="col">
                      <MultiSelectDropdown
                        options={frequencies}
                        selectedValues={selectedFrequencies}
                        onChange={handleFrequenciesChange}
                        placeholder="Select Categories"
                      />
                    </div>
                    <div className="col">
                      <span className="daterange">Date Range</span>
                      {/* <DateRangePicker
                        initialSettings={{ showDropdowns: true }}
                      >
                        61 <input type="text" className="form-control col-4" />
                        62{" "}
                      </DateRangePicker> */}
                    </div>
                  </div>
                  {/* <div className="row mb-4">
                    <div className="col">
                      <select className="Select-input" name="benchmarks">
                        <option value="Select benchmarks">
                          Select Benchmarks
                        </option>
                        <option value="50">50</option>
                        <option value="60">60</option>
                        <option value="70">70</option>
                        <option value="80">80</option>
                        <option value="90above">90 and above</option>
                      </select>
                    </div>
                  </div> */}
                </div>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-between">
                <ButtonComponent
                  btnClass={"btn-outline-secondary"}
                  btnName={"Cancel"}
                  onClick={handleClose}
                />
                <ButtonComponent
                  btnClass={"btn-primary px-4"}
                  btnName={"Save"}
                  onClick={handleClose}
                />
              </Modal.Footer>
            </Modal>
            <div className="project-table-data mt-5">
              <Table responsive striped bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Project Name</th>
                    <th>Category</th>
                    <th>Date Range</th>
                    <th>Frequency</th>
                    <th>Last modified on</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Digital Assessment - 1</td>
                    <td>Beauty</td>
                    <td>Monthly</td>
                    <td></td>
                    <td>22 May, 2024</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Digital Assessment - 1</td>
                    <td>Beauty</td>
                    <td>Monthly</td>
                    <td></td>
                    <td>22 May, 2024</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Digital Assessment - 1</td>
                    <td>Beauty</td>
                    <td>Monthly</td>
                    <td></td>
                    <td>22 May, 2024</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            {/* <div className="footer-button">
              <ButtonComponent
                btnClass={"btn-outline-secondary"}
                btnName={"Back"}
              />
              <ButtonComponent
                btnClass={"btn-primary"}
                btnName={"Go to Analytics"}
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
