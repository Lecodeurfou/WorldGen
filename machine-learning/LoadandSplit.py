from PIL import Image
import requests

baseUri = ''

def save_imagen(geolocD):
    sesion = requests.Session()
    url = "https://www.mapquestapi.com/staticmap/v4/getmap?key=BOAoNFrTV3l99MNtU8s0cYnAd5UWQeO4&size=192,192&type=sat&imagetype=jpg&zoom=13&scalebar=false&traffic=false&center="+geolocD+"&xis=https://s.aolcdn.com/os/mapquest/yogi/icons/poi-active.png,1,c,40.015831,-105.27927&ellipse=fill:0x70ff0000|color:0x000000|width:2|40.00,-105.25,40.04,-105.30"
    r = sesion.get(url)
    f = open(baseUri + 'mq.jpg','wb')
    f.write(r.content)
    f.close()

def splitImage(geolocD):
    save_imagen(geolocD)
    im = Image.open(baseUri + 'mq.jpg')
    i = 0
    for x in range(0, 192, 64):
        for y in range(0, 192, 64):
            imgC = im.crop((x, y, x + 64, y + 64)) 
            imgC.save(baseUri + "test" + str(i) + ".png")
            i = i + 1