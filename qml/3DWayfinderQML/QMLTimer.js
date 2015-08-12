var counterT = 0;
var freeTimers = [];
function setTimeout(func, time){

    function Timer() {
        console.log("new Timer", counterT++);
        return Qt.createQmlObject("import QtQuick 2.0; Timer {}", main);
    }

    var timer;
    if(freeTimers.length > 0){
        timer = freeTimers.shift();
    }
    else {
        timer = new Timer();
    }

    timer.interval = time;
    timer.repeat = false;
    timer.triggered.connect(function(){
        freeTimers.push(timer);
        func(arguments);
    });

    timer.start();

}



function clearTimeout(timer){
    if(timer)
        timer.stop();
}
