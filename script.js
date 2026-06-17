const arrayOfAPI = ['https://dog.ceo/api/breed/hound/images','https://api.thecatapi.com/v1/images/search?limit=6' , 'https://hp-api.onrender.com/api/characters' ]
const arrayOfImages = []
const body = document.querySelector('body')
let chosenTheme;
let indexOfSelectedApi;




document.addEventListener('DOMContentLoaded', () =>{
    const buttons = document.querySelectorAll('.button')
    buttons.forEach(button => button.addEventListener('click', (e) =>{
    const selectedButton = e.target
    indexOfSelectedApi = e.target.dataset.button
    


        if (indexOfSelectedApi == 'random') {
            generateRandomNumber()
        }


        chosenTheme = arrayOfAPI[indexOfSelectedApi]
        console.log(chosenTheme);
        
        getImagesFromAPI()
    }))
    

    const generateRandomNumber = () =>{
        const randomNum = Math.floor(Math.random() * 3 )
        console.log(randomNum);
        if (randomNum > 2){
            generateRandomNumber()
        }
        indexOfSelectedApi = randomNum
    }




    const getPictures = (data) => {
        for (let i = 0; i < 7; i++){
            if (chosenTheme == arrayOfAPI[0]){
                console.log(data.message[i]);
                arrayOfImages.push(data.message[i])
            } else if (chosenTheme == arrayOfAPI[1]){
                console.log(data[i].url);    
                arrayOfImages.push(data[i].url)
            } else if (chosenTheme == arrayOfAPI[2]){
                console.log(data[i].image);
                arrayOfImages.push(data[i].image)
            }
        }
       generateBoard() 
    }

    const generateBoard = () =>{
        console.log(arrayOfImages);
        body.innerHTML = `
        <div class="startingScreen">
        <section class="memoryGame">
      <div class="memoryCard" data-card="">
        <img class="frontFace" src="${arrayOfImages[0]}" alt="" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard" data-card="">
        <img class="frontFace" src="${arrayOfImages[0]}" alt="" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard" data-card="">
        <img class="frontFace" src="${arrayOfImages[1]}" alt="" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard" data-card="">
        <img class="frontFace" src="${arrayOfImages[1]}" alt="" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard" data-card="">
        <img class="frontFace" src="${arrayOfImages[2]}" alt="" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard" data-card="">
        <img class="frontFace" src="${arrayOfImages[2]}" alt="" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard" data-card="">
        <img class="frontFace" src="${arrayOfImages[3]}" alt="" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard" data-card="">
        <img class="frontFace" src="${arrayOfImages[3]}" alt="" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard" data-card="">
        <img class="frontFace" src="${arrayOfImages[4]}" alt="" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard" data-card="">
        <img class="frontFace" src="${arrayOfImages[4]}" alt="" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard" data-card="">
        <img class="frontFace" src="${arrayOfImages[5]}" alt="" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>
      <div class="memoryCard" data-card="">
        <img class="frontFace" src="${arrayOfImages[5]}" alt="" />
        <img class="backFace" src="./backofcard.png" alt="background image" />
      </div>    
    </section>
    </div>
        `
    startPlaing()
    }



    const startPlaing = () =>{
        const cardElList = document.querySelectorAll('.memoryCard');
        cardElList.forEach((card) =>{
            card.addEventListener('click', () =>{
                console.log(card);
                card.classList.add('flip')
            })
        })
    }


    const getImagesFromAPI = ()  =>{
        console.log(chosenTheme);
        
        fetch(chosenTheme)
          .then(response => response.json())
          .then(data => getPictures(data))
    }

})