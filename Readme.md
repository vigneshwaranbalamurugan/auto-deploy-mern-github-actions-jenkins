# 🔄 Jenkins Auto-Deploy via GitHub Actions + ngrok

This project demonstrates how to trigger a **Jenkins pipeline** automatically from a **GitHub Actions workflow** using a **public ngrok tunnel**, allowing you to test and deploy locally hosted Jenkins instances over the internet.

## 🚀 Features

- Automatically triggers a Jenkins job when you push to the `main` branch
- Uses GitHub Actions and secure API calls to invoke Jenkins
- Supports **ngrok-based local Jenkins** for development and testing

---

## 🛠 Requirements

- Local Jenkins server running on port `8080`
- [ngrok](https://ngrok.com/) installed and authenticated
- GitHub repository with Actions enabled

## 🔐 Required GitHub Secrets

Set these in your repository under Settings → Secrets and variables → Actions:

- `JENKINS_USER`: Your Jenkins username
- `JENKINS_API_TOKEN`: Your Jenkins API token (not password)
- `JENKINS_URL`: Your ngrok URL (without protocol, e.g., `abcd.ngrok-free.app`)
- `JENKINS_JOB_TOKEN`: The token configured in your Jenkins job (e.g., `deploy123`)

---

## ⚙️ Step-by-Step Setup Guide

### 1. Configure Jenkins

1. Create a new job in Jenkins (e.g., `deploy-react`)
2. Under job configuration → Build Triggers, enable "Trigger builds remotely"
3. Set an authentication token (e.g., `deploy123`) and save it as `JENKINS_JOB_TOKEN` in GitHub secrets
4. Configure your job's build steps as needed for your deployment

### 2. Set Up ngrok

1. Install ngrok from [ngrok.com](https://ngrok.com/download)
2. Authenticate ngrok with your auth token:
   ```bash
   ngrok authtoken your_auth_token
   ```
3. Start an ngrok tunnel to your local Jenkins:
   ```bash
   ngrok http 8080
   ```
4. Copy the generated URL (e.g., `abcd.ngrok-free.app`) and set it as `JENKINS_URL` in GitHub secrets

### 3. Create GitHub Actions Workflow

Create a file at `.github/workflows/jenkins-deploy.yml` with the following content:

```yaml
name: Deploy to Jenkins

on:
  push:
    branches:
      - main  # Using main instead of master as the default branch name

jobs:
  trigger-jenkins:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Jenkins Frontend Deployment
        run: |
         curl -X GET "https://${{ secrets.JENKINS_URL }}/job/deploy-react/build?token=${{ secrets.JENKINS_JOB_TOKEN }}" \
                  --user "${{ secrets.JENKINS_USER }}:${{ secrets.JENKINS_API_TOKEN }}"
```

## 🔒 Security Considerations

- Store sensitive credentials only in GitHub secrets, never in code


## 📌 Notes

- Free ngrok accounts generate new URLs on each restart
- This setup is primarily designed for development and testing environments



Made with ❤️ by [Vigneshwaran Balamurugan](https://linkedin.com/in/vigneshwaran30)


