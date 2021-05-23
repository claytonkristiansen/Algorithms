
const MAX_PATH_LENGTH = 2**32;
const SQRT_2 = Math.sqrt(2);

class VMPQ //Will base on binary heap later
{
    array = [];
    constructor() {}

    Push(element)
    {
        this.array.push(element);
        return element;
    }
    Pop()
    {
        if(this.array.length > 0)
        {
            let min = this.array[0];
            var minDex = 0;
            for(let i = 0; i < this.array.length; i++)
            {
                if(this.array[i].distance < min.distance)
                {
                    min = this.array[i];
                    minDex = i;
                }
            }
            this.array.splice(minDex, 1);
            return min;
        }
    }
    Empty()
    {
        if(this.array.length == 0)
        {
            return true;
        }
        return false;
    }
}

class Vertex
{
    distance = MAX_PATH_LENGTH;
    Activated = true;
    prevVertex = undefined;
    JustChanged = false;
    ID;
    adjacencyList;


    constructor(ID, adjacentL)
    {
        this.ID = ID;
        this.adjacencyList = adjacentL;
    }
    Activate()
    {
        this.Activated = true;
    }
    Deactivate()
    {
        this.Activated = false;
    }
    Toggle()
    {
        if(this.Activated == true)
        {
            this.Activated = false;
        }
        else
        {
            this.Activated = true;
        }
    }
    IsActivated()
    {
        return this.Activated;
    }
    GetID()
    {
        return this.ID;
    }
    SetJustChanged(status)
    {
        this.JustChanged = status;
    }
    GetJustChanged()
    {
        return this.JustChanged;
    }
}

class Edge
{
    toVertex;
    weight;
    constructor(to, w)
    {
        this.toVertex = to;
        this.weight = w;
    }
}


class Graph
{
    beginVertex;
    endVertex;
    constructor(height, width)
    {
        this.height = height;
        this.width = width;
        this.vertices = [];
        for(let i = 0; i < height; i++)
        {
            for(let k = 0; k < width; k++)
            {
                if(0 < i && i < height - 1 && 0 < k && k < width - 1)
                {
                    this.vertices.push(new Vertex([i, k], [ new Edge([i - 1, k - 1], SQRT_2),    new Edge([i - 1, k], 1),    new Edge([i - 1, k + 1], SQRT_2),
                                                            new Edge([i,     k - 1], 1),                                new Edge([i,     k + 1], 1),
                                                            new Edge([i + 1, k - 1], SQRT_2),    new Edge([i + 1, k], 1),    new Edge([i + 1, k + 1], SQRT_2)     ]));
                }
                if(0 < i && i < height - 1 && k == 0)
                {
                    this.vertices.push(new Vertex([i, k], [                                 new Edge([i - 1, k], 1),    new Edge([i - 1, k + 1], SQRT_2),
                                                                                                                        new Edge([i,     k + 1], 1),
                                                                                            new Edge([i + 1, k], 1),    new Edge([i + 1, k + 1], SQRT_2)     ]));
                }
                if(0 < i && i < height - 1 && k == width - 1)
                {
                    this.vertices.push(new Vertex([i, k], [ new Edge([i - 1, k - 1], SQRT_2),    new Edge([i - 1, k], 1),
                                                            new Edge([i,     k - 1], 1),             
                                                            new Edge([i + 1, k - 1], SQRT_2),    new Edge([i + 1, k], 1)                                 ]));
                }
                else if(i == 0 && 0 < k && k < width - 1)
                {
                    this.vertices.push(new Vertex([i, k], [ 
                                                            new Edge([i,     k - 1], 1),                                new Edge([i,     k + 1], 1),
                                                            new Edge([i + 1, k - 1], SQRT_2),    new Edge([i + 1, k], 1),    new Edge([i + 1, k + 1], SQRT_2)     ]));
                }
                else if(i == 0 && k == 0)
                {
                    this.vertices.push(new Vertex([i, k], [ 
                                                                                                                        new Edge([i,     k + 1], 1),
                                                                                            new Edge([i + 1, k], 1),    new Edge([i + 1, k + 1], SQRT_2)     ]));
                }
                else if(i == 0 && k == width - 1)
                {
                    this.vertices.push(new Vertex([i, k], [ 
                                                            new Edge([i,     k - 1], 1),             
                                                            new Edge([i + 1, k - 1], SQRT_2),    new Edge([i + 1, k], 1)                                    ]));
                }
                else if(i == height - 1 && 0 < k && k < width - 1)
                {
                    this.vertices.push(new Vertex([i, k], [ new Edge([i - 1, k - 1], SQRT_2),    new Edge([i - 1, k], 1),    new Edge([i - 1, k + 1], SQRT_2),
                                                            new Edge([i,     k - 1], 1),                                new Edge([i,     k + 1], 1) 
                                                                                                                                            ]));
                }
                else if(i == height - 1 && k == 0)
                {
                    this.vertices.push(new Vertex([i, k], [                                 new Edge([i - 1, k], 1),    new Edge([i - 1, k + 1], SQRT_2),
                                                                                                                        new Edge([i,     k + 1], 1) 
                                                                                                                                            ]));
                }
                else if(i == height - 1 && k == width - 1)
                {
                    this.vertices.push(new Vertex([i, k], [ new Edge([i - 1, k - 1], SQRT_2),    new Edge([i - 1, k], 1),
                                                            new Edge([i,     k - 1], 1)                             
                                                                                                                                            ]));
                }
            }
        }
        
        this.beginVertex = this.GetVertex(0, 0);
        this.endVertex = this.GetVertex(height - 1, width - 1);
    }
    BuildFromFile(inputFileName)
    {
        this.vertices = [];
        const fs = require('fs');
        const util = require('util');

        // Convert fs.readFile into Promise version of same    
        const readFile = util.promisify(fs.readFile);

        function getStuff() 
        {
            return readFile(inputFileName);
        }

        // Can't use `await` outside of an async function so you need to chain
        // with then()
        getStuff().then(data => 
            {
                var dataString = data.toString();
                var adjacencyLists = dataString.split("\n");
                for(var i = 0; i < adjacencyLists.length; i++)
                {
                    var line = adjacencyLists[i].split(" ");
                    this.vertices.push(new Vertex(line.shift(), line));
                }
                // this.Print();
            })

        
    }

    SetBeginVertex(xIndex, yIndex)
    {
        if(yIndex >= 0 && yIndex < this.height && xIndex >= 0 && xIndex < this.width)
        {
            this.beginVertex = this.vertices[yIndex * this.width + xIndex];
        }
    }

    SetEndVertex(xIndex, yIndex)
    {
        if(yIndex >= 0 && yIndex < this.height && xIndex >= 0 && xIndex < this.width)
        {
            this.endVertex = this.vertices[yIndex * this.width + xIndex];
        }
    }

    Reset()
    {
        for(let i = 0; i < this.vertices.length; i++)
        {
            this.vertices[i].Activate();
            this.beginVertex = this.GetVertex(0, 0);
            this.endVertex = this.GetVertex(height, width);
        }
    }

    GetVertex(yPos, xPos)
    {
        if(yPos >= 0 && yPos < this.height && xPos >= 0 && xPos < this.width)
        {
            return this.vertices[yPos * this.width + xPos];
        }
    }

    GetVertexChanged(yPos, xPos)
    {
        if(yPos >= 0 && yPos < this.height && xPos >= 0 && xPos < this.width)
        {
            return this.vertices[yPos * this.width + xPos].GetJustChanged();
        }
        return true;
    }

    Activated(yPos, xPos)
    {
        if(yPos >= 0 && yPos < this.height && xPos >= 0 && xPos < this.width)
        {
            return this.vertices[yPos * this.width + xPos].IsActivated();
        }
    }

    ActivateVertex(yPos, xPos)
    {
        if(yPos >= 0 && yPos < this.height && xPos >= 0 && xPos < this.width)
        {
            this.vertices[yPos * this.width + xPos].Activate();
        }
    }

    DeativateVertex(yPos, xPos)
    {
        if(yPos >= 0 && yPos < this.height && xPos >= 0 && xPos < this.width)
        {
            this.vertices[yPos * this.width + xPos].Deactivate();
        }
    }

    StringifyEdgeList(edgeList)
    {
        var StringList = []
        for(let i = 0; i < edgeList.length; i++)
        {
            var status = "";
            var IDTouple = edgeList[i].toVertex;
            if(this.vertices[IDTouple[0] * this.width + IDTouple[1]].Activated)
            {
                status = "On ";
            }
            else
            {
                status = "Off";
            }
            StringList.push(" {[" + edgeList[i].toVertex + "]:" + edgeList[i].weight + "-(" + status + ")}");
        }
        return StringList;
    }

    SetAllNotChanged()
    {
        for(let i = 0; i < this.vertices.length; i++)
        {
            this.vertices[i].SetJustChanged(false);
        }
    }

    Print()
    {
        for(var i = 0; i < this.vertices.length; i++)
        {
            console.log(this.vertices[i].ID + ":" + this.StringifyEdgeList(this.vertices[i].adjacencyList));
        }
    }
}

function Relax(fromV, edge)
{
    if(graph.GetVertex(edge.toVertex[0], edge.toVertex[1]).distance > fromV.distance + edge.weight)
    {
        graph.GetVertex(edge.toVertex[0], edge.toVertex[1]).distance = fromV.distance + edge.weight; 
        graph.GetVertex(edge.toVertex[0], edge.toVertex[1]).prevVertex = fromV;
    }
}

function DikstrasA(graph)
{
    var set1 = new Set([]);
    let mpq = new VMPQ();
    for(let i = 0; i < graph.vertices.length; i++)
    {
        graph.vertices[i].distance = MAX_PATH_LENGTH;
        graph.vertices[i].prevVertex = undefined;
    }
    graph.beginVertex.distance = 0;
    for(let i = 0; i < graph.vertices.length; i++)
    {
        if(graph.vertices[i].Activated)
        {
            mpq.Push(graph.vertices[i]);
        }
    }
    while(!mpq.Empty())
    {
        curr = mpq.Pop();
        set1.add(curr);
        for(let i = 0; i < curr.adjacencyList.length; i++)
        {
            if(graph.Activated(curr.adjacencyList[i].toVertex[0], curr.adjacencyList[i].toVertex[1]))
            {
                Relax(curr, curr.adjacencyList[i])
            }
        }
    }
}

function ShortestPathPoints(graph, toVertexID)
{
    IDList = [toVertexID];
    var currVertex = graph.GetVertex(toVertexID[0], toVertexID[1]);
    while(currVertex.prevVertex != undefined)
    {
        var prevVertex = currVertex.prevVertex;
        var prevID = prevVertex.GetID();
        
        IDList.push(prevID);
        currVertex = prevVertex;
    }
    return IDList;
}
