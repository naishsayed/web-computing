// DOM Elements
const form = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');

// User class
class User {
    constructor(name, email, password, dob, course) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.dob = dob;
        this.course = course;
        this.registrationDate = new Date();
    }
    
    getRegistrationInfo() {
        return `${this.name} has been registered for ${this.course}. Registration date: ${this.registrationDate.toLocaleDateString()}`;
    }
}

// Validation functions
function validateName(name) {
    return name.trim().length >= 3;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
}

function validateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age >= 18;
}

function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.textContent = '');
}

// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrorMessages();
    
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const dob = document.getElementById('dob').value;
    const course = document.getElementById('course').value;
    const terms = document.getElementById('terms').checked;
    
    // Validation
    let isValid = true;
    
    // Name validation
    if (!validateName(fullName)) {
        document.getElementById('nameError').textContent = 'Name must be at least 3 characters';
        isValid = false;
    }
    
    // Email validation
    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Password validation
    if (!validatePassword(password)) {
        document.getElementById('passwordError').textContent = 
            'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number';
        isValid = false;
    }
    
    // Confirm password
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        isValid = false;
    }
    
    // Date of birth validation
    if (!dob) {
        document.getElementById('dobError').textContent = 'Please select your date of birth';
        isValid = false;
    } else if (!validateAge(dob)) {
        document.getElementById('dobError').textContent = 'You must be at least 18 years old';
        isValid = false;
    }
    
    // Course validation
    if (!course) {
        document.getElementById('courseError').textContent = 'Please select a course';
        isValid = false;
    }
    
    // Terms validation
    if (!terms) {
        document.getElementById('termsError').textContent = 'You must agree to the terms and conditions';
        isValid = false;
    }
    
    // If all validations pass
    if (isValid) {
        // Create user object
        const user = new User(fullName, email, password, dob, course);
        
        // Display success message
        successMessage.textContent = user.getRegistrationInfo();
        successMessage.style.display = 'block';
        
        // Reset form
        form.reset();
        
        // You would typically send the data to a server here
        console.log('User registered:', user);
    }
});

// Real-time validation for email and password
document.getElementById('email').addEventListener('blur', function() {
    if (!validateEmail(this.value.trim())) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
    } else {
        document.getElementById('emailError').textContent = '';
    }
});

document.getElementById('password').addEventListener('input', function() {
    if (!validatePassword(this.value)) {
        document.getElementById('passwordError').textContent = 
            'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number';
    } else {
        document.getElementById('passwordError').textContent = '';
    }
});