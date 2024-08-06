pipeline{
    agent any

    stages{
        stage('Build'){
            steps{
                script{
                    sh 'cd spring-dekku'
                    sh 'chmod +x gradlew'
                    sh './gradlew clean build'
                    sh 'cd ..'
                    sh 'chmod +x ./docker_install.sh'
                    sh './docker_install.sh'
                }
            }
        }
        stage('Deploy'){
            steps{
                script{
                    sh 'docker rm -f jenkins-test || true'
                    sh 'docker build -t jenkins-test spring-dekku'
                    sh 'docker run -d --name jenkins-test -p 8080:8080 jenkins-test'
                }
            }
        }
    }
}
