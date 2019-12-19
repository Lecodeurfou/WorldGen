# WorldGen
<h1>[M2ISE2019] Master informatique 2ème année 2019-2020</h1>

<h2>Générateur d’un monde 3d à partir de points geolocalisées</h2>

L’objectif de ce projet est la réalisation d’une application permettant de générer un monde 3d à partir d’une adresse. L’idée est de transformer le rendu 2d des tuiles google map en monde 3d. Il faut donc développer le programme, permettant d’analyser une image aérienne, de prédire la nature des zones de l’image, et de générer le rendu 3d à partir de ces interprétations.



<h3>Utilisation</h3>
<ul>
	<li>Lancer le serveur node.js : node start.js</li>
	<li>Lancer le script de prédiction : python3 machine_learning/main.py</li>
	<li>Se rendre à l'url : http://localhost:8080/client-test</li>
	<li>Se rendre à l'url : http://localhost:8080/3d-generator</li>
</ul>

<h3>Les technologies utilisées</h3>
<ul>
	<li>API MapQuest</li>
	<li>TensorFlow + Keras</li>
	<li>WebGL (tree.js)</li>
	<li>Websocket</li>
	<li>Node.js + express.js</li>
</ul>

<h3>Les composants du programme</h3>
<ol>
	<li>Récupération de la latitude et longitude du POI</li>
	<li>Récupération d’une image 2d correspondant à un périmètre autour du point</li>
	<li>Analyse de l’image pour identifier les zones présentes</li>
	<li>Récupération de ces données</li>
	<li>Génération de l'environnement 3d</li>
</ol>


<h3>Modèle de donnée</h3>
Serveur vers l’application
{"lat" : 48.9465246,  “lng” : 2.3106941}


<h3>Détails d’implémentations</h3>

L’application est décomposée en 4 modules, communiquants à travers websocket. Chacun envoie ses données via la fonction emit() de websocket, et possède ses propres méthodes à exécuter lors de la réception d’un message : 

<b>Schema de fonctionnement</b><br>

<img src="https://github.com/Lecodeurfou/WorldGen/blob/master/archi.jpg" />

<b>Clients.js</b><br>

Envoie  les données géolocalisées au serveur sous la forme suivante : 
{lat: '48.9152512', lng:'2.7869184'}

<b>Serveur.js</b><br>

Il s’agit d’un serveur HTTP en  node.js avec le module socket.io. Il centralise les messages émis, fait la demande de prédiction, et envoie le résultat au fichier js qui génère le monde. Le serveur sert également à délivrer les différentes pages html et ressources associées.


<b>Predict.py</b><br>

Ce module commence par récupérer, à partir des données géolocalisées, une image satellite via L’API mapQuest. Une  fois l’image récupérée, il la divise en un set d’images de plus petites taille, 64 * 64px. Par exemple pour une image de 192 *194 nous aurons 9 vignettes. Une fois cette étape réalisée, le modèle de prédiction est chargé, une seule fois pendant la durée d’exécution de l’application, pour des raisons évidentes de performance. Enfin les images sont passées une par une au modèle, qui retourne l’indice de la classe d’appartenance. Une fois toutes les images traitées, le module retourne au serveur un tableau de prédiction de ce type : [2,3,5,3,2,5,3,7,5]


<b>GenerateWorld.js</b><br>

Le module utilise la librairie Three.js pour le rendu 3d. A partir du tableau de prédictions fourni par le serveur, le système ajoute un terrain divisé en cases de dimension n*n, n étant  le nombre de zones à générer. On ajoute donc sur chacunes de ces cases un ensemble d’objets 3d représentant le zone prédite. Enfin, le module retourne au serveur, une image en base64 du rendu, qui sera par la suite acheminée vers le client.


<h3>Diagramme de Gantt</h3>

<img src="https://github.com/Lecodeurfou/WorldGen/blob/master/WorldGen_Diagramme_Gantt_version2.png" />

