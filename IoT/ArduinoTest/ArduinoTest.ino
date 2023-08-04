#include <DFRobot_DHT11.h> // 온습도 센서 라이브러리 
DFRobot_DHT11 DHT; // 온습도 센서 객체 
#define PIN A0 // 아두이노 핀은 A0를 사용

unsigned long sensorTime = 0;
unsigned long pumpTime = 0;
int pumpSwap = 0;
void setup(){
  pinMode(2, OUTPUT);
  Serial.begin(9600);
  digitalWrite(2, LOW);
}

void loop(){
  // 온습도 센서
  unsigned long time = millis();
  if(Serial.available() > 0){ 
    char data = Serial.read();
    if(data == 'A') {// A : 물 급수
      pumpTime = time;
      digitalWrite(2, HIGH);
    }
  }
  if(time-pumpTime > 2000){
    digitalWrite(2, LOW);
  }
  DHT.read(PIN);
  if(time - sensorTime >= 20000){ // 센서 로직
    sensorTime = time;
    // Serial.print("temp:");
    // Serial.print(DHT.temperature); // 온도 출력
    // Serial.print("  humi:");
    // Serial.println(DHT.humidity); //습도 출력
    Serial.print(DHT.temperature);
    Serial.print(" ");
    Serial.print(DHT.humidity);
    Serial.print(" ");
    // 토양 수분 센서 (현재 -로 측정이 되는데 문제 확인 필요)
    int groundMoisture = analogRead(PIN);  
    groundMoisture = map(groundMoisture,550,0,0,100);  
    // Serial.print("Mositure : ");  
    // Serial.print(groundMoisture);  
    // Serial.println("%");
    Serial.print(groundMoisture);
    Serial.print(" ");
    // 수위 측정 센서 (물 감지시 300~500 사이, 물이 없다면 ~30 -> 범위는 100을 기준으로 두면 될듯)
    int waterTank = analogRead(PIN);
    // Serial.print("waterTank : ");
    // Serial.println(waterTank);
    Serial.print(waterTank);
    Serial.print(" ");
    Serial.print(1);
    Serial.println();
  }else{
    // Serial.print("temp:");
    // Serial.print(DHT.temperature); // 온도 출력
    // Serial.print("  humi:");
    // Serial.println(DHT.humidity); //습도 출력
    Serial.print(DHT.temperature);
    Serial.print(" ");
    Serial.print(DHT.humidity);
    Serial.print(" ");
    // 토양 수분 센서 (현재 -로 측정이 되는데 문제 확인 필요)
    int groundMoisture = analogRead(PIN);  
    groundMoisture = map(groundMoisture,550,0,0,100);  
    // Serial.print("Mositure : ");  
    // Serial.print(groundMoisture);  
    // Serial.println("%");
    Serial.print(groundMoisture);
    Serial.print(" ");
    // 수위 측정 센서 (물 감지시 300~500 사이, 물이 없다면 ~30 -> 범위는 100을 기준으로 두면 될듯)
    int waterTank = analogRead(PIN);
    // Serial.print("waterTank : ");
    // Serial.println(waterTank);
    Serial.print(waterTank);
    Serial.print(" ");
    Serial.print(0);
    Serial.println();
  }

}
