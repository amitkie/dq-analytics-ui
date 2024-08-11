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
  getAllMetricsByPlatformId,
} from "../../services/userService";

import MultiSelectDropdown from "../../components/MultiSelectDropdown/MultiSelectDropdown";

import "./workSpace.scss";
import { createProject } from "../../services/projectService";
import { useSelector } from "react-redux";

export default function WorkSpace() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [selectedFrequencies, setSelectedFrequencies] = useState([]);
  const [isBrandsDisabled, setIsBrandsDisabled] = useState(true);
  const [isMetricsDisabled, setIsMetricsDisabled] = useState(true);
  const [show, setShow] = useState(false);
  const [projectName, setProjectName] = useState(""); // State for project name
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(null); // State for error messages

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { userInfo, projectInfo } = useSelector((state) => state.user);

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
          frequenciesData.data.map((freq) => ({
            value: freq.id,
            label: freq.name,
          }))
        );

        const metricsData = await getAllMetrics();
        setMetrics(
          metricsData.data.map((metric) => ({
            value: metric.id,
            label: metric.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
    setIsMetricsDisabled(selectedOptions.length === 0);

    if (selectedOptions.length > 0) {
      try {
        const platformIds = selectedOptions.map((option) => option.value);
        const metricsData = await getAllMetricsByPlatformId(platformIds);
        setMetrics(
          metricsData.data.map((metric) => ({
            value: metric.id,
            label: metric.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    }
  };

  const handleMetricsChange = (selectedOptions) => {
    setSelectedMetrics(selectedOptions);
  };

  const handleFrequenciesChange = (selectedOptions) => {
    setSelectedFrequencies(selectedOptions);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const projectData = {
        project_name: projectName,
        user_id: 1, // Replace with actual user_id
        metric_id: selectedMetrics.map((option) => option.value),
        brand_id: selectedBrands.map((option) => option.value),
        category_id: selectedCategories.map((option) => option.value),
        frequency_id: selectedFrequencies.map((option) => option.value),
        platform_id: selectedPlatforms.map((option) => option.value),
      };
      await createProject(projectData);
      setShow(false);
      // Optionally, reset form fields or show a success message
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
            <button
              type="button"
              className="create-workspace"
              onClick={handleShow}
            >
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
                    id="projectName"
                    inputLabel="Project Name"
                    inputType="text"
                    placeholder="Digital Assessment"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div className="select-options-container">
                  <small>*All fields are mandatory</small>
                  <div className="row mb-4">
                    <div className="col">
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
                        isDisabled={isBrandsDisabled}
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
                        isDisabled={isMetricsDisabled}
                      />
                    </div>
                    <div className="col">
                      <MultiSelectDropdown
                        options={frequencies}
                        selectedValues={selectedFrequencies}
                        onChange={handleFrequenciesChange}
                        placeholder="Select Frequencies"
                      />
                    </div>
                    <div className="col">
                      <DateRangePicker
                        initialSettings={{
                          startDate: "01/01/2020",
                          endDate: "01/15/2020",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Select date"
                        />
                      </DateRangePicker>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-between">
                <ButtonComponent
                  btnClass="btn-outline-secondary"
                  btnName="Cancel"
                  onClick={handleClose}
                />
                <ButtonComponent
                  btnClass="btn-primary px-4"
                  btnName={loading ? "Saving..." : "Save"}
                  onClick={handleSave}
                  disabled={loading} // Disable button while saving
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
                  {projectInfo?.project?.map((item, ind) => (
                    <tr key={item.id}>
                      <td>{ind + 1}</td>
                      <td>{item?.project_name}</td>
                      <td>{item?.categoryNames?.join(', ')}</td>
                      <td>{item?.updatedAt}</td>
                      <td>{item?.frequencyNames?.join(', ')}</td>
                      <td>{item?.updatedAt}</td>
                    </tr>
                  ))}
                  {/* Add more rows as needed */}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
