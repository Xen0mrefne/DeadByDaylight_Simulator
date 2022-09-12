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
    constructor(name, img, element) {
        this.name = name;
        this.img = img;
        this.health = 2;
        this.action = "";
        this.element = element;
    }
}

class Generator {
    constructor(capacity, element) {
        this.progress = 0;
        this.regressing = false;
        this.capacity = capacity;
        this.element = element;
    }
}

const generator = [],
      survivors = [];


const createGenerators = () => {

}

const createSurvivors = () => {
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

                    $action.innerHTML = "Repairing Generator"
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
}

let $fragment;

const start = () => {
    
    $fragment = document.createDocumentFragment();

    // MAP

    let $map = document.createElement('div')
    $map.classList.add('map')
    $fragment.appendChild($map)
    
    createSurvivors();

    const $interface = document.querySelector('.interface')
    
    $start.style.display = "none";

    $interface.appendChild($fragment)
}


const $start = document.querySelector('.start')

$start.addEventListener('click', function(){start()})