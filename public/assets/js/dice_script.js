const tossBtn = document.getElementById('bet-btn')
const betForm = document.getElementById("bet-form")
function rollDice(val) {
  const dice = [...document.querySelectorAll(".die-list")];
  dice.forEach(die => {
    toggleClasses(die);
    die.dataset.roll = val;
  });
}
async function getEventResult(event) {
  event.preventDefault()
  tossBtn.disabled = true

  // make new route to return event
  const eventObj = {
    event_name: "diceroll",
    odds: {
      1: 0.1666666,
      2: 0.1666666,
      3: 0.1666666,
      4: 0.1666666,
      5: 0.1666666,
      6: 0.1666666,
    }
  }
  const user_id = betForm.dataset.user
  const newEvent = await fetch('api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventObj)
  })
    .then(res => res.json())
  const event_id = newEvent.id
  const bet_name = document.querySelector('input[name="bet_name"]:checked').value
  const amount = document.getElementById("amount").value
  const betObj = {
    user_id: user_id,
    event_id: event_id,
    bet_name: bet_name,
    amount: amount,
    odds: 0.1666666
  }

  const bet = await fetch('api/bets/bet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(betObj),
  })
    .then(res => res.json())
  const roll = +bet.result
  rollDice(roll)
  const cardMax = document.getElementById("amount")
  const sideBalance = document.getElementById("side-balance")
  const user = await fetch(`api/users/${user_id}`)
    .then(res => res.json())
console.log(user.balance)

  cardMax.max = parseFloat(user.balance).toFixed(2)
  sideBalance.innerText = parseFloat(user.balance).toFixed(2)
  setTimeout(() => {

    setTimeout(() => {

      tossBtn.disabled = false;
    }, 500);
  }, 1000);

  // need to get updated balance and render to balance and for maxbet
}

function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

betForm.addEventListener("submit", getEventResult)