import { decrypt, encrypt } from "@/lib/crypto"
import { kv } from "@vercel/kv"

export const kvget = async (key: string, namespace: string) => {
  const value = await kv.get(`${namespace}-${key}`)
  return value
}

export const kvset = async (key: string, namespace: string, value: any) => {
  await kv.set(`${namespace}-${key}`, value)
}

export const kvdel = async (key: string, namespace: string) => {
  await kv.del(`${namespace}-${key}`)
}

export const kvsetenc = async (key: string, namespace: string, value: any) => {
  const encryptedValue = encrypt(value, key)
  if (!encryptedValue) {
    return null
  }
  await kv.set(`${namespace}-${key}`, encryptedValue)
}

export const kvgetdec = async (key: string, namespace: string) => {
  const encryptedValue = await kvget(key, namespace)
  if (!encryptedValue) {
    return null
  }
  const decryptedValue = decrypt(encryptedValue as string, key)
  return decryptedValue
}