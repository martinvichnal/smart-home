export REV_TAG=1.0.0

echo "Start...."

##if [[ $1 -gt 4 ]]
##then
##  echo "Wrong param!"
##  exit  
##fi

export REV=$1
export REV_TAG=$2
echo "Version is " + $REV_TAG

## Switch namespace to iot
kx iot

echo "*****************************************************"
echo "*****************************************************"

  echo "*****************************************************"
  echo "Building smart-home-websocket-server:"$REV_TAG
  
  ## Version TAG
  envsubst < Deployment-template.yaml > Deployment.yaml

  docker build --no-cache -f Dockerfile -t loxtop/smart-home-websocket-server:$REV_TAG .
  docker push loxtop/smart-home-websocket-server:$REV_TAG
 
  kubectl apply -n iot -f namespace.yml
  kubectl apply -n iot -f Deployment.yaml
  kubectl apply -n iot -f Service.yaml
  kubectl rollout restart Deployment -n iot smart-home-websocket-server

  cd ..


## kubectl exec -it smart-home-websocket-server  -- bash


  echo "*****************************************************"

echo "Done."
echo "*****************************************************"
echo "*****************************************************"
