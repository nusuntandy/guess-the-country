let timeLeft = 10 + 1;
let userScore = 0;
let isPlaying;

let debugCountry = 0;

let countryName = "";

const loadGame = () => {
    isPlaying = true;
    showCountry()

    setInterval(countdown, 1000);
    setInterval(gameStatus, 50);
    return true;
}

async function showCountry()
{
    let data = await fetch('https://restcountries.com/v3.1/all');
    let response = await data.json();

    let country = response[Math.floor(Math.random() * response.length)];

    countryName = country.name.common;
    document.getElementById('countryInfo').innerHTML = 
    `
        <img src="${country.flags.png}">
        <br><br>
    `;

    debugCountry = 0;

    return true;
}

const countdown = () => {
    timeLeft = timeLeft > 0 ? (timeLeft-1) : (0);

    if( isPlaying && !timeLeft )
      isPlaying = false;

    document.getElementById('gameTime').innerHTML = timeLeft;
    return true;
}

const gameStatus = () => {
    
    if( !isPlaying && !timeLeft  )
    {
        userScore = 0;
        timeLeft = -1;

        document.getElementById('gameInput').value = '';
        document.getElementById('gameScore').innerHTML = userScore;
        document.getElementById('message').innerHTML = `<span class="text-danger">Game Over!!</span>`
    }
    
    if(document.getElementById('gameInput').value.length > 0 && !isPlaying )
    {
        isPlaying = true;
        timeLeft = 10 + 1;

        document.getElementById('message').innerHTML = `<br>`;

        showCountry();
    }

    if(document.getElementById('gameInput').value == countryName && countryName != "" && !debugCountry)
    {
        showCountry();

        userScore++;
        timeLeft = 10 + 1;

        debugCountry = 1;

        document.getElementById('gameInput').value = '';
        document.getElementById('gameScore').innerHTML = userScore;
        document.getElementById('message').innerHTML = `<span class="text-success">Correct!!</span>`

        setTimeout(hideMessage, 500);
    }
    
    return true;
}

const hideMessage = () => {    
    return document.getElementById('message').innerHTML = `<br>`;
}

window.addEventListener('load', loadGame);