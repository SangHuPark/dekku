pipeline{
    agent any

    stages{
        stage('Build'){
            steps{
                script{
                    sh 'chmod +x ./spring-dekku/gradlew'
                    sh './spring-dekku/gradlew clean build -x test'
                    sh 'chmod +x ./spring-dekku/docker_install.sh'
                    sh './spring-dekku/docker_install.sh'
                }
            }
        }
        stage('Deploy'){
            steps{
                script{
                    sh 'docker build -t backend-jenkins .'
                    sh 'docker rm -f backend-jenkins'
                    sh 'docker run -d --name backend-jenkins -p 8080:8080 backend-jenkins'
//                     sh 'docker build --build-arg JASYPT_KEY=${JASYPT_KEY} -t backend-jenkins .'
//                     sh 'docker rm -f backend-jenkins'
//                     sh 'docker run -d --name backend-jenkins -p 8080:8080 backend-jenkins'
                }
            }
        }
    }
}