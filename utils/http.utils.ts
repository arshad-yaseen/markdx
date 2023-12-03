import { toast } from "sonner"

type RequestOptions<BodyType = undefined> = {
  body?: BodyType
  headers?: HeadersInit
  error?: string
  showErrorToast?: boolean
}

type ErrorResponse = {
  error: string
}

// Generic function to handle the request
async function request<ResponseType, BodyType = undefined>(
  url: string,
  method: string,
  options: RequestOptions<BodyType> = {}
): Promise<ResponseType> {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  if (!response.ok) {
    const errorMessage =
      options.error || `Network response was not ok (${response.status})`
    if (options.showErrorToast) {
      toast.error(errorMessage)
    }
    if (!options.error) {
      throw new Error(errorMessage)
    }
  }

  return response.json() as Promise<ResponseType>
}

export function GET<ResponseType>(url: string, options?: RequestOptions) {
  return request<ResponseType, undefined>(url, "GET", options)
}

export function POST<ResponseType, BodyType>(
  url: string,
  body: BodyType,
  options?: RequestOptions<BodyType>
) {
  return request<ResponseType, BodyType>(url, "POST", { ...options, body })
}

export function PATCH<ResponseType, BodyType>(
  url: string,
  body: BodyType,
  options?: RequestOptions<BodyType>
) {
  return request<ResponseType, BodyType>(url, "PATCH", { ...options, body })
}

export function DELETE<ResponseType>(url: string, options?: RequestOptions) {
  return request<ResponseType, undefined>(url, "DELETE", options)
}
