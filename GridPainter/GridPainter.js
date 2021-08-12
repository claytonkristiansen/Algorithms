class GridPainter 
{
    xOffset = 10;
    yOffset = 10;
    ctx
    graph
    xUnit
    yUnit
    width
    height
    constructor(/** @type {CanvasRenderingContext2D} */ ctx, xUnit, yUnit, width, height) 
    {
        this.ctx = ctx;
        this.xUnit = xUnit;
        this.yUnit = yUnit;
        this.width = width;
        this.height = height;
    }

    relativeX(x)
    {
        return Math.round((x - this.xOffset) / this.xUnit) * this.xUnit;
    }
    relativeY(y, yUnit)
    {
        return Math.round((y - this.yOffset) / this.yUnit) * this.yUnit;;
    }

    drawLine(startX, startY, endX, endY, lineWidth, strokeStyle) 
    {
        this.ctx.beginPath();
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.lineWidth = lineWidth;
        this.ctx.moveTo(startX + this.xOffset, startY + this.yOffset);
        this.ctx.lineTo(endX + this.xOffset, endY + this.yOffset);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawNode(x, y, fillStyle) 
    {
        var nearestX = Math.round((x - this.xOffset) / this.xUnit) * this.xUnit;
        var nearestY = Math.round((y - this.yOffset) / this.yUnit) * this.yUnit;
        this.ctx.fillStyle = fillStyle;
        this.ctx.beginPath();
        this.ctx.fillRect(nearestX - 3 + this.xOffset, nearestY - 3 + this.yOffset, 6, 6);
        this.ctx.closePath();
    }

    clearNode(x, y) 
    {
        var nearestX = Math.round((x - this.xOffset) / this.xUnit) * this.xUnit;
        var nearestY = Math.round((y - this.yOffset) / this.yUnit) * this.yUnit;
        this.ctx.beginPath();
        this.ctx.clearRect(nearestX - 3 + this.xOffset, nearestY - 3 + this.yOffset, 6, 6);
        this.drawLine(nearestX - 3, nearestY, nearestX + 3, nearestY, 1, 'gray');
        this.drawLine(nearestX, nearestY - 3, nearestX, nearestY + 3, 1, 'gray');
        this.ctx.closePath();
    }

    drawGrid(graph)
    {
        this.ctx.clearRect(this.xOffset - 3, this.yOffset - 3, this.width * this.xUnit + this.xOffset + 3, this.height * this.yUnit + this.yOffset + 3);
        for (let index = 0; index < (this.width + 1); index++) 
        {
            var startX = index * this.xUnit;
            var startY = 0;
            var endX = startX;
            var endY = this.height * this.yUnit;
            this.drawLine(startX, startY, endX, endY, 1, 'gray');
        }
        for (let index = 0; index < (this.width + 1); index++) 
        {
            var startX = 0;
            var startY = index * this.yUnit;
            var endX = this.width * this.xUnit;
            var endY = startY;
            this.drawLine(startX, startY, endX, endY, 1, 'gray');
        }
        for(let i = 0; i <= this.height; i++)
        {
            for(let k = 0; k <= this.width; k++)
            {
                if(!graph.Activated(i, k))
                {
                    this.drawNode(this.xUnit * k + this.xOffset, this.yUnit * i + this.yOffset, 'black');
                }
                if(graph.GetVertex(i, k) == graph.beginVertex)
                {
                    this.drawNode(this.xUnit * k + this.xOffset, this.yUnit * i + this.yOffset, 'green');
                }
                if(graph.GetVertex(i, k) == graph.endVertex)
                {
                    this.drawNode(this.xUnit * k + this.xOffset, this.yUnit * i + this.yOffset, 'red');
                }
            }
        }
    }

    DrawPath(pointArr)
    {
        for(let i = 0; i < pointArr.length - 1; i++)
        {
            this.drawLine(  pointArr[i][1] * this.xUnit, pointArr[i][0] * this.yUnit,
                            pointArr[i + 1][1] * this.xUnit, pointArr[i + 1][0] * this.yUnit, 
                            2, 'blue');
        }
    }
}


