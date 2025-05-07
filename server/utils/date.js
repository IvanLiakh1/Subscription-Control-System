export function   calculateNextPaymentDate(startDate, billingCycle, currentDate = new Date()) {
  const start = new Date(startDate);
  const now = new Date(currentDate);
  const utcStart = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
  const utcNow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  if (utcStart > utcNow) return utcStart;

  let nextDate = new Date(utcStart);

  while (nextDate <= utcNow) {
    switch (billingCycle) {
      case 'daily':
        nextDate.setUTCDate(nextDate.getUTCDate() + 1);
        break;
      case 'weekly':
        nextDate.setUTCDate(nextDate.getUTCDate() + 8);
        break;
      case 'monthly':
        nextDate.setUTCMonth(nextDate.getUTCMonth() + 1);
        break;
      case 'yearly':
        nextDate.setUTCFullYear(nextDate.getUTCFullYear() + 1);
        break;
      default:
        throw new Error('Невірний тип періодичності');
    }
  }

  return new Date(Date.UTC(
    nextDate.getUTCFullYear(),
    nextDate.getUTCMonth(),
    nextDate.getUTCDate()
  ));
}
