# Banking Orchestration Service

## 1. Install Docker Desktop

Follow the instruction found [here](https://www.docker.com/products/docker-desktop) to install docker desktop

## 2. Build and Test the Docker Image Locally

- Export the Bit Dev token

```bash
export BIT_DEV_AUTH_TOKEN="ENTER THE BIT DEV TOKEN HERE"
```

- Run the following command to build the docker image locally

```bash
docker build -t baas-orc --build-arg BIT_DEV_AUTH_TOKEN=$BIT_DEV_AUTH_TOKEN .

```

### You have two options when running the image:

- First setup environment variables that you'll pass into the Image and Helm

```bash
export DATBASE_URL="Enter the mongoDB database URL"
```

### Option 1

- Run the image with an interactive session and test the endpoint. Note, passing in the --env-file will allow you to pass in secrets

```bash
docker run --rm -it -p 5000:8080 \
--env PORT=8080 \
--env DATABASE_URL=$DATABASE_URL \
--name baas-orc baas-orc
```

### Option 2

- The following command can be run to start the docker image with an interactive terminal session. The image will start up running a bash or sh command and allow for access to the contents of the running Docker Container

```bash
docker run --rm -it -p 5000:8080 \
--env PORT=8080 \
--env DATABASE_URL=$DATABASE_URL \
--entrypoint sh --name baas-orc baas-orc
```

- After starting the container, you can start the node server with the following command

```bash
node dist/server.js
```

### Test the running container

- Test by going to a browser and accessing the swagger page at http://localhost:5000/baas/orchestrator/v1/vendors/123456?sim=SuccessWithRecords



---
# (Optional) Deploy and Test on Laptop K8s Cluster

The following instruction are required if you desire to run kubernetes on your laptop and test locally before deploying to the cloud

## 3. Configure Kubernetes on Docker Desktop

The instructions in this document will not provide information about how to configure Docker Desktop and Kubernetes. However, that information is documented by searching for Docker Deskop installation. You will also need to enable Kubernetes

You can also download **Lens** from Mirantis Inc. It is a great tool to allow you to view applications deployed in your kubernetes cluster. Try this link: [Lens Install](https://k8slens.dev/index.html)

---
## Helm Notes:

The `./helm-orch` directory contains the helm **values.yaml** files that will be used when calling the helm chart stored in Artifactory repository.

The following instructions will describe how to use the helm chart to deploy locally


## 4. Install Helm

The instructions on this page can be used for installing Helm:

[Helm Install](https://helm.sh/docs/intro/install/)

---

## 5. Clone Helm repository and set environment variable

While waiting for the cloud version of Artifactory, you can clone the Helm repository locally.

- Change to a directory where you want the repository to be cloned

### ssh Clone

```bash
git clone git@bitbucket.org:progfin-ondemand/platform.helm.git
```

### or, https Clone

```bash
git clone https://YOUR-BITBUCKET-USERNAME@bitbucket.org/progfin-ondemand/platform.helm.git
```

### Helm Directory Env

- set an environment variable to the location of the Helm Charge repository

**bash**
```bash
export HELM_DIRECTORY=/THE-DIRECTORY-WHERE-YOU-CLONED-THE-REPOSITORY/platform.helm/helm

# e.g.

export HELM_DIRECTORY=/Users/patrick.davies/Repos/Progressive/platform.helm/helm
```

**powershell**
```
$env:HELM_DIRECTORY=/THE-DIRECTORY-WHERE-YOU-CLONED-THE-REPOSITORY/platform.helm/helm-onprem
```


## 6. Test the Application

- Now you can test the deployment by using Helm Chart from the Bitbucket Repository cloned in a previous step.

- **NOTE:** This helm command will perform a **dry-run** Test on the helm chart. You can test out the local deployment or the QA Lane deployment:

### Local Laptop

- You must first create any required environment variables that we'll use to replace data in the values files.

**bash**:

```bash
export DATABASE_URL="ENTER the correct KEY"
```

**Powershell**:

```Powershell
$env:DATABASE_URL="ENTER the correct KEY"
```

- Now perform a dry-run to generate the deployment yaml files

```bash
helm upgrade --install orchestrator $HELM_DIRECTORY \
--values helm-orc/values.yaml \
--values helm-orc/values.local.yaml \
--set secrets.DATABASE_URL=${DATABASE_URL} --dry-run
```

### DEV Lane (Optional - just to see the output)

**Note**: When testing against **non-local** clusters, we're going to use the **template** command. Unlike the **upgrade --install** command we executed against the local laptop cluster, the template command does not validate against the cluster, but it will generate the k8s yaml.

```bash
helm template orchestrator $HELM_DIRECTORY \
--values helm-orc/values.yaml --values helm-orc/values.dev.yaml \
--set deploymentLane=dev --set namespace=dev-baas --dry-run
```

# 7. Deploy the application Locally

To deploy the application, you simply remove the `--dry-run` flag from the previous helm command:

```bash
helm upgrade --install orchestrator $HELM_DIRECTORY \
--values helm-orc/values.yaml \
--values helm-orc/values.local.yaml \
--set secrets.DATABASE_URL=${DATABASE_URL}
```

- To list information about the application running in k8s, here are a few commands:

```bash
helm list

kubectl get deployments

kubectl get pods

# Once you know the fullname of the pod from the previous command,
# you can execute something like the following:

kubectl get pod orchestrator-<REPLACE-WITH-CORRECT-ID> -o json

kubectl get services

kubectl get secrets

kubectl get configmaps
```

# 8. Test the application running in the cluster

- Using your browser go to this URL: http://localhost:30010/baas/orchestrator/v1/vendors/123456?sim=SuccessWithRecords

# 9. Delete the previously deployed application

Although you generally can just re-run the helm upgrade command, **it's a good practice** to just **run the helm delete command** below to ensure that you're getting a fresh install when testing out your local laptop cluster deployment.

```bash
helm delete orchestrator
```
