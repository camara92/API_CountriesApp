// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)
// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.
// fetch("https://restcountries.com/v3.1/all").then((resultats)=> resultats.json()).then((datos)=> console.log(datos[0].capital[0]))
const countriesContainer = document.querySelector(".countries-container");
console.log(countriesContainer);
const btnSort = document.querySelectorAll(".btnSort");

// let sortMethode = "maxToMin"
let sortMethode = "maxToMin"
let countriesData = [];
async function fetCountries() {


    await fetch("https://restcountries.com/v3.1/all")

        .then((res) => res.json())
        // 3 - Passer les données à une variable
        .then((data) => countriesData = data);
    console.log(countriesData);
    //   appel de la fonction countriesDisplay 
    countriesDisplay()

}
// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP
function countriesDisplay() {
    // filter 
    countriesContainer.innerHTML = countriesData
        // 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
        // coutry.name.includes(inputSearch.value);
        // transformer en mminuscule 
        .filter((country) => country.translations.fra.common.toLowerCase().includes(inputSearch.value.toLowerCase())
            // .filter((country)=> country.translations.fra.common.includes(inputSearch.value)

        )
        .sort((a, b)=>{
            if(sortMethode ==="maxToMin"){
                return b.population - a.population;
                
            }else if (sortMethode ==="minToMax"){
                return a.population - b.population;

            }else if(sortMethode ==="alpha"){
                // voir stackoverflow pour : 
                // users.sort((a, b) => a.firstname.localeCompare(b.firstname))
                return a.translations.fra.common.localeCompare(b.translations.fra.common)
            }   
        })
        .slice(0, inputRange.value)
        .map((country) =>
            `
        <div class= "card"> 
        <img src= "${country.flags.svg}" alt="drapeau de ${country.translations.fra.common}" />
            <h2>Nom de pays : ${country.translations.fra.common} </h2>
            <h4>Nom officiel : ${country.name.official} </h4>
            <h4>Nom de la capitale :  ${country.capital} </h4>
            <p> Population : ${country.population.toLocaleString()} </p>

        </div> 
    `
        ).join("")
}

window.addEventListener("load", fetCountries)
inputSearch.addEventListener("input", countriesDisplay);
// fetCountries();
// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)
inputRange.addEventListener("input", () => {
    countriesDisplay();
    // varier rangeValue 
    rangeValue.textContent = inputRange.value;
}

)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
btnSort.forEach((btn)=> {
    btn.addEventListener("click", (e)=>{
        // on passe à sort au click de l'utilisateur la valeur de btn 

        sortMethode =  e.target.id;
        // on charge le countriesDisplay
        countriesDisplay(); 
    })
})