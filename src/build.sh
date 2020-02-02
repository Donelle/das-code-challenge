#!/bin/bash

dotnet restore
dotnet publish -c Release -o build
docker image build -t coinoptimizerapp:1.0 .

# Run image only locally and then automatically deleted  after you kill with Ctrl+C
# docker run -it --rm -p 6400:80 --name coin-app coinoptimizerapp:1.0

# Run it in a container detached
# docker container run --publish 6400:80 --detach --name coin-app coinoptimizerapp:1.0