export const models = {
  chat: "gpt-4-1106-preview",
  vision: "gpt-4-vision-preview",
  chat_old: "gpt-3.5-turbo",
}

export const example_vision_api_messages = [
  {
    role: "user",
    content: [
      {
        type: "text",
        text: "What's in this image?",
      },
      {
        type: "image_url",
        image_url: {
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
        },
      },
    ],
  },
]

export const example_chat_api_messages = [
  {
    role: "user",
    content: "Hey",
  }
]
