<script setup lang="ts">
import MyEditor from "@/components/MyEditor.vue";
import createApi from "@/api";
import {pError, pSuccess} from "@/util/pLoad";
import {useI18n} from "vue-i18n";
import {useProfileStore} from "@/store/profileStore";

// 获取当前 Vue 实例的 proxy 对象
const {proxy} = getCurrentInstance()!;
const api = createApi(proxy);

// i18n
const {t} = useI18n();

const profileStore = useProfileStore()

const load = function (yamlContent: any) {
  api.getProfileConfig(profileStore.profileConfig).then((data) => {
    yamlContent.value = data;
  })
}

const save = async function (yamlContent: any) {
  try {
    await api.updateProfileConfig({
      profile: profileStore.profileConfig,
      config: yamlContent
    })
    pSuccess(t('dns.success'))
  } catch (e) {
    if (e['message']) {
      pError(e['message'])
    }
  }
}
</script>

<template>
  <MyLayout>
    <template #top>
      <el-space class="space">
        <div class="title">
          {{ profileStore.profileConfig.title }}
        </div>
      </el-space>
    </template>
    <template #bottom>
      <MyEditor :load="load" :save="save"></MyEditor>
    </template>
  </MyLayout>
</template>

<style scoped>
.space {
  margin-top: 20px;
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin-left: 10px;
}
</style>
