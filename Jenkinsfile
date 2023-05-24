pipeline {
  agent any
  
  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/Zylhoutte/private-repo.git'
      }
    }
    
    stage('Build') {
      steps {
        // Execute build commands here
        sh 'mvn clean install'
      }
    }
    
    stage('Test') {
      steps {
        // Execute test commands here
        sh 'mvn test'
      }
    }
    
    stage('Deploy') {
      steps {
        // Execute deployment commands here
        sh 'mvn deploy'
      }
    }
  }
}