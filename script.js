const arrayOfAPI = ['https://dog.ceo/api/breed/hoaaund/images','https://api.restcountries.com/countries/v5?limit=50','https://hp-api.onrender.com/api/characters']
const apiKeys = [null, { headers: { 'Authorization': 'Bearer rc_live_8ef3b7eb85a64734910c0ea5230765f2' } },null]
const arrayOfImages = []
const arrayOfLimits = [799,50,14]
const arrayOfThemeNames = ['dog picture', 'flag picture', 'harry potter character']
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
    indexOfSelectedApi = e.target.dataset.button;
    
        if (indexOfSelectedApi == 'random') {
            generateRandomNumber();
        }

        chosenTheme = arrayOfAPI[indexOfSelectedApi]      ;
        getImagesFromAPI(indexOfSelectedApi);
    }))

    async function getImagesFromAPI(index) {
      body.innerHTML = `<h1 class='loadingScreen'>Loading</h1>`
        try{
           const res = await fetch(chosenTheme, apiKeys[index])
           const data = await res.json();
           getPictures(data)
        } catch(error){
            alert(`couldn't access this data please try again or chose another theme`)
            arrayOfImages.length = 0
            backToMainMenu()
           }
    }




    const generateRandomNumber = () =>{
        const randomNum = Math.floor(Math.random() * 3 )
        if (randomNum > 2){
            generateRandomNumber();
        }
        indexOfSelectedApi = randomNum;
    }


    const getPictures = (data) =>{
      let x = arrayOfLimits[indexOfSelectedApi];
      let i = Math.floor(Math.random() * x);
      i++
      let j = i + 6;
     try{

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
          if (arrayOfImages[0] == undefined){
              throw new Error("Something went wrong, please try again or try a different theme")
            }
      } catch(error){
        alert(error.message);
        arrayOfImages.length = 0
        backToMainMenu()
        return;
      }
      generateBoard(arrayOfThemeNames[indexOfSelectedApi]);
    }


    const generateBoard = (alt) =>{
        body.innerHTML = `
      <div class="startingScreen">
        <section class="memoryGame">
      <div class="memoryCard canClickOn" data-card="1">
        <img class="frontFace" src="${arrayOfImages[0]}" alt="${alt}"/>
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="1">
        <img class="frontFace" src="${arrayOfImages[0]}" alt="${alt}" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="2">
        <img class="frontFace" src="${arrayOfImages[1]}" alt="${alt}"  />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="2">
        <img class="frontFace" src="${arrayOfImages[1]}" alt="${alt}" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="3">
        <img class="frontFace" src="${arrayOfImages[2]}" alt="${alt}" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="3">
        <img class="frontFace" src="${arrayOfImages[2]}" alt="${alt}" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="4">
        <img class="frontFace" src="${arrayOfImages[3]}" alt="${alt}" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="4">
        <img class="frontFace" src="${arrayOfImages[3]}" alt="${alt}"/>
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="5">
        <img class="frontFace" src="${arrayOfImages[4]}" alt="${alt}" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="5">
        <img class="frontFace" src="${arrayOfImages[4]}" alt="${alt}"/>
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="6">
        <img class="frontFace" src="${arrayOfImages[5]}" alt="${alt}" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard canClickOn" data-card="6">
        <img class="frontFace" src="${arrayOfImages[5]}" alt="${alt}"/>
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

    const backToMainMenu = () =>{
        points = 0;
        chosenTheme = null;
        arrayOfImages.length = 0;
        indexOfSelectedApi = null;
        body.innerHTML = `
           <section class="startingScreen">
              <h1>Memory Game</h1>
              <h2>Choose theme</h2>
              <button class="button" data-button="0">Dogs</button>
              <button class="button" data-button="1">Flags</button>
              <button class="button" data-button="2">Harry Potter</button>
              <button class="button" data-button="random">Random</button>
            </section>
          `
          game();
    }

    const resetGame = () =>{
 
        document.querySelector('.memoryGame').innerHTML += `
        <button class="button playAgain">Play again?</button>`
        document.querySelector(".playAgain").addEventListener('click',backToMainMenu)
    }

    const didPlayerFinish = () =>{
      if(points >= 6){
       setTimeout(resetGame(), 700);
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