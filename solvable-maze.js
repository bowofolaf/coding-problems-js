// amzn on-site interview question 4/3/17

/**
 * Represents a Maze.
 * @constructor
 * @param {string} size - The length of a square map.
 * @param {string} mazeString - a string representation of the maze map.
 */
var Maze = function(size, mazeString) {
    this.map = drawMap(createMap(size), mazeString);
    
    // create two indexed square map with defaults of zeros.
    function createMap(size) {
        return new Array(size)
                    .fill(0)
                    .map(function() {
                        return new Array(size).fill(0);
                    });
    };
    
    /*
    * only reads 1s
    */
    function drawMap(map, mazeString) {
      var i = 0;
      if(mazeString.length!== size*size) return;

      for(var x=0; x<size; x++) {
          for(var y=0; y<size; y++) {
              if(mazeString[i++] == '1')
                map[x][y] = 1;
          }
      }

      return map;
    };
    
    /*
    *
    */
    this.getMaze = function() {
        return this.map;
    };
    
    /** 
    * returns a L-R row by row representation of the maze
    */
    this.toString = function() {
        // reduce every row to string representing maze
        var result = this.map.reduce(function(acc, row){
            // reduce row to a string line
            var rowString = row.reduce(function(acc, val){
                return `${acc}${val}|`;
            },'|');
            // add new line before next row
            return acc + rowString + '\n';
             
        }, '');

        console.log(result);
    };

    this.moveRight = function(start) {
        [x,y] = start;
        var bound = this.map.length - 1;

        while(y < bound && this.map[x][y+1] != 1)
            y++;

        return [x,y];
    };

    this.moveLeft = function(start) {
        [x,y] = start;

        while(y > 0 && this.map[x][y-1] != 1)
            y--;

        return [x,y];
    };

    this.moveDown = function(start) {
        [x,y] = start;
        var bound = this.map[0].length - 1;

        while(x < bound && this.map[x+1][y] != 1)
            x++;

        return [x,y];
    };

    this.moveUp = function(start) {
        [x,y] = start;

        while(x > 0 && this.map[x-1][y] != 1)
            x--;

        return [x,y];
    };
    /*
    * traces line on map
    */
    this.traceLine = function(start, end) {
        [s1,s2] = start, [e1,e2] = end;
        // if x is the same, we are traveling along row
        if(s1 == e1) {
            if(s2 > e2) [s2,e2] = [e2,s2];
            while(s2 <= e2){
                this.map[s1][s2++] = '*';
            }
        }
        else {
            if(s1 > e1) [s1,e1] = [e1,s1];
            while(s1 <= e1){
                this.map[s1++][s2] = '*';
            }
        }
    }

    /*
    * Determines if hypothetical thing can move from start to end
    * by only moving till end or obstacle(denoted by a 1) in any direction
    * @param {Array} start - [x,y] point to start from
    * @param {Array} end - [x,y] point to try and end at
    */
    this.isSolvable = function(start, end) {
        [s1,s2] = start;
        [e1,e2] = end;
        //solved
        if(s1 === e1 && s2 === e2) return true;

        // visited
        if(this.map[s1][s2] == 'x') return false;

        //mark visited
        this.map[s1][s2] = 'x';

        var moves = [this.moveUp(start),
        this.moveDown(start),
        this.moveLeft(start),
        this.moveRight(start)];
        
        var i = 4;
        while(i--){
            solvable = this.isSolvable(moves[i], end);
            if(solvable){
                this.traceLine(start, moves[i]);
                return true;
            }
        }
        return false;
    };


};
