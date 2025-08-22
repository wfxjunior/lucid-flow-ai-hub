
// Secure Storage Utilities with encryption support

interface StorageOptions {
  encrypt?: boolean
  expiry?: number // timestamp
}

class SecureStorageManager {
  private static instance: SecureStorageManager
  private readonly keyPrefix = 'secure_'

  static getInstance(): SecureStorageManager {
    if (!SecureStorageManager.instance) {
      SecureStorageManager.instance = new SecureStorageManager()
    }
    return SecureStorageManager.instance
  }

  private async encrypt(data: string): Promise<string> {
    // Simple XOR encryption for demo - in production use Web Crypto API
    const key = 'SecureKey123' // Should be dynamically generated
    let encrypted = ''
    for (let i = 0; i < data.length; i++) {
      encrypted += String.fromCharCode(
        data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      )
    }
    return btoa(encrypted)
  }

  private async decrypt(encryptedData: string): Promise<string> {
    try {
      const data = atob(encryptedData)
      const key = 'SecureKey123' // Should match encryption key
      let decrypted = ''
      for (let i = 0; i < data.length; i++) {
        decrypted += String.fromCharCode(
          data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        )
      }
      return decrypted
    } catch {
      throw new Error('Decryption failed')
    }
  }

  async setItem(key: string, value: any, options: StorageOptions = {}): Promise<void> {
    try {
      const data = {
        value,
        timestamp: Date.now(),
        expiry: options.expiry,
        encrypted: options.encrypt || false
      }

      let dataString = JSON.stringify(data)
      
      if (options.encrypt) {
        dataString = await this.encrypt(dataString)
      }

      localStorage.setItem(this.keyPrefix + key, dataString)
    } catch (error) {
      console.error('SecureStorage setItem failed:', error)
    }
  }

  async getItem(key: string, expectEncrypted = false): Promise<any> {
    try {
      let dataString = localStorage.getItem(this.keyPrefix + key)
      if (!dataString) return null

      if (expectEncrypted) {
        dataString = await this.decrypt(dataString)
      }

      const data = JSON.parse(dataString)
      
      // Check expiry
      if (data.expiry && Date.now() > data.expiry) {
        this.removeItem(key)
        return null
      }

      return data.value
    } catch (error) {
      console.error('SecureStorage getItem failed:', error)
      return null
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(this.keyPrefix + key)
  }

  // Emergency cleanup for security incidents
  async emergencyClear(): Promise<void> {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(this.keyPrefix) || 
          key.includes('supabase') || 
          key.includes('auth') ||
          key.includes('session')) {
        localStorage.removeItem(key)
      }
    })
  }

  // Secure session validation
  async validateStoredSession(): Promise<boolean> {
    try {
      const sessionData = await this.getItem('session_data', true)
      if (!sessionData) return false

      // Validate session structure and timing
      const isValid = sessionData.timestamp && 
                     (Date.now() - sessionData.timestamp) < (24 * 60 * 60 * 1000) // 24 hours
      
      if (!isValid) {
        this.removeItem('session_data')
      }

      return isValid
    } catch {
      return false
    }
  }
}

export const secureStorage = SecureStorageManager.getInstance()
