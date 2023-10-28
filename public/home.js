

    async function generateAndShare() {
    const content = document.getElementById('contentInput').value;
    if (!content.trim()) {
        alert('Please enter some content before sharing.');
        return;
    }
    const randomNumber = Math.floor(Math.random() * 100000); // Generate a random number (you can adjust the range)

    alert(`Share this number: ${randomNumber}`);

    const data = { content, randomNumber };
    
    try {
        const response = await fetch('/storeContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('Content stored successfully.');
            // Optionally, you can do further actions after successful storage.
        } else {
            console.error('Failed to store content.');
            // Handle errors here
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle errors from the fetch or server here
    }
}
async function retrieveContent() {
    const randomNumber = document.getElementById('randomNumberInput').value;

    try {
        const response = await fetch(`/getContent?number=${randomNumber}`);

        if (response.ok) {
            const data = await response.json();
            document.getElementById('contentInput').value = data.content;
            console.log('Content retrieved successfully.');
            // Optionally, you can display the content or perform other actions upon successful retrieval.
        } else {
            console.error('Content retrieval failed.');
            document.getElementById('contentInput').innerText = 'Content not found';
            // Handle errors here
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle errors from the fetch or server here
    }
}
