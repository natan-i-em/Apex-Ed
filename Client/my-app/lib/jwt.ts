// lib/jwt.ts

export type DecodedToken = {
    userId: string
    username?: string
    role: 'admin' | 'student' | string
    exp: number
    [key: string]: any // to handle any extra fields
  }
  
  /**
   * Decodes a JWT token and returns the payload.
   * @param token JWT token
   * @returns Decoded token object or null if invalid
   */
  export function decodeToken(token: string): DecodedToken | null {
    try {
      const payload = token.split('.')[1]
      const decoded = JSON.parse(atob(payload))
      return decoded
    } catch (err) {
      console.error('Invalid JWT:', err)
      return null
    }
  }
  
  /**
   * Checks if a JWT token has expired based on the 'exp' field.
   * @param token JWT token
   * @returns true if the token has expired, false otherwise
   */
  export function isTokenExpired(token: string): boolean {
    const decoded = decodeToken(token)
    if (!decoded || !decoded.exp) return true
  
    const currentTime = Math.floor(Date.now() / 1000) // in seconds
    return decoded.exp < currentTime
  }
  