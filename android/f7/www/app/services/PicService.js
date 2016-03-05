(function ($) {
    "use strict";

    MyApp.ns('MyApp.service.PicService');
    // MyApp.service.PicService.drawImage()


    function makeText(x, y, text, size, color) {
        var font = 'bold ' + size + "px Arial";
        var r = new createjs.Text(text, font, color);
        r.x = x;
        r.y = y;
        return r;
    }


    function drawLines(stage, startX, startY, limitX, limitY, fontsize, padding,color, textArray) {
        var height = limitY - startY,
            width = limitX - startX,
            charPerLine = Math.floor(width / fontsize),
            maxLineCount = Math.floor((height + padding) / (fontsize + padding));
        console.log(charPerLine, maxLineCount);
        var notAtLineStart = ['，', '。', '、', '；', '！', '？', '”']; //Punctuation marks that must wrap to the next line

        var lines = [], thisLine = [];
        for (var i = 0; i < textArray.length; ++i) {
            if (thisLine.length >= charPerLine ||
                (thisLine.length == charPerLine - 1 && i < textArray.length - 1
                    && notAtLineStart.indexOf(textArray[i + 1]) != -1)) {
                //new line
                lines.push(thisLine);
                thisLine = [];
                if (lines.length >= maxLineCount) {
                    //overflow
                    lines[lines.length - 1][charPerLine - 1] = lines[lines.length - 1][charPerLine - 2] = "…";
                    break;
                }
            }

            thisLine.push(textArray[i]);
        }
        if (thisLine.length > 0 && lines.length < maxLineCount) {
            lines.push(thisLine);
        }


        for (var i = 0, j; i < lines.length; ++i) {
            for (j = 0; j < lines[i].length; ++j) {
                stage.addChild(makeText(startX + j * fontsize, startY + i * (fontsize + padding), lines[i][j], fontsize,color));
            }
        }
        return lines.length * fontsize + (lines.length - 1) * padding;
    }


    MyApp.service.PicService.draw = function(data) {
        var can = document.createElement('canvas');
        can.height = 640;
        can.width = 640;
        var stage = new createjs.Stage(can);
        var deferred=$.Deferred();

        var bg = new createjs.Bitmap("images/share_bg.png");
        bg.x = 0;
        bg.y = 0;

        bg.image.addEventListener('load', function () {

            stage.update();
            deferred.resolve(stage.toDataURL());
        });
        stage.addChild(bg);
        var endheight = drawLines(stage, 30, 110, 610, 330, 60, 20, '#000000',data.field_text);
        var notes='';
        if (data.field_metaphor && data.field_metaphor.length>0) {
            notes='【比喻】'+data.field_metaphor;
            
        } else if (data.field_notes && data.field_notes.length>0) {
            notes='【解说】'+data.field_notes;
        }
        drawLines(stage, 40, endheight + 130, 600, 530, 30, 10, '#2B88D8', notes);
        stage.update();
        return deferred;
    }
} (jQuery));