const title = document.getElementById('title');
const reg = document.getElementById('region');
const popu = document.getElementById('popu');
const lang = document.getElementById('lang');
const monaie = document.getElementById('monaie');
const scont = document.getElementById('scont');
const sup = document.getElementById('sup');
const capi = document.getElementById('capi');
const hab = document.getElementById('hab');
const drap = document.getElementById('flag');
const vois = document.getElementById('paysbord');
const pf = document.getElementById('pf');
const tp = document.getElementById('titre_page'); 


const URL = "http://restcountries.eu/rest/v2/alpha/";
select(URL, 'zbw')



/*-----------AJAX -------------*/

function select(url,land){
    const requestData = new XMLHttpRequest();
    requestData.open("GET", url + land, true);
    requestData.addEventListener("readystatechange", function() {
        if (requestData.readyState === XMLHttpRequest.DONE && requestData.status === 200) {
            const response = JSON.parse(requestData.responseText);
            // for (let pays of response) {
            //     addPays(pays.name, pays.alpha3Code, pays.capital, pays.region, pays.subregion, pays.population, pays.area, pays.flag, pays.currencies, pays.languages, pays.demonym, pays.borders);
            // }
            addPays(response.name, response.alpha3Code, response.capital, response.region, response.subregion, response.population, response.area, response.flag, response.currencies, response.languages, response.demonym, response.borders)
        }
    });
    requestData.send()
}

function addPays(name, alpha, capital, region, subregion, population, area, flag, currencies, languages, demonym, borders){
    tp.textContent = name;

    const recupName = document.createElement('h1');
    recupName.textContent = name; 

    const recupAlpha = document.createElement('h2');
    recupAlpha.textContent = alpha;
    recupAlpha.className = 'cp';

    const recupCapital = document.createElement('p');
    recupCapital.textContent = capital; 

    const recupContinent = document.createElement('p');
    recupContinent.textContent = region; 

    const recupSousContinent = document.createElement('p');
    recupSousContinent.textContent = subregion; 

    const recupPopulation = document.createElement('p');
    recupPopulation.textContent = population + ' M';

    const recupSuperficie = document.createElement('p');
    recupSuperficie.textContent = area + ' Km²'; 

    const recupHabitant = document.createElement('p');
    recupHabitant.textContent = demonym;

    const recupFlag = document.createElement('img');
    recupFlag.src = flag;
    recupFlag.className = 'flag';

    let money_name = currencies.map(i => i.name);
    for(let i=0; i < currencies.length; i++){
        const money = document.createElement('p');
        money.textContent = money_name[i];
        monaie.appendChild(money)
    }
    
    let langage_name = languages.map(i => i.name);
    for(let i=0; i < languages.length; i++){
        const langue = document.createElement('p');
        langue.textContent = langage_name[i];
        lang.appendChild(langue)
    }
    
    
   
    
    const tab = [];
    if(borders.length !== 0){
        for(let i=0; i<borders.length; i++){
            //conqstruction des éléments via boucle
            const voisin = document.createElement('li');
            const aref = document.createElement('a');
            aref.dataset.land = borders[i]
            // aref.href = URL + borders[i];
            aref.addEventListener('click', (ev)=> {
                
                select(URL, borders[i])

            })
            //construction requete AJAX
            let requestiso = new XMLHttpRequest();
            requestiso.open("GET", URL + borders[i], true);
            requestiso.addEventListener("readystatechange",  () => {
                if (requestiso.readyState === XMLHttpRequest.DONE && requestiso.status === 200) {
                    aref.textContent = JSON.parse(requestiso.responseText).name;
                    vois.appendChild(voisin);
                    voisin.appendChild(aref);
                }              
            });
            requestiso.send();
        }
    }

    title.appendChild(recupName);
    title.appendChild(recupAlpha);
    reg.appendChild(recupContinent);
    popu.appendChild(recupPopulation);
    capi.appendChild(recupCapital);
    scont.appendChild(recupSousContinent);
    sup.appendChild(recupSuperficie);
    drap.appendChild(recupFlag);
    hab.appendChild(recupHabitant);
    
        
    //console.log(borders);
    // if(borders.length === 0){
    //     pf.textContent = "PAS DE PAYS FRONTALIER"
    // }else{
    //     pf.textContent = "PAYS FRONTALIER"
    //     for(let i=0; i < borders.length; i++){
    //         const voisin = document.createElement('li');
    //         const aref = document.createElement('a');
    //         aref.dataset.land = front_name[i]
    //         aref.href = front_name[i];
    //         aref.textContent = front_name[i];
    //         vois.appendChild(voisin);
    //         voisin.appendChild(aref);
            //console.log(front_name[i])
    //     }

    // }
    // console.log(borders);

    //const bite = document.getElementById("id+front_name[i]")

 

    
    
}

