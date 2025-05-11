export const getTimeUntilNextPayment = (nextDate, billingCycle) => {
    const now = new Date();
    const next = new Date(nextDate);

    const diffMs = next - now;
    if (diffMs <= 0) return 'сьогодні';

    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    switch (billingCycle) {
        case 'daily':
            return diffDays === 1 ? 'завтра' : `через ${diffDays} ${pluralize(diffDays, 'день', 'дні', 'днів')}`;

        case 'weekly': {
            const weeks = Math.floor(diffDays / 7);
            const days = diffDays % 7;
            if (weeks === 0) return `через ${diffDays} ${pluralize(diffDays, 'день', 'дні', 'днів')}`;
            return days === 0
                ? `через ${weeks} ${pluralize(weeks, 'тиждень', 'тижні', 'тижнів')}`
                : `через ${weeks} ${pluralize(weeks, 'тиждень', 'тижні', 'тижнів')} і ${days} ${pluralize(days, 'день', 'дні', 'днів')}`;
        }

        case 'monthly': {
            const months = (next.getFullYear() - now.getFullYear()) * 12 + (next.getMonth() - now.getMonth());
            if (months <= 0) return `через ${diffDays} ${pluralize(diffDays, 'день', 'дні', 'днів')}`;
            return `через ${months} ${pluralize(months, 'місяць', 'місяці', 'місяців')}`;
        }

        case 'yearly': {
            const years = next.getFullYear() - now.getFullYear();
            return years === 1 ? 'через рік' : `через ${years} ${pluralize(years, 'рік', 'роки', 'років')}`;
        }

        default:
            return `через ${diffDays} ${pluralize(diffDays, 'день', 'дні', 'днів')}`;
    }
};

function pluralize(number, one, few, many) {
    const n = Math.abs(number) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return many;
    if (n1 > 1 && n1 < 5) return few;
    if (n1 === 1) return one;
    return many;
}
