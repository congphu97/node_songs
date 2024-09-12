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
