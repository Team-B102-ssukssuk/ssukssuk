import asyncio
import websockets
import json
import serial
import requests
import re
import os
import cv2
# from keras.models import load_model  # TensorFlow is required for Keras to work
# from PIL import Image, ImageOps  # Install pillow instead of PIL
# import numpy as np
from datetime import datetime
# from pycoral.utils.dataset import read_label_file
# from pycoral.utils.edgetpu import make_interpreter
# from pycoral.adapters import common
# from pycoral.adapters import classify

PORT = 'COM5' # 라즈베리 파이 PORT의 경우 확인 필요
BaudRate = 9600 # 통신 속도 - 라즈베리파이4는 9600이 적정
ARD = serial.Serial(PORT, BaudRate) # 아두이노 통신 설정 - PC
# ARD = serial.Serial("/dev/ttyACM0",BaudRate) # 아두이노 통신 설정 - 라즈베리파이4
# the TFLite converted to be used with edgetpu
modelPath = 'model_unquant.tflite'

# The path to labels.txt that was downloaded with your model
labelPath = 'labels.txt'

async def connect_and_subscribe():
	# uri = "ws://localhost:8080/stomp/chat"  # Spring Boot WebSocket Endpoint URL
	uri = "ws://i9b102.p.ssafy.io:8080/stomp"
	username = "your_username"  # Replace with your username
	password = "your_password"  # Replace with your password
	# destination = "/sub/chat/room/c5e9f525-0cbd-4191-9cfa-248b1cfb0131"  # The topic to subscribe to
	destination = ""
	with open("serial_number.txt","r") as file:
		serial_number = file.readline()
		if serial_number == "":
			print("시리얼 넘버가 없습니다.")
			conn.send(-1);
			return
		destination = "/sub/socket/room/" + serial_number
	async with websockets.connect(uri) as websocket:
		# Send STOMP CONNECT frame with credentials
		connect_frame = f"CONNECT\naccept-version:1.2\nlogin:{username}\npasscode:{password}\n\n\x00"
		await websocket.send(connect_frame.encode())

		# Send STOMP SUBSCRIBE frame to subscribe to the destination
		subscribe_frame = f"SUBSCRIBE\ndestination:{destination}\nid:sub-1\nack:auto\n\n\x00"
		await websocket.send(subscribe_frame.encode())

		while True:
			response = await websocket.recv()
			print("Received message:", response)

async def send_json_message():
	# uri = "ws://localhost:8080/stomp/chat"  # Spring Boot WebSocket Endpoint URL
	uri = "ws://i9b102.p.ssafy.io:8080/stomp"
	username = "your_username"  # Replace with your username
	password = "your_password"  # Replace with your password
	destination = "/pub/socket/sensor"  # The destination to send the JSON message

	async with websockets.connect(uri) as websocket:
		# Send STOMP CONNECT frame with credentials
		connect_frame = f"CONNECT\naccept-version:1.2\nlogin:{username}\npasscode:{password}\n\n\x00"
		await websocket.send(connect_frame.encode())
		serial_number = ""
		with open("serial_number.txt","r") as file:
			serial_number = file.readline()
			if serial_number == "":
				print("시리얼 넘버가 없습니다.")
				conn.send(-1);
				return
		# Create a JSON message
		json_message = {
			"potId" : 1,
			"serialNumber" : serial_number,
			"measurementValue" : 2.3,
			"sensorType" : "T"
		}

		#T,H,M

		# Convert the JSON message to a string and send it as the STOMP SEND frame
		send_frame = f"SEND\ndestination:{destination}\ncontent-type:application/json\n\n{json.dumps(json_message)}\x00"
		await websocket.send(send_frame.encode())

# Arduino Sensor Value 시리얼 통신
def read():
	if ARD.readable():
		line = ARD.readline()
		temperature, humidity, groundMoisture, waterTank = map(int,line.decode().split())
		print("temperature :",temperature)
		print("humidity :", humidity)
		print("groundMoisture :",groundMoisture)
		print("waterTank :",waterTank)
	else:
		print("Read Failed!!")

# Teachable Machine Lite 작동 로직 = 라즈베리파이
def classifyImage(interpreter, image):
    size = common.input_size(interpreter)
    common.set_input(interpreter, cv2.resize(image, size, fx=0, fy=0,
                                             interpolation=cv2.INTER_CUBIC))
    interpreter.invoke()
    return classify.get_classes(interpreter)

def TM(frame):
    # Load your model onto the TF Lite Interpreter
    interpreter = make_interpreter(modelPath)
    interpreter.allocate_tensors()
    labels = read_label_file(labelPath)
    # 판정 결과
    results = classifyImage(interpreter, frame)
    print(results)
    
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

def send_image_to_server():
	# 카메라 세팅
	cam = cv2.VideoCapture(0)
	# 카메라가 열렸는지 체크
	if not cam.isOpened():
		print("카메라를 열 수 없습니다.")
		return
	# 파일명 : 시리얼 넘버 + 현재시간.jpg

	serial_number = ""
	with open("serial_number.txt","r") as file:
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
	cv2.imwrite("img/"+filename,frame)
	# 카메라 종료
	cam.release()
	print("Capture request Complete!")
	# TM 체크
	# TM() # PC 버전
	# TM(frame)
	# 서버로 전송
	# url = "http://localhost:8080/upload" # 이미지 전송 할 uri
	# dto = {
	# 	'image' : open(../python37/img/filenname, 'rb'),
	#	'pot_id' : 1,
	#   'capture_time' : capture_time
	# }
	# response = request.post(url, files=dto)
	# if response.status_code == 200:
	# 	print("이미지 업로드 성공")
	# else:
	# 	print("이미지 업로드 실패")

if __name__ == "__main__":
	asyncio.get_event_loop().run_until_complete(send_json_message())
	asyncio.get_event_loop().run_until_complete(connect_and_subscribe())
	cnt = 2
	while True:
		read()
		cnt += 1
		if cnt == 3:
			send_image_to_server()
			cnt = 0
