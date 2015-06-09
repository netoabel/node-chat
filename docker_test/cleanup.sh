COUNT=$(docker ps -aq | wc -l)

if [ "$COUNT" != "0" ]; then
  docker rm -f $(docker ps -aq)
fi

COUNT=$(docker images -f "dangling=true" -q | wc -l)

if [ "$COUNT" != "0" ]; then
docker rmi -f $(docker images -f "dangling=true" -q)
fi
