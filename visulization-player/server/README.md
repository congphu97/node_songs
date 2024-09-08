Docker
// docker build .
// docker run -p 3000:80 334837ba6abd // 3000 port node , 80 port image.
// docker ps

Container
// docker ps --help: Check command
// docker ps -a: Check all container
// docker images: Check all images
// docker ps: Check container is running.
// docker start container_demo : Create container with name "container_demo"
// docker run -d --name [CONTAINER_NAME] [IMAGE_ID]
// docker stop [CONTAINER_ID]: Stop container
// docker rm [CONTAINER_ID]: Remove container (remove container && remove image)
// docker run -d -p [HOST_PORT]:[CONTAINER_PORT] [IMAGE_ID]: Add port access to docker image (8000:3000)
// docker image inspect [CONTAINER_ID]: Check information image
// docker cp client/assets/. server/assets/. [CI]  : Coppy file assets from client to container server.
// 