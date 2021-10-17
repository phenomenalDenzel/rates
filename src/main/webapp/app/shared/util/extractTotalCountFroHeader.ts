export const extractTotalCountFromHeader = (action, count: number) => parseInt(action.payload.headers['x-total-count'], count);
