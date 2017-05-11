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

Sign In:
========

IMPORTANT FOR USE OF THE APPLICATION: You must first log in to see many of the features of the application. Either navigate to http://localhost/login or click the login button.

In order to login, you must sign up first. Sign up by clicking the sign up button on the login page and enter desired credentials.

If you are not logged in, you will be automatically redirected to /login.

Host:
=====

To host OuterCircle on AWS, first launch an AWS EC2 instance using the MEAN Stack by Bitnami and using an SSH key you have access to. Then SSH to that instance using:

    ssh -i path/to/ssh/key.pem bitnami@{public ip}

Next, install OuterCircle using:

    git clone https://github.com/istewart/outercircle.git
    cd outercircle
    ./run.sh

You can then access the OuterCircle website at {public ip}.

Administrator:
==============

Administrator is admin@outercircle.org. If the user doesn't exist you can add it with whatever password you want. After logging in as admin@outercircle.org go to /adminPortal to add charities.
