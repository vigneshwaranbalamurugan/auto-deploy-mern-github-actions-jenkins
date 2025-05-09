# KubeMERN: Kubernetes-Based Microservice MERN Stack

## 🚀 Overview

KubeMERN is a modern, containerized MERN (MongoDB, Express.js, React.js, Node.js) application orchestrated with Kubernetes. This project demonstrates how to deploy a full-stack JavaScript application as microservices using Kubernetes, enabling scalability, resilience, and simplified management.

## ✨ Features

- **Microservice Architecture**: Separate deployments for frontend and backend components
- **Kubernetes Orchestration**: Declarative configuration for easy scaling and management
- **Local Development**: Streamlined setup with Minikube for local Kubernetes development
- **Container-Based**: Fully Dockerized application components for consistency across environments

## 🔧 Prerequisites

Before getting started, ensure you have the following tools installed:

- **Docker**: For building and managing containers
- **Minikube**: For running Kubernetes locally 
- **kubectl**: For interacting with your Kubernetes cluster

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/vigneshwaranbalamurugan/MERN_Kubernetes.git
cd MERN_Kubernetes
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory with the necessary environment variables:

```bash
cd backend
cp .env.example .env
# Edit the .env file with your specific configuration values
# Example:
#PORT="5000"
# MONGO_URI=mongodb://mongodb-service:27017/kubemern
```


### 3. Build and Push Docker Images

```bash
# Build and push the backend image
cd backend
docker build -t your-docker-username/kubemern-backend:latest .
docker push your-docker-username/kubemern-backend:latest

# Build and push the frontend image
cd ../frontend
docker build -t your-docker-username/kubemern-frontend:latest .
docker push your-docker-username/kubemern-frontend:latest
```

### 4. Update Kubernetes Configuration

Update the image names in the Kubernetes deployment files to match your Docker Hub username:

```bash
# Update frontend-deployment.yaml
# Change image: your-docker-username/kubemern-frontend:latest

# Update backend-deployment.yaml
# Change image: your-docker-username/kubemern-backend:latest
```

### 5. Deploy to Kubernetes

```bash
# Navigate to the kubernetes directory
cd ../kubernetes

# Apply all configuration files
kubectl apply -f .

# Verify pod status
kubectl get pods
```

Wait until all pods are in the `Running` state.

## 🚀 Accessing the Application

```bash
# Access the frontend (in one terminal)
kubectl port-forward svc/frontend-service 3000:3000

# Access the backend (in another terminal)
kubectl port-forward svc/backend-service 5000:5000
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to access the application.

## 🏗️ Architecture

```
                              ┌─────────────┐
                              │  Minikube   │
                              │   Cluster   │
                              └─────────────┘
                                     │
                 ┌───────────────────┼───────────────────┐
                 │                   │                   │
        ┌────────▼─────────┐ ┌───────▼────────┐ ┌───────▼────────┐
        │    Frontend      │ │     Backend    │ │    MongoDB     │
        │   Deployment     │ │   Deployment   │ │   Deployment   │
        └──────────────────┘ └────────────────┘ └────────────────┘
                 │                   │                   │
        ┌────────▼─────────┐ ┌───────▼────────┐ ┌───────▼────────┐
        │    Frontend      │ │     Backend    │ │    MongoDB     │
        │     Service      │ │     Service    │ │     Service    │
        └──────────────────┘ └────────────────┘ └────────────────┘
                 │                   │                   │
                 └───────────────────┼───────────────────┘
                                     │
                            ┌────────▼─────────┐
                            │  Port Forwarding │
                            │   3000 & 5000    │
                            └──────────────────┘
```
Made with ❤️ by [Vigneshwaran Balamurugan](https://linkedin.com/in/vigneshwaran30)


