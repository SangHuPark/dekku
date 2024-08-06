pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'ssafy',
                    url: 'https://lab.ssafy.com/s11-webmobile2-sub2/S11P12A306.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh "docker-compose -f ${DOCKER_COMPOSE_FILE} build"
                }
            }
        }

        stage('Run Docker Containers') {
            steps {
                script {
                    sh "docker-compose -f ${DOCKER_COMPOSE_FILE} up -d"
                }
            }
        }

        stage('Clean Up') {
            steps {
                script {
                    sh "docker-compose -f ${DOCKER_COMPOSE_FILE} down"
                }
            }
        }
    }

    post {
        always {
            script {
                sh "docker-compose -f ${DOCKER_COMPOSE_FILE} down --volumes"
            }
        }
    }
}
