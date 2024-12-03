import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postPledge from "../api/post-pledge.js"

function PledgeForm() {
const navigate = useNavigate();

const [credentials, setCredentials] = useState({
    amount: "",
    comment: "",
    anonymous: "",
    project: ""
});

const handleChange = (event) => {
    const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [id]: value,
        }));
};

const handleSubmit = (event) => {
    event.preventDefault();
        if (credentials.amount && credentials.comment && credentials.anonymous && credentials.project) {
            postPledge(
                credentials.amount,
                credentials.comment,  
                credentials.anonymous,  
                credentials.project
        ).then((response) => {
            navigate("/");
        });
    }
};

    return (
        <form>
            <div>
                <label htmlFor="Amount">Amount:</label>              
                <input
                type="amount"
                id="amount"
                placeholder="$"
                onChange={handleChange}
            />
            </div>

            <div>
                <label htmlFor="comment">Comment:</label>
                <input
                type="comment"
                id="comment"
                placeholder=""
                onChange={handleChange}
            />
            </div>

            <div>
                <label htmlFor="anonymous">Anonymous:</label>
                <input
                type="checkbox"
                id="anonymous"
                placeholder="Stay anonymous?"
                onChange={handleChange}
            />
            </div>

            <div>
                <label htmlFor="project">Project:</label>
                <input
                type="project"
                id="project"
                placeholder="Project ID"
                onChange={handleChange}
            />
            </div>

            <button type="submit" onClick={handleSubmit}>
                Submit
            </button>
        </form>
    );
}

export default PledgeForm;