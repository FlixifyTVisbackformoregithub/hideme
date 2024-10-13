document.getElementById('fetchButton').addEventListener('click', async () => {
    const urlInput = document.getElementById('urlInput').value;
    const responseContainer = document.getElementById('response');
    
    if (!urlInput) {
        responseContainer.innerHTML = '<p>Please enter a URL.</p>';
        return;
    }
    
    responseContainer.innerHTML = '<p>Loading...</p>';
    
    try {
        const response = await fetch(`/proxy?url=${encodeURIComponent(urlInput)}`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.text();
        responseContainer.innerHTML = `<pre>${data}</pre>`;
    } catch (error) {
        responseContainer.innerHTML = `<p>Error fetching the URL: ${error.message}</p>`;
    }
});
