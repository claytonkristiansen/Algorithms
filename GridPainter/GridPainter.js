class GridPainter 
{
    xOffset = 10;
    yOffset = 10;
    constructor() 
    {
    }

    relativeX(x, xUnit)
    {
        return Math.round((x - this.xOffset) / xUnit) * xUnit;
    }
    relativeY(y, yUnit)
    {
        return Math.round((y - this.yOffset) / yUnit) * yUnit;;
    }

    drawLine(ctx, startX, startY, endX, endY, lineWidth, strokeStyle) 
    {
        ctx.beginPath();
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.moveTo(startX + this.xOffset, startY + this.yOffset);
        ctx.lineTo(endX + this.xOffset, endY + this.yOffset);
        ctx.stroke();
        ctx.closePath();
    }

    drawNode(/** @type {CanvasRenderingContext2D} */ ctx, x, y, fillStyle) 
    {
        var nearestX = Math.round((x - this.xOffset) / xUnit) * xUnit;
        var nearestY = Math.round((y - this.yOffset) / yUnit) * yUnit;
        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        ctx.fillRect(nearestX - 3 + this.xOffset, nearestY - 3 + this.yOffset, 6, 6);
        ctx.closePath();
    }

    clearNode(/** @type {CanvasRenderingContext2D} */ ctx, x, y) 
    {
        var nearestX = Math.round((x - this.xOffset) / xUnit) * xUnit;
        var nearestY = Math.round((y - this.yOffset) / yUnit) * yUnit;
        ctx.beginPath();
        ctx.clearRect(nearestX - 3 + this.xOffset, nearestY - 3 + this.yOffset, 6, 6);
        this.drawLine(ctx, nearestX - 3, nearestY, nearestX + 3, nearestY, 1, 'gray');
        this.drawLine(ctx, nearestX, nearestY - 3, nearestX, nearestY + 3, 1, 'gray');
        ctx.closePath();
    }

    drawGrid(/** @type {CanvasRenderingContext2D} */ ctx, graph, spacingX, spacingY, widthInCells, heightInCells)
    {
        ctx.clearRect(this.xOffset - 3, this.yOffset - 3, widthInCells * spacingX + this.xOffset + 3, heightInCells * spacingY + this.yOffset + 3);
        for (let index = 0; index < (widthInCells + 1); index++) 
        {
            var startX = index * spacingX;
            var startY = 0;
            var endX = startX;
            var endY = heightInCells * spacingY;
            this.drawLine(ctx, startX, startY, endX, endY, 1, 'gray');
        }
        for (let index = 0; index < (widthInCells + 1); index++) 
        {
            var startX = 0;
            var startY = index * spacingY;
            var endX = widthInCells * spacingX;
            var endY = startY;
            this.drawLine(ctx, startX, startY, endX, endY, 1, 'gray');
        }
        for(let i = 0; i <= heightInCells; i++)
        {
            for(let k = 0; k <= widthInCells; k++)
            {
                if(!graph.Activated(i, k))
                {
                    this.drawNode(ctx, spacingX * k + this.xOffset, spacingY * i + this.yOffset, 'blue');
                }
            }
        }
    }
}


