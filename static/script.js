function updateGMTDateTime(panelId, timeId) {
    var gmtTimeElement = document.getElementById(timeId);
    var gmtOffset = 0;  // Ajuste para GMT -3

    var currentDate = new Date();
    var gmtDateTime = new Date(currentDate.getTime() + (gmtOffset * 60 * 60 * 1000));

    var options = {
        hour12: false,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    var formattedDateTime = gmtDateTime.toLocaleString('es-UY', options);
    gmtTimeElement.textContent = formattedDateTime;
}

updateGMTDateTime('api-panel', 'api-gmt-time');

function sendData(countryId, bankId, gmtTimeId, panel, action) {
    console.log('Sending data...');
    
    var country = document.getElementById(countryId).value;
    var bank = document.getElementById(bankId).value;
    var gmtTime = document.getElementById(gmtTimeId).innerText;

    // Aquí puedes enviar la información al servidor
    // Puedes usar AJAX, Fetch API, o cualquier otro método para enviar datos al servidor

    // Ejemplo de enviar datos utilizando Fetch API (puedes ajustarlo según tus necesidades)
    fetch('/send_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'panel': panel,
            'country': country,
            'bank': bank,
            'gmtTime': gmtTime,
            'action': action
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data sent:', data);
        // Puedes realizar acciones adicionales después de enviar los datos
    })
    .catch(error => {
        console.error('Error:', error);
    });
}