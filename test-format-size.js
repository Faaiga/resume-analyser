// Simple test script for the formatSize function

// Mock implementation of the formatSize function
function formatSize(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  
  return `${parseFloat(value.toFixed(decimals))} ${sizes[i]}`;
}

// Test cases
const testCases = [
  { bytes: 0, expected: '0 Bytes' },
  { bytes: 500, expected: '500 Bytes' },
  { bytes: 1024, expected: '1 KB' },
  { bytes: 1500, expected: '1.46 KB' },
  { bytes: 1024 * 1024, expected: '1 MB' },
  { bytes: 1.5 * 1024 * 1024, expected: '1.5 MB' },
  { bytes: 1024 * 1024 * 1024, expected: '1 GB' },
  { bytes: 2.5 * 1024 * 1024 * 1024, expected: '2.5 GB' },
  { bytes: 6 * 1024 * 1024, expected: '6 MB' },  // Original maxSize
  { bytes: 20 * 1024 * 1024, expected: '20 MB' }, // New maxSize
];

// Run tests
console.log('Testing formatSize function:');
console.log('----------------------------');

testCases.forEach(({ bytes, expected }) => {
  const result = formatSize(bytes);
  const passed = result === expected;
  
  console.log(`${passed ? '✓' : '✗'} ${bytes} bytes => ${result} ${!passed ? `(Expected: ${expected})` : ''}`);
});