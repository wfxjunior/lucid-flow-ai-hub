// Global debounce utility to prevent rapid API calls
export class DebounceManager {
  private static timeouts: Map<string, NodeJS.Timeout> = new Map();
  
  static debounce(key: string, fn: Function, delay: number = 500) {
    // Clear existing timeout
    const existingTimeout = this.timeouts.get(key);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }
    
    // Set new timeout
    const timeout = setTimeout(() => {
      fn();
      this.timeouts.delete(key);
    }, delay);
    
    this.timeouts.set(key, timeout);
  }
  
  static cancel(key: string) {
    const timeout = this.timeouts.get(key);
    if (timeout) {
      clearTimeout(timeout);
      this.timeouts.delete(key);
    }
  }
  
  static clear() {
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts.clear();
  }
}

// Prevent memory leaks on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    DebounceManager.clear();
  });
}