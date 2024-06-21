import * as mentorship from "../../mentorship"

export type listMentorship = (arg: Parameters<typeof mentorship.listMentorship.handler>[1]) => ReturnType<typeof mentorship.listMentorship.handler>
export type createMentorship = (arg: Parameters<typeof mentorship.createMentorship.handler>[1]) => Promise<ReturnType<typeof mentorship.createMentorship.handler>>