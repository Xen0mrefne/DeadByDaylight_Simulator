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

const start = () => {

    const survivors = [];
    let $fragment = document.createDocumentFragment();

    candidates.forEach(candidate => {

        let $survivor = document.createElement('div');
            $survivor.classList.add('survivor')

        let $objective = document.createElement('div'),
            $action = document.createElement('span'),
            $progress = document.createElement('span');

        $objective.classList.add('objective')
        $action.classList.add('action')
        $progress.classList.add('progress')

        $action.innerHTML = "Repairing Generator"
        $progress.innerHTML = "0%"

        $objective.appendChild($action)
        $objective.appendChild($progress)


        let $status = document.createElement('div'),
            $portrait = document.createElement('img'),
            $survivorName = document.createElement('p');

        $status.classList.add('status')
        $portrait.classList.add('portrait')
        $survivorName.classList.add('survivor-name')

            $portrait.setAttribute('src', candidate.img)
            $survivorName.innerHTML = `${candidate.name} (<span class="health"></span>)`;
        let $survivorHealth = $survivorName.querySelector('.health')
            $survivorHealth.innerHTML = "healthy"

        $status.appendChild($portrait)
        $status.appendChild($survivorName)

        let $options = document.createElement('div'),
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

        $loop.setAttribute("disabled", "true")
        $heal.setAttribute("disabled", "true")

        $repair.innerHTML = "Find/Repair Generator"
        $loop.innerHTML = "Run/Loop Killer"
        $heal.innerHTML = "Heal"

        $options.appendChild($repair)
        $options.appendChild($loop)
        $options.appendChild($heal)
        

        $survivor.appendChild($objective);
        $survivor.appendChild($status);
        $survivor.appendChild($options);

        $fragment.appendChild($survivor)

        let survi = new Survivor(candidate.name, candidate.img, $survivor);
        survivors.push(survi);
    })

    const $interface = document.querySelector('.interface')
    
    $start.style.display = "none";

    $interface.appendChild($fragment)

}

const $start = document.querySelector('.start')

$start.addEventListener('click', function(){start()})