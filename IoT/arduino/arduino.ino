#define MOISTURE_PIN A0 // 토양 수분 센서 핀 - 아날로그 A0
#define TANK_PIN A1 // 물탱크 센서 핀 - 아날로그 A1
#define WATER_PIN A2 // 워터 펌프 핀 - 아날로그 A2
#include <DHT.h>

#define DHTTYPE DHT11  // 온습도 센서
DHT dht(2, DHTTYPE); // 온습도 센서 핀 - 디지털 2번 핀

unsigned long sensorTime = 0;
unsigned long pumpTime = 0;
int pumpSwap = 0;
int sensorTimeCount = 0;
void setup(){
  Serial.begin(9600);
  pinMode(MOISTURE_PIN,INPUT);
  pinMode(TANK_PIN,INPUT);
  analogWrite(WATER_PIN, 0);
  dht.begin();
}

void loop(){
  // 온습도 센서
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int moisture = analogRead(MOISTURE_PIN);
  int waterTank = analogRead(TANK_PIN);
  float moisturePercentage = map(moisture, 0, 1023, 0, 100);
  unsigned long time = millis();
  if(Serial.available() > 0){ 
    char data = Serial.read();
    if(data == 'A') {// A : 물 급수
      pumpTime = time;
      analogWrite(WATER_PIN, 255);
    }
  }
  if(time-pumpTime > 2000){
    analogWrite(WATER_PIN, 0);
  }
  // DHT.read(PIN);
  if(time - sensorTime >= 1000){ // 센서 로직 : 간격 1초
    sensorTime = time;
    sensorTimeCount++;
    Serial.print(temperature);
    Serial.print(" ");
    Serial.print(humidity);
    Serial.print(" ");
    Serial.print(moisturePercentage);
    Serial.print(" ");
    if(waterTank < 400) Serial.print(0); // 물이 없으면 0
    else Serial.print(1); // 물이 있으면 1
    Serial.print(" ");
    if(sensorTimeCount >= 10) {
      Serial.print(1);
      sensorTimeCount = 0;
    }
    else Serial.print(0);
    Serial.println();
  }
}
