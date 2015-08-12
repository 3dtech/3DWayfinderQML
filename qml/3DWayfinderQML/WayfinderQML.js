Qt.include("WayfinderIncludes.js")
WayfinderAPI.LOCATION = "http://api.3dwayfinder.com/";

/**
 * 2D Wayfinder 
 */
var WayfinderQML = Wayfinder2D.extend({
	/** @param options Wayfinder2DOptions instance. If not passed Wayfinder2DOptions() is created with default options. */
    init: function(options, canvas) {
        if(canvas === undefined && !(options instanceof WayfinderOptionsQML)){
            this.canvas = options;
        }
        else {
            this.canvas = canvas;
        }

        if(!options || !(options instanceof WayfinderOptionsQML)) this.options=new WayfinderOptionsQML();

        this._super(this.options);
        this.overideLogistics();
        Logistics.onFinishedLoading(ClassCallback(this, this.cbOnDataLoaded));
	},

    setup: function(){
        this.map = new MapQML(this, this.canvas);
    },

    overideLogistics: function(){
        var me = this;
        var imageComponent = Qt.createComponent("DynImage.qml");

        function finishCreation(){
            var imageLoader = Logistics.getTypeFunction("image");
            imageLoader["load"] = function(dt){

                if(dt){
                    dt.data = imageComponent.createObject(this.canvas, {"source": dt.url});
                    if(dt.data === null || dt.data.status === Image.Error){
                        dt.failed();
                    }else if(dt.data.status === Image.Ready){
                         dt.ready();
                    }
                    else {
                        dt.data.statusChanged.connect(function(){
                            dt.ready();
                        });
                    }
                }
            };
            Logistics.setTypeFunction("image", imageLoader);
        }

        if (imageComponent.status === Image.Ready)
             finishCreation();
        else
             imageComponent.statusChanged.connect(finishCreation);
    },

    readProjectName: function(){
        return this.options.project;
    },

    setLanguage: function(language) {
        if (!this.firstLanguageChange){
            this.statistics.onLanguageChange();
        }
        this.firstLanguageChange=false;
        if(typeof this.cbOnLanguageChange === "function"){
            this.cbOnLanguageChange(language);
        }
    },

    resize: function(){
        if (this.map) {
            this.map.resize(this.canvas.width, this.canvas.height);
        }

        this.map.redraw();
    }
});
