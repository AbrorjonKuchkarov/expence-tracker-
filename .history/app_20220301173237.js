const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const ul = document.getElementById('ul');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = [];

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
      ${transaction.text} <span> ${sign}$${Math.abs(transaction.amount)} </span><button class='delete-btn'>x</button>   
   `;

   ul.appendChild(list)
}

function updateValues(){
   const amounts = transactions.amount;
   console.log(amounts);

   const total = amounts.reduce((acc, item) => (acc += item), 0)
}

updateValues()


form.addEventListener('submit', addTransaction)