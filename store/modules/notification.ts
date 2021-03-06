import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {$axios} from '@/utils/api'
import {ISendMessage} from '@/utils/interface/notification'

@Module({
  stateFactory: true,
  namespaced: true,
  name: 'modules/notification'
})

export default class Notification extends VuexModule {
  private isUnread: boolean

  public get getUnread () {
    return this.isUnread
  }

  @Mutation
  public setUnread (unread: boolean) {
    this.isUnread = unread
  }

  @Action
  async sendMessage (props: ISendMessage): Promise<any> {
    try {
      const res = await $axios.$post('api/message', props)
      return Promise.resolve(res)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @Action
  async getMessage (id: Number): Promise<any> {
      const res = await $axios.$get(`api/getMessages/${id}`)
      return res
  }

  @Action
  async getUsers (): Promise<any> {
      const res = await $axios.$get('api/getMessageUsers')
      return res
  }

  @Action
  async unread (): Promise<any> {
    try {
      const res = await $axios.$get('api/unread')
      this.setUnread(res.response.unread)
      return res
    } catch (error) {
      handleError(error)
    }
  }

  @Action
  async updateReadStatus (id: Number): Promise<any> {
    await $axios.$put('api/updateReadStatus', {id})
  }
}

function handleError (error: Error) {
  throw error
}
