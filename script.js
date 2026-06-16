const arrayOfAPI = ['https://dog.ceo/api/breeds/image/random', 'https://api.restcountries.com/countries/v5?q=canada', 'curl -s https://hp-api.onrender.com/api/characters | jq .' ]
let chosenTheme = null
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
        
    }))
    

    const generateRandomNumber = () =>{
        const randomNum = Math.floor(Math.random() * 3 )
        console.log(randomNum);
        if (randomNum > 2){
            generateRandomNumber()
        }
        indexOfSelectedApi = randomNum
    }
})