import sys, json, numpy as np
import json
import random

def generateRandomWorld():
    arr = []
    min = -5
    max = 5

    for i in range(6): 
        arr = arr + [{
            "file": 'models/shop.glb' if i % 2 == 0 else 'models/building2.glb',
            "z" : random.random() * (max - min) + min,
            "y": 1,
            "x": random.random() * (max - min) + min,

        }]

    return arr

def main():

    #geoDatas = sys.argv[1]

    arr = generateRandomWorld()
    serialized= json.dumps(arr, sort_keys=False, indent=3)
    print(serialized)
    sys.stdout.flush()

if __name__ == '__main__':
    main()