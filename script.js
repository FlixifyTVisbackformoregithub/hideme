// Assuming you have a form with the id 'proxy-form'
document.getElementById('proxy-form').onsubmit = async function(event) {
    event.preventDefault(); // Prevent the default form submission
    const url = document.getElementById('url').value;

    try {
        const response = await fetch(`http://localhost:3000/proxy?url=${encodeURIComponent(url)}`);
        if (response.ok) {
            const data = await response.text();
            document.getElementById('output').innerHTML = `<div>${data}</div>`;
        } else {
            document.getElementById('output').innerHTML = `<p>Error fetching the URL.</p>`;
        }
    } catch (error) {
        console.error(error);
        document.getElementById('output').innerHTML = `<p>An error occurred.</p>`;
    }
};
