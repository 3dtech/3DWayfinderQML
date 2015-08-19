import QtQuick 2.4
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.3

import "/js/WayfinderQML.js" 1.0 as WayfinderQML

Rectangle {
    id: main
    width: 640
    height: 480
    visible: true
    color: "#FF0000"

    property var wayfinder;

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
            property alias toucharea : toucharea
            visible: true

            onPaint: function(){
                console.log("onPaint", canvas, canvas.getContext("2d"));
            }

            onAvailableChanged: start();

            MouseArea {
                id: toucharea
                anchors.fill: parent
            }

            function start(){
                main.wayfinder = new WayfinderQML.WayfinderQML(canvas);
                main.wayfinder.open("e6e0103e4c5f8707de06b89adcf97cbd");
                main.wayfinder.cbOnDataLoaded = function(){
                    console.log("Data loaded", canvas.width, canvas.height, canvas.antialiasing);
                };
            }
        }
}
