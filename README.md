# chat-app
An Angular Chat Application using ngrx, Angular material and socket.io.

![Alt text](demo.jpg?raw=true "Screen Shots")

# Features
### App
    - NGRX implementation
    - 2 Languages "English and Arabic"
    - 2 interface directions "LTR, RTL"
    - All customization saved in local storage

### Chat Page
    - Socket.io based chat interface
    - Emoji :)
    - Parser that can parse "Youtube Videos, Images, URLs"
    - Blink when receive message when the user on another tab
    - Unread messages counter
    - Nice Custom scrollbar with auto scroll to bottom
    - 2 message themes one for current user messages floated right and other one for other people floated to left
    - animations for messages enterance
    - save user entered text before leaving the page and restore it once get back to the page
    - send message on click send button OR on `CTRL+ENTER`.
    - Input autofocus on page init
    - Input text with Off autocomplete

### Settings Page
    - Ability to customize "User name, Interface theme, Clock Display, Send messages on CTRL+ENTER, - - - Interface Language"
    - Ability to reset all customization to defaults
    - Store user customization in localstorage and restore it on init the app.


# TODO
    - Authentication
    - Chat history
    - Browser notifications and "favico.js" for Unread messages
    - Sounds for each action "Audio sprite using HowlerJS"
    - Message grouping “sequence messages from same user”
    - Add Router animations


# Getting started

1. Go to project folder then navigate to /server and install server dependencies:
| npm install
 
2. back to main app folder using command 
| cd ../
after that launch the socket.io server using command
| npm run server

3. Run `npm install` to install our app dependencies.
Then Lanuch the angular app server using command `npm start` and open `localhost:4200` in your browser.

# Project structure

```sh
dist/                        web app production build
docs/                        project docs and coding guides
documentation/               Full project documentation
e2e/                         end-to-end tests
src/                         project source code
|- app/                      app components
|  |- core/                  core module (singleton services and store)
|  |- chat/                  chat module  (chat component, message component)
|  |- settings/              settings module  (settings component)
|  |- app.component.*        app root component (shell)
|  |- app.module.ts          app root module definition
|  |- app-routing.module.ts  app routes
|  +- ...                    additional modules and components
|- assets/                   app assets (images, fonts, sounds...)
|- environments/             values for various build environments
|- theme/                    app global scss variables and theme
|- translations/             translations files
|- testing/                  testing utils
|- index.html                html entry point
|- main.scss                 global style entry point
|- main.ts                   app entry point
|- polyfills.ts              polyfills needed by Angular
+- test.ts                   unit tests entry point
reports/                     test and coverage reports
```