/**
 * Map2DMover is used to translate (pan) and zoom 2d map by capturing mouse events and assigned button clicks
 * @param options Wayfinder2DOptions object
 * @param cbUpdate Callback that is called when the map should be redrawn
 */
var MapQMLMover=Map2DMover.extend({
	/** Constructor */
    init: function(canvas, options, cbUpdate) {
        this.canvas = canvas;
        this._super(options, cbUpdate);
        this.lastClick = null; //time
        this.lastX = -1;
        this.lastY = -1;
        this.mouseDelta = false;
        this.vecBuf = vec2.create();

        this.setup();
	},

    setup: function(){
        this.mapTransformer = new Map2DTransformer(vec2.fromValues(this.options.mapSize[0], this.options.mapSize[1]), vec2.fromValues(this.canvas.width, this.canvas.height), true, this.options); //because canvas needs width and height parameters. Can't use CSS width and height
    },
	
	bindEvents: function() {
        toucharea.clicked.connect(ClassCallback(this, this.onTap));
        //toucharea.pressed.connect(ClassCallback(this, this.onPress));
        toucharea.positionChanged.connect(ClassCallback(this, this.onMouseMove));

        /*Hammer(this.view).on("pinch", ClassCallback(this, this.onPinch));
		Hammer(this.view).on("hold", ClassCallback(this, this.onHold));
		Hammer(this.view).on("tap", ClassCallback(this, this.onTap));
		//this.view.hammer().on("doubletap", ClassCallback(this, this.onDoubleTap));
		Hammer(this.view).on("release", ClassCallback(this, this.stop));
		
		Hammer(this.view).on("drag", ClassCallback(this, this.onDrag));
		Hammer(this.view).on("dragend", ClassCallback(this, this.onEndDrag));
		Hammer(this.view).on("dragstart", ClassCallback(this, this.onStartDrag));
        */
		// Scroll zoom
        toucharea.wheel.connect(ClassCallback(this, this.onWheel));
        toucharea.released.connect(ClassCallback(this, this.onRelease));
        toucharea.canceled.connect(ClassCallback(this, this.onRelease));
        //this.bindMouseWheel(ClassCallback(this, this.onWheel));
    },

    onTap: function(event){
        if(this.timeout){
           console.log("onTap.clearTimeout");
           clearTimeout(this.timeout);
        }

        if (this.cbOnClick && typeof this.cbOnClick === "function"){
            this.cbOnClick(this.getRelativeMousePosition(vec2.fromValues(event.x, event.y)));
        }
    },

    onWheel: function(event){
        if (event.angleDelta.y > 0)
            this.mapTransformer.zoomIn();
        else
            this.mapTransformer.zoomOut();

        if (typeof this.cbUpdate === "function"){
            this.cbUpdate(true);
        }
    },

    onPress: function(event){
        this.lastClick = (new Date()).getTime();
        this.lastX = event.x;
        this.lastY = event.y;
    },

    onMouseMove: function(event){
        if(!this.rendering){
            var v = vec2.fromValues(event.x, event.y);
            var panVector;
            if(this.mouseDelta)
                panVector = vec2.sub(this.vecBuf, this.mouseDelta, v);
            else
                panVector = vec2.set(this.vecBuf, 0, 0);

            this.pan(panVector, false);
            this.mouseDelta = v;
        }
    },

    getRelativeMousePosition: function(v) {
        return v;
    },

    onRelease: function(e){
        this.mouseDelta = false;
        clearTimeout(this.timeout);
        this.cbUpdate(true);
    }

});
