# Ignore warnings
import warnings
warnings.filterwarnings('ignore')

#Importing necessary librairies
from PIL import Image
import numpy as np
from skimage import transform
from keras.models import load_model
from tensorflow.python.keras.backend import set_session
from LoadandSplit import splitImage
import tensorflow as tf
import socketio
from math import pow
import time

# load image
def load(filename):
   np_image = Image.open(filename)
   np_image = np.array(np_image).astype('float32')/255
   np_image = transform.resize(np_image, (64, 64, 3))
   np_image = np.expand_dims(np_image, axis=0)
   return np_image

#baseUri = './machine-learning/'
baseUri = ''
sio = socketio.Client()
sess = tf.Session()
set_session(sess)

model = load_model(baseUri + "weights.hdf5")
graph = tf.get_default_graph()
size = 896

@sio.event
def connect():
	print('connection established')

@sio.event
def disconnect():
	print('disconnected from server')

def start():
	sio.connect('http://localhost:8080')

@sio.event
def predict(data):
    global graph
    global sess
    with graph.as_default():
        print('ho grand oracle predit moi')
        splitImage(size, data)
        predictions = []
        timeCount = time.time()
        for i in range(0, int(pow(size // 64, 2))):
            # Opens a image in RGB mode 
            image = load(baseUri + "test" + str(i) + ".png")
            #image = load(baseUri + 'test.png')
            set_session(sess)
            predictions.append(model.predict_classes(image)[0])
        print(predictions)

        print(time.time() - timeCount)
    sio.emit('predictFinished', str(predictions))

start()
sio.wait()