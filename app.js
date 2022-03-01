const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const ul = document.getElementById('ul');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

//Change to array with Json.parse from string. Because we Json.stringified below when we set the item to the local storage
const getItemFromLocalStorage = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? getItemFromLocalStorage : [];

//When click the submit button the transaction will be added to the list. At first we created an object named transaction and pushed it to the array above named "transactions"
function addTransaction (e) {
   e.preventDefault();

   if(text.value.trim() === '' || amount.value.trim() === ''){
      alert('Please enter the values');
   }else{
      const transaction = {
         id: randomId(),
         text: text.value,
         amount: +amount.value
      }
      
      transactions.push(transaction);

      //it'll show in the UI
      addTransactionToDOM(transaction);
      //Amounts will change and show in the UI
      updateValues();
      //Transaction will set to the local storage
      setToLocalStorage();

      //Clear text and amount input
      text.value = '';
      amount.value = '';
   }
}

//Generating random Id
function randomId(){
   return Math.floor(Math.random()*10000)
}

//Create a list dynamicly and give it to className and append it to the UL which created in HTML
function addTransactionToDOM(transaction){
   const sign = transaction.amount > 0 ? '+' : '-';

   const list = document.createElement('li');

   list.classList.add(transaction.amount > 0 ? 'plus' : 'minus');

   list.innerHTML = `
      ${transaction.text} <span> ${sign}$${Math.abs(transaction.amount)} </span><button class='delete-btn' onclick='removeList(${transaction.id})'>x</button>   
   `;

   ul.appendChild(list)
}

//At first will iterate transactions array and get amount values to another array with map. Then add values with reduce method and then calculate income and expence with filter and reduce method
function updateValues(){
   const amounts = transactions.map(transaction => transaction.amount);
   // console.log(amounts);

   const total = amounts.reduce((acc, item) => (acc += item), 0)

   const income = amounts.filter(transaction => transaction >0).reduce((acc, item) => (acc += item),0).toFixed(2);

   const expence = (amounts.filter(transaction => transaction < 0).reduce((acc, item) => (acc += item),0)* -1).toFixed(2);

   //adding the values to the UI
   balance.innerHTML = `$${total}`;
   moneyPlus.innerHTML = `$${income}`;
   moneyMinus.innerHTML = `$${expence}`
}

//Remove list from UI. onclick method used for this in the button above .
function removeList (id) {
   transactions = transactions.filter(transaction => transaction.id !== id)

   //setting new behaviour to the local storage after changing.
   setToLocalStorage();
   //Adding to the DOM and updating values again
   init();
}

//Setting transaction to the local storage. We stringified it at first
function setToLocalStorage (){
   localStorage.setItem('transactions', JSON.stringify(transactions));
}

//If we don't have this init function the lists won't show in the UI when we refresh it.
function init( ) {
   ul.innerHTML = '';
   transactions.forEach(addTransactionToDOM);
   updateValues()
}

init();

form.addEventListener('submit', addTransaction)