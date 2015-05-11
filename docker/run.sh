currentDir=$(dirname $0)

sh $currentDir/cleanup.sh

cd $currentDir \
&& sh -c "docker-compose kill && docker-compose rm --force && docker-compose up" 
