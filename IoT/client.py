import asyncio
import websockets
import json
import serial
import requests
import re
import os
import cv2
from time import sleep
# from keras.models import load_model  # TensorFlow is required for Keras to work
# from PIL import Image, ImageOps  # Install pillow instead of PIL
# import numpy as np
from datetime import datetime
import tflite_runtime.interpreter as tflite
import numpy as np
import tensorflow as tf

# PORT = 'COM5' # 라즈베리 파이 PORT의 경우 확인 필요
BAUD_RATE = 9600 # 통신 속도 - 라즈베리파이4는 9600이 적정
# ARD = serial.Serial(PORT, BAUD_RATE) # 아두이노 통신 설정 - PC
ARD = serial.Serial("/dev/ttyACM0",BAUD_RATE) # 아두이노 통신 설정 - 라즈베리파이4
# the TFLite converted to be used with edgetpu
model_path = os.path.join(os.path.dirname(__file__),'model_unquant.tflite')
serial_number_path = os.path.join(os.path.dirname(__file__), "serial_number.txt")
# The path to labels.txt that was downloaded with your model
label_path = os.path.join(os.path.dirname(__file__),'labels.txt')

async def connect():
	# uri = "ws://localhost:8080/stomp/chat"  # Spring Boot WebSocket Endpoint URL
	uri = "ws://i9b102.p.ssafy.io:8080/stomp"
	username = "your_username"  # Replace with your username
	password = "your_password"  # Replace with your password
	# destination = "/sub/chat/room/c5e9f525-0cbd-4191-9cfa-248b1cfb0131"  # The topic to subscribe to
	serial_number = ""
	recv_destination = "" # The destination to receive message.
	send_destination = "/pub/socket/sensor"  # The destination to send the JSON message
	with open(serial_number_path,"r") as file:
		serial_number = file.readline()
		if serial_number == "":
			print("시리얼 넘버가 없습니다.")
			conn.send(-1);
			return
		recv_destination = "/sub/socket/room/" + serial_number
	
	async with websockets.connect(uri) as websocket:
		# Send STOMP CONNECT frame with credentials
		connect_frame = f"CONNECT\naccept-version:1.2\nlogin:{username}\npasscode:{password}\n\n\x00"
		await websocket.send(connect_frame.encode())

		# Send STOMP SUBSCRIBE frame to subscribe to the destination
		subscribe_frame = f"SUBSCRIBE\ndestination:{recv_destination}\nid:sub-1\nack:auto\n\n\x00"
		await websocket.send(subscribe_frame.encode())
		image_cnt = 59;
		while True: # 통신
			# Server -> Raspberry PI Request
			try:
				response = await asyncio.wait_for(websocket.recv(), timeout=1.0)
				if "물" in response:
					# command : "A" -> 물 주기
					command = "A"
					print("ARD WRITE : ", response)
					ARD.write(command.encode())
			except Exception as e:
				print(e)
				
			try:
				# Raspberry PI -> Server Request
				sensor_data = await read()
				if sensor_data[4] == 1:
					for data, s_type in zip(sensor_data[:4], ["T", "H", "M", "W"]):
						json_message = {
							"potId" : 1,
							"serialNumber" : serial_number,
							"measurementValue" : data,
							"sensorType" : s_type
						}
						#T,H,M,W
						# Convert the JSON message to a string and send it as the STOMP SEND frame
						send_frame = f"SEND\ndestination:{send_destination}\ncontent-type:application/json\n\n{json.dumps(json_message)}\x00"
						now = datetime.now()
						formatted_time = now.strftime('%Y-%m-%d %H:%M:%S')
						log_message = f'[{formatted_time}] 센서 데이터 전송\n'
						await websocket.send(send_frame.encode())
						# print("Send data")
					image_cnt+=1
					if image_cnt == 60: # 사진 30분 간격으로 전송
						send_image_to_server()
						cnt = 0
			except Exception as e:
				print(e)
				break
# Arduino Sensor Value 시리얼 통신
async def read():
	if ARD.readable():
		line = ARD.readline()
		temperature, humidity, groundMoisture, waterTank, param = line.decode().split()
		print("line :",line)
		temperature, humidity, groundMoisture = float(temperature), float(humidity) ,float(groundMoisture),
		waterTank, param =  int(waterTank), int(param)
		# print("humidity :", humidity)
		# print("groundMoisture :",groundMoisture)
		# print("waterTank :",waterTank)
		return [ temperature, humidity, groundMoisture, waterTank, param ]
	else:
		print("Read Failed!!")
		return [ 0, 0, 0, 0, 0]
# Teachable Machine 작동 로직 = Raspberry PI
def TM(frame):
	# Load your model onto the TF Lite Interpreter
	interpreter = tf.lite.Interpreter(model_path=model_path)
	interpreter.allocate_tensors()
	# 정보 얻기
	input_details = interpreter.get_input_details()
	# 사진 resize
	image_resized = cv2.resize(frame, (224, 224))
	image = tf.expand_dims(image_resized, axis=0)
	image = tf.cast(image,tf.float32)
	# 모델의 입력 텐서에 이미지 데이터 넣기
	interpreter.set_tensor(input_details[0]['index'], image)
	# 판정
	interpreter.invoke()
	# 출력 정보
	output_details = interpreter.get_output_details()
	output_data = interpreter.get_tensor(output_details[0]['index'])
	result = ""
	with open(label_path,"r") as label:
		max_data = 0
		for per in output_data[0]:
			line = label.readline()
			if per > max_data:
				result = line
				max_data = per
	return int(result[0])+1

# Teachable Machine 작동 로직 = PC
# def TM():
# 	# Disable scientific notation for clarity
# 	np.set_printoptions(suppress=True)
# 	# Load the model
# 	model = load_model("keras_Model.h5", compile=False)
# 	# Load the labels
# 	class_names = open("labels.txt", "r").readlines()

# 	# Create the array of the right shape to feed into the keras model
# 	# The 'length' or number of images you can put into the array is
# 	# determined by the first position in the shape tuple, in this case 1
# 	data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
# 	serial_number = ""
# 	with open("serial_number.txt","r") as file:
# 		serial_number = file.readline()
# 		if serial_number == "":
# 			print("시리얼 넘버가 없습니다.")
# 			conn.send(-1);
# 			return

# 	filename = "PLANT_"+serial_number+".jpg"
# 	# Replace this with the path to your image
# 	image = Image.open("img/"+filename).convert("RGB")

# 	# resizing the image to be at least 224x224 and then cropping from the center
# 	size = (224, 224)
# 	image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)

# 	# turn the image into a numpy array
# 	image_array = np.asarray(image)

# 	# Normalize the image
# 	normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1

# 	# Load the image into the array
# 	data[0] = normalized_image_array

# 	# Predicts the model
# 	prediction = model.predict(data)
# 	index = np.argmax(prediction)
# 	class_name = class_names[index]
# 	confidence_score = prediction[0][index]
# 	# Print prediction and confidence score
# 	print(class_name)
# 	print("Class:", class_name[2:], end="")
# 	print("Confidence Score:", confidence_score)
#	result = int(class_name[0])

def send_image_to_server():
	# 서버로 전송_image_to_server():
	# 카메라 세팅
	cam = cv2.VideoCapture(0)
	# 카메라가 열렸는지 체크
	if not cam.isOpened():
		print("카메라를 열 수 없습니다.")
		return
	# 파일명 : 시리얼 넘버 + 현재시간.jpg

	serial_number = ""
	with open(serial_number_path,"r") as file:
		serial_number = file.readline()
		if serial_number == "":
			print("시리얼 넘버가 없습니다.")
			return
	filename = "PLANT_"+serial_number+".jpg"
	status, frame = cam.read()
	capture_time = datetime.now().strftime("%Y-%M-%d %H:%M:%S")
	if not status:
		print("프레임을 읽어올 수 없습니다.")
		return
	# 이미지 저장
	img_path = os.path.join(os.path.dirname(__file__),"img/"+filename)
	cv2.imwrite(img_path,frame)
	# 카메라 종료
	cam.release()
	# TM 체크
	# TM() # PC 버전
	result = TM(frame) # Raspberry PI 버전
	print("Camera tflite result : ", result)
	# 이미지 전송 할 uri
	url = "http://i9b102.p.ssafy.io:8080/sensor/upload"
	
	dto = {
		'pot_id' : 1,
		'level' : result
	}
	dto = json.dumps(dto)
	response = requests.post(url, 
		data=dto, 
		headers={'Content-Type': 'application/json; charset=UTF-8'}
	)
	if response.status_code == 200:
		print("TM 데이터 전달 성공")
	else:
		print("TM 데이터 전달 실패")

if __name__ == "__main__":
	isExit = False
	while not isExit:
		try:
			asyncio.get_event_loop().run_until_complete(connect())
		except KeyboardInterrupt as interrupt:
			isExit = True
		except Exception as e:
			print("Error :",e)
