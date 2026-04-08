document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const vehicleTypeSelect = document.getElementById('vehicleType');
    const ninContainer = document.getElementById('ninContainer');
    const ninInput = document.getElementById('ninNumber');

    // Toggle NIN requirement based on vehicle type [cite: 93]
    vehicleTypeSelect.addEventListener('change', function () {
        if (this.value === 'Boda-boda') {
            ninContainer.style.display = 'block';
            ninInput.setAttribute('required', 'required');
        } else {
            ninContainer.style.display = 'none';
            ninInput.removeAttribute('required');
            ninInput.value = '';
            ninInput.classList.remove('is-invalid');
        }
    });
    // Form submission validation 
    form.addEventListener('submit', function (e) {
        let isValid = true;

        // Name Validation [cite: 115]
        const nameRegex = /^[A-Z][a-zA-Z\s]*$/;
        const driverName = document.getElementById('driverName');
        if (!nameRegex.test(driverName.value)) {
            driverName.classList.add('is-invalid');
            isValid = false;
        } else {
            driverName.classList.remove('is-invalid');
        }

        // Phone Validation
        const phoneRegex = /^(0|\+256)(7|4|3|2)[0-9]{8}$/;
        const phone = document.getElementById('phoneNumber');
        if (!phoneRegex.test(phone.value)) {
            phone.classList.add('is-invalid');
            isValid = false;
        } else {
            phone.classList.remove('is-invalid');
        }
        // Plate Validation 
        const plateRegex = /^U[A-Za-z]{2}\s?[0-9]{3}[A-Za-z]$/;
        const plate = document.getElementById('numberPlate');
        if (!plateRegex.test(plate.value)) {
            plate.classList.add('is-invalid');
            isValid = false;
        } else {
            plate.classList.remove('is-invalid');
        }

        // NIN Validation (If Boda-boda) [cite: 118]
        if (vehicleTypeSelect.value === 'Boda-boda') {
            const ninRegex = /^[A-Z0-9]{14}$/;
            if (!ninRegex.test(ninInput.value)) {
                ninInput.classList.add('is-invalid');
                isValid = false;
            } else {
                ninInput.classList.remove('is-invalid');
            }
        }

        if (!isValid) {
            e.preventDefault(); // Stop submission if validation fails
        }
    });
});
