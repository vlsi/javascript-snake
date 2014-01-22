var BORDER = 50;
var STEP_SIZE = 30;
var l;
var r;
var u;
var d;
var Apple;
var score = 0;
var apple_Coords = {};
var randomVal = function (){
apple_Coords.x=BORDER + Math.floor(Math.random()*51)*STEP_SIZE;
apple_Coords.y=BORDER + Math.floor(Math.random()*51)*STEP_SIZE;
};
randomVal();
var onkeydown = function (e) {
    if(e.keyCode==32){randomVal();Apple.css({left: apple_Coords.x, top: apple_Coords.y});}
    if (e.keyCode == 39) {
        if (l == 1) {
            r = 0;
        }œ
        else {
            u = l = d = 0;
            r = 1;
        }
    }
    if (e.keyCode == 37) {
        if (r == 1) {
            l = 0;
        }
        else {
            u = r = d = 0;
            l = 1;
        }

    }
    if (e.keyCode == 38) {
        if (d == 1) {
            u = 0;
        }
        else {
            l = r = d = 0;
            u = 1;
        }
    }
    if (e.keyCode == 40) {
        if (u == 1) {
            d = 0;
        }
        else {
            u = l = r = 0;
            d = 1;
        }
    }
};
$(document).keydown(onkeydown);
var snake_coords = [];


var snake_segment_id = 0;
function create_snake_segment(coords) {
    var segment = $('<img class="snake_body" src="elem.png">');
    coords.id = 'segm' + snake_segment_id;
    segment.attr('id', coords.id);
    segment.css({left: coords.x, top: coords.y});
    segment.appendTo(document.body);
    snake_segment_id++;
    return segment;
}

function init_snake() {
    var i;
    var INITIAL_SNAKE_SIZE = 10;
    for (i = 0; i < INITIAL_SNAKE_SIZE-1; i++) {
        snake_coords[i] = {x: BORDER + STEP_SIZE * i, y: BORDER};
        create_snake_segment(snake_coords[i]);
    }
    snake_coords[INITIAL_SNAKE_SIZE] = {x: BORDER + STEP_SIZE * (INITIAL_SNAKE_SIZE-1), y: BORDER};
    var HeadToCreate = create_snake_segment(snake_coords[INITIAL_SNAKE_SIZE]);
    HeadToCreate.attr('src', 'snake_head.png');
}

function move_snake() {
    if (!(r == 1 || u == 1 || d == 1 || l == 1)) {
        return;
    }

    var oldHead = snake_coords[snake_coords.length - 1];
    var newHead = {
        x: oldHead.x,
        y: oldHead.y
    };
    if (r == 1) {
        newHead.x = newHead.x + STEP_SIZE;
    }
    if (l == 1) {
        newHead.x = newHead.x - STEP_SIZE;
    }
    if (u == 1) {
        newHead.y = newHead.y - STEP_SIZE;
    }
    if (d == 1) {
        newHead.y = newHead.y + STEP_SIZE;
    }
    snake_coords[snake_coords.length] = newHead;
    if (newHead.y < BORDER-STEP_SIZE) {
        newHead.y = window.innerHeight - BORDER - STEP_SIZE;
    }
    if (newHead.y > window.innerHeight - BORDER) {
        newHead.y = BORDER - STEP_SIZE;
    }
    if (newHead.x < BORDER) {
        newHead.x = window.innerWidth - BORDER;
    }
    if (newHead.x > window.innerWidth - BORDER) {
        newHead.x = BORDER;
    }
    $('#' + oldHead.id).attr('src', 'elem.png');
    var s = create_snake_segment(newHead);
    s.attr('src', 'snake_head.png');


    var tail = snake_coords.shift();
    $('#' + tail.id).remove();
}

var move_apple = function () {
    var new_Head = snake_coords[snake_coords.length-1];
    if (new_Head.x == apple_Coords.x && new_Head.y == apple_Coords.y) {
        score++;
        randomVal();
//       var tail = snake_coords.shift();
//        $('#'+tail.id).remove();
        $('#score').text(score);
Apple.css({left: apple_Coords.x, top: apple_Coords.y});
    }
};
var create_apple = function () {
    var this_apple = create_snake_segment(apple_Coords);
    this_apple.attr('src', 'apple.png');
    Apple=this_apple;
};


init_snake();
setInterval(move_snake, 100);
create_apple();
setInterval(move_apple,100);


