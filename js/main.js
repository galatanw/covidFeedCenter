const table=document.getElementById("table")

const addDiv=document.getElementById("personAdded")

const addBtn=document.getElementById("addBtn")

const addTxt=document.getElementsByClassName("addFirstRow")

const searchDiv=document.getElementById("personOutput")

const searchH1=document.getElementById("searchH1")


const searchBtn=document.getElementById("searchBtn")

const searchName=document.getElementById("searchName")

const searchTxt=document.getElementsByClassName("searchFirstRow")

const firstName=document.getElementById("firstName")

const lastName=document.getElementById("lastName")

const yearOfBirth=document.getElementById("yearOfBirth")

const ID=document.getElementById("ID")

const city=document.getElementById("city")

const inputs=document.getElementsByClassName("styledInput")

const radioInput=document.getElementsByClassName("radioInput")

const fixData=document.getElementById("fixData")

const reset=document.getElementById("reset")

const update=document.getElementById("update")

const file=document.getElementById("file")

const subjects=[]



// addbtn
addBtn.onclick=function () {
searchDiv.style.display="none"
fixData.innerHTML=""
let status ;
function radioCheack() {
        for (let i = 0; i < 2; i++) {
            if(radioInput[i].checked==true) { 
                status=i  
                return true
            }
        }
        fixData.innerHTML+="you must choose a status option<br>"
        return false
}             
function inputCheack() {
    let wrongFirstName="your first name  is your private name, <br> you must write one word<br>(CORRECT:GAL WRONG: GAL ATANW)<br>"
    let wronglastName="your last name  is your family name, <br> you must write one word<br>(CORRECT:GAL ATANW WRONG: GAL )<br>"
    let wrongYear="please unsert your birth year only<br>(CORRECT:2001 WRONG:01012001)<br>"        
    let x=inputs.length
            for (let i = 0; i <x ; i++) {
                if(inputs[i].value==""){
                    fixData.innerHTML+="please fill all Fields <br>"
                    return false  
                }
            }  
            if(firstName.value.indexOf(" ")>-1){
                  fixData.innerHTML+=wrongFirstName
                    if(lastName.value.indexOf(" ")>-1){
                        fixData.innerHTML+=wronglastName
                        if(Number(yearOfBirth.value)<1901 || Number(yearOfBirth.value)>2021 ){
                            fixData.innerHTML+=wrongYear
                            return "unqualified"
                        }}
                    if(Number(yearOfBirth.value)<1901 || Number(yearOfBirth.value)>2021 ){
                        fixData.innerHTML+="please your birth year only(CORRECT:2001 WRONG:01012001)"
                        return "unqualified"
                    }
                return "unqualified"
            }
            
               if(lastName.value.indexOf(" ")>-1){
                fixData.innerHTML+=wronglastName
                if(Number(yearOfBirth.value)<1901 || Number(yearOfBirth.value)>2021 ){
                    fixData.innerHTML+=wrongYear
                    return "unqualified"
                }
                return "unqualified"
               }
               if(Number(yearOfBirth.value)<1901 || Number(yearOfBirth.value)>2021 ){
                fixData.innerHTML+=wrongYear
                return "unqualified"
               }
            return true
            
}        
function cheackForID() {
    
    let l=subjects.length;
    let id=ID.value;
    for (let i = 0; i < l; i++) {
        if (id==subjects[i][0].myId) {
            return  true
        }
        }       
    
     if(id.length!=9&&id.length>0){
        fixData.innerHTML+="ID must contain all 9 digits only <br>"
        return "unqualified"
    }
    return false
}
let radioCheackResult=radioCheack();
let inputCheackResult=inputCheack();
let cheackForIDResult=cheackForID();
let t=new Date()

function newPerson () {
    subjects.push(
        [{firstName:firstName.value.toUpperCase(),
            lastName:lastName.value.toUpperCase(),
            yearOfBirth:yearOfBirth.value,
            myId:ID.value,
            city:city.value.toUpperCase(),
            uploadTime:t,
            vaccine:status,
            status:file.value
        }]

    )
}
// subject forming
if(inputCheackResult==true&&radioCheackResult==true){
    if(cheackForIDResult==false){
            newPerson()
            addDiv.style.display="block"
               addTxt[0].innerHTML= subjects[subjects.length-1][0].firstName                
               addTxt[1].innerHTML= subjects[subjects.length-1][0].lastName                
               addTxt[2].innerHTML=subjects[subjects.length-1][0].yearOfBirth                
               addTxt[3].innerHTML=subjects[subjects.length-1][0].myId    
               addTxt[4].innerHTML=subjects[subjects.length-1][0].city  
               addTxt[5].innerHTML=t.toUTCString()
        fixData.innerHTML="look up ;) ^"
        
    }
       else if(cheackForIDResult==true){
           alert(`"hey ${firstName.value}, you are already in the system just update"`)
           addDiv.style.display="none"
       } 

}    
}



// searchbtn
searchBtn.onclick=function () {
addDiv.style.display="none"
table.innerHTML=""
fixData.innerHTML=""
 let mySearchName=searchName.value.toUpperCase(),a=mySearchName.indexOf(" "),l=subjects.length,OneNameMatch,namesForSearch=[],fullName=[] 
// div cleaner
for (let i = 0; i < 6; i++) {
        searchTxt[i].innerHTML=""  
}
// white space loop + creates full name
if(l>0){
for (let i = 0; i <1; i++) { 
    if(a>-1){
        let b=mySearchName.indexOf(" ",(a+1)) 
            if(b>-1){
                let c=mySearchName.indexOf(" ",(b+1))
                    if(c>-1){

                        let searchFirstName=mySearchName.slice(0,a)
                        let searchSecondName =mySearchName.slice(c+1)
                        fullName.push(searchFirstName)
                        fullName.push(searchSecondName)
                        break
                    }

                let searchFirstName=mySearchName.slice(0,a)
                let searchSecondName =mySearchName.slice(b+1)
                fullName.push(searchFirstName)
                fullName.push(searchSecondName)
                break
            }
        let searchFirstName=mySearchName.slice(0,a)
        let searchSecondName =mySearchName.slice(a+1) 
        fullName.push(searchFirstName)
        fullName.push(searchSecondName)
            break
        } 
           fullName=mySearchName               
    }
}
else{
    alert(" My list is empty :/ ...")
    return
}
let noone=null  ;
// full name match loop
for (let i = 0; i < l; i++) { 
        if(fullName[1]==subjects[i][0].firstName && fullName[0]==subjects[i][0].lastName){
            namesForSearch.push({
                firstName:subjects[i][0].firstName,
                lastName:subjects[i][0].lastName,
                yearOfBirth:subjects[i][0].yearOfBirth,
                myId:subjects[i][0].myId,
                city:subjects[i][0].city,
                date:subjects[i][0].uploadTime})
                OneNameMatch= i
        } 
        if(fullName[0]==subjects[i][0].firstName && fullName[1]==subjects[i][0].lastName){
            namesForSearch.push({
                firstName:subjects[i][0].firstName,
                lastName:subjects[i][0].lastName,
                yearOfBirth:subjects[i][0].yearOfBirth,
                myId:subjects[i][0].myId,
                city:subjects[i][0].city,
                date:subjects[i][0].uploadTime})
                OneNameMatch= i
        }
        if(fullName==subjects[i][0].firstName || fullName==subjects[i][0].lastName){
            namesForSearch.push({
                firstName:subjects[i][0].firstName,
                lastName:subjects[i][0].lastName,
                yearOfBirth:subjects[i][0].yearOfBirth,
                myId:subjects[i][0].myId,
                city:subjects[i][0].city,
                date:subjects[i][0].uploadTime})
                OneNameMatch= i
        } 
        
        
    } 


// output to client

//namesForSearch symbolize the function array for all found people
if(namesForSearch.length>1){
    l=namesForSearch.length
    searchDiv.style.display="block"
    searchH1.innerHTML="MULTIPLY PEOPLE ANSWER <br> THAT SEARCH REQUEST <br> GO TO THE BOTTOM <br> OF THE PAGE TO FIND YOURSELF"
    table.innerHTML=
    `<h4>here is all the people named ${fullName}</h4>
    <tr> 
    <td><h6>FIRST NAME</h6></td>
    <td><h6>LAST NAME</h6></td>
    <td><h6>BIRTH YEAR</h6></td>
    <td><h6></h6>I.D</td>
    <td><h6></h6>CITY</td>
    <td><h6></h6>FIRST SUBMIT</td>
    `
    for (let i = 0; i < l; i++) {
        table.innerHTML+=`<tr>
        <td> ${namesForSearch[i].firstName} </td>
        <td> ${namesForSearch[i].lastName} </td>
        <td> ${namesForSearch[i].yearOfBirth} </td>
        <td> ${namesForSearch[i].myId} </td>
        <td> ${namesForSearch[i].city} </td>
        <td> ${namesForSearch[i].date} </td>
        </tr>
        `
    }
    return
}
//OneNameSearch symbolize the index of the subject 
if(namesForSearch.length==1){
    searchDiv.style.display="block"
    searchH1.innerHTML=document.getElementById("searchH1").innerHTML="PERSON FOUND"
    searchTxt[0].innerHTML= subjects[OneNameMatch][0].firstName                
    searchTxt[1].innerHTML= subjects[OneNameMatch][0].lastName                
    searchTxt[2].innerHTML=subjects[OneNameMatch][0].yearOfBirth                
    searchTxt[3].innerHTML=subjects[OneNameMatch][0].myId    
    searchTxt[4].innerHTML=subjects[OneNameMatch][0].city  
    searchTxt[5].innerHTML=subjects[OneNameMatch][0].uploadTime
    return
}       
// did not find subject 
    searchDiv.style.display="block"
    searchH1.innerHTML="sorry ;( <br> did not found him  /her<br>try using this synatx:<br>first-Name last-Name (exp:gal atanw)"

}




// reset button
reset.onclick=function () {
    addDiv.style.display="none"
    searchDiv.style.display="none"
    fixData.innerHTML=""
    table.innerHTML=""
}



// updated DATA
update.onclick=function () {
    addDiv.style.display="none"
    searchDiv.style.display="none"
    fixData.innerHTML=""
    let id=ID.value
    let l=subjects.length
    let t=new Date()
    let counter;
for (let i = 0; i < l; i++) {
    if(subjects[i][0].myId==id){
        subjects[i].push(
            {newStatuse:file.value,
            date:t,
            newStatuseId:id
            }
        )    
    counter = i
    break
    }   

}
if(counter==null){
    alert("Hi , your ID is not listed yet please ADD yourself first")
    return
}
fixData.innerHTML=`"hey, ${subjects[counter][0].firstName} you'r permit has been added"`
}
    
