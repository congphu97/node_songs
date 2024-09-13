Command:

// docker ps --help: Check command
// docker ps -a: Check all container
// docker images: Check all images
// docker ps: Check container is running.
// docker start container_demo : Create container with [CONTAINER_NAME]
// docker run -d --name [CONTAINER_NAME] [IMAGE_ID]: Add docker image to container with [CONTAINER_NAME]
// docker stop [CONTAINER_ID]: Stop container
// docker rm [CONTAINER_ID]: Remove container (remove container && remove image)
// docker run -d -p [HOST_PORT]:[CONTAINER_PORT] [IMAGE_ID]: Add port access to docker image (8000:3000)
// docker image inspect [CONTAINER_ID]: Check information image
// docker cp client/assets/. server/assets/.  : Coppy file assets from client to container server.
 

// Run build Tag image: docker build -t container_demo:lastest .
// Sharing image:  Share dockerfile + Push docker hub
// Login docker hub from local: docker login

Managing data in images & container
1. Create image: docker build -t music_node:volumes .
2. Create volume: docker volume create music_node_volume
3. Run docker with volume anonymous /app/music : docker run -d -p 8000:3000 --rm --name music_node -v music_node:/app/music music_node:volumes  
3. Run docker with volume path source: docker run -d -p 8000:3000 --rm --name music_node -v "C:/Users/pc/Desktop/front-end/node_songs/visulization-player/server:/app/music" music_node:volumes
4. Combine & Merging Different Volumne: docker run -d -p 8000:3000 --rm --name music_node -v "C:/Users/pc/Desktop/front-end/node_songs/visulization-player/server:/app/music" -v /app/node_moduldes/ music_node:volumes
5. View logs: docker logs music_node

Volumes & Bind Mounts:
1. Readoly volume: add :ro (ex: docker run -d -p 8000:3000 --rm --name music_node -v "C:/Users/pc/Desktop/front-end/node_songs/visulization-player/server:/app/music:ro" -v /app/node_moduldes/ music_node:volumes)

2.