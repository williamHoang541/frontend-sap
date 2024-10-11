import React, { useState } from "react";
import "./AddCourse.css";
import "./CourseSteps.css";
import { Link } from "react-router-dom";
import {
    FaListUl,
    FaImage,
    FaShoppingCart,
    FaRegMoneyBillAlt,
} from "react-icons/fa";

const AddCourse = () => {
    const [activeTab, setActiveTab] = useState("tab_step1");
    const tabs = [
        "tab_step1",
        "tab_step2",
        "tab_step3",
        "tab_step4",
        "tab_step5",
    ];
    // const tabNames = ["Basic", "Curriculum", "Media", "Price", "Publish"];
    const tabNames = ["Basic", "Curriculum", "Media", "Price", "Publish"];

    const handleTabClick = (tabId) => {
        if (tabId !== activeTab) {
            setActiveTab(tabId);
        }
    };

    const isDone = (tabId) => {
        return tabs.indexOf(tabId) < tabs.indexOf(activeTab);
    };

    const handleContinue = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1]);
        }
    };

    const handlePrevious = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex > 0) {
            setActiveTab(tabs[currentIndex - 1]);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">Add Course</div>
            <div className="row">
                <div className="col-12">
                    <div className="course_tabs_1">
                        <div id="add-course-tab" className="step-app">
                            <ul className="step-steps">
                                {tabs.map((tab, index) => (
                                    <li
                                        key={index}
                                        className={
                                            activeTab === tab
                                                ? "active"
                                                : isDone(tab)
                                                ? "done"
                                                : ""
                                        }
                                    >
                                        <Link
                                            onClick={() => handleTabClick(tab)}
                                        >
                                            <span className="number"></span>
                                            <span className="step-name">
                                                {tabNames[index]}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="step-content">
                                {/* Step 1 */}
                                <div
                                    className={`step-tab-panel step-tab-info ${
                                        activeTab === "tab_step1"
                                            ? "active"
                                            : "done"
                                    }`}
                                    id="tab_step1"
                                >
                                    <div className="tab-from-content">
                                        <div className="course__form">
                                            <div className="general_info10">
                                                <div className="row-2">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="course_name"
                                                            >
                                                                Course Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="course_name"
                                                                placeholder="Enter Course Name"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="course_code"
                                                            >
                                                                Course Code
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="course_code"
                                                                placeholder="Enter Course Code"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="form-group">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="course_details"
                                                            >
                                                                Course Details
                                                            </label>
                                                            <textarea
                                                                type="text"
                                                                className="form-control"
                                                                id="course_details"
                                                                placeholder="Course Details"
                                                                rows={5}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="datePicker"
                                                            >
                                                                Start Date
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                id="datePicker"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="datePicker"
                                                            >
                                                                End Date
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                id="datePicker"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="datePicker"
                                                            >
                                                                End Register
                                                                Date
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                id="datePicker"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="instructor_name"
                                                            >
                                                                Instructor Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="instructor_name"
                                                                placeholder="Enter Instructor Name"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="max_students"
                                                            >
                                                                Maximum Students
                                                            </label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                id="max_students"
                                                                placeholder="Enter Maximum Students"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="location"
                                                            >
                                                                Location
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="location"
                                                                placeholder="Enter Location"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="btn-group">
                                                            <button
                                                                type="button"
                                                                className="btn btn-secondary"
                                                                onClick={
                                                                    handlePrevious
                                                                }
                                                                disabled={
                                                                    activeTab ===
                                                                    "tab_step1"
                                                                }
                                                            >
                                                                Previous
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary"
                                                                onClick={
                                                                    handleContinue
                                                                }
                                                                disabled={
                                                                    activeTab ===
                                                                    "tab_step5"
                                                                }
                                                            >
                                                                Continue
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Step 2 */}
                                <div
                                    class={`step-tab-panel step-tab-gallery ${
                                        activeTab === "tab_step2"
                                            ? "active"
                                            : "done"
                                    }`}
                                    id="tab_step2"
                                >
                                    <div className="tab-from-content">
                                        <div className="curriculum-section">
                                            <div className="row-2">
                                                <div className="col-md-12">
                                                    <div className="curriculum-add-item">
                                                        <h4 className="section-title mt-0">
                                                            <FaListUl />
                                                            Curriculum
                                                        </h4>
                                                        <button
                                                            className="main-btn color btn-hover ml-left add-section-title"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#add_section_model"
                                                        >
                                                            New Section
                                                        </button>
                                                    </div>
                                                    <div className="added-section-item">
                                                        <div className="section-header">
                                                            <h4>
                                                                Introduction
                                                            </h4>
                                                            <div className="section-edit-options">
                                                                <button
                                                                    className="btn-152"
                                                                    type="button"
                                                                    data-toggle="collapse"
                                                                    data-target="#edit-section"
                                                                >
                                                                    <i className="fas fa-edit"></i>
                                                                </button>
                                                                <button
                                                                    className="btn-152"
                                                                    type="button"
                                                                >
                                                                    <i className="fas fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div
                                                            id="edit-section"
                                                            className="collapse"
                                                        >
                                                            <div className="new-section smt-25">
                                                                <div className="form_group">
                                                                    <div className="ui search focus mt-30 lbel25">
                                                                        <label>
                                                                            Section
                                                                            Name*
                                                                        </label>
                                                                        <div className="ui left icon input swdh19">
                                                                            <input
                                                                                className="prompt srch_explore"
                                                                                type="text"
                                                                                placeholder=""
                                                                                name="title"
                                                                                maxLength="60"
                                                                                id="main[title]"
                                                                                value="Introduction"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="share-submit-btns ps-0">
                                                                    <button className="main-btn color btn-hover">
                                                                        <i className="fas fa-save me-2"></i>
                                                                        Update
                                                                        Section
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="section-group-list sortable">
                                                            <div className="section-list-item">
                                                                <div className="section-item-title">
                                                                    <i className="fas fa-file-alt me-2"></i>
                                                                    <span className="section-item-title-text">
                                                                        lecture
                                                                        Title
                                                                    </span>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    className="section-item-tools"
                                                                >
                                                                    <i className="fas fa-edit"></i>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="section-item-tools"
                                                                >
                                                                    <i className="fas fa-trash-alt"></i>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="section-item-tools ml-auto"
                                                                >
                                                                    <i className="fas fa-bars"></i>
                                                                </button>
                                                            </div>
                                                            <div className="section-list-item">
                                                                <div className="section-item-title">
                                                                    <i className="fas fa-stream me-2"></i>
                                                                    <span className="section-item-title-text">
                                                                        Quiz
                                                                        Title
                                                                    </span>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    className="section-item-tools"
                                                                >
                                                                    <i className="fas fa-edit"></i>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="section-item-tools"
                                                                >
                                                                    <i className="fas fa-trash-alt"></i>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="section-item-tools ml-auto"
                                                                >
                                                                    <i className="fas fa-bars"></i>
                                                                </button>
                                                            </div>
                                                            <div className="section-list-item">
                                                                <div className="section-item-title">
                                                                    <i className="fas fa-clipboard-list me-2"></i>
                                                                    <span className="section-item-title-text">
                                                                        Assignment
                                                                        Title
                                                                    </span>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    className="section-item-tools"
                                                                >
                                                                    <i className="fas fa-edit"></i>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="section-item-tools"
                                                                >
                                                                    <i className="fas fa-trash-alt"></i>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="section-item-tools ml-auto"
                                                                >
                                                                    <i className="fas fa-bars"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="btn-group">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={handlePrevious}
                                                    disabled={
                                                        activeTab ===
                                                        "tab_step1"
                                                    }
                                                >
                                                    Previous
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={handleContinue}
                                                    disabled={
                                                        activeTab ===
                                                        "tab_step5"
                                                    }
                                                >
                                                    Continue
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div
                                    className={`step-tab-panel step-tab-location ${
                                        activeTab === "tab_step3"
                                            ? "active"
                                            : "done"
                                    }`}
                                    id="tab_step3"
                                >
                                    <div className="tab-from-content">
                                        <div className="title-icon">
                                            <h3 className="title">
                                                <div className="icon">
                                                    <FaImage />
                                                </div>
                                                Media
                                            </h3>
                                        </div>
                                        <div className="lecture-video-dt mb-30">
                                            <span className="video-info">
                                                Course Material File (.pptx)
                                            </span>
                                            <div className="video-category">
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="colorRadio"
                                                        value="mp4"
                                                        defaultChecked
                                                    />
                                                    <span>
                                                        Material (.pptx)
                                                    </span>
                                                </label>
                                                <div
                                                    className="mp4 intro-box"
                                                    style={{ display: "block" }}
                                                >
                                                    <div className="row">
                                                        <div className="col-lg-5 col-md-12">
                                                            <div className="upload-file-dt mt-30">
                                                                <div className="upload-btn">
                                                                    <input
                                                                        className="uploadBtn-main-input"
                                                                        type="file"
                                                                        id="IntroFile__input--source"
                                                                    />
                                                                    <label
                                                                        htmlFor="IntroFile__input--source"
                                                                        title="Zip"
                                                                    >
                                                                        Upload
                                                                        Video
                                                                    </label>
                                                                </div>
                                                                <span className="uploadBtn-main-file">
                                                                    File Format:
                                                                    .pptx
                                                                </span>
                                                                <span className="uploaded-id"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="btn-group">
                                                            <button
                                                                type="button"
                                                                className="btn btn-secondary"
                                                                onClick={
                                                                    handlePrevious
                                                                }
                                                                disabled={
                                                                    activeTab ===
                                                                    "tab_step1"
                                                                }
                                                            >
                                                                Previous
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary"
                                                                onClick={
                                                                    handleContinue
                                                                }
                                                                disabled={
                                                                    activeTab ===
                                                                    "tab_step5"
                                                                }
                                                            >
                                                                Continue
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 4 */}
                                <div
                                    className={`step-tab-panel step-tab-amenities ${
                                        activeTab === "tab_step4"
                                            ? "active"
                                            : "done"
                                    }`}
                                    id="tab_step4"
                                >
                                    <div className="tab-from-content">
                                        <div className="title-icon">
                                            <h3 className="title">
                                                <div className="icon">
                                                    <FaRegMoneyBillAlt />
                                                </div>
                                                Price
                                            </h3>
                                        </div>
                                        <div className="course__form">
                                            <div className="price-block">
                                                <div className="row-2">
                                                    <div className="col-md-12">
                                                        <div className="course-main-tabs">
                                                            <div className="tab-content">
                                                                <div
                                                                    className="tab-pane"
                                                                    id="nav-paid"
                                                                    role="tabpanel"
                                                                >
                                                                    <div className="license_pricing mt-30">
                                                                        <label className="label25">
                                                                            Regular
                                                                            Price*
                                                                        </label>
                                                                        <div className="row">
                                                                            <div className="col-lg-4 col-md-6 col-sm-6">
                                                                                <div className="loc_group">
                                                                                    <div className="ui left icon input swdh19">
                                                                                        <input
                                                                                            className="prompt srch_explore"
                                                                                            type="text"
                                                                                            placeholder="$0"
                                                                                            name=""
                                                                                            id=""
                                                                                            value=""
                                                                                        />
                                                                                    </div>
                                                                                    <span className="slry-dt">
                                                                                        USD
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="license_pricing mt-30 mb-30">
                                                                        <label className="label25">
                                                                            Discount
                                                                            Price*
                                                                        </label>
                                                                        <div className="row">
                                                                            <div className="col-lg-4 col-md-6 col-sm-6">
                                                                                <div className="loc_group">
                                                                                    <div className="ui left icon input swdh19">
                                                                                        <input
                                                                                            className="prompt srch_explore"
                                                                                            type="text"
                                                                                            placeholder="$0"
                                                                                            name=""
                                                                                            id=""
                                                                                            value=""
                                                                                        />
                                                                                    </div>
                                                                                    <span className="slry-dt">
                                                                                        USD
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <div className="btn-group">
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                            onClick={
                                                                handlePrevious
                                                            }
                                                            disabled={
                                                                activeTab ===
                                                                "tab_step1"
                                                            }
                                                        >
                                                            Previous
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            onClick={
                                                                handleContinue
                                                            }
                                                            disabled={
                                                                activeTab ===
                                                                "tab_step5"
                                                            }
                                                        >
                                                            Continue
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 5 */}
                                <div
                                    className={`step-tab-panel step-tab-amenities ${
                                        activeTab === "tab_step5"
                                            ? "active"
                                            : "done"
                                    }`}
                                    id="tab_step4"
                                >
                                    <div className="tab-from-content">
                                        <div className="title-icon">
                                            <h3 className="title">
                                                <div className="icon">
                                                    <FaRegMoneyBillAlt />
                                                </div>
                                                Price
                                            </h3>
                                        </div>
                                        <div className="course__form">
                                            <div className="price-block">
                                                <div className="row-2">
                                                    <div className="col-md-12">
                                                        <div className="course-main-tabs">
                                                            <div className="tab-content">
                                                                <div
                                                                    className="tab-pane"
                                                                    id="nav-paid"
                                                                    role="tabpanel"
                                                                >
                                                                    <div className="license_pricing mt-30">
                                                                        <label className="label25">
                                                                            Regular
                                                                            Price*
                                                                        </label>
                                                                        <div className="row">
                                                                            <div className="col-lg-4 col-md-6 col-sm-6">
                                                                                <div className="loc_group">
                                                                                    <div className="ui left icon input swdh19">
                                                                                        <input
                                                                                            className="prompt srch_explore"
                                                                                            type="text"
                                                                                            placeholder="$0"
                                                                                            name=""
                                                                                            id=""
                                                                                            value=""
                                                                                        />
                                                                                    </div>
                                                                                    <span className="slry-dt">
                                                                                        USD
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="license_pricing mt-30 mb-30">
                                                                        <label className="label25">
                                                                            Discount
                                                                            Price*
                                                                        </label>
                                                                        <div className="row">
                                                                            <div className="col-lg-4 col-md-6 col-sm-6">
                                                                                <div className="loc_group">
                                                                                    <div className="ui left icon input swdh19">
                                                                                        <input
                                                                                            className="prompt srch_explore"
                                                                                            type="text"
                                                                                            placeholder="$0"
                                                                                            name=""
                                                                                            id=""
                                                                                            value=""
                                                                                        />
                                                                                    </div>
                                                                                    <span className="slry-dt">
                                                                                        USD
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <div className="btn-group">
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                            onClick={
                                                                handlePrevious
                                                            }
                                                            disabled={
                                                                activeTab ===
                                                                "tab_step1"
                                                            }
                                                        >
                                                            Previous
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            onClick={
                                                                handleContinue
                                                            }
                                                            disabled={
                                                                activeTab ===
                                                                "tab_step5"
                                                            }
                                                        >
                                                            Continue
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCourse;
