import * as mentorship from './mentorship'

import {
  RpcClient
} from '@lezzserver/react'
const cacheKeys = ["mentorship.listMentorship"]


const wrap = (module: string, type: string, method: string): any => {
  return async function(arg: any) {
    return await RpcClient.call(module, type, method, arg)
  }
}

export const api = {
  mentorship: {
    listMentorship: {
      queryKey: ["mentorship", "listMentorship"],
      queryFn: wrap('mentorship.ts', 'query', 'listMentorship') as mentorship.listMentorship,
    },
    createMentorship: {
      mutationKey: ["mentorship", "createMentorship"],
      mutationFn: wrap('mentorship.ts', 'mutation', 'createMentorship') as mentorship.createMentorship,
    },
  },
}