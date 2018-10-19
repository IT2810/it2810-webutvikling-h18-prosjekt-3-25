# Dokumentasjon
Gruppe 25

## Introduksjon
Til prosjekt 3 har vi laget skjelettet til en "personal information manager" i React Native. Dette tolket vi til å bety funksjonalitet for kontakter, avtaler og "todos".  I tillegg til dette har vi valgt å implementere en skritteller som et eksempel på noe utover "basic React Native UI-problematikk".

## Tredjepartsbiblioteker
I denne oppgaven var det både tillatt og anbefalt å benytte seg av tredjepartsbiblioteker, så her er en oversikt over hvilke vi har valgt og kort om hvordan de fungerer. 
#### react-navigation
Et enkelt bibliotek for å navigere mellom ulike screens. Gjør det trivielt å sette opp en header som inkluderer "gå-tilbake"-funksjonalitet. Legger også tilrette for mer avansert navigering enn dette, men vi anså ikke det som nødvendig for denne oppgaven. Kommer også med innebygde animasjoner for sidebytte. 

Biblioteket fungerer ved at man gir hver relevante komponent en tittel, og på hjemmesiden oppretter man en en stackNavigator som blir informert om alle de ulike komponentene. Deretter setter man hvilken component som skal fungere som root (initialRouteName) og man er oppe og går. En kan ha flere stackNavigators hvis man f.eks. ønsker en navbar i tillegg, men dette benyttet ikke vi oss av.

Installering: *npm install --save react-navigation*

Link: https://reactnavigation.org/en/

#### react-native-elements 
Et enkelt bibliotek for grunnleggende design og forbedret/forenklet funksjonalitet. Poenget er at man skal slippe å gjøre mange grunnleggende designting for hver nye app man lager og gjøre APIen for en del react-elementer mer intuitiv. Bygger stort sett videre på (arver fra) eksisterende react-native-elementer,  men gir også noen "nye" elementer som Cards.

Brukes ved at man bytter ut de eksisterende navnene til react-native, f.eks TextInput, med det tilsvarende og versjonen til react-native-elements, her FormInput. Oversikten over elementer og dokumentasjon finnes på nettsiden.

Installering:  *npm install --save react-native-elements*

Link: https://react-native-training.github.io/react-native-elements/

#### react-native-modal-datetime-picker
Visuell date-time-picker som fungerer både for Android og iOS. Brukes ved at man renderer <DateTimePicker ... /> og setter i det minste 

 - isVisible={} - er komponenten synlig?
 - onConfirm={} - hva skjer når man trykker ok?
 - onCancel={} - hva skjer når man kansellerer? 

Installering: *npm install --save react-native-modal-datetime-picker*

Link: https://github.com/mmazzarolo/react-native-modal-datetime-picker

#### moment
Bibliotek for å parse, validere og formatere datoer. Rett og slett brukt fordi javascript sin håndtering av datoer er ganske dårlig. I denne sammenheng brukes den bare for å formatere datetime som gis av react-native-modal-datetime-picker før det lagres til til state som en string:

 - moment(datetime).format('Do MMMM YYYY, HH:mm')

Installasjon: *npm install moment --save*

Link: https://momentjs.com/

#### mock-async-storage
Bibliotek som mocker AsyncStorage for Jest-tester slik at vi slipper å gjøre det selv. Til bruk anbefales det å gjøre en "manual mock". I testfilene som tester AsyncStorage ligger det en kodesnutt som er hentet fra den vedlagte linken. Denne snutten setter opp testfilen til å bruke mock-implementasjonen som følger med biblioteket. Filene er kommenterte hvert sted dette er relevant.

Installasjon: *npm install --save mock-async-storage*

Link: https://github.com/devmetal/mock-async-storage
## Annen teknologi
#### AsyncStorage
En enkelt, ukryptert måte for permanent å lagre key:value-data for en app som anbefales over LocalStorage. Dataene er globale for appen, så hvis man forventer tung bruk er det sterkt anbefalt at man skriver et abstraksjonslag mellom appen og Asyncstorage, men da vår bruk er veldig begrenset, les ensifret antall nøkler, var dett ikke noe vi prioriterte. 
#### Expo Pedometer
Teknisk sett ikke et tredjepartsbibliotek i denne sammenheng siden det kommer med expo og ikke krever ekstra installering, bare import. Gir tilgang til pedometer på telefon gjennom Core Motion (iOS) or Google Fit (Android), og selv om det ikke er veldig nøyaktig gjør det en god nok jobb. Gir deg tilgang på enkle metoder for å telle skritt både historisk: 
 - Expo.Pedometer.getStepCountAsync(start, end)
 
 og i sanntid:
 - Expo.Pedometer.watchStepCount(callback)

Dokumentasjonen gir god forklaring på hvordan det brukes og gir et eksempeloppsett. Dette ble brukt som grunnlag for vår kode. 

Link: https://docs.expo.io/versions/latest/sdk/pedometer

## Struktur og design
Da dette er ment å være en prototype har vi gått for et enkelt design og fokusert på grunnleggende funksjonalitet. I utgangspunktet var planen var å integrere de ulike delene mer i hverandre enn det som ble resultatet. For eksempel å gjøre det mulig å ha en avtale som inkluderer lagrede kontakter eller ha en todo som kan være koblet opp mot skritt. Dette mener vi hadde latt seg gjøre relativt enkelt da AsyncStorage er global. For selv om fristen for prosjektet ble utsatt har vi hatt såpass store problemer med å få Jest til å fungere at det gikk utover tiden vi hadde rådighet for å utvikle slikt.  

Alle komponentene, utenom App/HomeScreen finnes mappa components. Når jeg referer til komponenter under er det underforstått at dette gjelder komponenter vi har implementert.Alle komponentene benytter seg i noen grad av react-native-elements, så trenger ikke det å gjentas. 
#### Homescreen
En enkel startskjerm med knapper som bruker react-navigation for å sende deg videre til de andre komponentene. Det er også her stackNavigatoren er implementert. Hvis denne appen skulle utvikles videre ville vi også implementert en vertikal navbar med en "hamburger button" i headeren. Dette ville benyttet seg av en ny stacknavigator som også ville vært implementert her.
#### Avtaler
Omfatter tre komponenter - én som viser eksisterende avtaler, én som lar deg inspisere en enkelt avtale og én som lar det opprette nye. "Create Appointment"-skjermen benytter seg av react-native-modal-datetime-picker for å velge dato og tid uavhengig av plattform og moment for å håndtere valget. Avtaler kan opprettes, inspiseres og slettes. Vi hadde også planer om å vise avtalene i en faktisk kalender, men det ble med tanken.  Avtalene lagres med AsyncStorage.
#### Todo
En enkelt komponent som lar deg holde orden på småting du ønsker å gjøre. Klikk på dem i lista når du er ferdig med oppgaven. Gjøremålene lagres med AsyncStorage.
#### Skritteller
En enkel skritteller som teller skritt de siste 24 timene vha. Expo Pedometer. En "progress bar" viser progresjonen opp mot et daglig mål (default 10 0000) som man kan sette selv. Det daglige målet lagres med Asyncstorage vil derfor gjelde til man setter et nytt.
#### Kontakter
Omfatter fire komponenter - én for å vise eksisterende kontakter, hvor hver enkelt klikkbare kontakt i listen også er en komponent,  én for for å opprette kontakter og til slutt en for å inspisere en enkelt kontakt. Kontaktene legger seg i lista ettersom de blir opprettet, men skulle vi videreutviklet appen hadde en selvfølgelig ting å fikse at disse ordnes alfabetisk. 
## Testing
Når vi endelig fikk jest til å samarbeide fokuserte vi på snapshot-testing og unit-testing av funksjoner som lagrer data. Vi så det ikke som realistisk å ha tid til å teste appen fullverdig, men  vi har forhåpentligvis gjort nok til at vi har vist at vi vet hvordan det fungerer. Alle testene ligger i \_\_tests\_\_ ⇒ fileName ⇒ fileName.tests.js.

Vi har også gjennom hele prosjektet sørget for at alle delene av appen fungerer bra både på både iOS og Andriod. Ikke alt ser 100% likt ut, f.eks react-native-modal-datetime-picker har ulik grafikk for de to platformene, men funksjonaliteten skal være lik.

#### Snapshot-testing
Nyttig testeteknikk for å bli informert om at endringer man gjør i kodebasen resulterer i uventede endringer for UIen. Alle komponentene vi har skrevet, utenom App/HomeScreen,  har fungerende snapsnapshot-tester med tilhørende snapshots i repoet. Grunnen til at vi ikke har det i App er at den importerer alle andre "screens" for bruk i StackNavigatoren som gjør at den blir utrolig treg og resulterer i rare errors i andre filer enn App som vi allerede har kjørende snapshot-tester for. Da App i tillegg er utrolig simpel anser vi ikke det som et stort tap at vi bare fjernet testen.

#### Unit-testing
Unit-testing er til for å sørge for at at metoder faktisk gjør det de er ment å gjøre, og at endringer i kodebasen ikke får konsekvenser for dette. Vi har skrevet unit-tester til alle metoder som lagrer til AsyncStorage, utenom i Todo og StepCounter. Dette er pga. problemer med oppsettet til Jest som ga oss begrenset tid, men testingen av disse metodene ville ikke vært nevneverdig annerledes enn i resten av filene.  
