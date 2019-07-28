# react-project-graph
## Purpose
This tool will produce a DOT valid string inside a text file with all  
imports from your components mapped out by their usage.  
So the mapp will basically show which component is used by which other  
component inside your react app.
## How to use
```
	node index.js -p <path to src in your react app>
```
The dot string will the written to dotstring.txt
There is an index.html that has visjs-network setup to load
the dotstring by default.
I use it with 
```
	python -m SimpleHTTPServer
```
## Roadmap
### Now
* Support for react applications
* TypeScript or JavaScript
* basic CLI-Usage
### Next
* Front end to enter path/url to display map
* Speed up generation of map
* Improve RegEx to include various styles of imports
### Later
* Support for other languages (C#, C++ etc)
* Host on AWS for public access