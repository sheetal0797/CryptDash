pipeline{
agent any
environment{
dockerhub=credentials('dockerhub')}
	stages{
		stage("Git pull")
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
		stage("Build Docker Images")
		{
			steps
			{echo "Postt Actions Stage"}
			// { sh "docker build -t sheetalagarwal/devops_pipeline_scical_img ."	}
		}
		stage("Publish Docker Images")
		{
			steps
			
			{ echo "Postt Actions Stage"
			// sh "docker logout"
			//   sh "echo $dockerhub_PSW | docker login -u $dockerhub_USR --password-stdin"
// sh "docker push sheetalagarwal/devops_pipeline_scical_img"	
}
		}
		stage("Clean Docker Images")
		{
			steps
			{ echo "Postt Actions Stage"
				// sh "docker rmi sheetalagarwal/devops_pipeline_scical_img"	
				}
		}
		stage("Deploy and Run Images")
		{
			steps
			{
				echo "Postt Actions Stage"
				//  ansiblePlaybook(credentialsId: 'devops_ansible', inventory: 'inventory', playbook:'playbook.yml')
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

