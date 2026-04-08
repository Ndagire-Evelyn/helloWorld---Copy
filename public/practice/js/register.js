// SESSION TIME
document.getElementById("time").innerText = new Date().toLocaleTimeString();

// ENABLE NIN ONLY FOR BODA
document.getElementById("vehicleType").addEventListener("change", function () {
    let nin = document.getElementById("nin");

    if (this.value === "Boda-boda") {
        nin.disabled = false;
        nin.style.border = "2px solid #0d6efd";
    } else {
        nin.disabled = true;
        nin.value = "";
        nin.style.border = "";
    }
});

// CLEAR FORM
function clearForm() {
    document.getElementById("regForm").reset();
}

// VALIDATION
document.getElementById("regForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("driverName").value;
    let phone = document.getElementById("phone").value;
    let plate = document.getElementById("plate").value;
    let nin = document.getElementById("nin").value;
    let type = document.getElementById("vehicleType").value;

    let valid = true;

    // NAME
    if (!/^[A-Z][a-zA-Z ]+$/.test(name)) {
        document.getElementById("nameError").innerText = "Invalid name";
        valid = false;
    } else document.getElementById("nameError").innerText = "";

    // PHONE
    if (!/^(7|6)\d{8}$/.test(phone)) {
        document.getElementById("phoneError").innerText = "Invalid phone number";
        valid = false;
    } else document.getElementById("phoneError").innerText = "";

    // PLATE
    if (!/^U[A-Z0-9]{1,7}$/.test(plate)) {
        document.getElementById("plateError").innerText = "Invalid plate";
        valid = false;
    } else document.getElementById("plateError").innerText = "";

    // NIN
    if (type === "Boda-boda") {
        if (!/^(CM|CF)[A-Z0-9]+$/.test(nin)) {
            document.getElementById("ninError").innerText = "Invalid NIN";
            valid = false;
        } else document.getElementById("ninError").innerText = "";
    }

    if (!valid) return;

    // SAVE TO LOCAL STORAGE (connect dashboard)
    let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];

    vehicles.push({
        time: new Date().toLocaleTimeString(),
        plate,
        type,
        status: "Parked"
    });

    localStorage.setItem("vehicles", JSON.stringify(vehicles));

    // RECEIPT
    let receipt = generateReceipt();

    alert("Success! Receipt No: " + receipt);

    clearForm();
});

// RECEIPT GENERATOR
function generateReceipt() {
    let date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let random = Math.floor(Math.random() * 9999);

    return `PE-${year}-${month}-${random}`;
}