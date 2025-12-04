function decrypt(data, key = 'mohler') {
    const decoded = atob(data);
    return decoded.split('').map((char, i) => 
        String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    ).join('');
}

function formatPhone(phone) {
    return phone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{3})/, '$1\u00A0$2\u00A0$3\u00A0$4');
}
document.addEventListener('DOMContentLoaded', function() {
    const phone = decrypt('RltaXFJBWVtcW1VLVA==');
    const email = decrypt('AA4aGAwcLQIHBAkXH0EBGA==');
    const phoneFormatted = formatPhone(phone);

    document.querySelectorAll('[data-phone]').forEach(function(element) {
        if (element.tagName === 'A') {
            element.href = 'tel:' + phone;
        }
        element.textContent = phoneFormatted;
    });

    document.querySelectorAll('[data-email]').forEach(function(element) {
        if (element.tagName === 'A') {
            element.href = 'mailto:' + email;
        }
        element.textContent = email;
    });
});