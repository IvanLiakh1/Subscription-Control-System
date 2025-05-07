function calculateNextPaymentDate(startDate, billingCycle, currentDate = new Date()) {
    const start = new Date(startDate);
    const now = new Date(currentDate);
    start.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    if (start > now) {
      return start;
    }
    let nextDate = new Date(start);
    switch (billingCycle) {
      case 'daily':
        while (nextDate <= now) {
          nextDate.setDate(nextDate.getDate() + 1);
        }
        break;
  
      case 'weekly':
        while (nextDate <= now) {
          nextDate.setDate(nextDate.getDate() + 7);
        }
        break;
  
      case 'monthly':
        while (nextDate <= now) {
          nextDate.setMonth(nextDate.getMonth() + 1);
          const originalDay = start.getDate();
          if (nextDate.getDate() < originalDay) {
            nextDate.setDate(0); 
          }
        }
        break;
  
      case 'yearly':
        while (nextDate <= now) {
          nextDate.setFullYear(nextDate.getFullYear() + 1);
        }
        break;
  
      default:
        throw new Error('Невірний тип періодичності оплати');
    }
  
    return nextDate;
}

export { calculateNextPaymentDate };
