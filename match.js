let matches = []
let matchNum
let piGuesses = []
let matchLength =100
function setup(){
    createCanvas(screen.width,screen.height-150)
    matchNum = createSlider(10, 1000, 20)
    let lenn = (width/3)-80
    matchNum.style('width', "".concat(lenn).concat('px'))
    matchNum.position((width*2/3)+30, 30)
    let setBut = createButton("GO!")
    setBut.mousePressed(run)
    setBut.position((width*2/3)+10, 10)
}

function draw(){
    fill(255)
    rect((width*2/3),0,(width/3)-10,100)
    fill(0)
    stroke(0)
    text("10",(width*2/3)+5,40)
    text("1000",width-50, 40)
    text("Number of sticks: ".concat(matchNum.value()),(width*2/3)+150,20)
}
function graph(){
    fill(color(255,255,255))
    stroke(0)
    rect((width*2/3),height-(width/3)-20,(width/3)-10,(width/3)-10)
    let large = largest(piGuesses)
    noFill()
    beginShape()
    for(let i =0; i< piGuesses.length;i++){
        vertex((30+(width*2/3))+(((width/3)-10)*i/piGuesses.length),(height)-(((width/3)-20)*piGuesses[i]/large))
    }
    endShape()
    if(piGuesses.length !=0){
        text(piGuesses[0],(width*2/3),(height)-(((width/3)-20)*piGuesses[0]/large))
        text(piGuesses[piGuesses.length-1],(width*2/3),(height)-(((width/3)-20)*piGuesses[piGuesses.length-1]/large))
    }
}
function largest(list){
    let largest = 0
    for(let i =0;i<list.length;i++){
        if(list[i]>largest){
            largest = list[i]
        }
    }
    return(largest)
}
function run(){
    background(255)
    stroke(0,0,255)
    matches = []
    for(let i = 0; i < matchNum.value();i++){
        matches.push(new match(matchLength/2))
    }
    piGuesses.push(0)
    for(let i = 0; i<(width*2/3)/matchLength;i++){
        line(i*matchLength,0,i*matchLength,height)
    }
    for(let i = 0;i< matches.length;i++){
        piGuesses[piGuesses.length-1] += matches[i].doesCross()
        matches[i].draw()
    }
    stroke(0,0,0)
    text(piGuesses[piGuesses.length-1],20,20)
    piGuesses[piGuesses.length-1] = matchNum.value()/piGuesses[piGuesses.length-1]
    graph()
}
class match{
    constructor(len){
        this.length = len
        this.cross = false
        this.x = (width*2/3) * Math.random()
        this.y = height * Math.random()
        this.angle = Math.PI *2* Math.random()
    }
    doesCross(){
        let a1 = Math.floor((this.x + (this.length * Math.sin(this.angle)))/(this.length*2))
        let a2 = Math.floor((this.x - (this.length * Math.sin(this.angle)))/(this.length*2))
        if(a1 != a2){
            this.cross = true
        }
        return(this.cross)
    }
    draw(){
        stroke(0,0,0)
        if(this.cross){
            stroke(255,0,0)
        }
        line(this.x + (this.length * Math.sin(this.angle)),this.y + (this.length * Math.cos(this.angle)),this.x - (this.length * Math.sin(this.angle)),this.y - (this.length * Math.cos(this.angle)))
    }
}