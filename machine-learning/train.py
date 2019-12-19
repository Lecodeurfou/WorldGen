# ------------------------------
# Import lib
#-------------------------------
import warnings
warnings.filterwarnings('ignore')

import keras
from keras import models, layers
from keras.preprocessing.image import ImageDataGenerator
from keras.callbacks import ModelCheckpoint
from keras.applications import resnet50, MobileNetV2
from keras.models import load_model
import numpy as np
from PIL import Image
from skimage import transform


# ------------------------------
# Split data set (80 / 20)
#-------------------------------

# split_folders.ratio('./fournis/EuroSAT/2750', output="output", seed=1337, ratio=(.8, .1, .1))
# exit()


# --------------------------------
# Load Pré trained model
#---------------------------------
img_shape = (64, 64, 3)
# initialModel = MobileNetV2(weights='imagenet', include_top = False, input_shape = img_shape)
# initialModel.summary()
initialModel = resnet50.ResNet50(weights='imagenet', include_top = False, input_shape = img_shape)
initialModel.summary()


# --------------------------------
# Add last layers
#---------------------------------

model = models.Sequential()

model.add(initialModel)

#All layers must not trainable
for layer in model.layers:
    layer.trainable = False

#Add new layers
model.add(layers.Flatten())
model.add(layers.Dense(1024, activation='relu'))
model.add(layers.Dropout(0.5))
model.add(layers.Dense(10, activation='softmax'))

model.summary()



# --------------------------------
# Fit images to CNN
#---------------------------------

# Train data set
trainDataGenerator = ImageDataGenerator(
    rescale = 1./255,
    shear_range = 0.2,
    zoom_range = 0.2
)

trainDataSet = trainDataGenerator.flow_from_directory(
   'output/train/',
    target_size=(64,64),
    batch_size = 32,
    color_mode = 'rgb',
    class_mode = 'categorical',
    shuffle = True
)

# Test data set
testDataGenerator = ImageDataGenerator(rescale = 1./255)

testDataSet = testDataGenerator.flow_from_directory(
        'output/test',
        target_size = (64,64),
        batch_size = 32,
        color_mode = 'rgb',
        class_mode = 'categorical', 
)


# --------------------------------
# Train
#---------------------------------

# Compile model
model.compile(
    loss = 'categorical_crossentropy',
    optimizer = 'rmsprop',
    metrics = ['accuracy']
)

# Checkpoints
path = "weights.hdf5"
checkpoint = ModelCheckpoint(path, monitor = 'val_accuracy', verbose = 1, save_best_only = True, mode = 'max')
callbacks_list = [checkpoint]

# Train
stepPerEpochs = trainDataSet.samples/32

model.fit_generator(
    trainDataSet,
    steps_per_epoch = stepPerEpochs,
    epochs = 10,
    callbacks = callbacks_list,
    validation_data = testDataSet,
    validation_steps = stepPerEpochs
)


# --------------------------------
# Tests
#---------------------------------

def loadImage(filename):
   np_image = Image.open(filename)
   np_image = np.array(np_image).astype('float32')/255
   np_image = transform.resize(np_image, (64, 64, 3))
   np_image = np.expand_dims(np_image, axis=0)

   return np_image

modelTest = load_model("weights.hdf5")

image = loadImage('output/test/Industrial/Industrial_190.jpg')
result = modelTest.predict_classes(image)

print(result)