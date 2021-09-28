const fs = require("fs");

var data = fs.readFileSync("notes.json");
var obj = JSON.parse(data);

var args = process.argv.slice(2);

try{
    if(args[0] === "add"){
        var title = args[1].split("=");
        var body = args[2].split("=");
    
        let newData= {
            title: title[1],
            body: body[1],
        }
    
        obj.push(newData);
        var noteData = JSON.stringify(obj);
        fs.writeFile("notes.json",noteData, (err)=> {
            if (err) throw err;
        });
        console.log("New Note Created!");
    
    } else if(args[0] === "remove"){
        var titleRem = args[1].split("=");
        console.log(titleRem);
    
        fs.readFile("notes.json", (err,data)=>{
            if (err) throw err;
            myobj = JSON.parse(data);
            var filtered = myobj.filter((item)=>{
                return item.title!== titleRem[1];
            });
            console.log(filtered);
            var noteRem = JSON.stringify(filtered);
            fs.writeFile("notes.json", noteRem,(err)=>{
                if (err) throw err;
                console.log("Note Removed");
            });
        });
    
    } else if (args[0] === "list") {
        fs.readFile("notes.json", (err, data) => {
            if (err) throw err;
            myobj = JSON.parse(data);
            console.log("Your Notes:");
            for (let i = 0; i < myobj.length; i++) {
                console.log(myobj[i].title);
            }      
        }) 
    
    
    } else if (args[0] === "read"){
        var titleRead = args[1].split("=");
        console.log(titleRead);
        fs.readFile("notes.json", (err, data)=>{
            if (err) throw err;
            myobj = JSON.parse(data);
            var result = myobj.filter(function(e){return e.title==titleRead[1]})
            console.log(result[0].body);
        })
    }
    else{
        console.log("Try Again!");
    }
}
catch (error) {
    console.log("Invalid Input!!");
}