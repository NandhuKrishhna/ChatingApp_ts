import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/api";

export interface User {
    _id: string;
    name: string;
    email: string;
    profilePic?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface Message {
    _id: string;
    sender: string;
    receiver: string;
    text: string;
    image: string | null ;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
    tagTypes: ['Messages'], // Define a tag type for messages
    endpoints: (builder) => ({
      getUsers: builder.query<User[], void>({
        query: () => '/messages/users',
      }),
      getMessages: builder.query<Message[], string>({
        query: (userId) => `/messages/${userId}`,
        transformResponse: (response: { messages: Message[] }) => response.messages,
        providesTags: (result, error, userId) => [{ type: 'Messages', id: userId }], 
      }),
      sendMessage: builder.mutation<Message, { userId: string; text: string; image: string | null }>({
        query: ({ userId, ...messageData }) => ({
          url: `/messages/send/${userId}`,
          method: "POST",
          body: messageData,
        }),
        invalidatesTags: (result, error, { userId }) => [{ type: 'Messages', id: userId }],
      }),
    }),
  });
  
  export const { useGetUsersQuery,
     useGetMessagesQuery ,
     useSendMessageMutation
    } = chatApi;