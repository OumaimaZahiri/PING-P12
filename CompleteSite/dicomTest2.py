import pydicom as pd
from pydicom import dcmread
import matplotlib.pyplot as plt
import numpy as np



def load_data(sample):
    data=dict()
    # dcms data
    dcms_data=dict()
    ds = pd.dcmread(sample['dcm_files'])  # Traverser les données lues
    array = ds.pixel_array
    origin = ds.ImagePositionPatient  # La position de l'origine de la grille dans le système de coordonnées mondiales.
    spacing = ds.PixelSpacing  # Intervalle d'échantillonnage
    uid = ds.SOPInstanceUID
    dcms_data[uid] = {'dcmSpacing': spacing, 'dcmOrigin': origin, 'array': array}
    data['dcms_data']=dcms_data

    # rt data
    rt_data = dict()  # Retourne les résultats sous forme de {RUID:label_data}.
    ds = pd.dcmread(sample['rt_file'])
    ruid = ds.ROIContourSequence[0].ContourSequence[1].ContourImageSequence[0].ReferencedSOPInstanceUID
    array = ds.ROIContourSequence[0].ContourSequence[1].ContourData
    num = ds.ROIContourSequence[0].ContourSequence[1].NumberOfContourPoints
    rt_data[ruid] = {'pointNumber': num, 'array': array}
    data['rt_data']=rt_data
    # Résultats du retour
    return data

def convert_global_aix_to_net_pos(data):
    point_data = {}  # Retourner les coordonnées {uid:data}
    for uid, value in data['rt_data'].items():
        num = value['pointNumber']
        label_data = value['array']
        dcm_origin = data['dcms_data'][uid]['dcmOrigin']
        dcm_spacing = data['dcms_data'][uid]['dcmSpacing']

        point = []  # Coordonnées [(x1,y1),(...) ,...]
        for i in range(0,num,3):
            x = label_data[i]  # Système de coordonnées mondiales du contour
            y = label_data[i + 1]
            X = int((float(x) - float(dcm_origin[0])) / float(dcm_spacing[0]))  # Coordonnée X du contour
            Y = int((float(y) - float(dcm_origin[1])) / float(dcm_spacing[1]))  # Coordonnée Y du profil
            point.append((X, Y))
        point_data[uid] = point
    return point_data

ctPath = 'D:\Télécom\FISE\Semestre 8\PING-P12\Initial_Files\CT+2RTS\$$$38200460_1.2.840.113704.7.1.0.672206377134184.1648538072.1\CT_1.2.840.113704.7.1.0.672206377134184.1648538074.245.dcm'
rtPath = 'D:\Télécom\FISE\Semestre 8\PING-P12\Initial_Files\CT+2RTS\$$$38200460_1.2.840.113704.7.1.0.672206377134184.1648538072.1\RTSTRUCT_1.2.276.0.7230010.3.1.4.346818816.1878.1648539627.475662.dcm'


dictDicomFiles = {"dcm_files" : ctPath, "rt_file" : rtPath}

data = load_data(dictDicomFiles)
dataPoint = convert_global_aix_to_net_pos(data)
listDataPoint = list(dataPoint['1.2.840.113704.7.1.0.672206377134184.1648538074.245'])

imgRGB = np.zeros([512, 512, 3], dtype=np.uint8)

ds = dcmread(ctPath)
img = ds.pixel_array
# print("min : ", np.min(img),"max : ", np.max(img))
imgRGB[:,:,0] = (img + 300) / 10
imgRGB[:,:,1] = (img + 300) / 10
imgRGB[:,:,2] = (img + 300) / 10

ds = dcmread(rtPath)
array = np.array(ds.ROIContourSequence[0].ContourSequence[247].ContourData).astype(int)
splitArray = np.reshape(array, (int(len(array)/3),3))
print(splitArray)

R = 255
G = 0
B = 255

for point in listDataPoint:
    x = point[1]
    y = point[0]
    imgRGB[x][y][0] = R
    imgRGB[x][y][1] = G
    imgRGB[x][y][2] = B

plt.imshow(imgRGB)
plt.axis('off')
plt.savefig('./test' ,bbox_inches='tight', pad_inches=0, dpi=138.7)

