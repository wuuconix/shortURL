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
                <div v-if="newOne" class="dest" @input="handle_dest_input" :contenteditable="contenteditable" ref="dest"> {{ dest }} </div>
                <el-dropdown trigger="click" v-show="online">
                    <el-icon class="el-icon--right" color="#409EFC" :size="16"><plus /></el-icon>
                    <template #dropdown>
                        <el-dropdown-menu v-if="!newOne">
                            <el-dropdown-item @click="edit">编辑</el-dropdown-item>
                            <el-dropdown-item @click="update">更新</el-dropdown-item>
                            <el-dropdown-item @click="reset">重置</el-dropdown-item>
                            <el-dropdown-item @click="remove">删除</el-dropdown-item>
                            <el-dropdown-item v-if="show == '1'" @click="secret">隐藏</el-dropdown-item>
                            <el-dropdown-item v-if="show == '0'" @click="public">公开</el-dropdown-item>
                        </el-dropdown-menu>
                        <el-dropdown-menu v-if="newOne">
                            <el-dropdown-item @click="insert">保存</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </template>
        <div class="el-card__header source" @input="handle_source_input" v-show="sourceShow" :contenteditable="contenteditable" ref="source"> {{ source }} </div>
        <div class="detail" @input="handle_detail_input" :contenteditable="contenteditable" ref="detail"> {{ detail }} </div>
    </el-card>
</template>

<script>
import { baseURI, apiURI } from "../../../config/vue"
import { Plus } from '@element-plus/icons-vue'
export default {
    data() {
        return {
            baseURI: baseURI,
            contenteditable: this.newOne ? true : false,
            newDest: this.dest,
            newSource: this.source,
            newDetail: this.detail,
        }
    },
    props: ['dest', 'source', 'show', 'detail', 'sourceShow', 'online', 'newOne'],
    emits: ['update'],
    components: {
        Plus
    },
    methods: {
        edit() {
            this.contenteditable = true
            this.$refs.source.click()
        },
        handle_source_input(e) {
            this.newSource = e.target.innerText
        },
        handle_detail_input(e) {
            this.newDetail = e.target.innerText
        },
        handle_dest_input(e) {
            this.newDest = e.target.innerText
        },
        reset() {
            this.$refs.source.innerHTML = this.source
            this.$refs.detail.innerHTML = this.detail
        },
        update() {
            fetch(`${apiURI}/update`, {
                method: "POST",
                body: new URLSearchParams({dest: this.dest, source: this.newSource, detail: this.newDetail, type: this.type, show: this.show} )
            }).then(res => res.json()).then(res => {
                if (res.success) {
                    this.$emit('update', `${this.dest} 短链更新成功`)
                } else {
                    this.$notify({ message: res.error.msg, type: 'error', duration: 2000});
                }
            })
        },
        remove() {
            fetch(`${apiURI}/remove`, {
                method: "POST",
                body: new URLSearchParams({dest: this.dest})
            }).then(res => res.json()).then(res => {
                if (res.success) {
                    this.$emit('update', `${this.dest} 短链删除成功`)
                } else {
                    this.$notify({message: res.error.msg,type: 'error', duration: 2000});
                }
            })
        },
        insert() {
            fetch(`${apiURI}/insert`, {
                method: "POST",
                body: new URLSearchParams({dest: this.newDest, source: this.newSource, detail: this.newDetail, show: "0", type: "技术"})
            }).then(res => res.json()).then(res => {
                if (res.success) {
                    this.$emit('update', `${this.dest} 短链插入成功`)
                } else {
                    this.$notify({message: res.error.msg,type: 'error', duration: 2000});
                }
            })
        },
        secret() {
            fetch(`${apiURI}/update`, {
                method: "POST",
                body: new URLSearchParams({dest: this.dest, source: this.source, detail: this.detail, type: this.type, show: "0"} )
            }).then(res => res.json()).then(res => {
                if (res.success) {
                    this.$emit('update', `${this.dest} 短链隐藏成功`)
                } else {
                    this.$notify({ message: res.error.msg, type: 'error', duration: 2000});
                }
            })
        },
        public() {
            fetch(`${apiURI}/update`, {
                method: "POST",
                body: new URLSearchParams({dest: this.dest, source: this.source, detail: this.detail, type: this.type, show: "1"} )
            }).then(res => res.json()).then(res => {
                if (res.success) {
                    this.$emit('update', `${this.dest} 短链公开成功`)
                } else {
                    this.$notify({ message: res.error.msg, type: 'error', duration: 2000});
                }
            })
        }
    },
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