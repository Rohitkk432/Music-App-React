<img width="100" alt="app-logo" src="https://res.cloudinary.com/rohitkk432/image/upload/v1622039297/logo_ggfn18.png">

# Music Pro X - DevSoc Project.

Hosted at https://music-pro-x.vercel.app/

## About
MusicProX is a app where you can search songs . Add songs to queue ,playlist and liked.
And play them with the MusicProX player.

**SERVER REPO LINK** - https://github.com/Rohitkk432/musicprox-server.git

## Table of Contents
- [Database Schema ](#database-schema)
- [Browser Support 🌐](#browser-support)
- [Installation 🐣](#installation)
- [Contribution Guidelines ✒](#contribution-guidelines)
- [Things learnt during project](#things-learnt-during-project)
- [How to use ? 📖](#how-to-use)
- [Current Implementations 👨‍💻](#current-implementations)
- [Future Implementations 💻](#future-implementations)
- [Individual Contribution ☕](#individual-contribution)
- [SnapShots](#snapshots)

## Database Schema
![image](https://user-images.githubusercontent.com/74586376/119724049-d482b700-be8b-11eb-8be0-d48eeca40c63.png)


## Browser Support
| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| Edge | last 3 versions | last 3 versions | last 3 versions | last 3 versions |

## Installation

Follow these steps to install this project directory:

```
# clone the repo
$ git clone https://github.com/Rohitkk432/Music-Pro-X.git

# go into app's directory:
$ cd Music-Pro-X

```

## Contribution Guidelines
1. **Fork** the repo on GitHub.
2. **Clone** the project to your own machine.
3. **Commit** changes to your own branch.
4. **Push** your work back up to your fork.
5. **Submit** a pull request.
(Make sure you *merge* before you make a pull request!)

### Pull Request Guidelines
1. The subject should be a short one line summary of the change you've made.
2. The extended description should include a deatiled description of the changes you've made and also a list of all the files you've made changes in.
3. One pull request should cater to only one change. *A change may include multiple file changes that are essential to solving the issue/change.

## Things learnt during project 
**Rohit Kodam**-<br/>
1. At the start of the project i only knew how to use HTML, CSS, JS. but during the project i learned PostgreSQL , express(basics), APIs, HTTP requests, Postman, ReactJS.
2. I learnt how to deploy website on netlify(i used for client-side) and heroku(i used for server-side).
3. Faced many issues with google login and atlast resorted to use React Library for it.
4. i didnt know in the start of project how to use database , that we have to deploy server and client seperately, that there is even a server side but now i have learnt about it. 

**Shlok Sinha**-<br/>
1. Learnt about different desgin choices and color schemes, and why these are important
2. Used JavaScript without the help of any tutorials and found out how helpful it is.
3. Learnt how to work in a team, the technical skills needed.

**Naman Ajay Markhedkar**-<br/>
1. Used HTML , CSS to add to the layout/style of the website.
2. Learnt to manage time to handle multiple tasks together.

## How to use?
1. Login using BITS mail id (as the app is only for students of BITS).
2. After logging in you will be redirected to the app home page where you can search songs by typing in search bar (currently we have only 18 songs).
3. You can add songs to queue , playlists ( there are 3 playlists) by tapping on plus and choosing appropriate option. You can also like a song it will be added to liked songs list.
4. On home you can tap on the footer component this will bring up the music player and queue list and there are options like random,loop,autoplay,etc.
5. One can also remove songs from specific lists by tapping on minus sign .
6. you can also play whole playlist by tapping play in playlist section it will add all songs og playlist to queue and overide the queue.

## Current Implementations
1. Music player with functionalities.
2. Queue,Playlists,liked features with a postgres database
3. integrated google login.

## Future Implementations
1. On reload when on th app page the app is breaking so need to fix it.
2. Footer should also control the player like pause play and other features.
3. lists like playlists and queue are only rerendering when we move to another section and come back that needs to be improved.

## Individual Contribution
**Rohit Kodam** -<br />
1. Entire server-side using express and postgress.<br />
2. Converted everything to React of the Pages written in HTML CSS .<br />
3. Built a postgres database .<br />
4. implemented Google login .<br />
<br />

**Shlok Sinha** -<br>
1. Made music player section, Playlist, Liked, Nav-bar using HTML,CSS.<br />
2. Added the functionality to arrow keys (only) in music players and hamburger menu in nav-bar using Js.<br />
<br />

**Naman Ajay Markhedkar** <br />
1. Worked on the Home page to create poster showing part.
2. Worked over design.

## Snapshots

### Login Page
<img width="954" alt="image" src="https://user-images.githubusercontent.com/74586376/173111849-29756ee2-49da-4280-94ed-78fcf5110d13.png">

### App Home Page 
<img width="957" alt="image" src="https://user-images.githubusercontent.com/74586376/173111905-28f808d5-6dfe-4af1-86c2-4abf730b8c4a.png">

#### Songs addding functionality
<img width="958" alt="image" src="https://user-images.githubusercontent.com/74586376/173111969-ae1a11ab-5fe9-4620-974d-c1e26f9fcec4.png">

### Queue and Music Player
<img width="960" alt="image" src="https://user-images.githubusercontent.com/74586376/173112010-afd54d9f-49a4-48dc-82df-be189afce843.png">

### Liked Songs Page
<img width="957" alt="image" src="https://user-images.githubusercontent.com/74586376/173112067-a558cdfb-e595-46fa-a4a9-02279aeb9c99.png">

### Playlist Page 
<img width="957" alt="image" src="https://user-images.githubusercontent.com/74586376/173112120-cbcbb3fe-97ff-481f-99f4-67eae925eca1.png">

#### Music PLayer
<img width="394" alt="image" src="https://user-images.githubusercontent.com/74586376/173112211-246758ab-b8e5-488e-8e24-7722cd3cc1e5.png">


### Social Media

Instagram: <https://www.instagram.com/devsocbitsgoa>

Devsoc's Website: <https://devsoc.club/>
