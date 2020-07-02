const currencyEl_1 = document.getElementById('currency-one');
const currencyEl_2 = document.getElementById('currency-two');
const amountEl_1 = document.getElementById('amount-one');
const amountEl_2 = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

calculate();

// Fetch exchange rates and update the DOM
function calculate() {
    const currencyOne = currencyEl_1.value;
    const currencyTwo = currencyEl_2.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
    .then(res => res.json())
    .then(data => {
        const rate = data.rates[currencyTwo];

        rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
        amountEl_2.value = (amountEl_1.value * rate).toFixed(2);
    })
    .catch(err => console.log(err));
    
}

// Event listeners
currencyEl_1.addEventListener('change', calculate);
amountEl_1.addEventListener('input', calculate);
currencyEl_2.addEventListener('change', calculate);
amountEl_2.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyEl_1.value;
    currencyEl_1.value = currencyEl_2.value;
    currencyEl_2.value = temp;
    calculate();
})