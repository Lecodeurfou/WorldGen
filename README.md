# WorldGen
[M2ISE2019] Master informatique 2ème année 2019-2020

Générateur d’un monde 3d à partir de données Google map


Conception d’une application permettant de générer un monde 3d à partir d’une adresse. Plus globalement, l’idée est de transformer le rendu 2d des tuiles google map en 3d. Il faut donc développer le programme, permettant d’analyser une image aérienne, d’en déduire les objets présents (arbre, habitation, véhicules ..), et de construire un monde 3d à partir de ces interprétations. 


Utilisation
L’utilisateur pose POI sur une map
L’application affiche le rendu 3d correspondant.
L’utilisateur peut orienter son point de vue dans le monde

Les technologies utilisées
Api google map
TensorFlow (Keras ?)
WebGL (tree.js, )
Websocket

Les composants du programme
Récupération de la latitude et longitude du POI
Récupération d’une image 2d correspondant à un périmètre autour du point (à définir)
Analyse de l’image pour identifier les objets présents et leur position
Récupération de ces données et mise en correspondance avec notre bibliothèque d’asset 3d
Génération de l'environnement  3d
Export de 8 vues jpg
Envoie des vues via websocket


Modèle de donnée

Serveur vers l’application
{“lat” : 48.9465246,  “lng” : 2.3106941}

Application vers serveur
{}




Détails d’implémentations

Web socket :
Mise en place d’un protocole Websocket, protocole émettant une demande de connexion lorsque celle-ci est accepté la connexion est établie et persistante, elle autorise alors la transmission de message bi-directionnels c’est à dire en émission comme en réception. Cette connexion reste ouverte jusqu’à ce qu’un des protagoniste décide de la clore.
 
 

Récupération d’une image satellite à partir de données géolocalisées : 
Une fois les données GPS récupérées sur notre machine, nous utiliserons l’api google map (The Maps JavaScript API V3) pour générer image aérienne dont le périmètre est à définir. 


Machine learning (apprentissage supervisé)
- Technologies : TensorFlow, Keras
- Création du corpus à l’aide de data-set existants :  Earth Engine API, https://www.kaggle.com
- Element de recherche :
Eléments naturels:
	Végétation
		Forêts,
		Prairies
		...
	Cours d’eau
		Mer
		Rivières
		Fleuves
		…
Infrastructures
Immeubles
	Ponts

Véhicules
Voitures
	Camion
	….
….
			
Rendu 3D
Technologies: fichiers 3D
En fonction de l’étude de l’image satellite, les éléments détectés par l’algorithme seront placés fidèlement en accord avec la disponibilité des modèles présent dans la bibliothèque. Des jeux/sets complémentaires seront possiblement additionnables (mondes alternatifs).  


Envoi du résultat au serveur
...
