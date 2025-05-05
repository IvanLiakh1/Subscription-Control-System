const calculateNextPayment = (start, cycle, currentDate = new Date()) => {
    const date = new Date(start);
    if (date <= currentDate) {
        date.setDate(currentDate.getDate());
    }
    switch (cycle) {
        case 'daily':
            while (date <= currentDate) {
                date.setDate(date.getDate() + 1); 
            }
            break;
        case 'weekly':
            while (date <= currentDate) {
                date.setDate(date.getDate() + 7); 
            }
            break;
        case 'monthly':
            while (date <= currentDate) {
                date.setMonth(date.getMonth() + 1); 
            }
            break;
        case 'yearly':
            while (date <= currentDate) {
                date.setFullYear(date.getFullYear() + 1); 
            }
            break;
        default:
            throw new Error('Невірний тип періодичності');
    }
    return date;
};
export default calculateNextPayment;