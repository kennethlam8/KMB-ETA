# Getting started

#### Click to visit: 
<br/>
<br/>
This is a web application that mimics the KMB app, you can check the ETA and watch the route of buses near 荃景圍天橋 and 荃灣柴灣角街. For better user experience, you can pulldown to get the latest data or choose specific stop that you want by clicking the dropdown button. 
<br/>
<br/>

### Screenshots:

#### You can choose the bus stop by clicking the dropdown button:
<br/>
<br/>
<img src="./kmb-eta/src/assets/image/kmb-01.png" width="34%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="./kmb-eta/src/assets/image/kmb-05.png" width="35%">
<br/>
<br/>
<br/>

#### The detail page shows the bus details and ETA respectively.
<br/>

#### You can also toggle the button to show the bus route manually:
<br/>
<br/>
<img src="./kmb-eta/src/assets/image/kmb-02.png" width="35%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="./kmb-eta/src/assets/image/kmb-06.png" width="35%">
<br/>
<br/>

#### If there is any problem please do not hesitate to contact me:
<br/>
<br/>
<img src="./kmb-eta/src/assets/image/kmb-04.png" width="35%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="./kmb-eta/src/assets/image/kmb-07.png" width="35%">
<br/>
<img src="./kmb-eta/src/assets/image/kmb-03.png" width="35%">
<br/>

# Installation

#### Create an API key in the google developers console: https://console.developers.google.com
<br/>
<br/>
Set up a new project and generate an API key. (You can also edit the map style by map ID)
<br />
<br />
<br />

#### Open a .env file in the project root and specify your API key as:

```
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
```
<br/>
<br/>

#### In the directory, you need to install the packages by running:

```
$ yarn install
```
OR

```
$ npm install
```
<br/>
<br/>

#### After installed the packages run:

```
$ yarn start
```
OR

```
$ npm start
```
<br/>
<br/>

#### Then visit:

```
http://localhost:3000
```

<br/>
<br/>

# Libraries

### @react-google-maps/api:  
Import Google Map
<br/>

### react-simple-pull-to-refresh:  
Pull down to refresh  
<br/>

### react-loading-icons:
To add loading icon  
<br/>

### @fortawesome/react-fontawesome:
To add some useful icons  
<br/>

### react-router-dom:
Navigate between pages  
<br/>

### moment:
Format the time for ETA