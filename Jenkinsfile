pipeline {
    agent any

    environment {
        AWS_CREDENTIALS = credentials('aws-credentials') // Ensure you created this in Jenkins Credentials
        AWS_REGION = 'us-east-1'
        ECR_REPOSITORY = '505787607537.dkr.ecr.us-east-1.amazonaws.com'
        FRONTEND_IMAGE = 'devops-frontend'
        BACKEND_IMAGE = 'devops-backend'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'lightfeather-jenkins-pipeline', 
                    credentialsId: 'git', 
                    url: 'git@github.com:dazestr8/devops-code-challenge.git'
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                script {
                    sh """
                    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPOSITORY
                    docker build -t $ECR_REPOSITORY/$FRONTEND_IMAGE:latest ./frontend
                    docker push $ECR_REPOSITORY/$FRONTEND_IMAGE:latest
                    docker build -t $ECR_REPOSITORY/$BACKEND_IMAGE:latest ./backend
                    docker push $ECR_REPOSITORY/$BACKEND_IMAGE:latest
                    """
                }
            }
        }

        stage('Deploy to ECS') {
            steps {
                script {
                    sh "aws ecs update-service --cluster devops-cluster --service devops-frontend-service --force-new-deployment"
                    sh "aws ecs update-service --cluster devops-cluster --service devops-backend-service --force-new-deployment"
                }
            }
        }
    }

    post {
        success {
            echo "Deployment successful!"
        }
        failure {
            echo "Deployment failed!"
        }
    }
}

