import QtQuick 2.5

Image {
    id: dynImage
    antialiasing: true
    mipmap: true
    Component.onCompleted: function(){
        console.log("Imag2");
    }

    onStatusChanged: function(){
        console.log("img3", paintedHeight, paintedWidth);
    }

    onScaleChanged: function() {
        console.log("img4");
    }
}
