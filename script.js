document.getElementById('proxy-form').onsubmit = function(event) {
    event.preventDefault(); // Prevent the default form submission
    const url = document.getElementById('url').value;

    // Placeholder function: this should send the URL to your proxy server
    // Currently, it just shows the entered URL
    document.getElementById('output').innerHTML = `<p>You entered: <a href="${url}" target="_blank">${url}</a></p>`;
};
