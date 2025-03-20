pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        AWS_ACCOUNT_ID = '505787607537'
        FRONTEND_REPO = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/devops-frontend"
        BACKEND_REPO  = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/devops-backend"
        ECS_CLUSTER   = "devops-cluster"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Login to AWS ECR') {
            steps {
                sh '''
                  aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
                '''
            }
        }

        stage('Build and Push Backend') {
            steps {
                dir('backend') {
                    sh '''
                      docker build -t $BACKEND_REPO:latest .
                      docker push $BACKEND_REPO:latest
                    '''
                }
            }
        }

        stage('Build and Push Frontend') {
            steps {
                dir('frontend') {
                    sh '''
                      docker build -t $FRONTEND_REPO:latest .
                      docker push $FRONTEND_REPO:latest
                    '''
                }
            }
        }

        stage('Deploy Backend to ECS') {
            steps {
                sh '''
                  aws ecs update-service \
                    --cluster $ECS_CLUSTER \
                    --service devops-backend-service \
                    --force-new-deployment \
                    --region $AWS_REGION
                '''
            }
        }

        stage('Deploy Frontend to ECS') {
            steps {
                sh '''
                  aws ecs update-service \
                    --cluster $ECS_CLUSTER \
                    --service devops-frontend-service \
                    --force-new-deployment \
                    --region $AWS_REGION
                '''
            }
        }
    }
}
