# Client

This directory maintains all the code that is essential for creating the client interface (UI) for the application. The directories are divided into sub-directories like :

1. [ASSETS](#assets)
2. [COMMON](#common)
3. [CSS](#css)
4. [JS](#js)


## ASSETS
This directory contains all the images and media files necessary for the repository.

## COMMON
This directory contains all the common resources accessible throughout the client directory like ENUMS, CONSTANTS etc. Some helper libraries can also be added here.

## CSS
This directory contains all the CSS files responsible for styling various sections of the UI.

## JS
This directory contains all the JS files for developing various sections. Currently each file is modular to handle separate functionalities like :

1. modalContent.js - Takes care of handling JS functions to display the rating details on the modal view.
2. content.js - Contains the basic API parsing to get the required JSON information to display on different sections.
3. appConstants.js - Stores some API-KEY information.
4. apiService.js - Contains code that invokes the backend API to get necessary information for a video content.
5. watchScreen.js - Contains the code to handle displaying of cast information on the watch screen.