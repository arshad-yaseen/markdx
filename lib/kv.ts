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
