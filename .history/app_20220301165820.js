const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
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
   }
}

function randomId(){
   return Math.floor(Math.random()*10000)
}

form.addEventListener('submit', addTransaction)