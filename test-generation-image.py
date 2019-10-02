import requests 

lat = "20.750307"
lng = "-104.999472"

# map url
url = "https://www.mapquestapi.com/staticmap/v4/getmap?key=BOAoNFrTV3l99MNtU8s0cYnAd5UWQeO4&size=600,600&type=sat&imagetype=jpg&zoom=18&scalebar=false&traffic=false&center="+ lat +","+ lng +"&xis=https://s.aolcdn.com/os/mapquest/yogi/icons/poi-active.png,1,c,40.015831,-105.27927&ellipse=fill:0x70ff0000|color:0xff0000|width:2|40.00,-105.25,40.04,-105.30"
r = requests.get(url) 
f = open('address of the file location ', 'wb') 
f.write(r.content) 
f.close() 