# constellation
## a visually driven course explorer

https://constellation-webteam.herokuapp.com/

## about

Constellation is an interactive, dynamic course explorer. Visualize the wealth of classes at MIT and explore suggestions by adding classes one-by-one to a directed graph network.

## acknowledgments

Constellation was built by Ezra Erives, Benjamin Wu, and Nicole Wong (MIT ‘24) as part of weblab’s web development competition.

Constellation was made possible by several libraries, including React-autosuggest.js and Vis.js, and the Fireroad API, as well as the support and feedback of the weblab staff.

## features

Constellation builds a directed graph network of MIT classes and related or required classes. Information provided include:

- Suggested classes, including:
  - Prerequisites
  - Corequisites
  - Subjects that follow a prerequisite or corequisite
  - Related classes
- Class relationships, including: 
  - Arrows to indicate prerequisites
  - Diamonds to indicate corequisites

Constellation supports:

- Adding or removing a class
- Saving and loading networks
- Creating a new network
- Resetting a network

## libraries

Constellation uses or requires the following:
  - Fireroad API (for course data)
  - React-autosuggest.js
  - Vis.js

Constellation also uses:
- *Frontend*: Javascript, React, CSS
- *Backend*: Javascript, Mongoose, MongoDB, Python notebook (for data processing)



