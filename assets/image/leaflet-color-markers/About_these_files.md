# About these Marker Icon Files

These marker Icons were borrowed from [pointhi/leaflet-color-markers](https://github.com/pointhi/leaflet-color-markers)

We made a local copy to conserve bandwith.

| Color  | Marker | Color Inside | Color Outside |
| -------|:----------------------------------------:|:-------:|:-------:|
| Blue   | ![Marker Blue](marker-icon-blue.png)     | #2A81CB | #3274A3 |
| Gold   | ![Marker Gold](marker-icon-gold.png)     | #FFD326 | #C1A32D |
| Red    | ![Marker Red](marker-icon-red.png)       | #CB2B3E | #982E40 |
| Green  | ![Marker Green](marker-icon-green.png)   | #2AAD27 | #31882A |
| Orange | ![Marker Orange](marker-icon-orange.png) | #CB8427 | #98652E |
| Yellow | ![Marker Yellow](marker-icon-yellow.png) | #CAC428 | #988F2E |
| Violet | ![Marker Violet](marker-icon-violet.png) | #9C2BCB | #742E98 |
| Grey   | ![Marker Grey](marker-icon-grey.png)     | #7B7B7B | #6B6B6B |
| Black  | ![Marker Black](marker-icon-black.png)   | #3D3D3D | #313131 |

## Usaage

```
## Usage
```javascript
const greenIcon = new L.Icon({
  iconUrl: './assets/image/leaflet-color-markers/marker-icon-green.png',
  shadowUrl: './assets/images/leaflet-color-markers/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);
```