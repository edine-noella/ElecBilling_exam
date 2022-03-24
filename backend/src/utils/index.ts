export function validateToken(token: string): boolean {
  if (token.length !== 8) {
    return false;
  }

  return true;
}

export function generateToken() {
  return Math.random().toString(36).substr(2, 8);
}

// return number of days based on mutiples of 100
// 100 -> 1
// 200 -> 2
export function getDays(amount: number): Date {
  let days = Math.floor(amount / 100);

  if (days === 0) {
    days = 1;
  }

  let someDate = new Date();
  let result = someDate.setDate(someDate.getDate() + days);
  return new Date(result);
}
