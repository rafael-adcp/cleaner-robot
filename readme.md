### What
This code was idealized to explain the workflow of a cleaner robot while cleaning some house / area.

### How
Using a matrix to store the tiles so that we can see what the robot is doing, we create via cli an area and provide an algorithm to the robot. This algorithm will only be called when the robot gets stucked.

### Definitions
* colors inside html file output
    * blue: current robot position
    * red: obstacules
    * yellow: possible tiles to be cleaned
    * gray: path from A to B provided from DFS
    * green: cleaned tiles
* `robot stucked`: when the robot is surrounded by tiles that have already been cleaned and or obstacules.
* `possible steps`: given the robot current position to which floors he could go. This is used to populate a matrix that will be used by the algorithims to identify a route to get from a stuck position to a tile to be cleaned.
* `visited tiles`: an array to store the tiles position that the robot have already cleaned.
* `head position`: since the robot needs to move based on some directional system i choosed to aplpy a wind rose, so every time the robot get stucked, it will move the head position into the directions of a rose wind to attempt to find a tile to do, if the robot fails to find a tile nearby to go, it will call the algorithm to find a rout to from from where it is to the next available tile to be cleaned which will be stored under `posible steps`


### Assumptions
* the robot has the format of a circle (avoiding edges colision and makes moviments easier)
* the robot will walk with a safety distance from obstacules to avoid damages
* the robot contain near to its head 2 spinner brushes, one on the left and and on the right, meaning that will cover the distance mentiones /\ since those will take the trash and throw it into the robot way / vacuum cleaner
* the robot is 100% unaware of the map, so everytime you start it it will be mostly from 0, but if you run the robot on the same map pointing its head to the same place, the output will be the same


### How to run it
for a bundle
```
./scripts/generate.sh
```

for a simple one
```
node index.js map=MapName startX=INT startY=INT > mapName.html
```

* MapName -> new maps can be added under `map.js`