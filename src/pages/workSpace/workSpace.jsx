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
import { createProject, getProjecName } from "../../services/projectService";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/dateFormatter";
import { useNavigate } from "react-router-dom";

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
  const [projectName, setProjectName] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isAvailable, setIsAvailable] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { userInfo, projectInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState({
    startDate: "04/01/2024",
    endDate: "06/15/2024",
  });

  // Function to handle date range changes
  const handleDateRangeChange = (event) => {
    console.log(event);
    
    const { startDate, endDate } = event;
    console.log(startDate, endDate)
    setDateRange({
      startDate: startDate.format("MM/DD/YYYY"),
      endDate: endDate.format("MM/DD/YYYY"),
    });
  };

  // Function to handle date range changes


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

  const handleProjectNameChange = async (e) => {
    console.log(e.target.value)
    const name = e.target.value;
    setProjectName(name);

    if (name.length > 0) {
      try {
        const response = await getProjecName(name);
        setIsAvailable(true);
        setErrorMessage('');
      } catch (error) {
        setIsAvailable(false);
        setErrorMessage(error.response.data.message);
      }
    } else {
      setIsAvailable(null);
    }
  };


  const handleMetricsChange = (selectedOptions) => {
    setSelectedMetrics(selectedOptions);
  };

  const handleFrequenciesChange = (selectedOptions) => {
    console.log(selectedOptions?.target?.value,'selectedOptions')
    setSelectedFrequencies(selectedOptions?.target?.value);
  };

  const handleProjectClick = (id) => {
    navigate(`/analytics/${id}`);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    console.log("save clicked", selectedFrequencies);
    try {
      const projectData = {
        project_name: projectName,
        user_id: userInfo?.user?.id, // Replace with actual user_id
        metric_id: selectedMetrics?.map((option) => option.value),
        brand_id: selectedBrands?.map((option) => option.value),
        category_id: selectedCategories?.map((option) => option.value),
        frequency_id: [selectedFrequencies],
        platform_id: selectedPlatforms?.map((option) => option.value),
        start_date: dateRange?.startDate,
        end_date: dateRange?.endDate,
      };


      console.log(projectData, 'projectData')
      
      const projectCreated = await createProject(projectData);
      if (projectCreated) {
        console.log(projectCreated);

        setTimeout(() => {
          navigate(`/analytics/${projectCreated?.data?.id}`);
        }, 1000);
      }
      setShow(false);
      // Optionally, reset form fields or show a success message
    } catch (error) {
      console.log(error,'jjjj')
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      projectName && 
      selectedCategories.length > 0 &&
      selectedBrands.length > 0 &&
      selectedPlatforms.length > 0 &&
      selectedMetrics.length > 0 &&
      selectedFrequencies.length > 0 &&
      dateRange.startDate && dateRange.endDate
    );
  };
  

  return (
    <>
      <div className="col-12">
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
                inputValue={projectName}
                classNames={isAvailable === false ? 'red-border' : 'green-border'}
                onChange={(e) => handleProjectNameChange(e)}
              />
              {isAvailable === false && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>

              <div className="select-options-container">
                <small>*All fields are mandatory</small>
                <div className="row mb-4 g-4">
                  <div className="col-lg-4 col-md-6">
                    <MultiSelectDropdown
                      options={categories}
                      selectedValues={selectedCategories}
                      onChange={handleCategoryChange}
                      placeholder="Select Categories"
                    />
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <MultiSelectDropdown
                      options={brands}
                      selectedValues={selectedBrands}
                      onChange={handleBrandChange}
                      placeholder="Select Brands"
                      isDisabled={isBrandsDisabled}
                    />
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <MultiSelectDropdown
                      options={platforms}
                      selectedValues={selectedPlatforms}
                      onChange={handlePlatformChange}
                      placeholder="Select Platforms"
                    />
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <MultiSelectDropdown
                      options={metrics}
                      selectedValues={selectedMetrics}
                      onChange={handleMetricsChange}
                      placeholder="Select Metrics"
                      isDisabled={isMetricsDisabled}
                    />
                  </div>
                  <div className="col-lg-4 col-md-6">
                  <select 
                    className="form-control-select" 
                    onChange={handleFrequenciesChange} 
                    selectedValues={selectedFrequencies}
                  >
                    <option value="">Select Frequencies</option>
                    {frequencies?.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                    {/* <MultiSelectDropdown
                      options={frequencies}
                      selectedValues={selectedFrequencies}
                      onChange={handleFrequenciesChange}
                      placeholder="Select Frequencies"
                    /> */}
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <DateRangePicker
                      
                      initialSettings={{
                        startDate: dateRange.startDate,
                        endDate: dateRange.endDate,
                         
                      }}
                      onApply={(e, picker) => handleDateRangeChange(picker)}
                    >
                      <input
                        type="text"
                        className="form-control col-4"
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
                disabled={loading || !isFormValid()}
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
                    <td
                      onClick={() => handleProjectClick(item.id)}
                      style={{
                        cursor: "pointer",
                        color: "blue",
                        textDecoration: "underline",
                      }}
                    >
                      {item?.project_name}
                    </td>
                    <td>{item?.categoryNames?.join(", ")}</td>
                    <td>{formatDate(item?.updatedAt)}</td>
                    <td>{item?.frequencyNames?.join(", ")}</td>
                    <td>{formatDate(item?.updatedAt)}</td>
                  </tr>
                ))}
                {/* Add more rows as needed */}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
