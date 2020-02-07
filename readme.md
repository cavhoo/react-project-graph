#React-Project-Graph
Hobby project to create a VISNetwork compatible map of react imported 
components and files used inside the application.

## Current Version
The current version is very basic, so use with caution.
It's possible to specify a root folder and get a .txt file with
the DOT String in it.

The DOT string can then be imported into whatever mapping tool your have laying around,
I prefer [VisJS](https://visjs.github.io/vis-network/docs/network/) to load up the file
and display it inside the browser.

Based on the project size that is scanned, the file might take a while to load in the current version.

## Upcoming Ideas
A few ideas I have at the moment is adding support to detect:
1. Mark unused imports with a red line 
2. Mark completly unused files, even when imported with a red node
3. Nodes that are imported more than 5 times should be blue
4. Nodes that have more than 10 imports should be green
5. Mark nodes pink that have mismatching exports/filesnames

