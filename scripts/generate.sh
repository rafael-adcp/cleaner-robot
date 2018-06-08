#!/bin/bash
node index.js map=default  startX=1 startY=1 > map1.html
node index.js map=crazyOne startX=5 startY=5 > map2.html
node index.js map=default  startX=5 startY=5 > map3.html
node index.js map=crazyOne startX=1 startY=1 > map4.html