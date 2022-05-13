<template>
    <div class="menu">
        <el-avatar :src="avatarSrc">{{ user }}</el-avatar>
        <el-button type="primary" plain round @click="open_dialog" v-show="!online">Login</el-button>
        <el-button type="success" plain round v-show="online">Edit</el-button>
        <el-button type="danger" plain round @click="logout" v-show="online">Logout</el-button>
    </div>
    <div class="card_wrapper">
        <card v-for="item in shortUrls" :url="this.baseURI + item['dest']" :detail="item['detail']"></card>
    </div>
    <el-dialog v-model="dialogVisible" title="Authenticate" draggable center>
        <el-input v-model="user" placeholder="User" />
        <el-input v-model="pass" placeholder="Pass" />
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="login">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { baseURI, apiURI } from "../../config/vue"

export default {
    data() {
        return {
            shortUrls: [],
            dialogVisible: false,
            user: "",
            pass: "",
            baseURI: baseURI,
            online: false,
            avatarSrc: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
        }
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
                    this.avatarSrc = "https://tva4.sinaimg.cn/large/007YVyKcly1h1w9n5mxr3j30rs0rsabl.jpg"
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
        handleSelect(key, keyPath) {
            console.log(key, keyPath)
        }
    },
    mounted() {
        fetch(`${apiURI}/login`).then(res => res.json()).then(res => {
            if (res.success) {
                this.online = true
                this.avatarSrc = "https://tva4.sinaimg.cn/large/007YVyKcly1h1w9n5mxr3j30rs0rsabl.jpg"
            }
        })
        this.get_data()
        this.$message({
            message: '欢迎来到武丑兄的短链站',
            type: 'success'
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
    width: calc(100% - 20px);
    padding: 10px 0px;
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

.el-button {
    margin-right: 5%;
}

.el-avatar {
    margin-left: 5%;
    justify-self: left;
}

/* 宽屏时登录框为50% */
@media screen and (orientation:landscape) { 
    .el-dialog {
        --el-dialog-width: 500px;
    }
}

/* 宽屏时登录框为80% */
@media screen and (orientation:portrait) { 
    .el-dialog {
        --el-dialog-width: 80%;
    }
}
</style>