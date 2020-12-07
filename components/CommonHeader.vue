<template>
  <header id="header">
    <h1 class="logo">
      Skill swap
    </h1>
    <div v-if="!useSimple" class="header-items">
      <input class="header_search" type="text">
      <div v-if="userData" class="header-buttons is-login">
        <nuxt-link to="/notification">
          <font-awesome-icon :icon="['fas','bell']" class="icon" />
        </nuxt-link>
        <img class="thumbnail-xs" src="@/assets/images/dummy/user/user_1.png">
      </div>
      <div v-else class="header-buttons">
        <nuxt-link to="/login">
          ログイン
        </nuxt-link>
        <nuxt-link to="/login" class="button-primary-fill">
          新規登録
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'nuxt-property-decorator'
    import {IUser} from '@/utils/interface/user'
    import {AuthStore} from '@/store'

    @Component
    export default class CommonHeader extends Vue {
        @Prop({default: false})
        useSimple: boolean

        get userData ():IUser {
            return AuthStore.getUserData
        }
    }
</script>

<style scoped lang="scss">
  #header {
    padding: $size-m $size-l;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 1px $shadow-color;
    background: #FFF;
    width: 100%;
    position: relative;

    .header-items {
      display: flex;
      flex-grow: 1;
    }

    .header-buttons {
      display: flex;
      align-items: center;
      margin-left: auto;

      > * {
        margin-left: $size-m;
      }

      &.is-login {
        .icon {
          color:$color-black;
          font-size: $font-size-20;
        }
      }
    }

    .header_search {
      margin-left: $size-m;
    }
  }
</style>