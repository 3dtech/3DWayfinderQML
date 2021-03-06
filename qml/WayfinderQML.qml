import QtQuick 2.5
import QtBluetooth 5.3

import "/js/WayfinderQML.js" 1.0 as WayfinderQML

Rectangle {
    id: main
    width: 800
    height: 600
    visible: true

    property var wayfinder
    property string projectId: "fd16d5410b0b53aad53ff6e5ecaf821d"

    property bool bleScannerState: blescanner.state
    onBleScannerStateChanged: {
        if (!blescanner.state)
            console.log("Device State", blescanner.state)
    }

    onHeightChanged: {
        if(main && main.wayfinder){
            main.wayfinder.resize();
        }
    }

    onWidthChanged: {
        if(main && main.wayfinder){
            main.wayfinder.resize();
        }
    }

    /*BluetoothDiscoveryModel {
        discoveryMode: BluetoothDiscoveryModel.DeviceDiscovery
        onDeviceDiscovered: {
            console.log("onDeviceDiscovered", device);
            //text.text += " "+device;
        }

        onServiceDiscovered: {
            console.log("onServiceDiscovered", service.deviceAddress, service.deviceName, service.serviceName);
            //text.text += " _s"+service.deviceAddress;
        }
    }*/

    Canvas {
            id: canvas
            width: parent.width
            height: parent.height
            antialiasing: true
            visible: true

            property double zoom: 1.0
            property alias toucharea : toucharea

            onAvailableChanged: start();

            MouseArea {
                id: toucharea
                anchors.fill: parent
            }

            function start(){
                main.wayfinder = new WayfinderQML.WayfinderQML(canvas);
                main.wayfinder.open(main.projectId);
                main.wayfinder.cbOnDataLoaded = function(){
                    console.log("Data loaded", canvas.width, canvas.height, canvas.antialiasing);
                };

                blescanner.startDeviceDiscovery();
                wifi.start();
            }

            Text {
                id: text
                text: blescanner.update
            }
        }
}
