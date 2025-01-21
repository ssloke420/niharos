  function updateDateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();

    // Format the time
    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    const time = now.toLocaleTimeString('en-US', timeOptions);

    // Format the date
    const dateOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    };
    let date = now.toLocaleDateString('en-US', dateOptions);
    date = date.replace(',', ''); // Remove the comma

    timeElement.innerHTML = `${date} &nbsp; &nbsp; ${time}`;
}
// Update the time every second
    setInterval(updateDateTime, 1000);

// Initial call to set the time immediately on page load
    updateDateTime();
