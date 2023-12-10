# Smart home system

![](https://img.shields.io/github/v/release/martinvichnal/smart-home)
![](https://img.shields.io/github/last-commit/martinvichnal/smart-home)
![](https://img.shields.io/github/issues/martinvichnal/smart-home)

---

# Introduction

This is the repository of my custom built smart home system.
This system is a dynamically changeable smart home system built with React TypeScript, firabase and ESP32 devices.

-   _Feel free to **improve, use or fork** this repository in your own projects :)_
-   _For any bugs or improvements feel free to make an [issue](https://github.com/martinvichnal/pomodoro/issues) or make a [pull request](https://github.com/martinvichnal/pomodoro/pulls)_

---

# Table of Contents

- [Smart home system](#smart-home-system)
- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Projektmunka 1 - Vichnál Martin WSOVK8](#projektmunka-1---vichnál-martin-wsovk8)
- [Bevezetés](#bevezetés)
- [Specifikáció](#specifikáció)
- [Logikai rendszerterv](#logikai-rendszerterv)
   * [A Rendszer logikai kapcsolatai](#a-rendszer-logikai-kapcsolatai)
      + [Rendszer szintű logikai összefüggés](#rendszer-szint-logikai-összefüggés)
      + [Adat útvonalának logikai diagramja](#adat-útvonalának-logikai-diagramja)
      + [NodeJS webszerverek](#nodejs-webszerverek)
   * [Webapp](#webapp)
   * [IoT eszköz](#iot-eszköz)
- [Fizikai rendszerterv](#fizikai-rendszerterv)
   * [ESP32 mint IoT eszköz](#esp32-mint-iot-eszköz)
- [Webapp](#webapp-1)
   * [Dinamikus renderelés](#dinamikus-renderelés)
      + [<DeviceBox />](#)
   * [Értékváltoztatás](#értékváltoztatás)
   * [Inicializálás](#inicializálás)
- [IoT eszköz](#iot-eszköz-1)
   * [SmartHome könyvtár](#smarthome-könyvtár)
      + [Működése könyvtáron belül:](#mködése-könyvtáron-belül)
      + [SmartHome Class](#smarthome-class)
      + [Adatbáziskezelő funkciók](#adatbáziskezel-funkciók)
      + [WebSocket kezelő funkciók](#websocket-kezel-funkciók)
      + [Variable Class](#variable-class)
      + [Működése felhasználói szemszögből:](#mködése-felhasználói-szemszögbl)
   * [Demó Projekt](#demó-projekt)
- [Szerverek](#szerverek)
   * [NGINX webszerver](#nginx-webszerver)
   * [API Szerver](#api-szerver)
      + [REST API](#rest-api)
      + [Adatbázis](#adatbázis)
      + [Felhasználói adattábla](#felhasználói-adattábla)
      + [Eszközök adattáblája](#eszközök-adattáblája)
   * [WebSocket szerver](#websocket-szerver)
   * [Átviteli sebesség](#átviteli-sebesség)
- [További fejlesztési lehetőségek](#további-fejlesztési-lehetségek)
- [Összefoglalás](#összefoglalás)
- [Forrás](#forrás)
- [Acknowledgements / Source](#acknowledgements--source)

---


[<img src="https://github.com/martinvichnal/smart-home/blob/main/doc/Color-codes.png"/>](https://github.com/martinvichnal/smart-home/blob/main/doc/Color-codes.png)

[<img src="https://github.com/martinvichnal/smart-home/blob/main/doc/System-Diagram.png"/>](https://github.com/martinvichnal/smart-home/blob/main/doc/System-Diagram.png)

[<img src="https://github.com/martinvichnal/smart-home/blob/main/doc/IoT-Devices-Diagram.png"/>](https://github.com/martinvichnal/smart-home/blob/main/doc/IoT-Devices-Diagram.png)

[<img src="https://github.com/martinvichnal/smart-home/blob/main/doc/Webapp-Diagram.png"/>](https://github.com/martinvichnal/smart-home/blob/main/doc/Webapp-Diagram.png)

[<img src="https://github.com/martinvichnal/smart-home/blob/main/doc/Data-flow.png"/>](https://github.com/martinvichnal/smart-home/blob/main/doc/Data-flow.png)

# Projektmunka 1 - Vichnál Martin WSOVK8

# Bevezetés

A modern világ szinte elképzelhetetlen okos eszközök nélkül hiszen, ezek egy olyan plusz kényelmi funkciót látnak el életünkben, amit az emberek nem szívesen hagynak el. Az okos rendszerek nem csak szimpla kényelmi extrák a háztartásban, hanem kulcsfontosságú eszközök a modern iparban is. Számtalan gyártási területen lehet beiktatni és automatizálni a legolcsóbb eszközökkel is.

Fő célom, hogy egy dinamikusan változtatható, okos környezetet teremtsek meg, ami akár mobilról és legfőképpen a világ túlsó oldaláról is elérhető legyen.

A rendszer dinamikussága alatt azt értem, hogy a felhasználó kedve és igénye szerint definiálhatja, hogy milyen adatokat, változókat kössön a saját IoT eszközére, és ezek hogyan jelenjenek meg a felhasználói felületen.

# Specifikáció

Az elképzelésem ezzel a projekttel a következők:

- Szükségem lesz egy **Webapplikációra**, ami lehetővé teszi azt, hogy a közönséges hétköznapi felhasználó valahogyan irányítani tudja az okos eszközét. Erre a feladatra a *NextJS* (NextJS, ) fejlesztői környezetet fogom alkalmazni, ami egy *React* (React) nevű webfejlesztési könyvtár alapjául lett felépítve. Ez mind *JavaScript* programozási nyelven fog megtörténni.
- **IoT** eszközként az **ESP32** mikrokontrollert fogom használni, mivel ez gyárilag el van látva egy wifi modullal, amely biztosítja a vezeték nélküli kapcsolatot, valamint nagyon gyors is, és ezért könnyedén tudja futtatni majd a **saját készítésű könyvtáramat**, amit az ESP32-es modulokra fogok szabni. Mindezt az IoT eszközhöz kapcsolandó alprojektet *C++* programozási nyelven, illetve az *Arduino* (Arduino, ) könyvtár segítségével fogom megírni. A projekt egésze a *PlatformIO* (PlatformIO) nevű fejlesztői eszköz/környezeten belül lesz írva. Mint demó eszköz, erre a mikrokontrollerre pár elektronikai szenzort és eszközt is rá fogok tenni, hogy demonstráljam mire lesz képes a rendszer. Ezek a kiegészítők a következők: **DHT11** (DHT11, ) (hőmérséklet és páratartalom szenzor), közönséges *nyomógomb* (ami az okos kapcsolót imitálja) és több fajta **LED** típus (okos lámpákat fogja imitálni).
- A rendszer tervezése és megépítése alatt azt is figyelembe fogom venni, hogy akár több millió eszköz és felhasználó is egyidejűleg terhelheti majd meg, ezért az egész rendszert *méretezhetővé* fogom tenni. Ennek megvalósításában elsősorban a **Kubernetes** (Kubernetes, ) nevű szolgáltatás fog segíteni, ami egy konténer alapú rendszerkezelő szoftver, amellyel automatizálható az alkalmazások telepítése, skálázása és menedzselése. Azonban ez a szolgáltatás igen drága és bonyolult ilyen kis méretű projektekben, ezért a fejlesztés alatt egy **Docker** (Docker, ) nevű alkalmazás és szolgáltatás segítségével fogom konténerekbe rendszerezni, és saját hálózaton futtatni ezeket. Az összes modult egy **NGINX** (NGINX, ) reverse proxy webszerver fogja összetartani, ami a modulok, részegységek közti kommunikációt biztosítja.
- Adatok tárolása érdekében **MSSQL** (Microsoft SQL, ) relációs adatbázis rendszerét fogom használni.
- Végül különböző szolgáltatások, azaz **Web Szerverek** kiépítésére is szükség lesz, mivel az eszközök közti kommunikáció is nagyon fontos. Ennek érdekében kettő darab web szervert fogok kiépíteni. Az egyik szerver egy **adatbáziskezelő REST API** lesz, ami kapcsolatot teremt az adatbázisom és az eszköz között HTTP (HTTP Protocol, ) protokoll segítségével. A másik szerver a **WebScoket** szerverem lesz, ami a fő **kommunikációt** fogja fenntartani. A *WebSocket* (WebSocket, ) nevű protokoll segítségével fog megtörténni annak érdekében, hogy az eszközök közötti kommunikáció válaszideje a lehető legminimálisabb késleltetési idővel érkezzen meg. Ezeket a szervereket **NodeJS** (NodeJS, ) környezetben fogom megírni *JavaScript* programozási nyelven.

# Logikai rendszerterv

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image1.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image1.png)

Előszónak a logikai rendszertervekről: Előszeretettel használtam kapcsolási diagramokat, mivel könnyen és átláthatóan meg lehet vizsgálni, hogy egyes elemek, modulok a rendszerben hogyan kapcsolódnak egymáshoz. Az összes diagram, ami ebben a dokumentációban megtalálható, el lett látva egységes és globális színkóddal, amiknek a jelentésük az alábbi képen látható:

## A Rendszer logikai kapcsolatai

### Rendszer szintű logikai összefüggés

Az alábbi képen látható a teljes rendszer szoftver oldali diagramja:

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image2.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image2.png)

A rendszert úgy alakítottam ki, hogy több szétválasztható modulokból épüljön fel, mivel a rendszer főbb tulajdonsága az, hogy méretezhető és munkafolyamatmegosztó.

A rendszerben négy fő rész található meg: Webapp, IoT eszközök, ami esetemben ESP32 mikrokontrollerek, NodeJS szerverek és egy SQL adatbázis. Ezeket mind a későbbi fejezetekben fogom részletesen elemezni.

A különböző modulok kapcsolatai igen intuitívak és középpontban egy NGINX szerver fogja összekötni őket.

A rendszert elsősorban Kubernetes rendszerkörnyezetre tervezem, ami egy kiváló platform erre a fajta projektre.

A modulok között két fajta kommunikációs protokoll létezik: Egy egyszerű HTTP protokoll alapú API szerver, ami a kliens és az adatbázis közti kommunikációt szolgálja ki, valamint egy WebScoket TCP protokoll alapú szerver, ami a kliensek közti duplex kommunikáció fenntartására szolgál.

### Adat útvonalának logikai diagramja

Az adatok egyes útvonalainak diagramja a következő képen látható:

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image3.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image3.png)

A feldolgozandó adatok a rendszeremben 2 féle útvonalon mehetnek. Webappból az IoT okoseszközre és fordítva. Nem teljesen ugyan olyan az adatút mind két esetben, mivel más funkciói vannak a két software elemnek *(webapp és az IoT két teljesen más fejlesztői környezetben van megírva)*

A bal oldali flow diagramon az látható, hogy az adat mindenféleképpen[1](about:blank#fn1) egy HTML kódrész változásával kezdődik.

Ugyanez elmondható a jobb oldalon látható diagramról, de itt nem egy kódrész indítja el az adat útját, hanem általában egy megváltozó fizikai hardware I/O láb vagy egy változó.

### NodeJS webszerverek

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image4.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image4.png)

A következő diagramon lehet megvizsgálni a teljes rendszer szerverfelépítését:

Az összes szerverem közvetlen kapcsolatban van egymással, ami azt jelenti, hogy a Kubernetes szerveren belül tudnak kommunikálni, ami abban nagyon előnyös, hogy a kettő közti kommunikációját nem lehet külső szemléletből látni, ezáltal a rendszer biztonságosabb lesz.

Az SQL szervert csak az API szerver látja. Ezen keresztül lehet kapcsolatot létesíteni.

**Végül kapcsolatban van még az NGINX szerverrel is.**

## Webapp

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image5.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image5.png)

A webapp logikai felépítése igencsak egyszerű. Kettő darab modult tartalmaz, a frontendet és a NextJS által hostolt backendet. A fronted a weboldal megjelenítői felületét szolgálja, miközben a backend végzi az apróbb háttér feladatokat, mint például adatokat kér le a szerverről vagy adatokat dolgoz fel. Ezek ketten szoros kapcsolatban vannak.

Kapcsolatban van még az NGINX szerverrel is, hogy a külvilággal tudjon kommunikálni.

## IoT eszköz

A következő diagramon látható az IoT device, azaz esetemben az ESP32-es mikrokontroller logikai ábrája. Ez leginkább a működését ábrázolja, nem pedig a fizikai kapcsolását, amit a következő témában fogok megtervezni (***IV. Fizikai rendszerterv***).

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image6.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image6.png)

Ez egy egyszerűsített ábra, amiben a fő elemeket érintem, valamint ezek kapcsolatát lehet megtekinteni.

Elsőnek is nézzük az GPIO lábakat. Ezekre a lábakra lehet majd kötni különböző szenzorokat és kiegészítőket.

- „Sensors” névvel ellátott doboz két irányú kommunikáció, mivel sok olyan szenzor van, ami képes adatot is fogadni
- „Extentions” névvel ellátott viszont csak egyirányú, mivel ezek csak egyszerű kiegészítők, mint például egy átlagos servo motor, ami csak pozíciót képes fogadni vagy amit ebben a projektmunkában is fogok használni - mint demo kiegészítő -, az nem más, mint egy WS2812B LED, ami szintén csak fogadni képes adatokat.

Középpontban az adatfeldolgozó (Data processing) rendszer áll, ami azért felelős, hogy az információkat feldolgozza és fogadja az IO portokról. Valamint felelős még azért is, hogy a feldolgozott adatokat tudja fogadni vagy küldeni a megfelelő protokollkezelő folyamatokhoz, amik: http, WebSocket Service.

Fontos elemek közé tartozik még a WiFi modul, ami egy hardveres része az eszköznek. Ez tartja fenn a vezetéknélküli kapcsolatot és ezen keresztül áramlik minden adat.

Végül, hogy meg is érkezzenek a megfelelő úticéljukhoz az adatok, kapcsolatban van még az NGINX szerverrel is.

# Fizikai rendszerterv

## ESP32 mint IoT eszköz

Ebben a fejezetben röviden be fogom mutatni, hogy az egész rendszeremnek milyen fizikai és azon belül elektronikai részei vannak. Ennek a projektnek nagyon egyszerű a fizika terve, mivel a software nagyobb hangot kap.

Az elektronikai része a következő elemekből áll össze:

Egy ESP32 developer board, ami tulajdonképpen az okos eszközünk. Erre a mikrokontrollerre van kötve 1 darab DHT11 hőmérséklet és páratartalom szenzor, valamit 1 darab WS2812B típusú LED szalag, hogy a rendszer sokszínűségét is szemléltessem.

Ezek bekötési rajza az alábbi rajzon vizsgálható meg:

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image7.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image7.png)

IV‑1. ábra - IoT eszköz kapcsolási rajza

Eszközök specifikációja:

- DHT11:
- Feszültség tartománya: 3 - 5V (táp és IO portot beleértve)
- 2.5mA maximum áramfelvétel
- Mérési tartományai és pontossága:
- Hőmérséklet: 0 - 50°C (± 2°C)
- Páratartalom: 20 - 80% (± 5%)
- WS2812B:
- Feszültség tartománya: 3.7 – 5.3V (táp és IO portot beleértve)
- 1μA maximum áramfelvétel pixelenként

# Webapp

A webapp nagyon fontos része ennek a projektnek, mivel ez az a modul, ami eléri azt, hogy a hétköznapi felhasználó kapcsolatot tartson a saját eszközeivel. Kiépítése NextJS könyvtár segítségével történt meg. A weboldal fő oldala a devices oldal, ami azért felelős, hogy dinamikusan kirenderelje az összes devicehoz tartozó adatot.

Az oldal következőképpen néz ki és működik:

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image8.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image8.png)

## Dinamikus renderelés

A NextJS és React alapú applikációk nagy előnye, hogy a fő oldalon elég egy HTML tag-et meghívni, ami egy másik fájl return része, ezáltal letisztult és dinamikus oldalakat lehet készíteni. A devices lap ezt ki is használja. A fő oldala (page.jsx) egy olyan rész, ahol először is lekéri az adott eszközök adatait majd ezeket a *.map()* funkció segítségével meghívja egyenként a <DeviceBox /> komponens elemet, ami végül a megfelelő bemeneti paraméterekkel megjeleníti.

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image9.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image9.png)

### <DeviceBox />

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image10.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image10.png)

Ez az elem felelős azért, hogy ténylegesen kirendereljen minden egyes elemet. Ezalatt a képen látható elemet értem.

Paramétereként az eszközök adatait kapja meg, amit elsőnek a parseDeviceDataString() függvénnyel elemekre szed, majd egy listába helyezi őket. Ezek az elemek tárolják a változók adatait, mint például a nevét, típusát és még sok mást is. Majd, ha már minden adatfeldolgozással kész van, változó típusok szerint lerendereli őket a *renderComponents()* függvény segítségével. A boolean típusú változókat gombként, míg az integer típusú változókat számbemeneti dobozként rendereli ki. HTML visszatérési eleme pedig a következőképpen néz ki: Látható, hogy minden egyes változót (azaz a „--” jelöléssel elválasztott értékeket) egyenként kirenderel.

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image11.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image11.png)

## Értékváltoztatás

Értékváltoztatás két esetben lehetséges. Amikor kap értékeket és amikor a felhasználó változtat meg valamit.

Az utóbbi esetében egyszerűen csak a renderComponent() függvényen belül legenerált html kódrész megváltoztatásakor (azaz a html element onChange vagy onClick állapota megváltozásánál) egy handleInputChange() függvényt hív meg, aminek a paramétere a megváltoztatott érték és az értékhez fűzött változó neve. A változtatásnak megfelelően megváltoztatja a változókat tároló lista elemét, így kényszeríti a html element újrarenderelésére[2](about:blank#fn2).

Amikor viszont egy értéket kapunk a WebSocket szerveren keresztül, akkor azt a page.jsx nevű fájl fogja lekezelni. Elsőnek is a WebSocket folyamatosan figyeli a bejövő üzeneteket, ezért eseményorientáltan lehet őket kezelni. Amint kap egy bejövő üzenetet, azt elsőnek feldolgozza, hogy melyik eszköz változott meg, majd az eszköz ID-jének megfelelően kicseréli a régi értékeket az új értékekre az eszközöket tárolandó listában. Ez a változás egy újra renderelésre kényszeríti a weboldalt, ezáltal az új értékek fognak lerenderelődni.

Minden értékváltoztatás után az API-n keresztül frissíti az új elemekkel az eszközöket tárolandó adatbázist, így mindig garantáltan a legfrissebb adatok fognak az adatbázisban megjelenni.

## Inicializálás

A weboldal inicializáláskor[3](about:blank#fn3) elsőnek is az API szerver segítségével lekérdezi az adatbázisból az összes olyan eszközt, ami a felhasználó azonosítójával megegyezik, ezáltal már rögtön az első indításkor még a WebSocket szerver inicializálása előtt olyan információkhoz jut, amit majd fel tud dolgozni és annak megfelelően lerendereli a hozzá tartozó adatokat. Ez azért szükséges, mivel az összes lista törlődik, ezért például frissítéskor nincs mit lerenderelnie csak akkor, ha már az adott eszköztől kapott valamilyen új értéket a WebSocket szerveren keresztül.

# IoT eszköz

Ebben a részben az IoT eszközöm, azaz esetemben az ESP32-es mikrokontroller működését, a SmartHome könyvtárat és felépítését fogom elemezni és dokumentálni.

## SmartHome könyvtár

GitHub-on belüli elérhetősége: [https://github.com/martinvichnal/smart-home/tree/main/smart-home-firmware/lib/SmartHome](https://github.com/martinvichnal/smart-home/tree/main/smart-home-firmware/lib/SmartHome)

Annak érdekében, hogy felhasználóbaráttá tegyem a rendszerem, saját könyvtárat kellett kiépítenem. Ez kezel minden olyan adatot és metódust, ami például tartja a kapcsolatot a szerverekkel, inicializál minden könyvtárat és beállítást. Ez a könyvtár lehetővé teszi a felhasználónak, hogy egy olyan kódrendszert építsen kedve szerint ki, ami letisztult, könnyen érthető, olvasható és kezelhető legyen.

### Működése könyvtáron belül:

A könyvtárat úgy készítettem el, hogy dinamikus és egyszerű felépítése legye. Kihasználtam a C++ programozási nyelv adta lehetőségeket, ezért class-okba rendeztem minden olyan fő egységet *(home)* valamit alegységet *(változók)*, amit használni kell.

### SmartHome Class

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image12.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image12.png)

A fő class egységet én a Smart Home-oknak dedikáltam, ami lehetőséget ad arra, hogy létrehozzunk egy vagy akár több „virtuális home-ot” az ESP-n belül, ami azt jelenti esetemben, hogy egy fizikai mikrokontrolleren belül akár több kontrollálható részegységet is ki lehet építeni.

Ez a class a következőképpen áll fel:

Ebben a kódrészben van definiálva az összes változó és funkció a SmartHome classon belül.

Röviden összefoglalom, hogy melyik miért lényeges és miket csinálnak.

Először is a legfontosabb a **class konstruktor,** mivel ezzel kell definiálni az okos otthont. 4 darab bemeneti paraméterrel rendelkezik, ami rettentően fontos az inicializálás miatt. A parméterek a következőek:

- *homeName*: dedikált név, ami az adott virtuális home-hoz kötődik.
- *homeID*: home ID-je.
- *userID*: annak a felhasználónak az ID-je, ami az eszközhöz van hozzáfűzve.
- *serverUrl*: ez a szerverekhez való csatlakozást biztosítja.

Majd a kommunikációt fenntartó és létrehozó funkciók is megtalálhatóak, amik képesek az adatok feltöltésére és lekérdezésére. Továbbá a home-on belüli definiált változók, értékeinek módosítására és lekérdezésére használt funkciók is itt találhatóak meg.

### Adatbáziskezelő funkciók

Kettő darab funkcióm található a könyvtárban, ami közvetlen az SQL adatbázisommal kommunikál http requestek segítségével. Ezek a *sendToServer()* és a *fetchDataFromServer().* Ezeket a függvényeket hívja meg a *pull()* és *push()* függvény, amit a felhasználó szabadkezűleg használhat. Két fajtája van, egy direkt lekérdezés vagy feltöltés, aminek a meghívása azonnali, valamint egy intervallumonkénti lekérdezés/feltöltés, aminek a lényege, hogy egy előre statikusan definiált vagy akár egy változó időintervallummal rendelkező változó segítségével időegységenként hívja meg a funkciót. Ezek a függvények két mérési pont, delta intervallum összehasonlításával működnek, hogy a mikrokontrollert ne állítsa meg, azaz a program szabadon tovább haladhat, így egy hatékonyabb működést lehet elérni.

A Class-on belül megtalálható egy *validateHome()* funkció is, aminek a célja az, hogy a mikrokontroller inicializálása során validálja az adott virtuális home egységet. Ezt úgy éri el, hogy a központi adatbázisból lekéri a konstruktor által megadott ID-vel ellátott home-ot, és ha ez a home jelen van az adatbázisban, akkor tovább lép és átugrik a fő kód részhez. Viszont, ha az adatbázisban nincs jelen, ez az adott home akkor létrehozza egy POST http hívás segítségével, majd feltölti az adatbázisba.

### WebSocket kezelő funkciók

Ahhoz, hogy a felhasználói felülettel tudjon kommunikálni a mikrokontroller, fel kell csatlakozni a dedikált NodeJS WebSocket kommunikációs szerverre. Ennek megvalósítására egy WebSocket kezelő könyvtár kínál segítséget, így megkönnyíti a komplikáltabb infrastruktúra kiépítésének mellőzését. Esetünkben a lényegesebb rész az adatok előállítása és fogadása. Erre kettő darab funkciónk áll rendelkezésre, amit a SmartHome Class kínál.

Mivel az adatok egy JSON objektumon keresztül áramlanak, ezért ezeket először dekódolni kell. Ehhez a *processDeviceData()* függvényt lehet hívni, ami elemeire bontja a JSON objektumot, elsőnek is a WebSocketen belül definiált event kódra, mely egységesen deviceData néven van ellátva, ezért ezzel nem foglalkozunk, valamint magára a feldolgozandó adatokra. Az utóbbi feldolgozása nagyon fontos, mivel ezekből nyerhető ki a nyers adat. Miután a feldolgozás megtörtént, a változó név definiálása szerint meg lesz hívva egy *setVariableValue()* függvény, amely beállítja a Variable Class konstruktor értékeit.

Az adatok küldése szintén JSON objektummal történik meg, ezért az előre definiált változókat össze kell gyűjteni, majd megfelelően formázni kell. Erre a *prepareWebSocketData()* funkció a felelős, ami teljes mértékben elvégez minden feladatot, amik a következők: Összegyűjti az összes változót és azok tulajdonságát, majd szövegesíti ezeket az előre definiált protokollom szerint. Végül JSON Objektumot képez és ezt egy String változóba rakja, ami egyben a visszatérési paramétere is. Ezt a visszaküldött változót kell majd feltölteni a WebSocket szerverre.

### Variable Class

Variable Class egy olyan alegysége a könyvtárnak, ami tárolja az adott virtuális home-on belüli változók értékeit és tulajdonságait.

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image13.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image13.png)

A konstruktor csak akkor jön létre, amikor a SmartHome Classon belüli

*addVariableNumber()*

vagy

*addVariableBool()*

meghívása meg nem történik.

A VII. fejezetben lesz szó arról, hogy két fajta típusú változót lehet definiálni a rendszeren belül. Ezek külön vannak szedve más-más funkciókra a letisztultság érdekében, de logikai felépítésükben nem különböznek.

Ezen a Class-on belül a legfontosabb függvény a toString metódus, ami egy String változóba köti össze az összes változóhoz tartozó tulajdonságot és értéket az általam definiált változó protokollja szerint, amiről a VII. fejezetben lesz szó.

### Működése felhasználói szemszögből:

Ebben a részben azt fogom elmagyarázni, hogy egy átlagos vagy minimális programozási tudással rendelkező felhasználó hogyan tud kiépíteni magának egy okosotthon eszközt.

Vannak előre meghatározott kikötések, szabályok, amiket szigorúan követni kell a megfelelő működés szempontjából. Ezek a kikötések a következők:

- SmartHome definiálása megfelelő paraméterek segítségével.
- Mikrokontroller csatlakoztatása a WiFi-hez inicializáláskor.
- Változók definiálása az adott SmartHome-hoz megfelelő paraméterek segítségével.
- WiFi csatlakoztatása után SmartHome validálása.
- Loop() vagy while(1) cikluson belüli SmartHome funkció meghívása.

Ezek sorrendjének betartása nagyon fontos az inicializálásnál, mivel minden lépés a következő lépésre épül.

Inicializálás után a könyvtár nyújtotta lehetőségek segítségével a felhasználó kedve szerint hívhat és tölthet fel vagy küldhet adatokat. Nincs előre meghatározva, hogy például minden egyes while ciklus végén fel kell tölteni az adatokat, ezért az egész rendszer egy eseményorientált rendszerré válik.

A következő képeken egy demó projekt látható, amiben alap szinten mutatom be, hogy mire képes a rendszer, valamint a fő lépéseket is meg lehet vizsgálni.

Ez csak egy keret kódrész, mely megmutatja, hogy egy SmartHome-ot hogyan lehet létrehozni.

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image14.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image14.png)

Látható, hogy egy mikrokontrolleren belül létrehoztam 3 darab virtuális home rendszert, amik más és más funkciót látnak el. Minden egyes home definiálásához szükség van egy névre, eszköz ID-re, felhasználó ID-re és egy szerver elérési útvonalra is.

Majd a mikrokontroller inicializálása a következőképpen zajlik le:

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image15.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image15.png)

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image16.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image16.png)

Végül a fő ciklusba tartozó elemek:

## Demó Projekt

A specifikációban említettem, hogy a demonstráció miatt 1 szenzort (DHT11) és egy kiegészítőt (WS2812B LED) fogok a rendszerhez kötni. A projekt mérete (azaz a main.cpp file) igen kicsi a kiépített könyvtárnak köszönhetően, ezért csak annyi dolgom van, hogy összerakjam a kapcsolást, definiáljam a könyvtárat, és a szenzorok/kiegészítőket, valamint az adatokat feldolgozzam. Ebben a részben ezt fogom megcsinálni.

# Szerverek

A rendszeren belül kettő fajta szerverem van. Az egyik szerver egy REST API szerver, ami közvetlen kapcsolatot létesít az SQL szerverrel. A másik szerver egy WebSocket TCP protokoll alapú szerver, ami egy eseményorientált duplex kommunikációs csatornát létesíti kliensek között.

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image17.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image17.png)

A rendszeren belül a kettő szervert különböző portokon lehet elérni.

Az API szervert 5000-es portra terveztem, miközben a WebSocket szervert 8080-asra.

Ezek a fő portok, de a Kubernetes és az NGINX szolgáltató segítségével több úgynevezett virtuális portokra lehet térképezni ezeket, ami azt jelenti, hogy egyszerre párhuzamosan több szervert tud futtatni, mely nagyban elősegíti az egész rendszer szintű skálázást, akár több millió felhasználóra is.

A szerverek egy virtuális gépen belül találhatóak meg, ezáltal a belső kommunikáció a szerverek közt nagyon gyors és biztonságos is, mivel ez a külvilág számára nem elérhető.

## NGINX webszerver

Az NGINX egy reverse proxy webszerver, ami nem csak azt teszi lehetővé, hogy irányítsa a bejövő adatokat a megfelelő helyre, hanem a rendszer méretezését is ez a modul teszi lehetővé a Kubernetes szolgáltatás mellett.

Egy reverse proxy funkciót valósít meg ami URL függvényében osztja le a modulokra bejövő API hívásokat. Az NGINX használata abban is előnyös, hogy az NGINX előtti kommunikáció HTTPS protokollal valósul meg ami egy lassabb kommunikációs protokoll. Ezzel szemben az NGINX és a backend szerver közti kapcsolat egy zárt hálózaton belül történik meg ezért ott már csak egy egyszerű, gyorsabb HTTP típusú kommunikációs csatorna jön létre, hiszen ezen a részen már a titkosítás nem kötelező mivel nincs külső látható IP címe.

## API Szerver

GitHub-on belüli elérhetősége: [https://github.com/martinvichnal/smart-home/tree/main/smart-home-api-server](https://github.com/martinvichnal/smart-home/tree/main/smart-home-api-server)

### REST API

A Reprezentációs állapotátvitel (REST) alkalmazásprogramozási felület (API)*)* egy olyan szoftverkomponens, amelynek a feladata az API-k kiszolgálása, vagyis azokat az interfészeket biztosítja, amelyeken keresztül más alkalmazások vagy szolgáltatások kommunikálhatnak az adatbázissal.

A REST API az integrációs keretrendszer része, melynek segítségével külső alkalmazásokat integrálhat a folyamatautomatizálási alrendszer alkalmazásaival. A REST alkalmazásprogramozási felület REST erőforrásokként teszi elérhetővé az üzleti objektumokat és integrációs objektumstruktúrákat. A REST API XML vagy JavaScript objektumjelölés (JSON) formátumban képes erőforrásadatokat megadni. A külső alkalmazások a REST API segítségével végezhetik el az alkalmazásadatok lekérdezését és frissítését.

A REST API erőforrásai bármilyen konfiguráció nélkül használhatók. A REST API által lekérdezhető vagy frissíthető objektumstruktúrák INTEGRATION értékkel rendelkeznek az Objektumstruktúrák alkalmazás Feldolgozó mezőjében.

A REST API szabványos HTTP GET, POST, PUT és DELETE metódusok felhasználásával támogatja az erőforrásokon végrehajtott létrehozási, lekérdezési, frissítési és törlési műveleteket.

A rendszeren belül 4 fő API-t használok: GET, POST, PUT és DELETE. Mindnek más-más funkciói vannak, és más url címen belül is más funkciók érhetők el.

A teljes API rendszerem elérhetőségei a következők:

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image18.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image18.png)

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image19.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image19.png)

A fentiek tulajdonképpen API Endpointok, amik tudják fogadni a beérkező adatokat.

Itt van most kettő darab példa, hogy hogyan tudjuk elérni és változtatni az adatot az adatbázisunkból:

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image20.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image20.png)

Ezzel a fajta kommunikációs protokollal teljes mértékben kedvünk szerint változtathatjuk meg az adatbázisban lévő adatokat.

### Adatbázis

Az adatbázisom alapjául Microsoft SQL relációs adatbázis struktúráját használom, ami igen rugalmas, egyszerű a kezelése és gyors.

Az adatbázis struktúrája egyszerű, mivel csak az IoT eszközök adatait és a felhasználók ID-jét kell tárolni.

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image21.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image21.png)

A relációs struktúra a következő képen tekinthető meg:

A devices adattáblában az alábbi elemek találhatók meg:

- DID: ez az eszközök ID-jét tárolja, ami egyben az adattábla kulcsa, is mivel legtöbbször eszerint kezeljük az adatokat.
- DN: ez az eszközök nevét tárolja, ami röviden elmondja például, hogy mire szolgál az adott eszköz.
- DD: ez ugyan olyan fontos adatsor, mint a DID, mivel ez a mező tárolja az adott eszköznek az adatait, adatainak nevét, értékét és kikötéseit[4](about:blank#fn4). Ennek egy külön protokollt terveztem meg, amit a későbbiekben részletezni fogok.
- UID: ebben a mezőben van tárolva, hogy az adott eszközhöz melyik felhasználó tartozik.

De hogyan is néznek ki a való életben ezek az adatok? A következő képen ezt lehet megvizsgálni.

### Felhasználói adattábla

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image22.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image22.png)

Sajnos időkeret híján nem sikerült teljes mértékben implementálnom a bejelentkezési lehetőségeket

[5](about:blank#fn5)

, ezért egy előre megírt objektumot használtam, amiben egy felhasználó található.

Az előre felvitt felhasználó ID-je a legfontosabb esetünkben. Ez az ID a 1124-es értéket veszi fel, amivel az egész projektet teszteltem.

### Eszközök adattáblája

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image23.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image23.png)

A következő képen egy egyszerű demó rendszernek az adattáblája látható. Ez négy eszközt különböztet meg, mind egyedi infrastruktúrával, azonban mindegyik egy darab felhasználó tulajdonában van (1124 ID-vel ellátott felhasználó)

A fenti képen vizsgálható a „dd” mező, ami az előbb említett eszközökön belüli változók és azok tulajdonságainak értékét tartalmazza. Protokollja a következőképpen épül fel:

Minden változó „--” karakterekkel van elválasztva, így a változók tulajdonságától el lehet különíteni a többi változót. Minden változónak 5 darab értéke van. Első a neve, ami tulajdonképpen bármi lehet. Második helyen az adott változó típusa van megjelölve, ami nagyon fontos, mivel minden változó más, ezért máshogy kezelendő. Az én esetemben kettő darabot definiáltam: „n” jelöléssel a number, azaz az integer alapú változók vannak ellátva, a másik opció pedig a „b” azaz a boolean típusú változó. A változó típusa után a következő kettő tulajdonsága a változónak a minimum és maximum értékei[6](about:blank#fn6). Végül a legfontosabb maradt utoljára, ami a változónak az értéke[7](about:blank#fn7), tehát a végleges adatforma a következőképpen néz ki:

{**név**}**−**{**típus**}**−**{**min** }**−**{**max** }**−**{**érték**} **−** **−**

Ezt az adattárolási protokollt az egész rendszeren belül egységesen dolgozom fel és használom.

## WebSocket szerver

GitHub-on belüli elérhetősége: [https://github.com/martinvichnal/smart-home/tree/main/smart-home-websocket-server](https://github.com/martinvichnal/smart-home/tree/main/smart-home-websocket-server)

A WebSocket szerver kiépítése eléggé egyszerű a SocketIO könyvtár segítségével, ezért kevesebb funkciót kellett kiépítenem. A WebSocket protokoll eventek segítségével tudja mindenféle komplikált elemek nélkül irányítani az üzenet irányát. Az én esetemben kettő darab fő event címet használok. Az első a deviceMessage, ami álltalában csak az IoT eszközök irányából jöhet. A másik lehetőség pedig a webMessage.

Az eventek kialakítása azért fontos, hogy az áthallást a minimumra csökkentsem, mivel a szerver nem különböző dedikált kliensek felé irányítja az üzenetet, hanem szétszórja (emitteli) ezt. Ezáltal, ha például egy eszköz kiüzen egy adatot, akkor a szerver nem csak a webappoknak, hanem a lehető összes eszköznek, a start eszközzel együtt is elüzeni.

A webszerver kódja a következőképpen néz ki:

![Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image24.png](Projektmunka%201%20-%20Vichna%CC%81l%20Martin%20WSOVK8%200647e05cfb1c4c0991d4da128fbf4d8b/image24.png)

VII‑7. ábra - WebSocket server forráskódja

## Átviteli sebesség

Az átviteli sebesség kérdése nagyon fontos volt a rendszeremben mivel, bár nem létfontosságú a 0 milliszekundumos adatátvitel, de a kellemes használhatóság miatt próbáltam ezt a minimumon tartani.

A mérések alatt átlagokat számoltam, mivel rengeteg befolyásolási tényező létezik ezen a téren.

Az adat két fázison megy keresztűl. Elsőnek egyik helyről a WebScoket-et hosztoló szerverhez, majd onnan a másik helyre kell érkeznie. Ennek figyelembevételével megmértem mindkét irányban áramló adat válaszidejét:

Webapp → IoT eszköz:

*Webapp* → *WebSocket* *Server* : ww**1=78** ms

*WebSocket* *Server* → *IoT* *Device* : wi**1** **=** **95** ms

IoT eszköz → Webapp:

*IoT* *Device* → *WebSocket* *Server* : iw**2** **=** **124** ms

*WebSocket* *Server* → *Webapp* : ww**2** **=** **99** ms

Tehát ezekből adódóan az átlagos válaszidők:

$$\sum_{}^{}{\mathbf{\text{time}}\mathbf{1} = \text{ww}1 + \text{wi}1 = 78\ \text{ms} + 95\ \text{ms} = \mathbf{173}\mathbf{\ }\mathbf{\text{ms}}}$$

$$\sum_{}^{}{\mathbf{\text{time}}\mathbf{2} = \text{iw}2 + \text{ww}2 = 124\ \text{ms} + 99\ \text{ms} = \mathbf{223}\mathbf{\ }\mathbf{\text{ms}}}$$

$$\mathbf{Válaszidő} = \frac{time1 + time2}{2} = \frac{173\ ms + 223\ ms}{2} = \mathbf{198\ ms}$$

Tehát átlagosan 198 milliszekundum mire az adat átér egyik helyről a másikba a WebSocket protokoll segítségével.

A valóságban viszont ez eltérő lehet, valamint ez csak a kettő egység közti kommunikációt mutatja be. A konkrét adatfeldolgozás vagy esetenkénti renderelés még jobban növeli az adott adat elküldésének válaszidejét.

# További fejlesztési lehetőségek

A projekt kiépítése során idő, valamint tudáskorlát miatt nem tudtam egészében minden egyes funkciót kiépíteni, ezért több fejlesztési lehetőség is fennáll.

- Elsősorban szeretném teljesen kiépíteni azt, hogy ne egy statikus, előre meghatározott userID-t használjak, hanem egy authentikátor szolgáltatás segítségével a felhasználók be tudjanak jelentkezni.
- Ebben a projektben a biztonságot mind az adatok és mind a kommunikáció részéről figyelmen kívül hagytam, mivel ez már egy bonyolultabb része a projektnek.
- További fejlesztésekhez még hozzátehetném azt is, hogy egyéb funkciókat építsek ki, mint például grafikonok megjelenítése, ezáltal a felhasználó egy grafikonba tudja foglalni a hőmérsékletszenzor által kapott adatait. Továbbá egyéb kényelmi funkciót is be lehetne implementálni.

# Összefoglalás

Összefoglalás gyanánt én sikeresnek ítélem a kiépített rendszeremet, mivel a fő funkciója működőképes és használható. Rengeteg mindent tanultam a projekt kiépítése során, nem mind csak weboldalkészítés terén, hanem például backend, azaz szerverek kiépítésébe is részt vettem, valamint a beágyazott rendszerek programozásában is egy új, ismeretlen feladattal szálltam szembe.

# Forrás

```JavaScript
/**
 * @description Get a device from the database by ID or by user ID
 * @method GET
 * @API /api/devices
 * @API /api/devices/device?did={did}
 * @API /api/device/device?uid={uid}
 * @body -
 * @returns {JSON} result
 */
export async function GET(request)

/**
 * @description Update device data in the database by ID
 * @method PUT
 * @API /api/devices/device
 * @body {JSON} {did, dd}
 * @returns {JSON} result
 */
export async function PUT(request)

/**
 * @description Add (insert) a device to the database
 * @method POST
 * @API /api/devices
 * @body {JSON} {did, dn, dd, uid}
 * @returns {JSON} result
 */
export async function POST(request)

/**
 * @description Delete a device from the database by ID
 * @method DELETE
 * @API /api/devices/device
 * @body {JSON} {did}
 * @returns {JSON} result
 */
export async function DELETE(request)
```

USERS:

```JavaScript
/**
 * @description Get all user from the database or by ID
 * @method GET
 * @API /api/users
 * @API /api/users/user?uid={uid}
 * @body -
 * @returns {JSON} result
 */
export async function GET(request)

/**
 * @description Update user data in the database by ID
 * @method PUT
 * @API /api/users/user
 * @body {JSON} {uid}
 * @returns {JSON} result
 */
export async function PUT(request)

/**
 * @description Add (insert) a user to the database
 * @method POST
 * @API /api/users
 * @body {JSON} {uid}
 * @returns {JSON} result
 */
export async function POST(request)

/**
 * @description Delete a user from the database by ID
 * @method DELETE
 * @API /api/users/user
 * @body {JSON} {uid}
 * @returns {JSON} result
 */
export async function DELETE(request)
```


Example:

```JavaScript
https://myserver.com/api/devices/device?did=05b31779-14ee-4233-8c9a-2749e81d3ccb -> GET request
-> response:
        {
            "DID": "05b31779-14ee-4233-8c9a-2749e81d3ccb",
            "DN": "Thermostat",
            "DD": "temperature-n-0-100-34--humidity-n-0-100-61--state-b-0-0-0--",
            "UID": "80ff2b60-bf4b-42fe-8de4-d21734a393c8"
        },

https://myserver.com/api/devices/device -> PUT request
-> request body:
        {
            "DID": "05b31779-14ee-4233-8c9a-2749e81d3ccb",
            "DN": "Thermostat",
            "DD": "temperature-n-0-100-34--humidity-n-0-100-61--state-b-0-0-0--",
            "UID": "80ff2b60-bf4b-42fe-8de4-d21734a393c8"
        },
-> response: "Device updated successfully"
```

```JSON
[
  {
    "did": "1111",
    "dn": "Led",
    "dd": "ledVariable-b-0-0-true--",
    "uid": "1124"
  },
  {
    "did": "123",
    "dn": "Desk",
    "dd": "deskLamp-b-0-0-true--deskLampBrightness-n-0-255-20--deskMonitor-b-0-0-true--",
    "uid": "1124"
  },
  {
    "did": "456",
    "dn": "Thermostat",
    "dd": "thermostatTemperature-n-0-100-13--thermostatHumidity-n-0-100-31--thermostatPower-b-0-0-true--",
    "uid": "1124"
  },
  {
    "did": "789",
    "dn": "Bed",
    "dd": "bedLamp-b-0-0-false--bedLampBrightness-n-0-255-225--",
    "uid": "1124"
  }
]
```
```JSON
[
  {
    "UID": "09c007bd-526b-4d8e-a9b9-96daff857759"
  },
  {
    "UID": "d480b324-d6bd-4e05-820f-c807a7a5ed7e"
  }
]
```

```JavaScript
export const user = {
    uid: "1124",
    uName: "Vichnál Martin",
    uPhoto: "https://lh3.googleusercontent.com/a/ACg8ocI5cTr4KR7TWUMmnwHdRFaBpEZw6QRUiwtVixPCTQVmuow=s96-c",
    uIsAuth: true,
}
```
# Acknowledgements / Source

-   [React](https://react.dev/learn)
-   [NextJS](https://nextjs.org/)
-   [Microsoft Azure](https://azure.microsoft.com/en-us/)
-   [NextJS Docker Example](https://github.com/vercel/next.js/tree/canary/examples/with-docker-multi-env)
-   [MsSQL example](https://github.com/hohoaisan/simple-dockerized-nextjs-mssql)
-   [API Guidelines](https://github.com/microsoft/api-guidelines)
-   [PlatformIO](https://platformio.org/)
