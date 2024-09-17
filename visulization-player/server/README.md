Command:

1. Check command:  docker ps --help
2. Check all container: docker ps -a
3. Check all images: docker images
4. Check container is running: docker ps
5. Create container with [CONTAINER_NAME] : docker start container_demo
6. Add docker image to container with [CONTAINER_NAME] : docker run -d --name [CONTAINER_NAME] [IMAGE_ID]
7. Stop container: docker stop [CONTAINER_ID]
8. Remove container (remove container && remove image): rm [CONTAINER_ID]
9. Add port access to docker image (8000:3000) : docker run -d -p [HOST_PORT]:[CONTAINER_PORT] [IMAGE_ID]
10. Check information image: docker image inspect [CONTAINER_ID]
11. Coppy file assets from client to container server.:  cp client/assets/. server/assets/.

Pull & Push image
1. Run build Tag image: docker build -t container_demo:lastest .
2. Sharing image:  Share dockerfile + Push docker hub
3. Login docker hub from local: docker login

Managing data in images & container
1. Create image: docker build -t music_node:volumes .
2. Create volume: docker volume create music_node_volume
3. Run docker with volume anonymous /app/music : docker run -d -p 8000:3000 --rm --name music_node -v music_node:/app/music music_node:volumes
3. Run docker with volume path source: docker run -d -p 8000:3000 --rm --name music_node -v "C:/Users/pc/Desktop/front-end/node_songs/visulization-player/server:/app/music" music_node:volumes
4. Combine & Merging Different Volumne: docker run -d -p 8000:3000 --rm --name music_node -v "C:/Users/pc/Desktop/front-end/node_songs/visulization-player/server:/app/music" -v /app/node_moduldes/ music_node:volumes
5. View logs: docker logs music_node

Volumes & Bind Mounts:
1. Readoly volume: add :ro (ex: docker run -d -p 8000:3000 --rm --name music_node -v "C:/Users/pc/Desktop/front-end/node_songs/visulization-player/server:/app/music:ro" -v /app/node_moduldes/ music_node:volumes)

2. Inpsect volume: docker volume inspect music_node_volumeno
3. Remove volume: docker volume rm music_node_volume
4. Environment Varbile & .env file:
    *Dockerfile:
        ENV PORT 3000

        EXPOSE $PORT
    *index.js:
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
5. Arguments:
    ARG DEFAULT_PORT=3000

    ENV PORT DEFAULT_PORT

    EXPOSE $PORT

Containers & Networks:
1. Change localhost to docker host machine:
    mongoose.connect('mongodb://localhost:27017/music',........);
    =>'mongodb://host.docker.internal:27017/music'

2. Communication between container with container: example have 3 container: 1 , 2 ,3 and communcation
    docker build -t music_image_network:1.0 .
    docker network create music_network
    docker network ls
    docker run -d --rm --name mongodb --netwwork music_network
    => 'mongodb://music_network:27017/music'

Build multi-container application with Docker:

Using docker-compose:
    docker-compose up -d
    docker-compose down -v