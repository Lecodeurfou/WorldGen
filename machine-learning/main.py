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

model = load_model(baseUri + "weights.best.hdf5")
graph = tf.get_default_graph()

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
        splitImage(data)
        predictions = []
        for i in range(0, 9):
            # Opens a image in RGB mode 
            image = load(baseUri + "test" + str(i) + ".png")
            set_session(sess)
            predictions.append(model.predict_classes(image)[0])
        print(predictions)
    
    sio.emit('predictFinished', str(predictions))

start()
sio.wait()