// Daftar nama kandidat
const candidates = [
    "Nabil",
    "Faiz",
    "Ngkoy",
    "Ammar",
    "Firman",
    "Dapa",
    "Sabil",
    "Novel",
    "Rafly",
    "Yeyen",
    "Salwa",
    "Haqil",
    "Raka",
    "Vemas",
    "luthfiyah sausan",
    "Muhammad prinaldy",
    "Widia ",
    "yandi",
    "Khaydar",

];

// Inisialisasi hasil voting
let voteResults = JSON.parse(localStorage.getItem('voteResults')) || new Array(candidates.length).fill(0);
const hasVoted = localStorage.getItem('hasVoted') === 'true';

// Menampilkan opsi voting
const optionsContainer = document.getElementById('options');
candidates.forEach((candidate) => {
    const label = document.createElement('label');
    label.innerHTML = `
        <input type="radio" name="option" value="${candidate}" ${hasVoted ? 'disabled' : ''}> ${candidate}
    `;
    optionsContainer.appendChild(label);
    optionsContainer.appendChild(document.createElement('br'));
});

// Menampilkan hasil voting
const voteResultsContainer = document.getElementById('vote-results');
function displayResults() {
    voteResultsContainer.innerHTML = '';
    voteResults.forEach((count, index) => {
        voteResultsContainer.innerHTML += `${candidates[index]}: ${count} suara<br>`;
    });
}

displayResults();

// Event listener untuk voting
document.getElementById('voting-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (hasVoted) {
        alert('Anda sudah memberikan suara sebelumnya!');
        return;
    }

    const options = document.getElementsByName('option');
    let selectedOption = '';

    for (let option of options) {
        if (option.checked) {
            selectedOption = option.value;
            break;
        }
    }

    if (selectedOption) {
        const optionIndex = candidates.indexOf(selectedOption);
        voteResults[optionIndex]++;
        localStorage.setItem('voteResults', JSON.stringify(voteResults));
        localStorage.setItem('hasVoted', 'true');

        document.getElementById('result').innerHTML = `Anda telah memilih: <strong>${selectedOption}</strong>`;
        displayResults();

        // Disable all options and the vote button after voting
        options.forEach(option => option.disabled = true);
        document.querySelector('button[type="submit"]').disabled = true;
    } else {
        alert('Silakan pilih salah satu opsi!');
    }
});

// Event listener untuk reset
document.getElementById('reset-button').addEventListener('click', function() {
    if (confirm('Apakah Anda yakin ingin mereset hasil voting?')) {
        localStorage.removeItem('voteResults');
        localStorage.removeItem('hasVoted');
        voteResults = new Array(candidates.length).fill(0);
        displayResults();

        // Enable all options again
        const options = document.getElementsByName('option');
        options.forEach(option => {
            option.disabled = false;
        });
        document.querySelector('button[type="submit"]').disabled = false;

        document.getElementById('result').innerHTML = '';
        alert('Hasil voting telah direset.');
    }
});
