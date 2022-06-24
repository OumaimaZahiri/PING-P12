import mysql.connector as mc
import os
import pydicom as pd
from pydicom import dcmread

try:
    ## Database connection ##
    connector = mc.connect(host = 'localhost', database = 'contour_evaluation', user = 'root', password = '')
    cursor = connector.cursor()

    ## Folders ##
    contoursFolder = './Dicom_Files/Contours/'
    scansFolder = './Dicom_Files/Scans/'

    ## Fill "organ" table ##
    organList = os.listdir(contoursFolder)

    # INSERT Request
    for organ in organList:
        request = "INSERT INTO `organ` (`name`) VALUES ('" + organ + "')"
        cursor.execute(request)


    ## Fill "contour" table ##
    organList = os.listdir(contoursFolder)

    # Create dictionnary in order to fill id_organ
    request = "SELECT `id_organ` FROM organ"
    cursor.execute(request)
    idOrganList = [item[0] for item in cursor.fetchall()]
    # print(idOrganList)

    request = "SELECT `name` FROM organ"
    cursor.execute(request)
    nameList = [item[0] for item in cursor.fetchall()]
    # print(nameList)

    dictOrgan = dict(zip(nameList, idOrganList))
    # print(dictOrgan)

    # Define a dictionnary in order to fill is_handcrafted
    # 1 : handcrafted
    # 0 : AI
    dictHandcrafted = {"Limbus AI Inc.": "0", "TheraPanacea": "1"}

    # INSERT Request
    for organ in organList:

        scanList = os.listdir(contoursFolder + organ + '/')

        for scan in scanList:

            rtStructList = os.listdir(contoursFolder + organ + '/' + scan + '/')

            for rtStruct in rtStructList:

                # Build paths
                contourPath = contoursFolder + organ + '/' + scan + '/' + rtStruct
                contourScanPath = scansFolder + scan + '/'

                # Take information in RT_Struct
                ds = dcmread(contourPath)
                isHandCrafted = dictHandcrafted[ds.Manufacturer]
                ctName = "CT_" + ds.ReferencedFrameOfReferenceSequence[0].RTReferencedStudySequence[0].ReferencedSOPInstanceUID[:-2]
                ctFirstItem = ds.ROIContourSequence[0].ContourSequence[-1].ContourImageSequence[0].ReferencedSOPInstanceUID.rsplit('.')[-1]
                ctLastItem = ds.ROIContourSequence[0].ContourSequence[0].ContourImageSequence[0].ReferencedSOPInstanceUID.rsplit('.')[-1]

                # INSERT Request
                request = "INSERT INTO `contour` (`path`, `scan_path`, `id_organ`, `is_handcrafted`, `ct_root`, `ct_first_item`, `ct_last_item`) VALUES ('" + contourPath + "', '" + contourScanPath + "', '" + str(dictOrgan[organ]) + "', '" + isHandCrafted + "', '" + ctName + "', '" + ctFirstItem + "', '" + ctLastItem + "')"
                cursor.execute(request)

    # Apply changes
    connector.commit()

except mc.Error as err:
    print(err)

finally:
    if(connector.is_connected()):
        cursor.close()
        connector.close()