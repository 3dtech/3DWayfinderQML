var counterT = 0;
var freeTimers = [];
var firstTime = true;
function setTimeout(func, time){

    function Timer() {
        return Qt.createQmlObject("import QtQuick 2.0; Timer {}", main);
    }

    var timer;
    if(freeTimers.length > 0){
        timer = freeTimers.shift();
    }
    else {
        timer = new Timer();
        timer.triggered.connect(function(){
            freeTimers.push(timer);
            func(arguments);
        });
    }

    timer.interval = time;
    timer.repeat = false;
    timer.start();

    return timer;
}



function clearTimeout(timer){
    if(timer){
        timer.stop();
        freeTimers.push(timer);
    }
}
