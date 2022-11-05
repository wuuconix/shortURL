<script setup lang="ts">
import { ref, onMounted } from "vue"
import { ElMessage } from 'element-plus'
import { ElNotification } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/notification/style/css'

const shortUrls = ref([])
const dialogVisible = ref(false)
const user = ref("")
const pass = ref("")
const online = ref(false)
const sourceShow = ref(false)
function get_data() {
  fetch(`/api/list`).then(res => res.json()).then(res => {
    shortUrls.value = res.data
  })
}
function open_dialog() {
  dialogVisible.value = true
}
function logout() {
  fetch(`/api/logout`).then(res => res.json()).then(res => {
    if (res.success) {
      online.value = false
      ElMessage({
        message: 'Logout Successfully',
        type: 'success'
      });
      get_data()
    }
  })
}
function login() {
  dialogVisible.value = false
  fetch(`/api/login`, {
    method: "POST",
    body: new URLSearchParams({ user: user.value, pass: pass.value })
  }).then(res => res.json()).then(res => {
    console.log(res)
    if (res.success) {
      online.value = true
      ElMessage({
        message: 'wuuconix, welcome back',
        type: 'success'
      })
      get_data()
    } else {
      ElMessage({
        message: 'Authenticated Failed',
        type: 'error'
      })
    }
  }).catch(e => {
    console.log(e)
  })
}
function handle_update(msg: string) {
  get_data()
  ElNotification({
    message: msg,
    type: 'success',
    duration: 2000
  })
}
onMounted(() => {
  fetch(`/api/login`).then(res => res.json()).then(res => {
    if (res.success) {
      online.value = true
      sourceShow.value = true
    }
  })
  get_data()
  ElNotification({
    message: '欢迎来到武丑兄的短链站',
    type: 'success',
    duration: 2000
  })
})
</script>

<template>
  <div class="menu">
    <el-popover placement="right-start" :width="200" trigger="hover" content="开源啦，来个star吧~">
      <template #reference>
        <a class="github" href="https://github.com/wuuconix/shortURL" target="_blank">
          <el-avatar src="https://tvax3.sinaimg.cn/large/007YVyKcly1h27w6nxmvqj305k05kaa3.jpg"></el-avatar>
        </a>
      </template>
    </el-popover>
    <el-switch v-model="sourceShow" class="mb-2" active-text="显示源站" inactive-text="不显示源站"/>
    <el-button type="primary" plain round @click="open_dialog" v-show="!online">Login</el-button>
    <el-button type="danger" plain round @click="logout" v-show="online">Logout</el-button>
  </div>
  <div class="card_wrapper">
    <card v-for="item in shortUrls" :dest="item['dest']" :source="item['source']" 
      :detail="item['detail']" :show="item['show']"  :sourceShow="sourceShow" :online="online" @update="handle_update" :newOne="false">
    </card>
    <card v-if="online" dest="" source="" detail="" show="1" :sourceShow="sourceShow" :online="online" :newOne="true" @update="handle_update"></card>
  </div>
  <el-dialog v-model="dialogVisible" title="Authenticate" draggable center>
    <el-input v-model="user" placeholder="User" />
    <el-input v-model="pass" placeholder="Pass" type="password"/>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="login">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  width: 100%;
  height: 100%;
}
div.card_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.el-card {
  margin: 10px 10px;
  flex: 30%;
}
.menu {
  padding: 10px 5%;
  margin: 0px 10px;
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--el-color-primary-light-8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--el-menu-text-color);
}
/* 横屏 */
@media screen and (orientation:landscape) { 
  .el-dialog {
    --el-dialog-width: 500px;
  }
  .el-card {
    flex: 30%;
  }
}
/* 竖屏 */
@media screen and (orientation:portrait) { 
  .el-dialog {
    --el-dialog-width: 80%;
  }
  .elcard {
    flex: 45%;
  }
}
</style>