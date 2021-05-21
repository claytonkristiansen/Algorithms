
var xUnit = 20;
var yUnit = 20;
var width = 20;
var height = 20;


var graph = new Graph(width + 1, height + 1);


canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('canvas'));
var ctx = canvas.getContext('2d');

var gridPainter = new GridPainter();
gridPainter.drawGrid(ctx, graph, xUnit, yUnit, width, height);

// Mouse event handlers (probably should be in a class)
canvas.addEventListener('click', e => {
    // Find nearest grid intersection

    //gridPainter.drawNode(ctx, e.offsetX, e.offsetY, 'blue');
    var nearestY = gridPainter.relativeY(e.offsetY, yUnit);
    var nearestX = gridPainter.relativeX(e.offsetX, xUnit);
    if(graph.Activated(nearestY/yUnit, nearestX/xUnit))
    {
        graph.DeativateVertex(nearestY/yUnit, nearestX/xUnit);
    }
    else
    {
        graph.ActivateVertex(nearestY/yUnit, nearestX/xUnit);
    }
    gridPainter.drawGrid(ctx, graph, xUnit, yUnit, width, height);
    graph.Print();
})

// canvas.addEventListener('dblclick', e => {
//     // Find nearest grid intersection

//     //gridPainter.clearNode(ctx, e.offsetX, e.offsetY, 'blue');
//     var nearestY = gridPainter.relativeY(e.offsetY, yUnit);
//     var nearestX = gridPainter.relativeX(e.offsetX, xUnit);
//     graph.ActivateVertex(nearestY/yUnit, nearestX/xUnit);
//     gridPainter.drawGrid(ctx, graph, xUnit, yUnit, width, height);
//     graph.Print();
// })
