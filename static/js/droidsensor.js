var pos = {x: 0, y: 0, z: 0};
var lastpos = {x: 0, y: 0, x: 0};

var initWebSocket = function() { 
    var ws = new WebSocket('ws://192.168.1.13:9000/ws');

    $(window).unload(function() {
	ws.close();
    });

    ws.onopen = function (evt) {
    };

    ws.onmessage = function (evt) {
		//console.log(evt.data.split(' '));
		var position = evt.data.split(' ');
		//$("#canvas").clearCanvas();
		
		//var tXsize=$("#canvas").measureText('X');
		//console.log($("#canvas").measureText('X'));
		$("#canvas").clearCanvas({x: 5, y: 20, width: 1000, height: 32});
		
		
		//var tYsize=$("#canvas").measureText('Y');
		$("#canvas").clearCanvas({x: 5, y: 70, width: 1000, height: 32});
		//var tZsize=$("#canvas").measureText('Z');
		$("#canvas").clearCanvas({x: 5, y: 120, width: 1000, height: 32});
		
		bigText("X: ", position[0], 5, 20);
		bigText("Y: ", position[1], 5, 70);
		bigText("Z: ", position[2], 5, 120);
		
		//drawX(Math.abs(Math.floor(parseFloat(position[0]))));
		//drawY(Math.abs(Math.floor(parseFloat(position[1]))));
		//drawZ(Math.abs(Math.floor(parseFloat(position[2]))));
		PlotTrackXY(lastpos, {x: position[0], y: position[1], z: position[2]});
		lastpos = {x: position[0], y: position[1], z: position[2]};
    };
};

var drawArc = function(pos, value, label) {
    $("#canvas").drawText(
	{
	    strokeStyle: "#000",
	    text: label,
	    x: pos, y: 100
	}
    );
    
    $("#canvas").drawArc(
	{
	    strokeStyle: "#F77B00",
	    strokeWidth: 15,
	    x: pos, y: 200,
	    radius: 50,
	    start: 0, end: value
	}
    );
};

var drawSegment = function(lblx, lbly, x1, x2, y1, y2, label) {
    $("#canvas").drawText(
	{
	    strokeStyle: "#000",
	    text: label,
	    x: lblx, y: lbly
	}
    );

    $("#canvas").drawLine(
	{
	    strokeStyle: "#F77B00",
	    strokeWidth: 2,
	    x1: x1, y1: y1,
	    x2: x2, y2: y2
	}
    );
};

var drawAll = function() {
	$("#canvas").clearCanvas();
    bigText("X: ", 0, 5, 20);
	bigText("Y: ", 0, 5, 70);
	bigText("Z: ", 0, 5, 120);
    //drawX(0);
    //drawY(0);
    //drawZ(0);
};


var drawY = function(y) {
    y = 650 + Math.floor(200 * y / 20);
    drawSegment(880, 300, 650, y, 300, 300, 'y');
};

var drawZ = function(z) {
    z = 300 - Math.floor(170 * z / 20);
    drawSegment(650, 100, 650, 650, 300, z, 'z');
};

var drawX = function(x) {
    var tx = 650 - Math.floor(130 * x / 20);
    var ty = 300 + Math.floor(100 * x / 20);
    drawSegment(500, 410, 650, tx, 300, ty, 'x');
};

var PlotTrackXY = function(lastpos, pos) {
    $("#canvas").drawLine(
	{
		//var phi = 3.14/6;
	    strokeStyle: "#007BF7",
	    strokeWidth: 2,
	    x1: (lastpos.x*0.985+lastpos.y*0.174)*2*0.985+150, y1: 400-((lastpos.y*10*0.174-lastpos.x*0.985)*0.174 + lastpos.z*0.5)*4,
	    x2: (pos.x*0.985+pos.y*0.174)*2*0.985+150, y2: 400-((pos.y*10*0.174-pos.x*0.985)*0.174 + pos.z*0.5)*4
	});
};


var bigText = function(lbl, txt, x,y) {
	$("#canvas").drawText(
		{
			layer: true,
			name: lbl,
			strokeStyle: "#000",
			fontStyle: 'bold',
			fontSize: '24pt',
			fillStyle: '#36c',
			text: lbl+txt,
			align: "left",
			respectAlign: true,
			x: x, y: y
		});
};