const arrayOfAPI = ['https://dog.ceo/api/breeds/image/random','https://api.restcountries.com/countries/v5?q=canada' , 'https://hp-api.onrender.com/api/characters' ]
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
        
        getImages()
        // getImagesFromAPI()
    }))
    

    const generateRandomNumber = () =>{
        const randomNum = Math.floor(Math.random() * 3 )
        console.log(randomNum);
        if (randomNum > 2){
            generateRandomNumber()
        }
        indexOfSelectedApi = randomNum
    }

    async function name(params) {
        const response = await fetch(
    'https://api.restcountries.com/countries/v5?limit=1&pretty=1',
    { headers: { 'Authorization': 'Bearer rc_live_demo' } }
);
const data = await response.json();
    }

    name()


    async function getImages(images) {
        const res = await fetch(chosenTheme)
        const data = await res.json()
        console.log(data);
         
    }
    // const getImagesFromAPI = ()  =>{
    //     console.log(chosenTheme);
        
    //     fetch(chosenTheme)
    //       .then(response => response.json())
    //       .then(data => console.log(data))
    // }

})