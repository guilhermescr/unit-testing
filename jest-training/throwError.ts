export function throwError(errorType: string): void {
  if (errorType === 'syntax') {
    // console.log('You got a SyntaxError!');
    throw SyntaxError();
  }
  if (errorType === 'type') {
    // console.log('You got a TypeError!');
    throw TypeError();
  }
  if (errorType === 'reference') {
    // console.log('You got a ReferenceError!');
    throw ReferenceError();
  }
}
