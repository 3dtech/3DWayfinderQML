.pragma library

var includePath = "shared/"
Qt.include("WayfinderQML.min.js", function(result){
    if(result.exception)
        console.log("include", result.status, result.exception)
})
Qt.include("QMLTimer.js")
Qt.include("log.js")
Qt.include("WayfinderOptionsQML.js")
Qt.include("MapQML.js")
Qt.include("MapQMLMover.js")
