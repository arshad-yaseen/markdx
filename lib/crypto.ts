import * as crypto from "crypto"

const getKeyFromSecret = (secret: string): Buffer => {
  return crypto.createHash("sha256").update(secret).digest()
}

export const encrypt = (text: string, secret: string) => {
  const iv = crypto.randomBytes(16)

  const key = getKeyFromSecret(secret)
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return iv.toString("hex") + ":" + encrypted.toString("hex")
}

export const decrypt = (text: string, secret: string) => {
  const textParts = text.split(":")
  const ivHex = textParts.shift()
  if (!ivHex) {
    throw new Error("Invalid encrypted text format")
  }
  const iv = Buffer.from(ivHex, "hex")
  const encryptedText = Buffer.from(textParts.join(":"), "hex")

  const key = getKeyFromSecret(secret)
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}
