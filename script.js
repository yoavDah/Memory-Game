

const arrayOfAPI = ['https://dog.ceo/api/breed/hound/images','https://api.restcountries.com/countries/v5?limit=50','https://hp-api.onrender.com/api/characters',799,50,14]
const apiKeys = [null, { headers: { 'Authorization': 'Bearer rc_live_8ef3b7eb85a64734910c0ea5230765f2' } },null]
const arrayOfImages = []
const MAX_CARDS = 12;
const MAX_POINTS = 6;




let lockBoard = false;
let hasFlippedCard = false;
let points = 0;

let chosenTheme;
let indexOfSelectedApi;
let firstCard;
let secondCard;


const game = () =>{
    const body = document.querySelector('body');
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => button.addEventListener('click', (e) =>{
    // const selectedButton = e.targets;
    indexOfSelectedApi = e.target.dataset.button;
    
        if (indexOfSelectedApi == 'random') {
            generateRandomNumber();
        }

        chosenTheme = arrayOfAPI[indexOfSelectedApi]      ;
        getImagesFromAPI(indexOfSelectedApi);
    }))


    const getImagesFromAPI = (index)  =>{
        fetch(chosenTheme, apiKeys[index])
          .then(response => response.json())
          .catch(error => alert("couldn't access api please try a different theme"))
          .then(data => getPictures(data))
    }


    const generateRandomNumber = () =>{
        const randomNum = Math.floor(Math.random() * 3 )
        if (randomNum > 2){
            generateRandomNumber();
        }
        indexOfSelectedApi = randomNum;
    }


    const getPictures = (data) =>{
      let x = arrayOfAPI[arrayOfAPI.indexOf(chosenTheme) + 3];
      let i = Math.floor(Math.random() * x);
      i++
      let j = i + 6;
      while(i < j){

          if (chosenTheme == arrayOfAPI[0]){
              arrayOfImages.push(data.message[i]);
            } else if (chosenTheme == arrayOfAPI[1]){
                arrayOfImages.push(data.data.objects[i].flag.url_svg);
            } else if (chosenTheme == arrayOfAPI[2]){
                arrayOfImages.push(data[i].image);               
            }
                 i++;
      }
      generateBoard();
    }


    const generateBoard = () =>{
        body.innerHTML = `
      <div class="startingScreen">
        <section class="memoryGame">
      <div class="memoryCard canClickOn" data-card="1">
        <img class="frontFace" src="${arrayOfImages[0]}" alt=""/>
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="1">
        <img class="frontFace" src="${arrayOfImages[0]}" alt="" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="2">
        <img class="frontFace" src="${arrayOfImages[1]}" alt=""  />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="2">
        <img class="frontFace" src="${arrayOfImages[1]}" alt="" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="3">
        <img class="frontFace" src="${arrayOfImages[2]}" alt="" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="3">
        <img class="frontFace" src="${arrayOfImages[2]}" alt="" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="4">
        <img class="frontFace" src="${arrayOfImages[3]}" alt="" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="4">
        <img class="frontFace" src="${arrayOfImages[3]}" alt=""/>
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="5">
        <img class="frontFace" src="${arrayOfImages[4]}" alt="" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="5">
        <img class="frontFace" src="${arrayOfImages[4]}" alt=""/>
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="6">
        <img class="frontFace" src="${arrayOfImages[5]}" alt="" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="6">
        <img class="frontFace" src="${arrayOfImages[5]}" alt=""/>
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>    
    </section>
      </div>
        `
    const cardElList = document.querySelectorAll('.memoryCard');
    shuffleCards(cardElList);
    }

    const shuffleCards = (cardElList) =>{
      cardElList.forEach((card) =>{
          const randomOrder = Math.floor(Math.random() * MAX_CARDS);
          card.style.order = randomOrder;
      })
      startPlaying(cardElList);
    }

   const handleFlip = (e) =>{
                const card = e.target.parentElement;

                if(lockBoard){
                  return;
                }

                card.classList.add('flip');

                if (!hasFlippedCard){
                  hasFlippedCard = true;
                  firstCard = card;
                  return;
                }

                secondCard = card;
                lockBoard = true;
                
                checkResaults();

            }

    const startPlaying = (cardElList) =>{
        cardElList.forEach((card) =>{
            card.addEventListener('click', handleFlip);
        })
    }


    const checkResaults = () =>{
      if (firstCard.dataset.card === secondCard.dataset.card){
          firstCard.removeEventListener('click',handleFlip);
          secondCard.removeEventListener('click', handleFlip);
          firstCard.classList.remove('canClickOn');
          secondCard.classList.remove('canClickOn');
          resetTurn();
          points += 1;
          didPlayerFinish();
      } else {
          flipCardsBack();
    }
    }

    const didPlayerFinish = () =>{
      if(points >= 6){
       setTimeout(() =>{
        points = 0;
        chosenTheme = null;
        arrayOfImages.length = 0;
        indexOfSelectedApi = null;
        document.querySelector('.memoryGame').innerHTML += `
        <button class="button playAgain">Play again?</button>`
        document.querySelector(".playAgain").addEventListener('click', () =>{
          body.innerHTML = `
           <section class="startingScreen">
               <h1>Memory Game</h1>
               <h2>Choose theme</h2>
                <button class="button" data-button="0">Dogs</button>
               <button class="button" data-button="1">Cats</button>
               <button class="button" data-button="2">Harry Potter</button>
               <button class="button" data-button="random">Random</button>
            </section>
          `
          game();
        })
       }, 700);

      }
    }

    const flipCardsBack = () => {
      setTimeout(() =>{
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetTurn();
      }, 900);
    }

    const resetTurn = () => {
      hasFlippedCard = false;
      lockBoard = false;
      firstCard = null;
      secondCard = null;
    }
}


document.addEventListener('DOMContentLoaded', game());