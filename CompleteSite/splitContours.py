import pydicom as pd
from pydicom import dcmread
import os 

# Paths
initialFolder = './Initial_Files/CT+2RTS/'
destinationFolder = './'

# Folder management
foldersList = os.listdir(initialFolder)
for f in foldersList:
    os.makedirs(destinationFolder + f)
    for file in os.listdir(initialFolder + f):
        if file[:2] != "CT":

            os.makedirs(destinationFolder + f + '/' + file)

            # Dicom extraction
            ds = dcmread(initialFolder + f + '/' + file)
            nbContours = len(ds.StructureSetROISequence)

            i = 0
            while i < nbContours:

                dstemp = dcmread(initialFolder + f + '/' + file)

                tempStructureSetROISequence = dstemp.StructureSetROISequence[i]
                tempROIContourSequence = dstemp.ROIContourSequence[i]
                tempRTROIObservationsSequence = dstemp.RTROIObservationsSequence[i]
                j = 0
                while j < nbContours:
                    del dstemp.StructureSetROISequence[0]
                    del dstemp.ROIContourSequence[0]
                    del dstemp.RTROIObservationsSequence[0]
                    j = j + 1
                dstemp.StructureSetROISequence.append(tempStructureSetROISequence)
                dstemp.ROIContourSequence.append(tempROIContourSequence)
                dstemp.RTROIObservationsSequence.append(tempRTROIObservationsSequence)

                fileName = dstemp.StructureSetROISequence[0].ROIName
                dstemp.save_as(destinationFolder + f + '/' + file + '/RTStruct_' + fileName + '.dcm')
                i = i + 1