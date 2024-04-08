const formatDate = (date: Date | string | undefined): string => {
    if (!date) {
        return '';
    }

    const dateObject = typeof date === 'string' ? new Date(date) : date;

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    options.hour = 'numeric';
    options.minute = 'numeric';
    options.hour12 = true; // Use 12-hour format

    return dateObject.toLocaleString('en-US', options);
};

export default formatDate;
