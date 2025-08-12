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


// 2. Attach an event listener to "xhrGetBtn" button to make a GET request using XMLHttpRequest
xhrGetBtn.addEventListener("click", () => {
    clearPreviousMsg();
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `${API_URL}/2`, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
                displayFetchedData(`
                    <h4>${data.title}</h4>
                    <p>${data.body}</p>
                `);
            } else {
                console.error(`Error getting data (XHR): ${xhr.status}`);
                displayErrMsg(`Error getting data (XHR): ${xhr.status}`);
            }
        }
    };
        
    xhr.onerror = () => {
        console.error("Network error (XHR): Failed to get data.");
        displayErrMsg("Network error (XHR): Failed to get data.");
    };
        
    xhr.send();
});

// Attach an event listener to "form" button to handle form submision
form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearPreviousMsg();

    // Assign DOM Elements to variables
    const method = formMethodSelect.value;
    const id = postId.value.trim();
    const title = postTitle.value.trim();
    const content = postContent.value.trim();

    // Validate form input
    if ((method === "POST") && (!title || !content)) {
        return displayErrMsg("Post title and content are required for adding and updating a post!");
    }

    // 3. Make a POST request using fetch()
    if (method === "POST") {

        // Disable the submit button before request
        submitBtn.disabled = true;

        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                body: content,
                userId: 1
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok (POST) (${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            displayFetchedData(`
                <p class="text-success">Post successfully added! (Post ID: ${data.id})</p>
                <h4>${data.title}</h4>
                <p>${data.body}</p>
            `);

            // Clear the form fields on success
            form.reset();
        })
        .catch(error => {
            console.error("Error posting data: ", error.message);
            displayErrMsg("Error posting data: ", error.message);
        })
        .finally(() => {
            // Re-enable the submit button after request
            submitBtn.disabled = false;
        });
    }

});