# NestJS Skeleton

[![Maintainability](https://api.codeclimate.com/v1/badges/501d3320c5b7215676e3/maintainability)](https://codeclimate.com/github/greg-md/node-skeleton/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/501d3320c5b7215676e3/test_coverage)](https://codeclimate.com/github/greg-md/node-skeleton/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/greg-md/node-skeleton/badge.svg?targetFile=package.json)](https://snyk.io/test/github/greg-md/node-skeleton?targetFile=package.json)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=greg-md_node-skeleton&metric=alert_status)](https://sonarcloud.io/dashboard?id=greg-md_node-skeleton)

- `nest new skeleton`
- `nest generate app micro`
- `npm i --save @nestjs/platform-fastify`
- Use Fastify per documentation: https://docs.nestjs.com/techniques/performance
- `npm remove @nestjs/platform-express @types/express`
- `npm i --save @nestjs/microservices`
- `npm i --save nats`
- `npm install sinon`

## Build & Deploy

### Build

To use an image without uploading it, reuse the docker deamon to build the image:
```bash
eval $(minikube docker-env)
```

- `docker build -t skeleton/api --target production-api .`
- `docker build -t skeleton/micro --target production-micro .`

### Deploy

Install NATS if not already installed:
```sh
helm repo add nats https://nats-io.github.io/k8s/helm/charts/
helm install nats nats/nats
```

Install services:
```sh
helm install skeleton ./workflow
```

Upgrade services:
```sh
helm upgrade skeleton ./workflow
```

Open API:
```sh
minikube service api-service
```

### Destroy

- `helm uninstall skeleton`
- `helm uninstall nats`

## Debug

https://kubernetes.io/docs/reference/kubectl/cheatsheet/

Listen for pod logs:
```bash
kubectl logs -f -l app=api --all-containers
```
