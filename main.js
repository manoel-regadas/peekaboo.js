class Peekaboo {
    constructor(specs){
        this._specs = specs
        this.vw = window.innerWidth
        this.vh = window.innerHeight 
    }
    get elements(){return this._specs.elements} 

    get show(){return this._specs.show || 1}

    get hide(){return this._specs.hide || .1}

    get once(){return this._specs.once || false}

    get lettering(){return this._specs.lettering}

    get intervalTime(){return this._specs.lettering.intervalTime || 1}

    init(){
        this.check()
        window.addEventListener('scroll', this.addPeekabooIn.bind(this))
        this.letteringPreparation()
    }
    addPeekabooIn(){
        this.elements.forEach(element => {
            const elementTopReferences = element.getBoundingClientRect().top
            const elementBottomReferences = element.getBoundingClientRect().bottom
            if(this.once){
                if(elementBottomReferences - this.vh * this.show < 0){
                    element.dataset.peekaboo = 'in'
                }
            } else {
                if(elementBottomReferences - this.vh * this.show < 0){
                    element.dataset.peekaboo = 'in'
                } else {
                    element.dataset.peekaboo = ''
                }
                if(elementTopReferences - this.vh * this.hide < 0){
                    element.dataset.peekaboo = ''
                }
            } 
        });
    }
    letteringPreparation(){
        const dataLettering = [...this.elements].filter(element => element.dataset.lettering) 
        const innerTexts = dataLettering.map(element => element.innerText.split(''))
        innerTexts.forEach((element, index) => {
            element.forEach((bit, index) => {
                element[index] = `<span style="transition: all ${index / this.intervalTime}s ${this.lettering.timingFunction};">${bit === ' ' ? '&nbsp': bit}</span>`
            })
            dataLettering[index].innerHTML = innerTexts[index].join('')
        })

    }
    check(){
        if(!this.elements){throw Error('No element detected, you must fill "elements" property with a DOM element')}
        if(this.show < this.hide || this.show === this.hide ){throw Error("'hide' value can not be bigger or equal than show value")}
    } 
}

const peekaboo = new Peekaboo({
    elements: document.querySelectorAll('[data-peekaboo]'),
    show: 1,
    hide: 0.01,
    //once: true,
    lettering: {
        intervalTime: 20,
        timingFunction: 'ease-out',
    }

})

peekaboo.init()

