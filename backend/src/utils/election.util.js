/**
 * Determines the access level for election results
 * @param {Object} election - Election object
 * @returns {string} - 'NONE', 'ADMIN_ONLY', 'ADMIN_OWNER', or 'PUBLIC'
 */
export const getResultAccess = (election) => {
    if (!election || election.status !== 'active') {
        return 'NONE';
    }

    if (!election.liveResultsEnabled) {
        return 'ADMIN_ONLY';
    }

    if (election.liveResultsEnabled && !election.publicResultsVisible) {
        return 'ADMIN_OWNER';
    }

    if (election.liveResultsEnabled && election.publicResultsVisible) {
        return 'PUBLIC';
    }

    return 'NONE';
};

/**
 * Robustly parses a date and time string.
 * If dateStr is already an ISO string with timezone, it uses it directly.
 * Otherwise, it concatenates dateStr and timeStr.
 * @param {string} dateStr - Date string (YYYY-MM-DD or ISO string)
 * @param {string} timeStr - Time string (HH:mm)
 * @returns {Date}
 */
export const parseDateTime = (dateStr, timeStr) => {
    if (!dateStr) return null;
    
    // Check if it's already a full ISO string (e.g. 2026-05-06T14:30:00.000Z)
    if (dateStr.includes('T') && (dateStr.endsWith('Z') || dateStr.includes('+') || (dateStr.split('-').length > 3))) {
        return new Date(dateStr);
    }
    
    // Fallback: Combine date and time
    if (!timeStr) return new Date(dateStr);
    return new Date(`${dateStr}T${timeStr}`);
};
