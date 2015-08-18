import QtQuick 2.0

Image {
    id: dynImage
    antialiasing: true
    Component.onCompleted: function(){
        console.log("Imag2");
    }

    onStatusChanged: function(){

    }
}
