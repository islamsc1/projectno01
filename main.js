// main.js

// Function to get the query parameter from the URL
function getQueryParameter() {
  const urlParts = window.location.pathname.split("/");
  return urlParts[urlParts.length - 1];
}

// Function to fetch JSON data and perform the redirection
async function redirectToLink() {
  const query = getQueryParameter();

  // Fetch the JSON file
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    console.log(query);
    // Check if the query exists in the JSON file
    if (data[query]) {
      // Redirect to the link associated with the code
      window.location.replace(data[query]);
    } else {
      window.location.replace("https://templates.iasys.me/error.html");
    }
  } catch (error) {
    console.error("Error fetching JSON data:", error);
    document.body.innerHTML = `<h2>Failed to load data. Please try again later.</h2>`;
  }
}

// Execute the function on page load
redirectToLink();
