/**
 * Checks if a market is open on the given date based on its opening cycle.
 * @param {string} openingCycle - The opening cycle string (e.g. '1일+6일', '매일')
 * @param {Date} date - The date to check (defaults to current local date)
 * @returns {boolean}
 */
export function isOpenToday(openingCycle, date = new Date()) {
  if (!openingCycle) return false;
  if (openingCycle === '매일') return true;
  
  const day = date.getDate();
  const lastDigit = day % 10;
  
  const matches = openingCycle.match(/\d+/g);
  if (!matches) return false;
  
  return matches.some(numStr => {
    const num = parseInt(numStr, 10);
    if (num === 10) {
      return lastDigit === 0;
    }
    return lastDigit === num;
  });
}

/**
 * Calculates how many days are left until the next opening day.
 * @param {string} openingCycle - The opening cycle string
 * @param {Date} date - The base date (defaults to current local date)
 * @returns {number} - 0 if open today, 1 if open tomorrow, etc. -1 if error
 */
export function getDaysUntilOpening(openingCycle, date = new Date()) {
  if (!openingCycle) return -1;
  if (openingCycle === '매일') return 0;
  
  const matches = openingCycle.match(/\d+/g);
  if (!matches) return -1;
  const cycleNums = matches.map(num => parseInt(num, 10));
  
  // Clone date and clear time to avoid time comparison issues
  const baseDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  for (let offset = 0; offset <= 31; offset++) {
    const checkDate = new Date(baseDate.getTime() + offset * 24 * 60 * 60 * 1000);
    const day = checkDate.getDate();
    const lastDigit = day % 10;
    
    const isMatch = cycleNums.some(num => {
      if (num === 10) {
        return lastDigit === 0;
      }
      return lastDigit === num;
    });
    
    if (isMatch) {
      return offset;
    }
  }
  return -1;
}

/**
 * Returns formatted D-Day text for badges.
 * @param {number} days - Number of days until opening
 * @returns {string}
 */
export function getDDayText(days) {
  if (days === 0) return '오늘 장날!';
  if (days === 1) return '내일 장날';
  return `${days}일 후 장날`;
}

/**
 * Categorizes a market address into a region group for filtering.
 * @param {string} address - Market address
 * @returns {string} - Region group string
 */
export function getRegionGroup(address) {
  if (!address) return '기타';
  if (address.includes('서울') || address.includes('경기') || address.includes('인천')) {
    return '수도권';
  }
  if (address.includes('강원')) {
    return '강원';
  }
  if (address.includes('충청북도') || address.includes('충북')) {
    return '충북';
  }
  if (address.includes('충청남도') || address.includes('충남') || address.includes('대전') || address.includes('세종')) {
    return '충남/대전/세종';
  }
  if (address.includes('전북') || address.includes('전라북도') || address.includes('전북특별차치도') || address.includes('전북특별자치도')) {
    return '전북';
  }
  if (address.includes('전남') || address.includes('전라남도') || address.includes('광주')) {
    return '전남/광주';
  }
  if (address.includes('경북') || address.includes('경상북도') || address.includes('대구')) {
    return '경북/대구';
  }
  if (address.includes('경남') || address.includes('경상남도') || address.includes('부산') || address.includes('울산')) {
    return '경남/부산/울산';
  }
  if (address.includes('제주')) {
    return '제주';
  }
  return '기타';
}
