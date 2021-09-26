# Binge

Have you ever been tired and wished to **NETFLIX & CHILL** but got more tired looking out for the best video content to watch for? This repository aims to provide quality and essential information about the video contents to the users which will help them get the best streaming experience. About 60% of the users look out for details like ratings, people's reviews, critic's reviews and cast information before deciding to watch a movie or series. Although each of the streaming platform provides some suggestions based on peer likeability, user's watch pattern and their sophisticated recommendation engines, most of them don't serve some critical information available on the internet. Some common platforms like IMDB, OMDB, ROTTEN TOMATOES still have a reputable rating and review mechanism which the world looks out for.

Our application - '**BINGE**' - serves as a `Google Chrome Extension` which provides information about ratings, reviews, trivia, cast details etc on the home and watch screen of the video streaming platform. This saves a lot of time and effort for the users and provides a one stop place to get quick access to required information about the content. The application has a few core implementations like :

1. Showing **IMDB & ROTTEN TOMATOES** ratings on the home screen against every movie / show as soon as you hover over it.
2. Provides detailed **RATINGS and TRIVIA** at the expanded dialog screen.
3. Display the **CAST** details at any moment on the watch screen.

## Table of Content
1. [Installation](#installation)
2. [Usage](#usage)
3. [Repository Structure](#repository-structure)
4. [License](#license)
5. [Meet the contributors](#meet-the-contributors)
6. [Additional Link](#additional-link)

## Installation
A guide to direct user on how to install the repository is a step towards making a descriptive project. Here is our guide on how to install this project on your local environment.

This project is developed using Vanilla JS. No other packages and libraries are required. There are a few steps to setup the chrome extension on the browser to run it locally.

1. Type “chrome://extensions” in a tab to bring up the extensions page.
2. Once on this page, check “Developer mode” to enable loading unpacked extensions. This will allow you to load your extension from a folder.
3. Finally, click “Load unpacked extension” or simply drag the “BINGE” folder onto the page to load up the extension.
4. You should immediately see the extension show up as a Browser Action with your icon in the toolbar window of the current tab.


## Usage
1. To test out the extension, navigate to "https://www.netflix.com/browse".
2. Then, go ahead and click the icon for our "**BINGE**" extension.
3. Hover over the movie tiles on the screen and you should see the ratings right away.
4. Click on the expand section to see the ratings and trivia information.
5. Hover on the watch screen to get detailed description about the cast.

## Repository Structure
The repository is structured as Client and Server directories separately. The **CLIENT** directory contains all the files necessary to create and modify the UI aspects of the application. The files in the **SERVER** directory contains some backend logics that parses and fetches the data for every movie / show title referred from the client.

All Chrome extensions require a **MANIFEST** file. The Manifest file tells Chrome everything it needs to know to properly load up the extension in Chrome. 

## License

Each repository should get a license. To understand more about licensing, please refer [this](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/licensing-a-repository)

This repository is [Apache 2.0 licensed](https://github.com/NCSU-Group7-SE2021/Binge/blob/main/LICENSE).  

## Meet the contributors

1. [Eshita Arza](https://github.com/ArzaEshita)
2. [Isha Gupta](https://github.com/isha-bansal0115)
3. [Kiran Teja](https://github.com/kirantejatummuri)
4. [Luis](https://github.com/lgdeloss)
5. [Rahul Kalita](https://github.com/rahulkalita8)
6. [Vignesh Muthukumar](https://github.com/vickymhs)

## Additional Link
1. Want to contribute? [Here](CONTRIBUTING.md) is how you can do it.
2. Project Standards? Say no more. [Read this](CODE_OF_CONDUCT.md)