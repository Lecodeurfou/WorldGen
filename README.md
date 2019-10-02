# WorldGen
<h1>[M2ISE2019] Master informatique 2ème année 2019-2020</h1>

<h2>Générateur d’un monde 3d à partir de données Google map</h2>

Conception d’une application permettant de générer un monde 3d à partir d’une adresse. Plus globalement, l’idée est de transformer le rendu 2d des tuiles google map en 3d. Il faut donc développer le programme, permettant d’analyser une image aérienne, d’en déduire les objets présents (arbres, habitations, véhicules ..), et de construire un monde 3d à partir de ces interprétations. 


<h3>Utilisation</h3>
<ul>
	<li>L’utilisateur pose un POI sur une map</li>
	<li>L’application affiche le rendu 3d correspondant.</li>
	<li>L’utilisateur peut orienter son point de vue dans le monde</li>
</ul>

<h3>Les technologies utilisées</h3>
<ul>
	<li>Api google map</li>
	<li>TensorFlow + Keras</li>
	<li>WebGL (tree.js)</li>
	<li>Websocket</li>
</ul>

<h3>Les composants du programme</h3>
<ol>
	<li>Récupération de la latitude et longitude du POI</li>
	<li>Récupération d’une image 2d correspondant à un périmètre autour du point</li>
	<li>Analyse de l’image pour identifier les objets présents et leur position</li>
	<li>Récupération de ces données et mise en correspondance avec notre bibliothèque d’asset 3d</li>
	<li>Génération de l'environnement 3d</li>
	<li>Export de 8 vues jpg</li>
	<li>Envoie des vues via websocket</li>
</ol>


<h3>Modèle de donnée</h3>
Serveur vers l’application
{"lat" : 48.9465246,  “lng” : 2.3106941}


<h3>Détails d’implémentations</h3>

<b>Web socket</b>
Mise en place d’un protocole Websocket, protocole émettant une demande de connexion lorsque celle-ci est acceptée, la connexion est établie et persistante, elle autorise alors la transmission de message bi-directionnels c’est à dire en émission comme en réception. Cette connexion reste ouverte jusqu’à ce qu’un des protagoniste décide de la clore.
 

<b>Récupération d’une image satellite à partir de données géolocalisées</b>
Une fois les données GPS récupérées sur notre machine, nous utiliserons l’api google map (The Maps JavaScript API V3) pour générer image aérienne dont le périmètre est à définir. 


<b>Machine learning (apprentissage supervisé)</b>
<ul>
	<li>Technologies : TensorFlow + Keras</li>
	<li>Création du corpus à l’aide de data-set existants :  Earth Engine API, https://www.kaggle.com</li>
	<li>Element de recherche : 
		<ul>
			<li>Eléments naturels: végétation, forêts, prairies, cours d’eau, mer, rivières, fleuves.</li>
			<li>Infrastructures: immeubles, maisons, ponts </li>
			<li>Véhicules : voitures, camions, bateaux</li>
		</ul>
	
</ul>
			
<b>Rendu 3D</b><br>
Technologies: WebGL
En fonction de l’étude de l’image satellite, les éléments détectés par l’algorithme seront placés fidèlement en accord avec la disponibilité des modèles présent dans la bibliothèque. Des jeux/sets complémentaires seront possiblement additionnables (mondes alternatifs).  



<ul> <li> Schema de fonctionnement </li> </ul>

<img src="https://github.com/Lecodeurfou/WorldGen/blob/master/Schema_fonctionnement.jpg" />

<ul> <li> Diagramme de Gantt </li> </ul>

<img src="https://github.com/Lecodeurfou/WorldGen/blob/master/WorldGen_Diagramme_Gantt.png" />

