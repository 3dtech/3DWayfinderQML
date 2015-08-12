import QtQuick 2.0
import "WayfinderQML.js" as WayfinderQML

Rectangle {
    id: main
    width: 360
    height: 360

    property var wayfinder;

    onHeightChanged: {
        console.log("onHeightChanged")
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
