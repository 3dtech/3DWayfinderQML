import QtQuick 2.5

import "/js/WayfinderQML.js" 1.0 as WayfinderQML

Rectangle {
    id: main
    width: 800
    height: 600
    visible: true

    property var wayfinder
    property var projectId: "fd16d5410b0b53aad53ff6e5ecaf821d"

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
            }
        }
}
