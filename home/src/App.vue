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
            :detail="item['detail']" :show="item['show']"  :sourceShow="sourceShow" :online="online" @update="handle_update">
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

<script>
import { baseURI, apiURI } from "../../config/vue"
import card from './components/card.vue'

export default {
    data() {
        return {
            shortUrls: [],
            dialogVisible: false,
            user: "",
            pass: "",
            baseURI: baseURI,
            online: false,
            sourceShow: false
        }
    },
    components: {
        card
    },
    methods: {
        get_data() {
            fetch(`${apiURI}/list`).then(res => res.json()).then(res => {
                this.shortUrls = res.data
            })
        },
        open_dialog() {
            this.dialogVisible = true
        },
        logout() {
            fetch(`${apiURI}/logout`).then(res => res.json()).then(res => {
                if (res.success) {
                    this.online = false
                    this.$message({
                        message: 'Logout Successfully',
                        type: 'success'
                    });
                    this.avatarSrc = "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
                    this.get_data()
                }
            })
        },
        login() {
            this.dialogVisible = false
            fetch(`${apiURI}/login`, {
                method: "POST",
                body: new URLSearchParams({ user: this.user, pass: this.pass })
            }).then(res => res.json()).then(res => {
                console.log(res)
                if (res.success) {
                    this.online = true
                    this.$message({
                        message: 'wuuconix, welcome back',
                        type: 'success'
                    });
                    this.get_data()
                } else {
                    this.$message({
                        message: 'Authenticated Failed',
                        type: 'error'
                    });
                }
            }).catch(e => {
                console.log(e)
            })
        },
        handle_update(msg) {
            this.get_data()
            this.$notify({
                message: msg,
                type: 'success',
                duration: 2000
            });
        }
    },
    mounted() {
        fetch(`${apiURI}/login`).then(res => res.json()).then(res => {
            if (res.success) {
                this.online = true
                this.sourceShow = true
            }
        })
        this.get_data()
        this.$notify({
            message: '欢迎来到武丑兄的短链站',
            type: 'success',
            duration: 2000
        });
    }
}
</script>
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