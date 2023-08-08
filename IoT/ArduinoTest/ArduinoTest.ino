// #include <DFRobot_DHT11.h> // 온습도 센서 라이브러리 
// DFRobot_DHT11 DHT; // 온습도 센서 객체 
#define MOISTURE_PIN A0 // 아두이노 핀은 A0를 사용
#define TANK_PIN A1
#include <DHT.h>

#define DHTTYPE DHT11  // DHT11 센서를 사용할 경우 DHT11로 설정합니다.
DHT dht(2, DHTTYPE);

unsigned long sensorTime = 0;
unsigned long pumpTime = 0;
int pumpSwap = 0;
int sensorTimeCount = 0;
void setup(){
  Serial.begin(9600);
  digitalWrite(2, LOW);
  digitalWrite(3, LOW);
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
      digitalWrite(2, HIGH);
    }
  }
  if(time-pumpTime > 2000){
    digitalWrite(2, LOW);
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
    Serial.print(waterTank);
    Serial.print(" ");
    if(sensorTimeCount >= 10) {
      Serial.print(1);
      sensorTimeCount = 0;
    }
    else Serial.print(0);
    Serial.println();
  }
}
