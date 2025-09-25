pipeline {
    agent any

    environment {
        APP_NAME = 'excuse-dict-frontend'
    }

    stages {
        stage('Stop Running App') {
            steps {
                echo 'Stopping currently running Next.js app...'
                sh '''
                    # 3000 포트에서 실행 중인 프로세스 찾아서 종료
                    PID=$(lsof -t -i:3000) || true
                    if [ ! -z "$PID" ]; then
                        echo "Killing process on port 3000 (PID: $PID)"
                        kill -9 $PID
                        sleep 2
                    fi

                    # next 관련 프로세스들 종료
                    pkill -f "next" || echo "No next processes found"
                '''
            }
        }

        stage('Install & Build') {
            steps {
                echo 'Installing dependencies and building...'
                withCredentials([
                    string(credentialsId: 'NEXT_PUBLIC_RECAPTCHA_SITE_KEY', variable: 'NEXT_PUBLIC_RECAPTCHA_SITE_KEY')
                ]) {
                    sh '''
                        # /var/lib/jenkins/workspace/JOB이름/ 에서 작업
                        export NEXT_PUBLIC_RECAPTCHA_SITE_KEY="${NEXT_PUBLIC_RECAPTCHA_SITE_KEY}"

                        npm install

                        # ESLint 무시하고 빌드
                        npx next build --no-lint
                    '''
                }
            }
        }

        stage('Start App') {
            steps {
                echo 'Starting app in background...'
                sh '''
                    # /var/lib/jenkins/workspace/JOB이름/ 에서 앱 시작
                    nohup npm start > /tmp/nextjs.log 2>&1 &
                    echo $! > /tmp/nextjs.pid
                    echo "App started in background"
                '''
            }
        }

        stage('Health Check') {
            steps {
                echo 'Checking if app is running...'
                sh '''
                    sleep 10

                    # 헬스체크
                    curl -f http://localhost:3000 || {
                        echo "Health check failed!"
                        pm2 logs ${APP_NAME} --lines 20
                        exit 1
                    }

                    echo "✅ App is running successfully!"
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 Deployment successful!'
        }

        failure {
            echo '❌ Deployment failed!'
            // 실패 시 로그 확인
            sh '''
                echo "Checking application logs..."
                tail -50 /tmp/nextjs.log || true
            '''
        }
    }
}