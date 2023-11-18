function r(min,max)
{
    return Math.floor(Math.random()*(max-min+1))+min;
}
function SecretMain()
{
    document.getElementById("label").remove();
    document.getElementById("setinfo").style.visibility="hidden";
    let name=document.getElementById("needinfo").value.trim();
    document.getElementById("enter").remove();
    let size;
    for(size=r(5,7);name.length+6>size*6-5;size++);
    let table=document.createElement("table");
    document.getElementById("heart").appendChild(table);
    for(let i=0;i<size*2-3+5*size/2;i++)
    {
        let tr=document.createElement("tr");
        table.appendChild(tr);
        for(let j=0;j<size*6-5;j++)
        {
            let td=document.createElement("td");
            td.id=`${i}td${j}`;
            tr.appendChild(td);
        }
    }
    document.body.style.backgroundColor="rgb(0,0,0)";
    for(let i=0;i<size;i++)
    {
        for(let j=size-i-1;j<size-i-1+size+2*i;j++)
        document.getElementById(`${i}td${j}`).style.backgroundColor="rgb(255,0,0)";
        for(let j=size*3-i+size-4;j<size*3-i+size-4+size+2*i;j++)
        document.getElementById(`${i}td${j}`).style.backgroundColor="rgb(255,0,0)";
    }
    let love="I Love My";
    for(let i=size;i<size*2-1;i++)
    {
        for(let j=0;j<(size*6-5);j++)
        document.getElementById(`${i}td${j}`).style.backgroundColor="rgb(255,0,0)";
        if(i==size+Math.floor(size/2)-1)
        for(let j=Math.floor(((size*6-5)-love.length)/2);j<((size*6-5)+love.length)/2;j++)
        document.getElementById(`${i}td${j}`).innerText=""+love.charAt(Math.floor(j-((size*6-5)-love.length)/2));
        else if(i==size+Math.floor(size/2)+1)
        for(let j=Math.floor(((size*6-5)-name.length)/2);j<((size*6-5)+name.length)/2;j++)
        document.getElementById(`${i}td${j}`).innerText=""+name.charAt(Math.floor(j-((size*6-5)-name.length)/2));
    }
    for(let i=size*2-1;i<size*2-3+5*size/2;i++)
    for(let j=i-(size*2-1)+1;j<(size*6-5)-(i-(size*2-1)+1);j++)
    document.getElementById(`${i}td${j}`).style.backgroundColor="rgb(255,0,0)";
    document.getElementById("share").style.visibility="visible";
}
form.addEventListener("submit",function()
{
    SecretMain();
}
);