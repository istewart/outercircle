Outercircle
===========

To install OuterCircle, run:

    git clone https://github.com/istewart/outercircle.git
    cd outercircle
    npm install

This will install the OuterCircle respository and all of its dependencies. You can then build the repository using:

    npm run build

This will create a handful of compiled files in dist/ containing the front end code. You can then run the back end using:

    npm run server

Which will create a web server listening on port 8080 that you can access at:

    localhost:8080/

As a shortcut after making changes, you can also run:

    npm run boot

Which will clean dist, run build, and start the server.

Sign In
========

IMPORTANT FOR USE OF THE APPLICATION: You must first log in to see many of the features of the application. Either navigate to http://localhost/login or click the login button.

In order to login, you must sign up first. Sign up by clicking the sign up button on the login page and enter desired credentials.

Navigation:
===========

Going to http://localhost:8080/ will take you to the main newsfeed.
Going to http://localhost:8080/donor/1 will take you to a sample donor page.
Going to http://localhost:8080/charity/1 will take you to a sample charity page
Going to http://localhost:8080/login will take you to the login page

If you are not logged in, you will be automatically redirected to /login.
