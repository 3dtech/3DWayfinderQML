var MapQML = Map2D.extend({
    init: function(wayfinder, canvas) {
        this.canvas = canvas;

        this.canvas.paint.connect(ClassCallback(this, this.render));
        this._super(wayfinder);
    },

    setup: function(){
        this.renderer = new Wayfinder2DRendering(this.wayfinder);
        this.mapMover = new MapQMLMover(this.canvas, this.wayfinder.options, ClassCallback(this, this.update));
        this.pathRenderer = new PathRenderer2D();
        this.floorRenderer = new FloorRenderer2D();
        this.poisRenderer = new POIsRenderer2D();
        this.extrasRenderer = new ExtrasRenderer2D();
    },

    resize: function(width, height){
        this.getTransformer().setViewSize(vec2.fromValues(width, height));
        this.update(true);
    },

    update: function(redrawAll){
        this._super(redrawAll);
        this.canvas.requestPaint();
    },

    start: function(){

    },

    render: function(){
        if (this.renderAll){
            this.renderer.damageAll();
            this.renderer.render();
            this.renderAll = false;
            this.renderOnlyBase = false;
        }
        else if(this.renderOnlyBase){
            this.floorRenderer.damage();
            this.renderer.render();
            this.renderOnlyBase = false;
        }
    }
});
