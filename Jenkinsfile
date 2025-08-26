pipeline {
    agent any

    tools {
        nodejs "NodeJS-18"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Genialqua/Gidalo_New.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npm install --prefix frontend'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build --prefix frontend'
            }
        }

        stage('Test') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        sh 'npm test -- --reporters=default --reporters=jest-junit --outputDirectory=./test-results/backend'
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        sh 'npm test --prefix frontend -- --reporters=default --reporters=jest-junit --outputDirectory=./test-results/frontend'
                    }
                }
            }
        }
    }

    post {
        always {
            junit 'test-results/**/*.xml'
        }
    }
}