
var xUnit = 16;
var yUnit = 16;
var width = 45;
var height = 45;
var clickStatus = false;
var rStatus = false;
var mousePosX;
var mousePosY;

var graph = new Graph(width + 1, height + 1);
canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('canvas'));
var ctx = canvas.getContext('2d');
var gridPainter = new GridPainter(ctx, xUnit, yUnit, width, height);
gridPainter.drawGrid(graph);



canvas.addEventListener('mousedown', e => {
    clickStatus = true;
});

canvas.addEventListener('mouseup', e => {
    var nearestY = gridPainter.relativeY(e.offsetY, yUnit);
    var nearestX = gridPainter.relativeX(e.offsetX, xUnit);
    if(graph.Activated(nearestY/yUnit, nearestX/xUnit))
    {
        graph.DeativateVertex(nearestY/yUnit, nearestX/xUnit);
    }
    else if(!graph.GetVertexChanged(nearestY/yUnit, nearestX/xUnit))
    {
        graph.ActivateVertex(nearestY/yUnit, nearestX/xUnit);
    }
    gridPainter.drawGrid(graph);
    clickStatus = false;
    graph.SetAllNotChanged();
});

document.addEventListener('keydown', (e) => {
    if (!e.repeat && e.code == 'KeyR') {
        rStatus = true;
        console.log("r was pressed");
    }
});

document.addEventListener('keyup', (e) => {
    if(e.code == 'KeyR')
    {
        rStatus = false;
        console.log("r was let go");
    }
    else if(e.code == 'Escape')
    {
        graph.Reset();
        gridPainter.drawGrid(graph);
    }
    else if(e.code == 'KeyP')
    {
        graph.Print();
    }
    else if(e.code == 'KeyS' || e.code == 'KeyB')
    {
        var nearestY = gridPainter.relativeY(mousePosY, yUnit);
        var nearestX = gridPainter.relativeX(mousePosX, xUnit);
        graph.SetBeginVertex(nearestX/xUnit, nearestY/yUnit);
        gridPainter.drawGrid(graph);
    }
    else if(e.code == 'KeyF' || e.code == 'KeyE')
    {
        var nearestY = gridPainter.relativeY(mousePosY, yUnit);
        var nearestX = gridPainter.relativeX(mousePosX, xUnit);
        graph.SetEndVertex(nearestX/xUnit, nearestY/yUnit);
        gridPainter.drawGrid(graph);
    }
    else if(e.code == 'Enter')
    {
        gridPainter.drawGrid(graph);
        gridPainter.DrawPath(graph.DikstrasA());
    }
});

// Mouse event handlers (probably should be in a class)
canvas.addEventListener('mousemove', e => {
    // Find nearest grid intersection
    mousePosY = e.offsetY;
    mousePosX = e.offsetX;
    var nearestY = gridPainter.relativeY(mousePosY, yUnit);
    var nearestX = gridPainter.relativeX(mousePosX, xUnit);
    if(!graph.GetVertexChanged(nearestY/yUnit, nearestX/xUnit) && (clickStatus || rStatus))
    {
        if(graph.Activated(nearestY/yUnit, nearestX/xUnit) && clickStatus)
        {
            graph.DeativateVertex(nearestY/yUnit, nearestX/xUnit);
        }
        else if(!graph.Activated(nearestY/yUnit, nearestX/xUnit) && rStatus)
        {
            graph.ActivateVertex(nearestY/yUnit, nearestX/xUnit);
        }
        graph.GetVertex(nearestY/yUnit, nearestX/xUnit).SetJustChanged(true);
        gridPainter.drawGrid(graph);
    }
    
});

points = [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [3, 3], [4, 4], [4, 5], [5, 5], [4, 7], [5, 7]];

