var up_dow = 50;
var right_left = 100;
var value = 0;
var speed = 5;
var $bird = $('#bird');
var l;
var r;
var u;
var d;
var choice;
$bird.css({left: right_left, top: up_dow});
$('#right').mousedown(function(){
    l=u=d=0;
    r=1;
    return false;
});
$('#left').mousedown(function(){
    r=u=d=0;
    l=1;
    return false;
});
$('#up').mousedown(function(){
    r=l=d=0;
    u=1;
    return false;
});
$('#down').mousedown(function(){
    r=l=u=0;
    d=1;
    return false;
});
$('#circle').mousedown(function(){
    choice=zero();
    return false;
});
var zero = function (){
    var size = 30;
    var $b = $('<div style="wight:30px;height:30px"><img src="bomb.png" style="wight:100%;height:100%;margin-left:-50%;margin-top:-50%;"></div>');
    var bombLeft = right_left;
    var bombTop = up_dow;
    var one = function () {
        size++;
        if (size == 40) {
            currentResize = two;
        }
        $b.css({width: size+'px', height: size+'px'});
    };
    var two = function () {
        size--;
        if (size == 30) {
            currentResize = one;

        }
        $b.css({width: size+'px', height: size+'px'});
    };
    var currentResize = one;
    var doResize = function () {
        currentResize();
    };
    setInterval(doResize, 50);
    $b.css({position: 'absolute', left: right_left, top: up_dow});


    var reMove = function () {
        var x = function () {
            var $q = $('<div> </div>');
            $q.css({fontsize: '35pt', position: 'absolute', left: bombLeft, top: bombTop});
            for (var b=0;b<4;b++) {
                var $bc = $('<div>#</div>');
                $bc.css({fontsize: '35pt', color: 'blue', position: 'absolute'});
                if(b==0){
                    $bc.css({left:-60 + 'px', top: 0 + 'px'});
                }
                if(b==1){
                    $bc.css({left:60 + 'px', top: 0 + 'px'});
                }
                if(b==2){
                    $bc.css({left:0 + 'px', top: 60 + 'px'});
                }
                if(b==3){
                    $bc.css({left:0 + 'px', top: -60 + 'px'});
                }
                $bc.appendTo($q);
                function generateRemover(elemToRemove) {
                    return function(){
                        $q[0].removeChild(elemToRemove[0]);
                    }
                }
                var remover = generateRemover($bc);
                setTimeout(remover, 400);
            }
            $q.appendTo(document.body);
        };

        x();
        document.body.removeChild($b[0]);
    };
    $b.appendTo(document.body);
    setTimeout(reMove, 2500);
};
var onkeydown = function (e) {
    if (e.keyCode == 39) {
        r = 1;
    }

    if (e.keyCode == 38) {
        u = 1;
    }
    if (e.keyCode == 40) {
        d = 1;
    }
    if (e.keyCode == 37) {
        l = 1;
    }
    if (e.keyCode == 32) {
        zero();
    }

};
var onkeyup = function (e) {
    if (e.keyCode == 39) {
        r = 0;
    }

    if (e.keyCode == 38) {
        u = 0;
    }
    if (e.keyCode == 40) {
        d = 0;
    }
    if (e.keyCode == 37) {
        l = 0;
    }
};
$(document).keydown(onkeydown);
$(document).keyup(onkeyup);
function doMove() {
    if (r == 1) {
        right_left += speed;

        $bird.css({left: right_left});
    }
    if (l == 1) {
        right_left -= speed;

        $bird.css({left: right_left});
    }
    if (u == 1) {
        up_dow -= speed;

        $bird.css({top: up_dow});
    }
    if (d == 1) {
        up_dow += speed;

        $bird.css({top: up_dow});
    }
}

setInterval(doMove, 20);

