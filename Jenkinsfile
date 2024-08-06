pipeline{
    agent any

    stages{
        stage('Build'){
            steps{
                script{
                    echo 'here-1'
                    sh 'cd spring-dekku'
                    sh 'chmod +x gradlew'
                    echo 'here-2'
                    sh './gradlew clean build'
                    sh 'cd ..'
                    echo 'here-3'
                    sh 'chmod +x ./docker_install.sh'
                    sh './docker_install.sh'
                    echo 'isn-t it?'
                }
            }
        }
        stage('Deploy'){
            steps{
                script{
                    echo 'here-4'
                    sh 'docker rm -f jenkins-test || true'
                    sh 'docker build -t jenkins-test spring-dekku'
                    sh 'docker run -d --name jenkins-test -p 8080:8080 jenkins-test'
                }
            }
        }
    }
}
