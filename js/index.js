const candidates = [
    {
        name: "Dwight Fairfield",
        img: "https://deadbydaylight.com/static/e5627292159dc8c69e4e68d9d0634938/1f375/survivor_dwight_headshot_bb6a42f2bf.png"
    },
    {
        name: "Meg Thomas",
        img: "https://deadbydaylight.com/static/fab94fa7f8b7628ebea4422d30905817/1f375/survivor_meg_headshot_f033880a7f.png"
    },
    {
        name: "Claudette Morel",
        img: "https://deadbydaylight.com/static/67533b00d669327b0076194b8ab5c293/1f375/survivor_claudette_headshot_5ea4b938bf.png"
    },
    {
        name: "Jake Park",
        img: "https://deadbydaylight.com/static/393b719a9f596ab626f9c7acb3c0579b/1f375/survivor_jake_headshot_8d1c04a058.png"
    },
]

class Survivor {
    constructor(element) {
        this.health = 2;
        this.action = "";
        this.element = element;
    }
}

class SurvivorInMap {
    constructor(element) {
        this.posX = 0;
        this.posY = 0;
        this.element = element;
    }
}

class Generator {
    constructor(capacity, element) {
        this.progress = 0;
        this.regressing = false;
        this.capacity = capacity;
        this.posX = 0;
        this.posY = 0;
        this.element = element;
    }
}

let $fragment;

const generators = [],
      survivors = [],
      survivorsInMap = [];


const createGenerators = ($map, sectors) => {

    $fragment = document.createDocumentFragment();

    let mapWidth = $map.clientWidth

    for (let i = 0; i < 7; i++) {
        const $generator = document.createElement('img');
        $generator.classList.add('generator');
        $generator.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/2061/2061956.png');
        const gen = new Generator(4, $generator)
        generators.push(gen);
        $fragment.appendChild($generator)
    }
    
    candidates.forEach(candidate => {
        const $survivor = document.createElement('img');
        $survivor.classList.add('mapSurvivor');
        $survivor.setAttribute('src', candidate.img);
        $survivor.style.width = "40px"
        const survi = new SurvivorInMap ($survivor)
        survivorsInMap.push(survi);
        $fragment.appendChild($survivor)
    })


    $map.appendChild($fragment)





    
    let isFirst = true

    const [a1, a2, a3, b1, b2, b3, c1, c2, c3] = sectors

    const availableSectors = [a1, a2, a3, b1, b3, c1, c2, c3]
   

    generators.forEach(generator => {
        let sector;

        if (isFirst) {
            sector = b2;
            isFirst = false;
        } else {

            let num = Math.floor(Math.random() * availableSectors.length)

            sector = availableSectors[num]
            availableSectors.splice(num, 1)
            
        }

        console.log(generator.element)
        generator.posX = Math.ceil(Math.random() * (sector.maxX - sector.minX) + sector.minX)
        generator.posY = Math.ceil(Math.random() * (sector.maxY - sector.minY) + sector.minY)
        generator.element.style.left = `${(mapWidth / 100) * generator.posX}px`
        generator.element.style.top = `${($map.clientHeight / 100) * generator.posY}px`
        console.log('before: ' + (mapWidth / 100) * generator.posX)
        console.log('width + gen: ' + ((mapWidth / 100) * generator.posX + generator.element.clientWidth))
        console.log('max: ' + (mapWidth / 100) * sector.maxX)
        if ((mapWidth / 100) * generator.posX + generator.element.clientWidth > (mapWidth / 100) * sector.maxX) {
            generator.posX -= 10
            generator.element.style.left = `${(mapWidth / 100) * generator.posX}px`
            console.log('after: ' + (mapWidth / 100) * generator.posX)
        }
        if (($map.clientHeight / 100) * generator.posY + generator.element.clientHeight > ($map.clientHeight / 100) * sector.maxY) {
            generator.posY -= 10
            generator.element.style.top = `${($map.clientHeight / 100) * generator.posY}px`
        }
    })

    survivorsInMap.forEach(survivor => {

        let sector;
        let num = Math.floor(Math.random() * availableSectors.length)
        sector = availableSectors[num]

            survivor.posX = Math.ceil(Math.random() * (sector.maxX - sector.minX) + sector.minX)
            survivor.posY = Math.ceil(Math.random() * (sector.maxY - sector.minY) + sector.minY)
            survivor.element.style.left = `${($map.clientWidth / 100) * survivor.posX}px`
            survivor.element.style.top = `${($map.clientHeight / 100) * survivor.posY}px`
            if (($map.clientWidth / 100) * survivor.posX + survivor.element.clientWidth > ($map.clientWidth / 100) * sector.maxX) {
                survivor.posX -= 20
                survivor.element.style.left = `${($map.clientWidth / 100) * survivor.posX}px`
            }
            if (($map.clientHeight / 100) * survivor.posY + survivor.element.clientHeight > ($map.clientHeight / 100) * sector.maxY) {
                survivor.posY -= 20
                survivor.element.style.top = `${($map.clientHeight / 100) * survivor.posY}px`
            }
    });

}

const createSurvivors = ($interface) => {

    $fragment = document.createDocumentFragment();

    // SURVIVOR CARDS

    const $survivors = document.createElement('div');
          $survivors.classList.add('survivors');

    candidates.forEach(candidate => {

        const $survivor = document.createElement('div');
              $survivor.classList.add('survivor')


        /* INFO */

            const $info = document.createElement('div')
                  $info.classList.add('info')

            /* PORTRAIT */

                const $portrait = document.createElement('div'),
                      $portraitImg = document.createElement('img');

                $portrait.classList.add('portrait')
                $portraitImg.setAttribute('src', candidate.img)
                $portrait.appendChild($portraitImg)

            /* PORTRAIT */

            /* STATUS */

                const $status = document.createElement('div')
                      $status.classList.add('status')

                /* NAME */

                    const $survivorName = document.createElement('div'),
                          $nameSpan = document.createElement('span');

                          $survivorName.classList.add("name");
                          $nameSpan.innerHTML = candidate.name;

                        $survivorName.appendChild($nameSpan)

                /* NAME */

                /* OBJECTIVE */

                    const $objective = document.createElement('div'),
                        $action = document.createElement('span'),
                        $progressBar = document.createElement('div'),
                        $progressBarFiller = document.createElement('div');

                    $objective.classList.add('objective')
                    $action.classList.add('action')
                    $progressBar.classList.add('progress-bar')
                    $progressBarFiller.classList.add('filler')

                    $action.innerHTML = "Repairing"
                    $progressBar.appendChild($progressBarFiller)

                    $objective.appendChild($action)
                    $objective.appendChild($progressBar)

                /* OBJECTIVE */

                $status.appendChild($survivorName);
                $status.appendChild($objective);

            /* STATUS */

            $info.appendChild($portrait);
            $info.appendChild($status);

        /* INFO */

        /* OPTIONS */

            const $options = document.createElement('div'),
                $repair = document.createElement('button'),
                $loop = document.createElement('button'),
                $heal = document.createElement('button');


            $options.classList.add('options')
            $repair.classList.add('repair')
            $repair.classList.add('btn')
            $repair.classList.add('btn-blue')
            $loop.classList.add('loop')
            $loop.classList.add('btn')
            $loop.classList.add('btn-orange')
            $heal.classList.add('heal')
            $heal.classList.add('btn')
            $heal.classList.add('btn-green')

            // $loop.setAttribute("disabled", "true")
            // $heal.setAttribute("disabled", "true")

            // $repair.innerHTML = "Find/Repair Generator"
            // $loop.innerHTML = "Run/Loop Killer"
            // $heal.innerHTML = "Heal"

            $options.appendChild($repair)
            $options.appendChild($loop)
            $options.appendChild($heal)

        /* OPTIONS */
        
        $survivor.appendChild($info);
        $survivor.appendChild($options)
        $survivors.appendChild($survivor)
        

        const survi = new Survivor(candidate.name, candidate.img, $survivor);
        survivors.push(survi);
    })

    $fragment.appendChild($survivors)
    $interface.appendChild($fragment)

}

const initializeMap = ($map) => {

    const sectors = [
        // A
        {minX: 0, maxX: 33.3, minY: 0, maxY: 33.3},
        {minX: 33.3, maxX: 66.6, minY: 0, maxY: 33.3},
        {minX: 66.6, maxX: 100, minY: 0, maxY: 33.3},
        // B
        {minX: 0, maxX: 33.3, minY: 33.3, maxY: 66.6},
        {minX: 33.3, maxX: 66.6, minY: 33.3, maxY: 66.6},
        {minX: 66.6, maxX: 100, minY: 33.3, maxY: 66.6},
        // C
        {minX: 0, maxX: 33.3, minY: 66.6, maxY: 100},
        {minX: 33.3, maxX: 66.6, minY: 66.6, maxY: 100},
        {minX: 66.6, maxX: 100, minY: 66.6, maxY: 100},
    ]

    createGenerators($map, sectors);

}

const start = () => {

    // MAP

    const $map = document.createElement('div')
    $map.classList.add('map')

    const $interface = document.querySelector('.interface')
    $interface.appendChild($map)

    initializeMap($map);
    createSurvivors($interface);
    
    $start.style.display = "none";
}


const $start = document.querySelector('.start')

$start.addEventListener('click', function(){start()})