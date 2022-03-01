const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const ul = document.getElementById('ul');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const getItemFromLocalStorage = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? getItemFromLocalStorage : [];

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

      addTransactionToDOM(transaction);
      updateValues();
      setToLocalStorage();

      text.value = '';
      amount.value = '';
   }
}

function randomId(){
   return Math.floor(Math.random()*10000)
}

function addTransactionToDOM(transaction){
   const sign = transaction.amount > 0 ? '+' : '-';

   const list = document.createElement('li');

   list.classList.add(transaction.amount > 0 ? 'plus' : 'minus');

   list.innerHTML = `
      ${transaction.text} <span> ${sign}$${Math.abs(transaction.amount)} </span><button class='delete-btn' onclick='removeList(${transaction.id})'>x</button>   
   `;

   ul.appendChild(list)
}

function updateValues(){
   const amounts = transactions.map(transaction => transaction.amount);
   console.log(amounts);

   const total = amounts.reduce((acc, item) => (acc += item), 0)

   const income = amounts.filter(transaction => transaction >0).reduce((acc, item) => (acc += item),0).toFixed(2);

   const expence = amounts.filter(transaction => transaction < 0).reduce((acc, item) => (acc += item),0).toFixed(2);

   balance.innerHTML = `$${total}`;
   moneyPlus.innerHTML = `$${income}`;
   moneyMinus.innerHTML = `$${expence}`
}

//Remove list 
function removeList (id) {
   transactions = transactions.filter(transaction => transaction.id !== id)
}


function setToLocalStorage (){
   localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init( ) {
   ul.innerHTML = '';
   transactions.forEach(addTransactionToDOM);
   updateValues()
}

init();



form.addEventListener('submit', addTransaction)