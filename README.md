# Node Skeleton

[![Maintainability](https://api.codeclimate.com/v1/badges/501d3320c5b7215676e3/maintainability)](https://codeclimate.com/github/greg-md/node-skeleton/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/501d3320c5b7215676e3/test_coverage)](https://codeclimate.com/github/greg-md/node-skeleton/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/greg-md/node-skeleton/badge.svg?targetFile=package.json)](https://snyk.io/test/github/greg-md/node-skeleton?targetFile=package.json)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=greg-md_node-skeleton&metric=alert_status)](https://sonarcloud.io/dashboard?id=greg-md_node-skeleton)

Skeleton of a NodeJS backend, using
[NestJS](https://nestjs.com/) +
[GraphQL](https://docs.nestjs.com/graphql/quick-start) +
[NATS](https://docs.nestjs.com/microservices/nats) +
[Microservices](https://docs.nestjs.com/microservices/basics) +
[Docker](https://www.docker.com/) +
CI/CD +
automated deployments with GitHub Actions using [Kubernetes](https://kubernetes.io/), [Helm](https://helm.sh/) and [AWS EKS](https://aws.amazon.com/eks/).

Useful Tutorials:
- [Kubernetes Tutorial](https://youtu.be/X48VuDVv0do)
- [AWS EKS - Create Kubernetes cluster on Amazon EKS](https://youtu.be/p6xDCz00TxU)

What has been done to the default app:
- `npm i -g @nestjs/cli`
- `nest new node-skeleton`
- `cd node-skeleton`
- `nest generate app micro`
- `npm i nestjs/platform-fastify`
- `npm remove @nestjs/platform-express @types/express supertest @types/supertest`
- `npm i @nestjs/microservices`
- `npm i nats`
- `npm i sinon`
- `npm i @nestjs/config`
- `npm i @nestjs/graphql graphql-tools graphql apollo-server-fastify @moonwalker/graphql-nats-subscriptions`

### Table of Contents

- [Local Run](#local-run)
- [Build & Deploy](#build--deploy)
    - [Pre Requirements](#pre-requirements)
    - [Build](#build)
    - [Deploy](#deploy)
    - [Destroy](#destroy)
- [Debug](#debug)

# Local Run

Using Docker:
```sh
docker-compose up
```

# Build & Deploy

You can build & deploy out of the box to local minikube or to AWS EKS using Kubernetes.

## Pre Requirements

Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/);

Install [Helm](https://helm.sh/);

### Minikube

Install [minikube](https://minikube.sigs.k8s.io/docs/start/);

Start minikube:
```sh
minikube start
```

### AWS ECR

Install and configure [AWS CLI](https://aws.amazon.com/cli/);

Install [eksctl](https://eksctl.io/);

Create AWS Cluster:
```sh
eksctl create cluster -f ./build-deploy/cluster/skeleton.yaml --auto-kubeconfig
```

Scale Cluster if needed:
```sh
eksctl scale nodegroup --cluster=skeleton --nodes=4 --name=skeleton-nodes
```

Tip:
> Use `--kubeconfig ~/.kube/eksctl/clusters/skeleton` flag to use AWS EKS with `kubectl` or `helm`.

## Build

### Minikube

Use the minikube docker deamon to build the image:
```bash
eval $(minikube docker-env)
```

Build images:
- `docker build -t skeleton/api --target production-api .`
- `docker build -t skeleton/micro --target production-micro .`


### AWS ECR

- Run [Build Api](actions/workflows/build-api.yml) action;
- Run [Build Micro](actions/workflows/build-micro.yml) action.

## Deploy

### Minikube

```sh
helm upgrade nats ./build-deploy/helm/nats --install --wait
helm upgrade micro ./build-deploy/helm/micro --install --wait
helm upgrade api ./build-deploy/helm/api --install --wait
```

Explose API:
```sh
minikube service api-service
```

### AWS ECR

- Run [Deploy NATS](actions/workflows/deploy-nats.yml) action;
- Run [Deploy Micro](actions/workflows/deploy-micro.yml) action;
- Run [Deploy Api](actions/workflows/deploy-api.yml) action.

## Destroy

```sh
helm uninstall api [ --kubeconfig ~/.kube/eksctl/clusters/skeleton ]
helm uninstall micro [ --kubeconfig ~/.kube/eksctl/clusters/skeleton ]
helm uninstall nats [ --kubeconfig ~/.kube/eksctl/clusters/skeleton ]
```

Destroy AWS EKS Cluster:
```sh
eksctl delete cluster --name skeleton
```

# Debug

https://kubernetes.io/docs/reference/kubectl/cheatsheet/

Listen for pod logs:
```bash
kubectl logs -f -l app=api --all-containers [ --kubeconfig ~/.kube/eksctl/clusters/skeleton ]
kubectl logs -f -l app=micro --all-containers [ --kubeconfig ~/.kube/eksctl/clusters/skeleton ]
```
