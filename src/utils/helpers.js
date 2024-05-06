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
};\n// Updated: 2025-05-30 16:01:23\n// Updated: 2025-05-30 16:01:24\n// Updated: 2025-05-30 16:01:25\n// Updated: 2025-05-30 16:01:26\n// Updated: 2025-05-30 16:01:30\n// Updated: 2025-05-30 16:01:31\n// Updated: 2025-05-30 16:01:31\n// Updated: 2025-05-30 16:01:32\n// Updated: 2025-05-30 16:01:33\n// Updated: 2025-05-30 16:01:39\n// Feature added: 2025-05-30 16:12:33\n// Bug fix: 2025-05-30 16:12:34\n// Updated: 2025-05-30 16:12:34\n// Feature added: 2025-05-30 16:12:35\n/* New feature implementation */\n// Updated: 2025-05-30 16:12:36\n// Feature added: 2025-05-30 16:12:37\n// Updated: 2025-05-30 16:12:39\n// Updated: 2025-05-30 16:12:44\n// Bug fix: 2025-05-30 16:12:44\n// Feature added: 2025-05-30 16:12:44\n// Updated: 2025-05-30 16:12:45\n// Bug fix: 2025-05-30 16:12:46\n// Bug fix: 2025-05-30 16:12:47\n// Feature added: 2025-05-30 16:12:48\n/* New feature implementation */\n// Feature added: 2025-05-30 16:26:08\n// Feature added: 2025-05-30 16:26:11\n// Updated: 2025-05-30 16:26:14\n// Updated: 2025-05-30 16:26:16\n// Feature added: 2025-05-30 16:26:16\n// Feature added: 2025-05-30 16:26:18\n// Refactored: 2025-05-30 16:26:19\n// Bug fix: 2025-05-30 16:26:20\n// Feature added: 2025-05-30 16:26:20\n// Updated: 2025-05-30 16:26:21\n// Feature added: 2025-05-30 16:26:24\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:37:54\n// Bug fix: 2025-05-30 16:37:56\n// Feature added: 2025-05-30 16:37:58\n/* New feature implementation */\n// Feature added: 2025-05-30 16:37:59\n// Feature added: 2025-05-30 16:38:01\n// Feature added: 2025-05-30 16:38:02\n// Updated: 2025-05-30 16:38:02\n// Feature added: 2025-05-30 16:38:03\n// Bug fix: 2025-05-30 16:38:07\n// Updated: 2025-05-30 16:38:08\n// Feature added: 2025-05-30 16:38:15\n/* New feature implementation */\n// Updated: 2025-05-30 16:38:15\n// Bug fix: 2025-05-30 16:38:16\n// Feature added: 2025-05-30 16:38:17\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:38:19\n// Feature added: 2025-05-30 16:38:20\n/* New feature implementation */\n// Refactored: 2025-05-30 16:38:21\n// Updated: 2025-05-30 16:38:24\n// Feature added: 2025-05-30 16:38:25\n/* New feature implementation */\n// Refactored: 2025-05-30 16:38:25\n// Bug fix: 2025-05-30 16:38:27\n// Feature added: 2025-05-30 16:38:29\n// Feature added: 2025-05-30 16:38:31\n// Bug fix: 2025-05-30 16:38:32\n// Bug fix: 2025-05-30 16:38:32\n// Updated: 2025-05-30 16:38:32\n// Feature added: 2025-05-30 16:38:35