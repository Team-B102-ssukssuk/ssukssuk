# 1. 개발환경
- IoT
   - IDE : Sublime Text3, Arduino IDE
   - RaspberryPI 64 bit
   - Python 3.7.3
   - Tensorflow 2.11.0
   - Tensorflow Lite 2.10.0
   - 그 외 라이브러리들은 requirements.txt에 있음
- Backend
   - IDE : Intellij 2022.02.01 (Ultimate), MobaXterm
   - SpringBoot 2.7.14
   - Java 1.8 Zulu / JDK 8
   - Redis 7.0.12
   - MySQL 8.1
   - docker 24.0.5
   - Jenkins 2.401.2
   - 그 외 라이브러리, 설정은 build.gradle, application.yml
- Frontend
   - IDE : VScode , Android Studio 2022.02.01
   - React : 18.2.0
   - react-native :^0.71.
   - expo : 48.0.18
   - redux : 8.1.2
   - 그 외 라이브러리들은 package.json 참고
# 2. 환경변수
- IoT
   - vi /etc/systemd/system/client.service
```
[Unit]
Description=Client Service
After=network.target

[Service]
ExecStart=/usr/bin/python3 ~/S09P12B102/IoT/client.py
WorkingDirectory=~/S09P12B102/IoT
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=client

[Install]
WantedBy=multi-user.target
```
   - pip install -r requirements.txt