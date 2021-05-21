
var xUnit = 32;
var yUnit = 32;
var width = 16;
var height = 16;
var clickStatus = false;
var rStatus = false;

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
    if (!e.repeat && e.key == 'r') {
        rStatus = true;
        console.log("r was pressed");
    }
});

document.addEventListener('keyup', (e) => {
    if(e.key == 'r')
    {
        rStatus = false;
        console.log("r was let go");
    }
    else if(e.code == 'Escape')
    {
        graph.Reset();
        gridPainter.drawGrid(graph);
    }
    else if(e.code = 'p')
    {
        graph.Print();
    }
    
});

// Mouse event handlers (probably should be in a class)
canvas.addEventListener('mousemove', e => {
    // Find nearest grid intersection
    var nearestY = gridPainter.relativeY(e.offsetY, yUnit);
    var nearestX = gridPainter.relativeX(e.offsetX, xUnit);
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

