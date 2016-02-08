(function () {
    "use strict";
    MyApp.ns('MyApp.service.KageService');
    MyApp.service.KageService.getKage = getKage;
    MyApp.service.KageService.getGlyphImage = getGlyphImage;
    var dataService = MyApp.service.DataService;
    
        function getKage(ids, canvas) {
            return dataService.getGlyph(ids).then(function (r) {
                drawKage(r["field_kanjivg"], canvas);
                return canvas;
            });
        }
        
        function getGlyphImage(str, size, id) {
            var can = document.createElement('canvas');
            can.height=size;
            can.width=size;
            return getKage(str, can).then(function (can) {
                return {id:id, data: can.toDataURL()};
            });
        }
                                                  
        function drawKage(arr, canvas) {
            var ctx = canvas.getContext("2d");

            var kage = new Kage();
            kage.kUseCurve = false;
            var polygons = new Polygons();

            
            var i;
            for (i=0; i <arr.length; ++i) {
                kage.kBuhin.push(arr[i]["name"],arr[i]["code"]);
            }
            kage.makeGlyph(polygons, "target");
            
            ctx.fillStyle = "rgb(0, 0, 0)";

            for(var i = 0; i < polygons.array.length; i++){
                ctx.beginPath();
                ctx.moveTo(polygons.array[i].array[0].x, polygons.array[i].array[0].y);
                for(var j = 1; j < polygons.array[i].array.length; j++){
                    ctx.lineTo(polygons.array[i].array[j].x, polygons.array[i].array[j].y);
                }
                ctx.closePath();
                ctx.fill();
            }
        }
        
        
}());