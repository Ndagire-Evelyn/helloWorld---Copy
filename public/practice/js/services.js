// Animate sections
setTimeout(()=>document.getElementById('tyreCard').style.opacity=1,1000);
setTimeout(()=>document.getElementById('batteryCard').style.opacity=1,1500);

// Manager access
function openManager(){
    let pass = prompt("Enter manager password");
    if(pass === "admin123"){
        document.getElementById('managerPanel').style.display='block';
    } else {
        alert("Wrong password!");
    }
}

// Save battery prices
function savePrices(){
    let hire = document.getElementById('hire').value;
    let sale = document.getElementById('sale').value;

    fetch('get_price.php?service=hire&price='+hire);
    fetch('get_price.php?service=sale&price='+sale);

    alert("Saved!");
}
// Open section
function openSection(type){
    document.getElementById('formBox').style.display='block';

    let select = document.getElementById('service');
    select.innerHTML = "";

    if(type === 'tyre'){
        document.getElementById('title').innerText = "Tyre Clinic";

        select.innerHTML = `
        <option value="pressure">Pressure</option>
        <option value="puncture">Puncture</option>
        <option value="valve">Valve</option>
        `;
    } else {
        document.getElementById('title').innerText = "Battery Section";

        select.innerHTML = `
        <option value="hire">Battery Hire</option>
        <option value="sale">Battery Sale</option>
        `;
    }
}

// Load price
function loadPrice(){
    let service = document.getElementById('service').value;

    if(service === "pressure") document.getElementById('price').innerText = 500;
    else if(service === "puncture") document.getElementById('price').innerText = 5000;
    else if(service === "valve") document.getElementById('price').innerText = 5000;
    else {
        fetch('get_price.php?service='+service)
        .then(res=>res.text())
        .then(data=>{
            document.getElementById('price').innerText = data;
        });
    }
}

// Submit
function submitData(){
    let data = new FormData();
    data.append("name", document.getElementById('name').value);
    data.append("phone", document.getElementById('phone').value);
    data.append("section", document.getElementById('title').innerText);
    data.append("service", document.getElementById('service').value);
    data.append("price", document.getElementById('price').innerText);

    fetch('save_transaction.php',{method:'POST',body:data})
    .then(()=>alert("Saved successfully!"));
}