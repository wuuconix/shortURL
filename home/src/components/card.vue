<template>
  <el-card class="box-card" :class="{ secret: show === '0' }">
    <template #header>
      <div class="sourceWrapper">
        <el-popover v-if="!newOne" placement="top-start" title="你可以通过以下链接访问" :width="200" trigger="hover">
          <template #reference>
              <el-link class="link" :href="source" target="_blank" type="primary">{{ dest }}</el-link>
          </template>
          <el-link class="link" :href="baseURI + dest" target="_blank" type="primary">{{ baseURI + dest }}</el-link>
        </el-popover>
        <div v-if="newOne" class="dest" @input="handle_dest_input" :contenteditable="contenteditable" ref="destDiv"> {{ props.dest }} </div>
        <el-dropdown trigger="click" v-show="online">
          <el-icon class="el-icon--right" color="#409EFC" :size="16"><plus /></el-icon>
          <template #dropdown>
            <el-dropdown-menu v-if="!newOne">
              <el-dropdown-item @click="edit">编辑</el-dropdown-item>
              <el-dropdown-item @click="update">更新</el-dropdown-item>
              <el-dropdown-item @click="reset">重置</el-dropdown-item>
              <el-dropdown-item @click="remove">删除</el-dropdown-item>
              <el-dropdown-item v-if="show == '1'" @click="secret">隐藏</el-dropdown-item>
              <el-dropdown-item v-if="show == '0'" @click="publik">公开</el-dropdown-item>
          </el-dropdown-menu>
            <el-dropdown-menu v-if="newOne">
              <el-dropdown-item @click="insert">保存</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
    <div class="el-card__header source" @input="handle_source_input" v-show="sourceShow" :contenteditable="contenteditable" ref="sourceDiv"> {{ props.source }} </div>
    <div class="detail" @input="handle_detail_input" :contenteditable="contenteditable" ref="detailDiv"> {{ props.detail }} </div>
  </el-card>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { ref } from "vue"
import { ElNotification } from 'element-plus'
import { baseURI as bu } from "../../../config/vue"
import 'element-plus/es/components/notification/style/css'

const emit = defineEmits(["update"])

const props = defineProps<{
  dest: string,
  source: string,
  show: string,
  detail: string,
  sourceShow: boolean,
  online: boolean,
  newOne: boolean
}>()

const contenteditable = ref(props.newOne ? true : false)
const newDest = ref(props.dest)
const newSource = ref(props.source)
const newDetail = ref(props.detail)
const sourceDiv = ref() // template refs
const detailDiv = ref()
const baseURI = ref(bu)

function edit() {
  contenteditable.value = true
  sourceDiv.value.click()
}

function handle_source_input(e: any) {
  newSource.value = e.target.innerText
}
function handle_detail_input(e: any) {
  newDetail.value = e.target.innerText
}
function handle_dest_input(e: any) {
  newDest.value = e.target.innerText
}
function reset() {
  sourceDiv.value.innerHTML = props.source
  detailDiv.value.innerHTML = props.detail
}

function update() {
  fetch(`/api/update`, {
    method: "POST",
    body: new URLSearchParams({dest: props.dest, source: newSource.value, detail: newDetail.value, type: "技术", show: props.show} )
  }).then(res => res.json()).then(res => {
    if (res.success) {
      emit('update', `${props.dest} 短链更新成功`)
    } else {
      ElNotification({ message: res.error.msg, type: 'error', duration: 2000});
    }
  })
}
function remove() {
  fetch(`/api/remove`, {
    method: "POST",
    body: new URLSearchParams({dest: props.dest})
  }).then(res => res.json()).then(res => {
    if (res.success) {
      emit('update', `${props.dest} 短链删除成功`)
    } else {
      ElNotification({message: res.error.msg,type: 'error', duration: 2000});
    }
  })
}

function insert() {
  fetch(`/api/insert`, {
    method: "POST",
    body: new URLSearchParams({dest: newDest.value, source: newSource.value, detail: newDetail.value, show: "0", type: "技术"})
  }).then(res => res.json()).then(res => {
    if (res.success) {
      emit('update', `${props.dest} 短链插入成功`)
    } else {
      ElNotification({message: res.error.msg,type: 'error', duration: 2000});
    }
  })
}

function secret() {
  fetch(`/api/update`, {
    method: "POST",
    body: new URLSearchParams({dest: props.dest, source: props.source, detail: props.detail, type: "技术", show: "0"} )
  }).then(res => res.json()).then(res => {
    if (res.success) {
      emit('update', `${props.dest} 短链隐藏成功`)
    } else {
      ElNotification({ message: res.error.msg, type: 'error', duration: 2000});
    }
  })
}
function publik() {
  fetch(`/api/update`, {
    method: "POST",
    body: new URLSearchParams({dest: props.dest, source: props.source, detail: props.detail, type: "技术", show: "1"} )
  }).then(res => res.json()).then(res => {
    if (res.success) {
      emit('update', `${props.dest} 短链公开成功`)
    } else {
      ElNotification({ message: res.error.msg, type: 'error', duration: 2000});
    }
  })
}
</script>
<style scope>
.detail {
  font-size: 14px;
  padding: calc(var(--el-card-padding) - 2px) var(--el-card-padding);
}

.box-card {
  width: 100%;
}

.secret {
  background-color: var(--el-color-danger-light-9);
}

.link {
  white-space: normal;
  word-break: break-all;
}

.el-card__body {
  padding: 0px;
}

.el-popover__title {
  font-size: 8px;
}

div.sourceWrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-icon--right:hover {
  cursor: pointer;
}

div.source {
  color: var(--el-color-primary);
  font-size: 14px;
}

div.source:hover {
  color: var(--el-color-primary-light-3);
}

div.dest {
  color: var(--el-color-primary);
  font-size: 14px;
  margin: -20px;
  height: 32px;
  line-height: 32px;
  width: 90%;
  padding-left: 20px;
}
</style>