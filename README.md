# constellation
## a visually driven course explorer

https://constellation-webteam.herokuapp.com/

## about

Constellation is an interactive, dynamic course explorer. Visualize the wealth of classes at MIT and explore suggestions by adding classes one-by-one to a directed graph network.

## acknowledgments

Constellation was built by Ezra Erives, Benjamin Wu, and Nicole Wong (MIT ‘24) as part of the web.lab web programming and development competition.

Constellation was made possible by several libraries, including React-autosuggest.js, vis.js, and the FireRoad API, as well as the support and feedback of the web.lab staff.

## features

Constellation allows users to construct directed graphs network visualizing course dependencies (read: prerequisites, corequisites, etc) and connections present in the MIT course catalog. Information provided includes:

- Suggested classes, including:
  - Prerequisites
  - Corequisites
  - Subjects that follow a prerequisite or corequisite
  - Related classes
- Class relationships, indicated through directed edges including: 
  - Arrows to indicate prerequisite information
  - Diamonds to indicate corequisite information

Constellation supports:

- Adding and removing classes
- Saving, loading, resetting and creating new networks
- Filtering networks by course and other attributes

## libraries

Constellation uses or requires the following:
  - FireRoad API (for course data)
  - React-autosuggest.js
  - vis.js

Constellation also uses:
- *Frontend*: Javascript, React, CSS
- *Backend*: Javascript, Mongoose, MongoDB, Python notebook (for data processing)



