pipeline {
    agent any

    tools {
        nodejs "node18"   
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'git@github.com:Genialqua/https://github.com/Genialqua/Gidalo_New.git'
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
                sh 'npm run build'
            }
        }

        stage('Run Server') {
            steps {
                sh 'npm run start &'
            }
        }
    }
}
