Here’s a **natural and professional** `README.md` that doesn’t sound AI-generated:  

---

# DevOps Code Challenge  

# Overview  
This project automates the deployment of a Jenkins server, a frontend application, and a backend application using AWS ECS (Fargate). The infrastructure is provisioned using Terraform, and Jenkins handles the CI/CD pipeline to automate the deployment process.

# Architecture  
This setup consists of the following components:  

- Jenkins Server: Runs on an AWS EC2 instance and automates the deployment pipeline.  
- Frontend & Backend Services: Containerized applications deployed to AWS ECS (Fargate).  
- Networking & Security:  
  - VPC with public and private subnets  
  - Security groups allowing traffic between ALB, ECS services, and external users  
  - IAM roles for Jenkins, ECS, and ECR access  
- Application Load Balancer (ALB): Routes traffic to the frontend service.  
- Terraform: Used to provision all infrastructure, including ECS, ALB, IAM roles, and networking.  

# Prerequisites  
Before setting up the project, ensure you have the following installed:  

- AWS CLI  
- Terraform  
- Docker  
- Jenkins  

You also need an AWS account with sufficient permissions to create and manage ECS, ECR, IAM roles, and networking components.  

# Setting Up the Infrastructure  

1. Clone the repository:  
   git clone git@github.com:dazestr8/devops-code-challenge.git  
   cd devops-code-challenge  

2. Initialize Terraform and apply the configuration:  
   terraform init  
   terraform apply  
  
3. Terraform will output important details such as the ALB DNS name, which is needed to access the frontend.  

# Setting Up Jenkins  

1. Install Jenkins on an EC2 instance and configure the necessary plugins.  
2. Add AWS credentials under Manage Jenkins -  Credentials to allow Jenkins access to AWS services.  
3. Create a new pipeline job and use the `Jenkinsfile` in this repository.  

## Running the Pipeline  

1. Push any changes to the repository to trigger the Jenkins pipeline.  
2. Jenkins will:  
   - Build and push Docker images to ECR  
   - Deploy the updated ECS services  
3. Retrieve the ALB URL by running:  
   aws elbv2 describe-load-balancers --names devops-frontend-alb --query "LoadBalancers[0].DNSName" --output text
   
4. Open the ALB URL in a browser to access the frontend:  
   http://<Alb-DNS-Name>
     

# Notes  

- Ensure AWS credentials are correctly configured for Jenkins.  
- If deployment fails, check IAM permissions, security groups, and ECS logs.  
- The config.js file in the frontend directory should have the correct API URL pointing to the backend service. 
