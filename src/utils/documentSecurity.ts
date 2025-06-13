import CryptoJS from 'crypto-js';

export class DocumentSecurity {
  private static readonly HASH_ALGORITHM = 'SHA-256';

  static generateDocumentHash(content: string): string {
    return CryptoJS.SHA256(content).toString();
  }

  static validateSignature(signature: string, publicKey: string, data: string): boolean {
    try {
      const messageHash = CryptoJS.SHA256(data).toString();
      // In a real implementation, this would use proper digital signature validation
      // This is a simplified version for demonstration
      return messageHash === signature;
    } catch (error) {
      console.error('Signature validation failed:', error);
      return false;
    }
  }

  static async detectModifications(originalHash: string, currentContent: string): Promise<boolean> {
    const currentHash = this.generateDocumentHash(currentContent);
    return originalHash !== currentHash;
  }

  static encryptContent(content: string, key: string): string {
    return CryptoJS.AES.encrypt(content, key).toString();
  }

  static decryptContent(encryptedContent: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedContent, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}