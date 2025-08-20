
// Secure LocalStorage utilities with encryption
import { securityEvent, secureError } from './security'

// Simple encryption/decryption using Web Crypto API
class SecureStorage {
  private static instance: SecureStorage
  private encryptionKey: CryptoKey | null = null

  static getInstance(): SecureStorage {
    if (!SecureStorage.instance) {
      SecureStorage.instance = new SecureStorage()
    }
    return SecureStorage.instance
  }

  async init() {
    try {
      // Generate or retrieve encryption key
      const keyData = localStorage.getItem('_secure_key')
      if (keyData) {
        const rawKey = new Uint8Array(JSON.parse(keyData))
        this.encryptionKey = await crypto.subtle.importKey(
          'raw',
          rawKey,
          { name: 'AES-GCM' },
          false,
          ['encrypt', 'decrypt']
        )
      } else {
        // Generate new key
        this.encryptionKey = await crypto.subtle.generateKey(
          { name: 'AES-GCM', length: 256 },
          true,
          ['encrypt', 'decrypt']
        )
        
        const exportedKey = await crypto.subtle.exportKey('raw', this.encryptionKey)
        localStorage.setItem('_secure_key', JSON.stringify(Array.from(new Uint8Array(exportedKey))))
      }
    } catch (error) {
      secureError('Failed to initialize secure storage', { error })
      // Fallback to non-encrypted storage
    }
  }

  private async encrypt(data: string): Promise<string> {
    if (!this.encryptionKey) {
      return data // Fallback to plaintext if encryption fails
    }

    try {
      const iv = crypto.getRandomValues(new Uint8Array(12))
      const encoded = new TextEncoder().encode(data)
      
      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        this.encryptionKey,
        encoded
      )
      
      const result = {
        iv: Array.from(iv),
        data: Array.from(new Uint8Array(encrypted))
      }
      
      return JSON.stringify(result)
    } catch (error) {
      secureError('Encryption failed', { error })
      return data
    }
  }

  private async decrypt(encryptedData: string): Promise<string> {
    if (!this.encryptionKey) {
      return encryptedData // Return as-is if no encryption
    }

    try {
      const { iv, data } = JSON.parse(encryptedData)
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: new Uint8Array(iv) },
        this.encryptionKey,
        new Uint8Array(data)
      )
      
      return new TextDecoder().decode(decrypted)
    } catch (error) {
      secureError('Decryption failed', { error })
      return encryptedData
    }
  }

  async setItem(key: string, value: any, options: { 
    encrypt?: boolean
    expiry?: number // timestamp
  } = {}): Promise<void> {
    try {
      const data = {
        value,
        timestamp: Date.now(),
        expiry: options.expiry
      }
      
      let serialized = JSON.stringify(data)
      
      if (options.encrypt && this.encryptionKey) {
        serialized = await this.encrypt(serialized)
      }
      
      localStorage.setItem(key, serialized)
      
      securityEvent('Secure storage write', { key, encrypted: !!options.encrypt })
    } catch (error) {
      secureError('Failed to store secure data', { key, error })
    }
  }

  async getItem(key: string, encrypted = false): Promise<any> {
    try {
      const stored = localStorage.getItem(key)
      if (!stored) return null
      
      let serialized = stored
      
      if (encrypted && this.encryptionKey) {
        serialized = await this.decrypt(stored)
      }
      
      const data = JSON.parse(serialized)
      
      // Check expiry
      if (data.expiry && Date.now() > data.expiry) {
        localStorage.removeItem(key)
        return null
      }
      
      return data.value
    } catch (error) {
      secureError('Failed to retrieve secure data', { key, error })
      return null
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key)
      securityEvent('Secure storage remove', { key })
    } catch (error) {
      secureError('Failed to remove secure data', { key, error })
    }
  }

  // Enhanced cleanup for security events
  secureCleanup(): void {
    try {
      const keysToRemove: string[] = []
      
      // Find expired keys
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key) continue
        
        try {
          const stored = localStorage.getItem(key)
          if (stored) {
            const data = JSON.parse(stored)
            if (data.expiry && Date.now() > data.expiry) {
              keysToRemove.push(key)
            }
          }
        } catch {
          // Invalid JSON, might be encrypted or corrupted
        }
      }
      
      // Remove expired keys
      keysToRemove.forEach(key => this.removeItem(key))
      
      securityEvent('Secure storage cleanup', { removedKeys: keysToRemove.length })
    } catch (error) {
      secureError('Secure cleanup failed', { error })
    }
  }

  // Security-focused clear all
  emergencyClear(): void {
    try {
      const sensitivePatterns = [
        'supabase.auth',
        'sb-',
        'device_fingerprint',
        'session_',
        'user_',
        '_secure'
      ]
      
      const keysToRemove: string[] = []
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && sensitivePatterns.some(pattern => key.includes(pattern))) {
          keysToRemove.push(key)
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key))
      
      securityEvent('Emergency storage clear', { clearedKeys: keysToRemove.length })
    } catch (error) {
      secureError('Emergency clear failed', { error })
    }
  }
}

export const secureStorage = SecureStorage.getInstance()

// Initialize on module load
if (typeof window !== 'undefined') {
  secureStorage.init()
  
  // Periodic cleanup
  setInterval(() => {
    secureStorage.secureCleanup()
  }, 60 * 60 * 1000) // Every hour
}
