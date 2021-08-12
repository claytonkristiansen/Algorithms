var processingFlag = false;

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
        while((MPQ.lchild(index) < this.elements.length && lcvalue < this.elements[index]) || (MPQ.rchild(index) < this.elements.length && rcvalue < this.elements[index]))
        {
            if(lcvalue > rcvalue)
            {
                this.swap(index, MPQ.rchild(index));
                index = MPQ.rchild(index);
            }
            else
            {
                this.swap(index, MPQ.lchild(index));
                index = MPQ.lchild(index);
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
    
    toString()
    {
        var str = "[";
        let i = 0;
        while(i < this.elements.length)
        {
            if(i >= this.elements.length - 1)
            {
                str += this.elements[i];
            }
            else
            {
                str += this.elements[i] + " | ";
            }
            i++;
        }
        str += "]";
        return str;
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
    clear()
    {
        this.elements = [];
        processingFlag = false;
    }
}



let mpq = new MPQ();
var sortedList = [];

function logHTML(text)
{
    document.getElementById("outputtext").innerHTML += text + "<br />";
}

function PrintArray(arr)
{
    var str = "[";
    let i = 0;
    while (i < arr.length)
    {
        if(i >= arr.length - 1)
        {
            str += arr[i];
        }
        else
        {
            str += arr[i] + ", ";
        }
        i++;
    }
    str += "]";
    return str;
}

function myPrint(mpq, sortedList, time)
{
    var str =   "MPQ: " + mpq.toString() + "<br />" +
                "Sorted List: " + PrintArray(sortedList) + "<br />";
    if(time > 0)
    {
        str += "Total time elapsed: " + time + " ms<br />";
    }
    document.getElementById("outputtext").innerHTML = str;       
}

myPrint(mpq, sortedList, 0);

function onclickadd(val)
{
    if(isNaN(val) || processingFlag)
    {
        document.getElementById("valinput").value = "";
    }
    else if(val != "")
    {
        mpq.push(Number(val));
        myPrint(mpq, sortedList, 0);
        document.getElementById("valinput").value = "";
    }
}
function oninputkeypress(event, val)
{
    if(isNaN(val) || processingFlag)
    {
        if(event.keyCode == "13")
        {
            document.getElementById("valinput").value = "";
        }
    }
    else if(val != "")
    {
        if(event.keyCode == "13")
        {
            mpq.push(Number(val));
            myPrint(mpq, sortedList, 0);
            document.getElementById("valinput").value = "";
        }
}
    }

function onclicknext()
{
    if(!mpq.empty())
    {
        document.getElementById("valinput").disabled = "true";
        processingFlag = true;
        sortedList.push(mpq.pop());
        myPrint(mpq, sortedList, 0);
    }
}

function onclickrun()
{
    var t0 = performance.now();
    var orderedList = [];
    while(!mpq.empty())
    {
        orderedList.push(mpq.pop());
    }
    var t1 = performance.now();
    var totalTime = (t1 - t0);
    myPrint(mpq, orderedList, totalTime);
}

function onclickreset()
{
    processingFlag = false;
    document.getElementById("valinput").removeAttribute("disabled");
    mpq.clear();
    sortedList = [];
    myPrint(mpq, sortedList, 0);
}

// mpq.push("4");
// mpq.push("23");
// mpq.push(324);
// mpq.push(543);
// mpq.push(31);
// mpq.push(3);
// mpq.push(1);
// mpq.push(134);
// mpq.push(32);
// mpq.push(12);
// mpq.push(12);
// mpq.push(21);
// mpq.push(32);
// mpq.push(34);
// console.log(mpq.elements);
// mpq.pop()
// console.log(mpq.elements);
// mpq.pop()
// console.log(mpq.elements);
// mpq.pop()
// console.log(mpq.elements);
// mpq.pop()
// console.log(mpq.elements);
// mpq.pop()
// console.log(mpq.elements);
// mpq.pop()
// console.log(mpq.elements);