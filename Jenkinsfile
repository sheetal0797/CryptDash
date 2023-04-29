pipeline{
agent any
environment{
dockerhub=credentials('dockerhub')}
	stages{
		stage("Git  pull")
		{
			steps
			{ 
			git url:'https://github.com/sheetal0797/CryptDash.git',branch:'main'
			}
		}
		stage("Mavenn Build")
		{
			steps
			{ 
		echo "maven"
			}
		}
		stage("Running React Tests (Jest)")
	 	{
			steps
			{
				echo "running react tests (jest)"
			}
		}
		stage("Running API Tests (supertest)")
		{
			steps
			{
				echo "running API tests (supertest)"
			}
		}
		stage("Build CryptDash Backend Docker Image")
		{
			steps
			{
				echo "build cryptdash backend docker Image"
				sh "docker build -t sheetalagarwal/cryptdash_server server/"
			}
			// { sh "docker build -t sheetalagarwal/devops_pipeline_scical_img ."	}
		}
		stage("Build CryptDash Frontend Docker Image")
		{
			steps
			{
				echo "build cryptdash frontend docker Image"
				sh "docker build -t sheetalagarwal/cryptdash_client client/"
			}
			// { sh "docker build -t sheetalagarwal/devops_pipeline_scical_img ."	}
		}
		stage("Login to Docker Hub")
		{
			steps
			{
				sh "docker logout"
				sh "echo $dockerhub_PSW | docker login -u $dockerhub_USR --password-stdin"
			}
		}
		stage("Push Beckend Docker Image to Docker Hub")
		{
			steps
			
			{ 	echo "Push Beckend Docker Image to Docker Hub"
				sh "docker push sheetalagarwal/cryptdash_server"	
			}
		}
		stage("Push Frontend Docker Image to Docker Hub")
		{
			steps
			
			{ 	echo "Push frontend Docker Image to Docker Hub"
				sh "docker push sheetalagarwal/cryptdash_client"	
			}
		}
		stage("Removing Docker Images from Local")
		{
			steps
			{ 	echo "Postt Actions Stage"
				sh "docker rmi sheetalagarwal/cryptdash_server"
				sh "docker rmi sheetalagarwal/cryptdash_client"	
				}
		}
		stage("Deploy and Run Images")
		{
			steps
			{
				echo "Postt Actions Stage"
				ansiblePlaybook(credentialsId: 'devops_ansible', inventory: 'inventory', playbook:'playbook.yml')
			}
		}
		stage("Declarative: Post actions")
		{
			steps
			{ echo "Postt Actions Stage"
			}
		}
	}
}

