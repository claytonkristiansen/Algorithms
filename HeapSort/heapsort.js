class MPQ
{
    constructor()
    {
        this.elements = [];
    }
    //Returns the left child's index
    static lchild(index)
    {
        return 2 * index + 1;
    }
    //Returns the right child's index
    static rchild(index)
    {
        return 2 * index + 2;
    }
    //Returns parent's index
    static parent(index)
    {
        return Math.abs(Math.trunc((index - 1) / 2));
    }
    swap(index1, index2)
    {
        let temp = this.elements[index1];
        let tempdex = index1;
        this.elements[index1] = this.elements[index2];
        this.elements[index2] = temp;
        index1 = index2;
        index2 = tempdex;
    }

    upheap(index)
    {
        let parentIndex = MPQ.parent(index);
        while(this.elements[parentIndex] > this.elements[index] && index > 0)
        {
            this.swap(index, parentIndex);
            index = parentIndex;
            parentIndex = MPQ.parent(index);
        }
    }

    downheap(index)
    {
        let lcvalue = this.elements[MPQ.lchild(index)];
        let rcvalue = this.elements[MPQ.rchild(index)];
        while(lcvalue < this.elements[index] || rcvalue < this.elements[index] && MPQ.lchild(index) < this.elements.length)
        {
            if(MPQ.rchild(index) >= this.elements.length)
            {
                this.swap(index, MPQ.lchild(index));
            }
            else if(lcvalue < rcvalue)
            {
                this.swap(index, MPQ.lchild(index));
            }
            else
            {
                this.swap(index, MPQ.rchild(index));
            }
            lcvalue = this.elements[MPQ.lchild(index)];
            rcvalue = this.elements[MPQ.rchild(index)];
        }
    }

    push(obj)
    {
        let index = this.elements.push(obj) - 1;
        this.upheap(index);
    }

    pop()
    {
        if(this.elements.length <= 1)
        {
            return this.elements.pop();
        }
        else
        {
            let val = this.elements[0];
            this.elements[0] = this.elements.pop();
            this.downheap(0);
            return val;
        }
    }

    print()
    {
        console.log(this.elements.toString());
    }

    empty()
    {
        if(this.elements.length <= 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

let mpq = new MPQ();
mpq.push(8);
mpq.push(9);
mpq.push(10);
mpq.push(7);
mpq.push(1);
mpq.push(2);
mpq.push(3);
var sortedList = [];
while(!mpq.empty())
{
    sortedList.push(mpq.pop());
    console.log(sortedList.toString());
    mpq.print();
}
let i = 0;
while(i < 10)
{
    console.log(i);
    i++;
}


