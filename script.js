//use Canvas

class Blocks {
    constructor(number, color, isHit = false) {
        this.number = number
        this.color = color
        this.isHit = isHit
    }

    getHit() {
        console.log('I am hit!')
    }

}


class FactoryBlocks {
    constructor (round) {
        this.round = round
        this.blocks = []
    }
    generateBlocks () {
        const newBlocks = new Blocks(this.blocks.length)
        this.blocks.push(newBlocks)
    }
}

const round1 = new FactoryBlocks(1)

for(let i = 0; i < 30; i++) {
    round1.generateBlocks()
    console.log(round1.blocks[i])
    let blockEl = document.createElement('div')
    document.querySelector('.blocks').appendChild(blockEl)
}






console.log(round1)


