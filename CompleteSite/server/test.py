import cv2
import sys
import json
import codecs

im = cv2.imread(sys.argv[1],cv2.IMREAD_UNCHANGED)
img_rgb = cv2.cvtColor(im, cv2.COLOR_BGRA2RGBA)
print(img_rgb.shape)
file_path = "outline.json"
json.dump(img_rgb.tolist(),codecs.open(file_path, 'w', encoding='utf-8'), separators=(',', ':'), sort_keys=True, indent=4)
