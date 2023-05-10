var btn= document.getElementById('btn');
var textarea= document.getElementById('textarea');
var output= document.getElementById('output');
var select= document.getElementById('select');
var python= document.getElementById('0');
var javascript= document.getElementById('4');
var c= document.getElementById('7');
var cpp= document.getElementById('77');
var java= document.getElementById('8');
var id=0;
var res,resu;
btn.addEventListener('click', fun);

function fun()
{
    var lang=select.selectedIndex;
    if(lang == 0)
    {
        id=0;
    }
    if(lang == 1)
    {
        id=4;
    }
    if(lang == 2)
    {
        id=7;
    }
    if(lang == 3)
    {
        id=77;
    }
    if(lang == 4)
    {
        id=8;
    }
    
    var obj= {
        code: textarea.value,
        langId: ""+id
    }
    
    var url= "https://codequotient.com/api/executeCode";
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify(obj));

    request.addEventListener('load', function(){
        res=JSON.parse(request.responseText);
    });

   var interval= setInterval(function(){

    url= `https://codequotient.com/api/codeResult/${res.codeId}`;
    request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();

        request.addEventListener('load', function(){
            resu=JSON.parse(request.responseText);
            var newres=JSON.parse(resu.data);
            if(newres.output=='')
            {
                output.innerText= newres.errors;
                clearInterval(interval);
            }
            else if(newres.errors==''){
                output.innerText= newres.output;
                clearInterval(interval);
            }
            
        });


   },1000);

    
    




}