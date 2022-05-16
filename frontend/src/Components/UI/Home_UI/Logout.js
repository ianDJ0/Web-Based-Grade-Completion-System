import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Logout = (props) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    Swal.fire({
      title: 'Logout',
      text: "Are you sure you want to Logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/");
      }
    })

  };

  return (
    <div className="dropdown-content">
      {!props.admin && (
        <>
          <li
            onClick={() => {
              navigate("/account/edit-account");
            }}
          >
            <span id="edit-profile-nav">Edit Profile </span>
            <i
              className="fa fa-pencil-square-o edit-profile-icon space"
              aria-hidden="true"
            ></i>
          </li>
          <hr />
        </>
      )}
      <li onClick={logoutHandler}>
        <span id="logout-profile">Logout </span>
        <i className="fa fa-sign-out logout-icon space" aria-hidden="true"></i>
      </li>
    </div>
  );
};

export default Logout;
