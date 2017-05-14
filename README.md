# coding-problems-js
interview questions, random problems, leetcode-y stuff outside leetcode


### Solvable maze

We have a rectangular grid represented by a double-index array (or array of arrays). Zeros represent empty squares and ones represent an obstacle. 

There are 4 kinds of moves left, right, up and down. For each of these the cursor moves in that direction until it comes in contact with an obstacle or the outer border.

Write a function that takes a starting point and an end point and returns a boolean value indicating whether it can be solved. ie. true if the cursor can get to end from the start using only those moves, and false if not.
