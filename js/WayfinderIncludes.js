.pragma library

var includePath = "shared/"
Qt.include("/js/WayfinderQML.min.js", function(result){
    if(result.exception)
        console.log("include", result.status, result.exception)
})
Qt.include("/js/QMLTimer.js")
Qt.include("/js/log.js")
Qt.include("/js/WayfinderOptionsQML.js")
Qt.include("/js/MapQML.js")
Qt.include("/js/MapQMLMover.js")
