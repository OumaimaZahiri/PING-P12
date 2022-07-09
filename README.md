# PING-P12

============================ dicomScript.py ============================
Crée une banque d'images .png organisées en dossiers :
Organes > Scans > IA.Experts > Type de dynamique > .png
------------------------------------------------------------------------
Le script s'éxécute sur le dossier comportant les dossiers de scans. Les
scans doivent eux contenir les fichiers CT et RT.
------------------------------------------------------------------------
Plusieurs paramètres sont modifiables dans la section "PARAMETERS" :
> dicomFolder : dossier contenant les dossiers de scans.
> destinationFolder : chemin de la banque d'image créée.
> activateWindowLevel : activer ou non les paramètres Window et Level de
l'image créée. (True : activer | False : désactiver).
> window : paramètre Window de l'image (si activateWindowLevel = True).
	os : 1800	poumon : 1500
> level : paramètre Level de l'image (si activateWindowLevel = True).
	os : 400	poumon : -600
> folderJPGName : nom donné au dossier contenant les images .png.
------------------------------------------------------------------------
Tous les dossiers doivent être créés en amont.
Le script doit être relancé pour chaque type d'image (chaque dynamique
Window et Level).
Modules python nécessaires : pydicom, numpy, bresenham, matplot.
========================================================================


============================ fillDatabase.py ============================
Rempli les tables 'contour' et 'organ' de la base de données MySQL à
partir de la banque d'image créée par le script dicomScript.py.
Celui-ci doit avoir été préalablement exécuté.
------------------------------------------------------------------------
Le script s'exécute sur le dossier comportant la banque d'images.
Le choix du dossier est modifiable dans la section "PARAMETERS" :
contourFolder.
------------------------------------------------------------------------
Modules python nécessaires : pydicom, MySQL Connector.
========================================================================

ENGLISH VERSION

============================ dicomScript.py ============================
Creates a bank of .png images organized in folders:
Organs > Scans > AI.Experts > Dynamic Type > .png
------------------------------------------------------------------------
The script runs on the folder containing the scans folders. The
scans must contain the CT and RT files.
------------------------------------------------------------------------
Several parameters can be modified in the "PARAMETERS" section:
> dicomFolder : folder containing the scans folders.
> destinationFolder : path of the created image bank.
> activateWindowLevel : activate or not the Window and Level parameters
of the created image. (True : enable | False : disable).
> window : Window parameter of the image (if activateWindowLevel = True).
	bone : 1800 lung : 1500
> level : Level parameter of the image (if activateWindowLevel = True).
	bone: 400   lung: -600
> folderJPGName: name given to the folder containing the .png images.
------------------------------------------------------------------------
All folders must be created in advance.
The script must be restarted for each type of image (each dynamic
Window and Level).
Python modules needed: pydicom, numpy, bresenham, matplot.
========================================================================


============================ fillDatabase.py ============================
Fill the 'contour' and 'organ' tables of the MySQL database from the
image database created by the dicomScript.py script.
This script must have been executed in advance.
------------------------------------------------------------------------
The script runs on the folder containing the image bank.
The choice of the folder can be modified in the "PARAMETERS" section:
contourFolder.
------------------------------------------------------------------------
Python modules needed: pydicom, MySQL Connector.
========================================================================
