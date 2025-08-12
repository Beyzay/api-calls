// Assign DOM Elements to variables
const fetchGetBtn = document.getElementById("fetch-get-btn");
const xhrGetBtn = document.getElementById("xhr-get-btn");
const form = document.getElementById("form");
const formMethodSelect = document.getElementById("form-method-select");
const postId = document.getElementById("post-id");
const postTitle = document.getElementById("post-title");
const postContent = document.getElementById("post-content");
const fetchedData = document.getElementById("fetched-data");
const errMsg = document.getElementById("err-msg");
const submitBtn = document.getElementById("form-submit-btn");

// Assign the API URL to a variable
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Define Functions
function clearPreviousMsg() {
    errMsg.classList.add("d-none");
    errMsg.textContent = "";
    fetchedData.innerHTML = "";
}

function displayErrMsg(msg) {
    errMsg.textContent = msg;
    errMsg.classList.remove("d-none");
    fetchedData.innerHTML = "";
}

function displayFetchedData(html) {
    fetchedData.innerHTML = html;
    errMsg.classList.add("d-none");
}


// 1. Attach an event listener to "fetchGetBtn" button to make a GET request using fetch()
fetchGetBtn.addEventListener("click", () => {
    clearPreviousMsg();
    fetch(`${API_URL}/1`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok (GET) (${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayFetchedData(`
                <h4>${data.title}</h4>
                <p>${data.body}</p>
            `);
        })
        .catch(error => {
            if (error.name === "TypeError") {
                console.error("Network error: Failed to get data.");
                displayErrMsg("Network error: Failed to get data.");
            } else {
                console.error("Error getting data: ", error.message);
                displayErrMsg("Error getting data: ", error.message);
            }
        });
});


