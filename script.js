const arrayOfAPI = ['https://dog.ceo/api/breeds/image/random','https://api.thecatapi.com/v1/images/search?limit=10' , 'https://hp-api.onrender.com/api/characters' ]
let chosenTheme = null
let indexOfSelectedApi;

async function greet() {
  return "Hello!"; 
}

console.log(greet());
greet().then(dada => console.log(dada));


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


    const getImagesFromAPI = ()  =>{
        console.log(chosenTheme);
        
        fetch(chosenTheme)
          .then(response => response.json())
          .then(data => console.log(data))
    }

})