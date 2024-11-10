import React, { useEffect, useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Modal from "react-bootstrap/Modal";
import ButtonComponent from "../../common/button/button";
import { AiOutlinePlus } from "react-icons/ai";
import InputComponent from "../../common/input/input";
import TableComponent from "../../components/tableComponent/TableComponent";
import Table from "react-bootstrap/Table";
import {
  getAllBrands,
  getAllCategories,
  getAllSections,
  getAllPlatforms,
  getAllMetrics,
  getAllFrequencies,
  getAllCategoriesByBrandIds,
  getAllMetricsByPlatformId,
  getAllPlatformsBySectionIds,
} from "../../services/userService";

import MultiSelectDropdown from "../../components/MultiSelectDropdown/MultiSelectDropdown";

import "./workSpace.scss";
import { createProject, deleteProject, getProjecName, updateProject } from "../../services/projectService";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../utils/dateFormatter";
import { useNavigate } from "react-router-dom";
import { FaArrowDownShortWide } from "react-icons/fa6";
import { FaArrowUpWideShort } from "react-icons/fa6";
import { FaArrowUp19 } from "react-icons/fa6";
import { FaArrowDown91 } from "react-icons/fa6";
import { HiArrowsUpDown } from "react-icons/hi2";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { VscGoToFile } from "react-icons/vsc";
import { getProjectInfoRequest, getRecentProjectRequest } from "../../features/user/userSlice";
import ModalComponent from "../../components/Modal/ModalComponent";

export default function WorkSpace() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sections, setSections] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
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
 
  const [showAlert, setShowAlert] = useState(true);
  const handleDeleteClose = () => setShowAlert(false);
  const handleDeleteShow = () => setShowAlert(true);

  console.log("handleDeleteShow", handleDeleteShow)
  const [sortColumn, setSortcolumn] = useState({ key: null, direction: "asc" });

  const [dateRange, setDateRange] = useState({
    startDate: "04/01/2024",
    endDate: "06/15/2024",
  });

  const [editProjectId, setEditProjectId] = useState(null);
const [editedProjectName, setEditedProjectName] = useState("");

const handleEditClick = (id, currentName) => {
  setEditProjectId(id);
  setEditedProjectName(currentName);
};

const handleEditProjectName = (id) => {
  // Logic to save the updated project name
  // Example: Call an API or update state
  updateProjectDetails(id, { project_name: editedProjectName });
  setEditProjectId(null); // Exit edit mode
};

  const dispatch = useDispatch()
  //Sort table column
  const handleSortingChange = (key) => {
    let direction = "asc";
    if (sortColumn.key === key && sortColumn.direction === "asc") {
      direction = "desc";
    }
    setSortcolumn({ key, direction });
  };

  // Function to sort the project data
  const sortedProjects = React.useMemo(() => {
    let sortedData = [...(projectInfo?.project || [])];
    if (sortColumn.key) {
      sortedData.sort((a, b) => {
        if (sortColumn.direction === "asc") {
          return a[sortColumn.key] > b[sortColumn.key] ? 1 : -1;
        }
        return a[sortColumn.key] < b[sortColumn.key] ? 1 : -1;
      });
      
    }
    return sortedData;
  }, [projectInfo, sortColumn]);

  // Function to render sorting icons based on sorting state
  const renderSortIcon = (key) => {
    const icons = {
      project_name: sortColumn.direction === "asc" ? <FaArrowDownShortWide /> : <FaArrowUpWideShort />,   
      categoryNames: sortColumn.direction === "asc" ? <FaArrowDownShortWide /> : <FaArrowUpWideShort />,   
      brandNames: sortColumn.direction === "asc" ? <FaArrowUp19 /> : <FaArrowDown91 />,   
      start_date: sortColumn.direction === "asc" ? <HiArrowsUpDown /> : <HiArrowsUpDown />,      
      frequencyNames: sortColumn.direction === "asc" ? <FaArrowDownShortWide /> : <FaArrowUpWideShort />,  
    };
    return <span>{icons[key]}</span>;
  };
  // Function to handle date range changesF
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
        categoriesData.data = categoriesData?.data?.filter((cg) => cg?.name !== 'Hair Care')
        console.log(categoriesData,'categoriesData')
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

        const sectionsData = await getAllSections();
        const uniqueSections = sectionsData.data.filter(
          (section, index, self) => 
            index === self.findIndex((s) => s.name === section.name)
        );
        setSections(
          uniqueSections.map((section) => ({
            value: section.id,
            label: section.name,
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

  const deleteProjectDetails = async (id) => {
    try {
      setShowAlert(true);
      const project = await deleteProject(id);
      if(project){
        alert("Project Deleted Successfully.")
        dispatch(getProjectInfoRequest(userInfo?.user?.id));
      }
    } catch (error) {
      
    }
  }

  const updateProjectDetails = async (id, data) => {
    console.log(id, data , 'xxxxxxxxx')
    try {
      const project = await updateProject(id, data);
      if(project){
        dispatch(getProjectInfoRequest(userInfo?.user?.id))
        alert("Project Name Updated Successfully.")
      }
    } catch (error) {
      
    }
  }

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

  const handleSectionChange = async (selectedOptions) => {
    setSelectedSections(selectedOptions);
    if (selectedOptions.length > 0) {
      try {
        const sectionIDs = selectedOptions.map((option) => option.value);
        const platformsIDs = await getAllPlatformsBySectionIds(sectionIDs);
        console.log(platformsIDs, 'platformsIDs')
        setPlatforms(
          platformsIDs.data.map((sec) => ({
            value: sec.platformId,
            label: sec.platformName,
          }))
        );
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    }

  };
  const navigateToInsights = (projectD) => {
    console.log(projectD, 'projectD')
    navigate(`/insights/${projectD?.id}/${projectD?.project_name}`)
  }

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
     dispatch(getRecentProjectRequest(id));
     console.log("Dispatched project ID:", id);
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
                <div className="row mb-4 g-4 ws-container">
                  <div className="col-lg-4 col-md-6 ws-select">
                    <MultiSelectDropdown
                      options={categories}
                      selectedValues={selectedCategories}
                      onChange={handleCategoryChange}
                      placeholder="Select Categories"
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 ws-select">
                    <MultiSelectDropdown
                      options={brands}
                      selectedValues={selectedBrands}
                      onChange={handleBrandChange}
                      placeholder="Select Brands"
                      isDisabled={isBrandsDisabled}
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 ws-select">
                    <MultiSelectDropdown
                      options={sections}
                      selectedValues={selectedSections}
                      onChange={handleSectionChange}
                      placeholder="Select Section"
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 ws-select">
                    <MultiSelectDropdown
                      options={platforms}
                      selectedValues={selectedPlatforms}
                      onChange={handlePlatformChange}
                      placeholder="Select Platforms"
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 ws-select">
                    <MultiSelectDropdown
                      options={metrics}
                      selectedValues={selectedMetrics}
                      onChange={handleMetricsChange}
                      placeholder="Select Metrics"
                      isDisabled={isMetricsDisabled}
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 ws-select">
                    <div className="select-frequency">
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
                    </div>
                    {/* <MultiSelectDropdown
                      options={frequencies}
                      selectedValues={selectedFrequencies}
                      onChange={handleFrequenciesChange}
                      placeholder="Select Frequencies"
                    /> */}
                  </div>
                  <div className="col-lg-4 col-md-6 ws-select">
                    <div className="select-date">
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
                <div className="row">
                  <div className="col-12 ">
                    <div className="result-container">

                      <span className="selection-Details">Selected Options Details</span>
                      <div className="selected-item-container">
                        <div className="selected-list-items">
                          <h5>Category</h5>
                          <ul>
                            {selectedCategories.map((category) => (
                              <li key={category.value}>{category.label}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="selected-list-items">
                          <h5>Brands</h5>
                          {/* <ul>
                            {selectedBrands.map((category) => (
                              <li key={category.value}>{category.label}</li>
                            ))}
                          </ul> */}
                          <p>{selectedBrands.length > 0 ? selectedBrands.length : " "}</p>
                        </div>
                        <div className="selected-list-items">
                          <h5>Sections</h5>
                          <ul>
                            {selectedSections.map((category) => (
                              <li key={category.value}>{category.label}</li>
                            ))}
                          </ul>
                          {/* <p>{selectedSections.length > 0 ? selectedSections.length : " "}</p> */}
                        </div>
                        <div className="selected-list-items">
                          <h5>Platforms</h5>
                          {/* <ul>
                            {selectedPlatforms.map((category) => (
                              <li key={category.value}>{category.label}</li>
                            ))}
                          </ul> */}
                          <p>{selectedPlatforms.length > 0 ? selectedPlatforms.length : " "}</p>
                        </div>
                        <div className="selected-list-items">
                          <h5>Metrics</h5>
                          {/* <ul>
                            {selectedMetrics.map((category) => (
                              <li key={category.value}>{category.label}</li>
                            ))}
                          </ul> */}
                          <p>{selectedMetrics.length > 0 ? selectedMetrics.length : " "}</p>
                        </div>
                      </div>
                    </div>
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
                  <th className="table-heading">S.No</th>
                  <th onClick={() => handleSortingChange("project_name")}><span className="table-heading">Project Name {renderSortIcon("project_name")}</span></th>
                  <th onClick={() => handleSortingChange("categoryNames")}><span className="table-heading">Category {renderSortIcon("categoryNames")}</span></th>
                  <th onClick={() => handleSortingChange("brandNames")}><span className="table-heading">No. of Brands {renderSortIcon("brandNames")}</span></th>
                  <th onClick={() => handleSortingChange("start_date")}>
                    <span className="table-heading">
                      Date Range {renderSortIcon("start_date")}
                    </span></th>
                  <th onClick={() => handleSortingChange("frequencyNames")}>
                    <span className="table-heading">
                      Frequency {renderSortIcon("frequencyNames")}
                    </span>
                  </th>
                  <th onClick={() => handleSortingChange("updatedAt")}><span className="table-heading">Last modified on {renderSortIcon("updatedAt")}</span></th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedProjects?.map((item, ind) => (
                  <tr key={item.id}>
                    <td>{ind + 1}</td>
                    {/* <td
                      onClick={() => handleProjectClick(item.id)}
                     className="tdLink"
                    >
                      {item?.project_name}
                    </td> */}

                    <td className="tdLink">
                      {editProjectId === item.id ? (
                        <>
                        <input
                          type="text"
                          className="form-control"
                          value={editedProjectName}
                          onChange={(e) => setEditedProjectName(e.target.value)}
                        />
                        <button className="update-btn"
                         onClick={() => handleEditProjectName(item.id)}>Update</button>
                        </>
                      ) : (
                      <span onClick={() => handleProjectClick(item.id)}>{item?.project_name}</span>
                      )}
                    </td>

                    <td>{item?.categoryNames?.join(", ")}</td>
                    <td>{item?.brandNames?.length}</td>
                    <td>{formatDate(item?.start_date)} - {formatDate(item?.end_date)}</td>
                    <td>{item?.frequencyNames?.join(", ")}</td>
                    <td>{formatDate(item?.updatedAt)}</td>
                    <td>
                      <div className="actionITems">
                        <MdOutlineEdit onClick={() => handleEditClick(item.id, item?.project_name)} className="action-item-icon" title="Edit"/>
                        <FaRegTrashCan onClick={() => deleteProjectDetails(item.id)} className="action-item-icon" title="Delete"/>
                        <VscGoToFile className="action-item-icon" title="Go to Insights" onClick={() => navigateToInsights(item)}/>
                        {showAlert && (
                          <ModalComponent
                            ModalHeading={"Delete Confirmation"}
                            ModalContent={"Are you sure you want to delete this Project? <br /> This action cannot be undone."}
                            SecondaryBtnName={"Close"}
                            PrimaryBtnName={"Delete"}
                            onClose={handleDeleteClose}  // This function will close the modal
                            onConfirm={() => {
                              deleteProjectDetails(item.id); // Perform delete action
                              handleDeleteClose(); // Close modal after deleting
                            }}  // Perform delete on confirmation
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {/* Add more rows as needed */}
              </tbody>
            </Table>
            {/* <ModalComponent
                            ModalHeading={"Delete Confirmation"}
                            ModalContent={"Are you sure you want to delete this Project? <br /> This action cannot be undone."}
                            SecondaryBtnName={"Close"}
                            PrimaryBtnName={"Delete"}
                            setShow={setShowAlert}
                            show={showAlert}
                            onClose={handleDeleteClose}  // This function will close the modal
                            onConfirm={() => {
                              deleteProjectDetails(); // Perform delete action
                              handleDeleteClose(); // Close modal after deleting
                            }}  // Perform delete on confirmation
                          /> */}
          </div>
        </div>
      </div>
    </>
  );
}
