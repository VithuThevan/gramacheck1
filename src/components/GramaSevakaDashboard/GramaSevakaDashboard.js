/* ----- GramaSevakaDashboard.js ----- */
import React, { useEffect, useState } from "react";
import "./GramaSevakaDashboard.scss";

// Assets
import StatusRejectedSVG from "../../assets/images/svg/rejected.svg";
import StatusSuccessSVG from "../../assets/images/svg/success.svg";

// Components
import Navbar from "../Navbar/Navbar";
import StatusIcon from "../../ui-library/StatusIcon/StatusIcon";

// Libraries & Packages
import { toast } from "react-toastify";

// UI Library
import Button from "../../ui-library/Button/Button";

// Icons
import SettingsIcon from "@mui/icons-material/Settings";
import Popup from "../../ui-library/Popup/Popup";
import InputTextArea from "../../ui-library/InputTextArea/InputTextArea";

//Helpers
import { TOAST_PROPERTIES } from "../../utils/helpers/Helper";

function GramaSevakaDashboard() {
  // Choreo base endpoint
  const API_HOST =
    "https://f82fbb50-01e1-4078-a9f8-0d4ed79a518a-dev.e1-us-east-azure.choreoapis.dev/sbmq/grama-check/requestservice-369/1.0.0";

  // Asgardeo access token
  const TOKEN = JSON.parse(
    sessionStorage.getItem("session_data-instance_0")
  ).access_token;

  const [requests, setRequests] = useState();
  const [citizen, setcitizen] = useState({});
  const [request, setRequest] = useState({});
  const [identity, setIdentity] = useState();
  const [addressCheck, setAddressCheck] = useState();
  const [policeCheck, setPoliceCheck] = useState();

  useEffect(() => {
    const getAllRequests = () => {
      var url = API_HOST + "/allRequests";

      var requestOptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
        redirect: "follow",
      };

      fetch(url, requestOptions)
        .then((response) => {
          if (response.ok) {
            response
              .text()
              .then((result) => {
                setRequests(
                  JSON.parse(result).sort((a, b) => b.request_id - a.request_id)
                );
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
    };

    getAllRequests();
  }, [TOKEN]);

  const getCitizen = (nic_number) => {
    console.log(nic_number);
    var nic = nic_number;
    var url = API_HOST + "/citizen/" + nic;

    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        setcitizen(data);
      })
      .catch((error) => {
        setcitizen("");
        console.log(error);
      });
  };
  const checkAPI = (request_id, nic) => {
    console.log(nic);
    console.log(request_id);
    var url1 = API_HOST + "/identity/" + nic;

    var requestOption1 = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
      redirect: "follow",
    };

    fetch(url1, requestOption1)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        console.log(data + "identity");
        if (data === true) {
          setIdentity("Identity Verified ✅");
        } else {
          setIdentity("Identity Check Failed ❌");
        }
      })
      .catch((error) => {
        console.log(error);
        setIdentity("Identity Check Failed ❌"); // set the identity state as false in case of error
      });

    var url2 = API_HOST + "/policestatus/" + nic;

    var requestOption2 = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
      redirect: "follow",
    };

    fetch(url2, requestOption2)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        if (data === 1) {
          setPoliceCheck("Criminal Records Found ❌");
        } else if (data === 0) {
          setPoliceCheck("No Criminal Records Found ✅");
        } else {
          setPoliceCheck("Police Check Failed ❌");
        }
      })
      .catch((error) => {
        setPoliceCheck("Police Check Failed ❌");
        console.log(error);
      });
    var url3 = API_HOST + "/address/" + request_id;

    var requestOption3 = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
      redirect: "follow",
    };

    fetch(url3, requestOption3)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        if (data === 1) {
          setAddressCheck("Address Verified ✅");
        } else {
          setAddressCheck("Address Check Failed ❌");
        }
      })
      .catch((error) => {
        setAddressCheck("Not in the Database ❌");
        console.log(error);
      });
  };

  const [displayPopup, setDisplayPopup] = useState(false);
  const [displayRejectPopup, setDisplayRejectPopup] = useState(false);
  const [displayApprovePopup, setDisplayApprovePopup] = useState(false);

  const [value, setValue] = useState("");
  const updateStatus = (requestId, status, reason) => {
    console.log("Update Status");
    const url = API_HOST + "/request/" + requestId;
    const requestStatus = {
      requestId: requestId,
      status: status,
      reason: reason,
    };
    var requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
      body: JSON.stringify(requestStatus),
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log("Request status updated successfully");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="gramaSevakaDashboard">
      <div className="gramaSevakaDashboard__container">
        <div className="gramaSevakaDashboard__navbar">
          <Navbar mockUser={{ firstName: "Grama", lastName: "Sevaka" }} />
        </div>
        <div className="gramaSevakaDashboard__content">
          <div className="gramaSevakaDashboard__content__container">
            <div className="gramaSevakaDashboard__title">
              <p>Grama Sevaka - Dashboard</p>
            </div>
            {/* Header */}
            <div className="gramaSevakaDashboard__header">
              <div className="gramaSevakaDashboard__header__item">
                <div className="gramaSevakaDashboard__header__item__title">
                  <p>Email</p>
                </div>
              </div>
              <div className="gramaSevakaDashboard__header__item">
                <div className="gramaSevakaDashboard__header__item__title">
                  <p>Status</p>
                </div>
              </div>
              <div className="gramaSevakaDashboard__header__item">
                <div className="gramaSevakaDashboard__header__item__title">
                  <p>Action</p>
                </div>
              </div>
            </div>
            {/* Body */}
            <div className="gramaSevakaDashboard__body">
              {requests === undefined
                ? ""
                : requests.map((request, index) => {
                    return (
                      <div
                        key={index}
                        className="gramaSevakaDashboard__body__item"
                      >
                        <div className="gramaSevakaDashboard__body__item__email">
                          <p>{request.email}</p>
                        </div>
                        <div className="gramaSevakaDashboard__body__item__status">
                          <StatusIcon variant={request.status} />
                        </div>
                        <div className="gramaSevakaDashboard__body__item__action">
                          <SettingsIcon
                            onClick={() => {
                              setDisplayPopup(!displayPopup);
                              setRequest(request);
                              getCitizen(request.nic_number);
                              checkAPI(request.request_id, request.nic_number);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
      <div
        className="gramaSevakaDashboard__popup"
        style={displayPopup ? { display: "flex" } : { display: "none" }}
      >
        <Popup display={displayPopup} setDisplayPopup={setDisplayPopup}>
          <div className="gramaSevakaDashboard__popup__header">
            <p>Request Details</p>
          </div>
          <div className="gramaSevakaDashboard__popup__body">
            {/* ---------- Citizen Request ---------- */}
            <RequestDetailsItemHeader heading="Citizen Request" />

            {/* ----- General Details ----- */}
            <RequestDetailsItemSubHeader subheading="General Details" />
            {/* NIC */}
            <RequestDetailsItem title="NIC" value={request.nic_number} />
            {/* Email */}
            <RequestDetailsItem title="Email" value={request.email} />

            {/* ----- Address ----- */}
            <RequestDetailsItemSubHeader subheading="Address" />
            {/* House No */}
            <RequestDetailsItem title="House No" value={request.house_no} />
            {/* Street */}
            <RequestDetailsItem title="Street" value={request.street} />
            {/* City */}
            <RequestDetailsItem title="City" value={request.city} />
            {/* District */}
            <RequestDetailsItem title="District" value={request.district} />
            {/* Province */}
            <RequestDetailsItem title="Province" value={request.province} />

            {/* ---------- Grama Sevaka Records ---------- */}
            <RequestDetailsItemHeader heading="Grama Sevaka Records" />

            {/* NIC */}
            {citizen.nic === undefined ? (
              <div className="gramaSevakaDashboard__popup__body__generalDeails__fallback">
                <p>No records in the database for this citizen</p>
              </div>
            ) : (
              <>
                {/* ----- General Details ----- */}
                <RequestDetailsItemSubHeader subheading="General Details" />
                <RequestDetailsItem title="NIC" value={citizen.nic} />
                {/* First Name */}
                <RequestDetailsItem
                  title="First Name"
                  value={citizen.first_name}
                />
                {/* Last Name */}
                <RequestDetailsItem
                  title="Last Name"
                  value={citizen.last_name}
                />
                {/* Mobile */}
                <RequestDetailsItem
                  title="Mobile"
                  value={citizen.phone_number}
                />{" "}
                {/* Corrected value */}
                {/* ----- Address ----- */}
                <RequestDetailsItemSubHeader subheading="Address" />
                {/* House No */}
                <RequestDetailsItem title="House No" value={citizen.house_no} />
                {/* Street */}
                <RequestDetailsItem title="Street" value={citizen.street} />
                {/* City */}
                <RequestDetailsItem title="City" value={citizen.city} />
                {/* District */}
                <RequestDetailsItem title="District" value={citizen.district} />
                {/* Province */}
                <RequestDetailsItem title="Province" value={citizen.province} />
              </>
            )}

            {/* ---------- Status Check ---------- */}
            <RequestDetailsItemHeader heading="Status Check" />

            {/* ----- General Details ----- */}
            <RequestDetailsItemSubHeader subheading="General Details" />
            {/* NIC */}
            <RequestDetailsItem title="NIC" value={identity} />
            {/* Address */}
            <RequestDetailsItem title="Address" value={addressCheck} />
            {/* Police */}
            <RequestDetailsItem title="Police" value={policeCheck} />

            {/* ---------- Action ---------- */}
            <RequestDetailsItemHeader heading="Action" />
            {/* Request Status */}
            <RequestDetailsItem title="Request Status" value={request.status} />
            {/* Reason for Rejection */}
            {request.status === "rejected" && request.reason !== undefined ? (
              <RequestDetailsItem
                title="Reason for rejection"
                value={request.reason}
              />
            ) : null}
          </div>
          <div className="gramaSevakaDashboard__popup__buttons">
            {request.status === "rejected" ||
            request.status === "approved" ? null : (
              <div className="gramaSevakaDashboard__popup__buttons">
                <Button
                  variant="primary"
                  onClick={() => {
                    setDisplayPopup(false);
                    setDisplayRejectPopup(true);
                  }}
                >
                  REJECT
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setDisplayPopup(false);
                    setDisplayApprovePopup(true);
                  }}
                >
                  APPROVE
                </Button>
              </div>
            )}
          </div>
        </Popup>
      </div>
      {/* Reject Popup */}
      <div
        className="gramaSevakaDashboard__popup__reject"
        style={displayRejectPopup ? { display: "flex" } : { display: "none" }}
      >
        <Popup
          display={displayRejectPopup}
          setDisplayPopup={setDisplayRejectPopup}
        >
          <div className="gramaSevakaDashboard__popup__reject__header">
            <p>Reject Request?</p>
          </div>
          <div className="gramaSevakaDashboard__popup__reject__image">
            <img src={StatusRejectedSVG} alt="" />
          </div>
          <div className="gramaSevakaDashboard__popup__reject__text">
            <p>
              Do You want to reject the request made by the citizen? If so,
              specify the reason below.
            </p>
          </div>
          <div className="gramaSevakaDashboard__popup__reject__textarea">
            <InputTextArea
              value={value}
              setValue={setValue}
              placeholder="Enter the reason for rejecting the citizen's request!"
            />
          </div>
          <div className="gramaSevakaDashboard__popup__reject__buttons">
            <Button
              variant="primary"
              onClick={() => {
                setDisplayRejectPopup(false);
                updateStatus(request.request_id, "rejected", value);
                toast.success(
                  "Citizen Request Rejected Successfully!",
                  TOAST_PROPERTIES
                );
                setTimeout(function () {
                  window.location.reload();
                }, 3000);
              }}
            >
              REJECT
            </Button>
          </div>
        </Popup>
      </div>
      {/* Approve Popup */}
      <div
        className="gramaSevakaDashboard__popup__approve"
        style={displayApprovePopup ? { display: "flex" } : { display: "none" }}
      >
        <Popup
          display={displayApprovePopup}
          setDisplayPopup={setDisplayApprovePopup}
        >
          <div className="gramaSevakaDashboard__popup__approve__header">
            <p>Approve Request?</p>
          </div>
          <div className="gramaSevakaDashboard__popup__approve__image">
            <img src={StatusSuccessSVG} alt="" />
          </div>
          <div className="gramaSevakaDashboard__popup__approve__text">
            <p>Do You want to approve the request made by the citizen?</p>
          </div>
          <div className="gramaSevakaDashboard__popup__approve__buttons">
            <Button
              variant="primary"
              onClick={() => {
                updateStatus(request.request_id, "approved", "none");
                setDisplayApprovePopup(false);
                toast.success(
                  "Citizen Request Approved Successfully!",
                  TOAST_PROPERTIES
                );
                setTimeout(function () {
                  window.location.reload();
                }, 3000);
              }}
            >
              APPROVE
            </Button>
          </div>
        </Popup>
      </div>
    </div>
  );
}

export default GramaSevakaDashboard;

function RequestDetailsItemHeader({ heading }) {
  return (
    <div className="requestDetailsItemHeader">
      <div></div>
      <p>{heading}</p>
      <div></div>
    </div>
  );
}

export { RequestDetailsItemHeader };

function RequestDetailsItemSubHeader({ subheading }) {
  return (
    <div className="requestDetailsItemSubHeader">
      <p>{subheading}</p>
    </div>
  );
}
export { RequestDetailsItemSubHeader };

function RequestDetailsItem({ title, value }) {
  return (
    <div className="requestDetailsItem">
      <div className="requestDetailsItem__title">
        <p>{title}</p>
      </div>
      <div className="requestDetailsItem__seperator">
        <p>:</p>
      </div>
      <div className="requestDetailsItem__value">
        {title === "Request Status" ? (
          <StatusIcon variant={value} />
        ) : (
          <p className="requestDetailsItem__value__text">{value}</p>
        )}
      </div>
    </div>
  );
}

export { RequestDetailsItem };
