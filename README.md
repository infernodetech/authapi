Authenticatin API for infernode.
This api will be used for managing and authenticate the user in all the systems infernode will use. 
It has swagger ui documentation so you can access the documentation off the api accessing the following url: https://auth.infernodetech.com/api-docs/
Also you will have comments on every file in order  to all be documented. And when a new feature or code is implemented needs to be documented in the issue and also on the comments in the file. To see more information about this refer  to the corresponding discord channel in our server.
In this repository you will also find a dockerfile docker image and a compose yaml file. This can be used for running the api locally in order to do some testing before pushing to the repository.
For running the api locally you will need a few enviroment variables defined in an .env file in the same folder. The .env file is issued to set up database connection variables for the mysql container and the connection url for prisma.
In order to see more details about how to set up .env and what enviroment variables are needed exactly refer to the .env.example file.
