


class MPQ //Will base on binary heap later
{
    sortedArray = [];
    constructor() {}

    Insert(element)
    {
        len = this.sortedArray.length;
        for(i = 0; i < len; i++)
        {
            if(element < this.sortedArray[i])
            {
                this.sortedArray.splice(i, 0, element);
                return element;
            }
        }
        this.sortedArray.push(element);
        return element;
    }
    RemoveMin()
    {
        if(this.sortedArray.length > 0)
        {
            return this.sortedArray.shift();
        }
    }
}

class Vertex
{
    Activated = true;
    Visited = false;
    JustChanged = false;
    ID;
    adjacencyList;
    // constructor(ID)
    // {
    //     this.ID = ID;
    //     this.adjacencyList = [];
    // }
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
                    this.vertices.push(new Vertex([i, k], [ new Edge([i - 1, k - 1], 1),    new Edge([i - 1, k], 1),    new Edge([i - 1, k + 1], 1),
                                                            new Edge([i,     k - 1], 1),                                new Edge([i,     k + 1], 1),
                                                            new Edge([i + 1, k - 1], 1),    new Edge([i + 1, k], 1),    new Edge([i + 1, k + 1], 1)     ]));
                }
                if(0 < i && i < height - 1 && k == 0)
                {
                    this.vertices.push(new Vertex([i, k], [                                 new Edge([i - 1, k], 1),    new Edge([i - 1, k + 1], 1),
                                                                                                                        new Edge([i,     k + 1], 1),
                                                                                            new Edge([i + 1, k], 1),    new Edge([i + 1, k + 1], 1)     ]));
                }
                if(0 < i && i < height - 1 && k == width - 1)
                {
                    this.vertices.push(new Vertex([i, k], [ new Edge([i - 1, k - 1], 1),    new Edge([i - 1, k], 1),
                                                            new Edge([i,     k - 1], 1),             
                                                            new Edge([i + 1, k - 1], 1),    new Edge([i + 1, k], 1)                                 ]));
                }
                else if(i == 0 && 0 < k && k < width - 1)
                {
                    this.vertices.push(new Vertex([i, k], [ 
                                                            new Edge([i,     k - 1], 1),                                new Edge([i,     k + 1], 1),
                                                            new Edge([i + 1, k - 1], 1),    new Edge([i + 1, k], 1),    new Edge([i + 1, k + 1], 1)     ]));
                }
                else if(i == 0 && k == 0)
                {
                    this.vertices.push(new Vertex([i, k], [ 
                                                                                                                        new Edge([i,     k + 1], 1),
                                                                                            new Edge([i + 1, k], 1),    new Edge([i + 1, k + 1], 1)     ]));
                }
                else if(i == 0 && k == width - 1)
                {
                    this.vertices.push(new Vertex([i, k], [ 
                                                            new Edge([i,     k - 1], 1),             
                                                            new Edge([i + 1, k - 1], 1),    new Edge([i + 1, k], 1)                                    ]));
                }
                else if(i == height - 1 && 0 < k && k < width - 1)
                {
                    this.vertices.push(new Vertex([i, k], [ new Edge([i - 1, k - 1], 1),    new Edge([i - 1, k], 1),    new Edge([i - 1, k + 1], 1),
                                                            new Edge([i,     k - 1], 1),                                new Edge([i,     k + 1], 1) 
                                                                                                                                            ]));
                }
                else if(i == height - 1 && k == 0)
                {
                    this.vertices.push(new Vertex([i, k], [                                 new Edge([i - 1, k], 1),    new Edge([i - 1, k + 1], 1),
                                                                                                                        new Edge([i,     k + 1], 1) 
                                                                                                                                            ]));
                }
                else if(i == height - 1 && k == width - 1)
                {
                    this.vertices.push(new Vertex([i, k], [ new Edge([i - 1, k - 1], 1),    new Edge([i - 1, k], 1),
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

// var graph = new Graph(10, 10);
// graph.DeativateVertex(3, 7);
// graph.DeativateVertex(0, 0);
// graph.Print();