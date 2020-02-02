Coin Optimizer
========================

This is a small project that I've created for a technical interview that demonstrates my frontend and backend skillset using React, .NET ASPNET Core, and Docker. See [Challenge Document](DAS%20Coding%20Challenge.docx) for challenge details.

## Documentation

I am using a linux system and dev on so my instructions implies that you are using one as well. I've built an auto build script to build the project, so to build navigate to the src directory and run the bash script or execute the following:


        $ cd src/ && sh build.sh
        
    
After the build is complete successfully a docker image should be available on you local machine. Now you can run the app from a cmd prompt in a few ways:

    # Run image right away to test then automatically deleted after you kill with Ctrl+C
    docker run -it --rm -p 6400:80 --name coin-app coinoptimizerapp:1.0


    # Run it in a container detached and connect to it when ever
    docker container run --publish 6400:80 --detach --name coin-app coinoptimizerapp:1.0

    
    # Run from docker hub
    docker-compose up -d

Once the containers start running point your browser to http://localhost:6400. The app is built with mobile first in mind so F12 it in Chrome/FireFox and change to mobile mode for the best experience.

Thats it.

## LICENSE

There is none :-) feel free to borrow whatever is useful.

## Questions?

If you have any questions or comments please feel free to drop me a line :-).

Email: <donellesanders@gmail.com>
Follow Me: [@DonelleJr](https://twitter.com/DonelleJr)
