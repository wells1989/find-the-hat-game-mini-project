const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

//defining the field class, which takes the field and hatAndHoles parameteres
class Field {
  constructor(hatAndHoles, field) {
    this._field  = field;
    this._hatAndHoles = hatAndHoles;
  }
  //linking the field and hatAndHoles parameters to this._parameteres, to use them without changing the originals

  playGame() {
    let y = 0; 
    let x = 0;
    this.print(this._field);
  // starting off at 0 for y and x axis

    while (this._hatAndHoles[y][x] === pathCharacter || this._hatAndHoles[y][x] === fieldCharacter) {
      const direction = prompt('Which direction would you like to move? Please enter N for North, E for East, S for  South, or W for West. \n');
    
    if (direction.toUpperCase() === 'N') {
      if (y === 0) {
        console.log('You cannot move further North. Choose another direction')
      } else {
        y = y - 1
      }
    } else if (direction.toUpperCase() === 'E') {
        if (x >= this._field[y].length) {
          console.log('You cannot move further East. Choose another direction')
        } else {
          x = x + 1
        }
      } else if (direction.toUpperCase() === 'S') {
        if (y >= this._field.length) {
          console.log('You cannot move further South. Choose another direction')
        } else {
          y = y + 1
        }
      } else if (direction.toUpperCase() === 'W') {
        if (x === 0) {
          console.log('You cannot move further West. Phoose another direction')
        } else {
          x = x - 1
        }
      } else {
        console.log('Please enter N, E, S or W')
      } 
      if (this._hatAndHoles[y][x] === hat) {
        console.log('You found the hat! You win!')
      } else if (this._hatAndHoles[y][x] === hole) {
        console.log('You fell in a hole. Game Over')
      } else {
        this._field[y][x] = pathCharacter;
        this.print(this._field);
      }
    } 
  }

  // above, if the character is either current position (*) or already covered path, free to move. Restrictions include the field size, and if you hit a hat or hole, ending the game

  print() {
    for (let row of this._field){
      console.log(row.join(' '));
    }
  }
    //printing the rows of the field, joined together
  
  //generate field with hat and holes
  static generateField(height, width, holes, hats) {
    let newField = [];
    for (let i = 0; i < height; i++) {
      newField.push([]);
      for (let j = 0; j < height; j++) {
          newField[i].push(fieldCharacter)
      };
      // above, creating the height of the field, and for each push[] adds a fieldCharacter at that position
    };
    newField[0][0] = pathCharacter;
    let hatX = Math.floor(Math.random() * width);
    let hatY = Math.floor(Math.random() * height);
    newField[hatY][hatX] = hat;
    // 2 random hat positions, at the y and x axis, then setting it's position, at the [y][x] axis
    
    for (let k = holes; k > 0; k--) {
      let holeX = Math.floor(Math.random() * width);
      let holeY = Math.floor(Math.random() * height);
      while (holeX === hatX) {
        holeX = Math.floor(Math.random() * width)
      };
      while (holeY === hatY) {
        holeY = Math.floor(Math.random() * height)
      };
     newField[holeY][holeX] = hole; 
    }
    // loops negatively through number of holes, and assigns a random number again to the hole. Below, if it is the same as hatX or hatY, repeats the random process (so the 2 aren't in the same place) 
    // then returns newField, with the hole at a specific position at the [y][x] axis
    return newField;
  } 
  
  //generate blank field for the user to traverse without seeing the hat and holes
  static generateBlankField(height, width){
    let newField = [];
    for (let i = 0; i < height; i++) {
      newField.push([]);
      for (let j = 0; j < height; j++) {
          newField[i].push(fieldCharacter)
      };
    };
    newField[0][0] = pathCharacter;
    return newField;
  }
}

const blankField = Field.generateBlankField(5, 5)
// generates a blank field

const newField = Field.generateField(5, 5, 2, 2);
// creates the field with the hat and holes, allowing you to change numbers of hats and holes etc

myField = new Field (newField, blankField);
// sets a myField object using a new field, using the generated field and blank field variables declared above

myField.playGame();