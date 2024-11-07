function downloadVideo() {
    const url = document.getElementById('url').value;
    const resultDiv = document.getElementById('result');

    if (!url) {
        resultDiv.innerHTML = 'Please enter a valid YouTube URL.';
        return;
    }

    // Make a fetch request to the backend API
    fetch(`/api/download?url=${encodeURIComponent(url)}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                resultDiv.innerHTML = `Error: ${data.error}`;
            } else {
                resultDiv.innerHTML = `
                    <p>Video Title: ${data.title}</p>
                    <p><a href="${data.downloadLink}" target="_blank">Click here to download</a></p>
                `;
            }
        })
        .catch(error => {
            resultDiv.innerHTML = `Error: ${error.message}`;
        });
}
