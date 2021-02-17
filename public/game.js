const tileSet = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, w1, w2]

class Player {
  constructor(playerObj){
    this.playa = playerObj,
    this.pieces = [],
    this.score = 0,
    this.order = 0, //host =1
    this.start = 0
  }
}

class Game {
  constructor(gameCode){
    this.gameCode = gameCode,
    this.players = {},
    this.tiles = [],
    this.board = [],
    this.hasTurn = 0,//this will equal the player order.
    this.endTotal = 0,
    this.gameTime = 0,
    this.totalRounds = 0,
    this.roundCount = 0
  }

  //indroduce new player object and set order
  addPlayer(uid){
    let player = new Player(uid)
    if(this.players.length){
      player.order = this.players.length + 1
      this.players = {...this.players, ...player}
    }else{
      player.order = 1
      this.players = {...this.players, ...player}
    }
  }

  //get game tiles Based on # of Players
  getTiles() {
    if(this.players.length > 1){
    const numSets = Math.ciel(this.playerIds.length / 4)
    let all = tileSet
    let x = 1
      while(x<numSets){
        all = [...all, ...all]
        x = x+1
      }
    this.tiles = this.shuffle(all)
    } else{
      error.log("you're gonna need another player. this ain't that kinda game.")
    }
  }

  //shuffle tiles early and pop to pick them later.
  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr
  }

  // random id pick from tiles, no dupes, to see who goes first. must be run for all players
  drawForFirst(player){
   let idx = Math.floor(Math.random() * this.tiles.length)
   let num = this.tiles[idx]
   if (num.shift() in this.start){
     this.drawForFirst(player)
   }else{
     player.start = num
   }
  }

  //after everyone draws, this picks the highest and sets hasturn
  whoGoesFirst(){
    for(player in this.players){
      let start = 0
      if(player.start > start){
        start = player.start
        this.hasTurn = player.order
      }
    }
  }

//remove 14 random tiles
  getStartTiles(player){
    let tiles = this.tiles.splice(this.tiles.length-14, 14)
    player.pieces.push(tiles)
    return player
  }

//get one random tile from board
  drawTile = function(player){
  if(this.hasTurn !== player.order){
    return error.log("It ain't your turn buddy")
  }
  if(this.tiles.length === 0){
    return error.log("Outta tiles friendo. Work with whatcha got.")
  }
  const newTile = this.tiles.pop()
  player.tiles.push(newTile)
  this.endTurn(player)
}

//give turn to next player. //when clicking done button
  endTurn(player){
    if(this.hasTurn === this.players.length){
      this.hasTurn = 1
    }else{
    this.hasTurn++
    }
    if(!player.pieces.length){
      console.log(player.playa.name, "Won!")
    }
  }

  setGameFinalScore(int){
  this.endTotal = int
  }

  setGameTime(int){
    this.gameTime = int
  }

  setGameRounds(int){
    this.totalRounds = int
  }

  //calculates round total. may want to trigger clear player tiles
  //let the winner hit this button
  tallyScores(){
    let roundSum = 0
    let winner = {}

    for(player in this.players){
      if(player.pieces.length){
        let sum = this.countPieces(player.pieces)
        roundSum += sum
        player.score -= sum
      }else{
        winner = player
        this.hasTurn = player.order
      }
    }

    winner.score += roundSum

    if((this.endTotal && this.endTotal <= winner.score) || (this.totalRounds && this.totalRounds === this.roundCount)){
      console.log("Don't cry just because", winner.playa.name, "has destroyed you all")
    }else{
      this.roundCount++
      this.nextRound()
    }
  }

  //this totals the remaining pieces and gives next turn to winner
  countPieces(arr){
    let sum = 0
    for(let i = 0; i < arr.length; i++){
      if(arr[i][0] === 'w'){
        sum += 30
      }else{
        let int = arr[i].substr(1)
        int = Number(int)
        sum += int
      }
    }
    return sum
  }

//clears game and player tiles, re-shuffels and deals them.
 nextRound(){
    this.tiles = []
    getTiles()
    for(player in this.players){
      player.peices = []
      getStartTiles(player)
    }
  }
}

function gameCodeGenerator(){
  //make it a random gre word
}

function gameTimer(){
  //this will set a 2min/turn countdown and will set a game time if specified.
}

function startGame(){
  //will check that the player is the host, will see if rounds, time, or total are specified. will trigger board layout. will move on to choosing who goes first. (clicking pile of tiles in center will present piece).
}

  //figure out how to build valid arrays and send them to the board. Or how to re-arrange tiles.
  //how to re-arrange tiles to last position if time is up and submission is invalid (also give player 3 pieces with messge)
  //drag and drop would be nice
  //validate board function
  //played 30 function and setting on player.
  //player.order === this.hasTurn before player actions, special actions for host (1)

