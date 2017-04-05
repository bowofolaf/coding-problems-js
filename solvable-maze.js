var Maze = function(size, mazeString) {
    this.map = createMap(size);
    fillMap(this.map, mazeString);
    
    // create two indexed square map with defaults of zeros.
    function createMap(size) {
        var map = new Array(size);
        var i = size;
        while(i--) {
            map[i] = new Array(size);
            map[i].fill(0);
        }

        return map;
    };
    
    // only reads 1s
    function fillMap(map, mazeString) {
      var i = 0;
      if(mazeString.length!== size*size) return;

      for(var x=0; x<size; x++) {
          for(var y=0; y<size; y++) {
              if(mazeString[i++] == '1')
                map[x][y] = 1;
          }
      }
    };

    this.getMaze = function() {
        return this.map;
    };

    this.toString = function() {
        var result = '';
        for(var x=0; x< this.map.length; x++) {
            var row = '|';
            for(var y=0; y< this.map[x].length; y++) {
                row += this.map[x][y] + '|';
            }
            result += row + '\n';
        }
        console.log(result);
    };

};

Maze.prototype.moveRight = function(start) {
    [x,y] = start;
    var bound = this.map.length - 1;

    while(y < bound && this.map[x][y+1] != 1)
        y++;

    return [x,y];
};

Maze.prototype.moveLeft = function(start) {
    [x,y] = start;

    while(y > 0 && this.map[x][y-1] != 1)
        y--;

    return [x,y];
};

Maze.prototype.moveDown = function(start) {
    [x,y] = start;
    var bound = this.map[0].length - 1;

    while(x < bound && this.map[x+1][y] != 1)
        x++;

    return [x,y];
};

Maze.prototype.moveUp = function(start) {
    [x,y] = start;

    while(x > 0 && this.map[x-1][y] != 1)
        x--;

    return [x,y];
};

Maze.prototype.isSolvable = function(start, end) {
    [s1,s2] = start;
    [e1,e2] = end;
    //solved
    if(s1 === e1 && s2 === e2) return true;

    // visited
    if(this.map[s1][s2] == 'x') return false;
    
    //mark visited
    this.map[s1][s2] = 'x';

    return this.isSolvable(this.moveUp(start), end)
    || this.isSolvable(this.moveLeft(start), end)
    || this.isSolvable(this.moveDown(start), end)
    || this.isSolvable(this.moveRight(start), end);
};

//TODO: map path
