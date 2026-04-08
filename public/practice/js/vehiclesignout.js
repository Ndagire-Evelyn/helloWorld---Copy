let current = null;
let feeAmount = 0;
let receiptNo = "";

// SEARCH FROM MYSQL
async function searchVehicle(){
let q = document.getElementById("search").value;

let res = await fetch(`backend/get_vehicle.php?q=${q}`);
let v = await res.json();

if(!v){ alert("Not found"); return; }

current = v;

let now = new Date();
let inTime = new Date(v.time_in);
let hours = (now - inTime)/36e5;

feeAmount = calculateFee(v.type, hours, now.getHours());

document.getElementById("details").innerHTML = `
Driver: ${v.driver_name || 'N/A'}<br>
Type: ${v.type}<br>
Arrival: ${v.time_in}<br>
Duration: ${hours.toFixed(1)} hrs
`;

document.getElementById("fee").innerText = feeAmount;

// receipt
receiptNo = generateReceipt();

document.getElementById("rec").innerText = receiptNo;
document.getElementById("plate").innerText = v.plate;
document.getElementById("type").innerText = v.type;
document.getElementById("time").innerText = v.time_in;
document.getElementById("duration").innerText = hours.toFixed(1);
document.getElementById("total").innerText = feeAmount;
}

// FEE LOGIC
function calculateFee(type,hours,hourNow){

let night = (hourNow>=19 || hourNow<6);

if(hours<3){
if(type==="Boda-boda") return 1000;
if(type==="Coaster") return 3000;
return 2000;
}

switch(type){
case "Truck": return night?10000:5000;
case "Personal Car":
case "Taxi": return night?2000:3000;
case "Coaster": return night?2000:4000;
case "Boda-boda": return 2000;
}
}

// CONFIRM
async function confirmSignOut(){

if(!current){ alert("Fill in all fields, please"); return; }

let rName = document.getElementById("rName").value;
let rPhone = document.getElementById("rPhone").value;
let rNin = document.getElementById("rNin").value;
let rGender = document.getElementById("rGender").value;

if(!rName || !rPhone){
alert("Fill all fields");
return;
}

await fetch("backend/signout.php",{
method:"POST",
headers:{"Content-Type":"application/x-www-form-urlencoded"},
body:`plate=${current.plate}&amount=${feeAmount}&receipt=${receiptNo}&rName=${rName}&rPhone=${rPhone}&rNin=${rNin}&rGender=${rGender}`
});

// update UI
document.getElementById("status").innerText="SIGNED OUT";
document.getElementById("status").style.background="#d4edda";

document.getElementById("rrName").innerText=rName;
document.getElementById("rrNin").innerText=rNin;

alert("Payment successful & vehicle signed out");
}

// CANCEL BUTTON
function cancelSignOut(){
if(confirm("Cancel this transaction?")){

document.getElementById("rName").value="";
document.getElementById("rPhone").value="";
document.getElementById("rNin").value="";
document.getElementById("rGender").value="";

document.getElementById("rrName").innerText="";
document.getElementById("rrNin").innerText="";

alert("Sign-out cancelled");
}
}

// RECEIPT
function generateReceipt(){
let d=new Date();
return `PE-${d.getFullYear()}-${d.getMonth()+1}-${Math.floor(Math.random()*9999)}`;
}