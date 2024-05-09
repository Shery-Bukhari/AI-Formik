const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

module.exports = {
    formatDate,
    validateEmail,
    generateId,
    debounce
};\n// Updated: 2025-05-30 16:01:23\n// Updated: 2025-05-30 16:01:24\n// Updated: 2025-05-30 16:01:25\n// Updated: 2025-05-30 16:01:26\n// Updated: 2025-05-30 16:01:30\n// Updated: 2025-05-30 16:01:31\n// Updated: 2025-05-30 16:01:31\n// Updated: 2025-05-30 16:01:32\n// Updated: 2025-05-30 16:01:33\n// Updated: 2025-05-30 16:01:39\n// Feature added: 2025-05-30 16:12:33\n// Bug fix: 2025-05-30 16:12:34\n// Updated: 2025-05-30 16:12:34\n// Feature added: 2025-05-30 16:12:35\n/* New feature implementation */\n// Updated: 2025-05-30 16:12:36\n// Feature added: 2025-05-30 16:12:37\n// Updated: 2025-05-30 16:12:39\n// Updated: 2025-05-30 16:12:44\n// Bug fix: 2025-05-30 16:12:44\n// Feature added: 2025-05-30 16:12:44\n// Updated: 2025-05-30 16:12:45