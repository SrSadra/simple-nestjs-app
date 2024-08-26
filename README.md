This app has two entities post and user and it has n-1 relation. We used prisma orm and also mysql as db and simple docker-compose file to manage mysql service (learned basic docker fundamentals in previouse week).
I also added jwtGuard to get user posts and post by id,but creating post is available for every user.It gets bearer token from req and process it, you can comment them.
env variables such as database url, jwt_secret etc. are in .env file.  

All packages needed to run the app is provided in prereq.md file 
