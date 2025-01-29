import { useSelector } from "react-redux";
import style from "./DonorLogin.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";

const DonorDelete = () => {
  const navigate = useNavigate();
  const details = useSelector((store) => store.details);
  const issueEvent = useRef();
  const solEvent = useRef();
  const handleDelete = (event) => {
    event.preventDefault();
    if (issueEvent.current.value === "") {
      document.getElementById("issue").focus();
    } else if (solEvent.current.value === "") {
      document.getElementById("solution").focus();
    } else {
      const values = {
        donor_id: details.donor_id,
        issue: issueEvent.current.value,
        solution: solEvent.current.value,
      };
      axios
        .post("http://localhost:5000/dlt_donor_acc", values)
        .then((res) => {
          if (res.data.Status === "Success") {
            console.log("success");
            navigate("/")
          } else {
            console.log("Error");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className={style.donor_delete_popup}>
        <label htmlFor="issue">WHAT IS THE PROBLEM YOU ARE FACING</label>
        <textarea
          name="issue"
          id="issue"
          cols="30"
          rows="10"
          ref={issueEvent}
        ></textarea>
        <label htmlFor="solution">WHAT WE CAN DO BETTER</label>
        <textarea
          name="solution"
          id="solution"
          cols="30"
          rows="10"
          ref={solEvent}
        ></textarea>
        <button className={style.donor_delete_button} onClick={handleDelete}>
          DELETE ACCOUNT
        </button>
      </div>
    </>
  );
};

export default DonorDelete;
