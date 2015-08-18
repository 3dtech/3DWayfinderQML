import QtQuick 2.0

Timer {
    id: customTimer
    interval: 1000;
    running: false;
    repeat: false;

    var callbackFunction = null;

    onTriggered: {
        console.log("triggered");
        if(callbackFunction && typeof callbackFunction === "function")
            callbackFunction();
    }

    function startTimer (func, time) {
        customTimer.callbackFunction = func;
        customTimer.interval = time;
        customTimer.start();
    }
}
