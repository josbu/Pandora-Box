import {defineStore} from 'pinia';

export const useProfileStore = defineStore('profile', {
    state: () => ({
        // 使用 as any 类型断言
        profileConfig: null as any,
    })
});
