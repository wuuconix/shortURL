<template>
    <div class="card_wrapper">
        <card v-for="item in shortUrls" :url="this.baseURI + item['dest']" :detail="item['detail']"></card>
    </div>
    <div class="button_wrapper">
        <el-button type="primary" @click="open_dialog" class="button">Prove you are wuuconix</el-button>
    </div>
    <el-dialog v-model="dialogVisible" title="Authenticate" width="30%">
        <el-input v-model="user" placeholder="User" />
        <el-input v-model="pass" placeholder="Pass" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="handle_confirm">Confirm</el-button>
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
            baseURI: baseURI
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
        handle_confirm() {
            this.dialogVisible = false
            fetch(`${apiURI}/login`, {
                method: "POST",
                body: new URLSearchParams({ user: this.user, pass: this.pass })
            }).then(res => res.json()).then(res => {
                if (res.success) {
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
        }
    },
    mounted() {
        this.get_data()
        this.$message({
            message: '欢迎来到武丑兄的短链站',
            type: 'success'
        });
    }
}
</script>
<style>
div.card_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
div.button_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}
.el-card {
    margin: 10px 10px;
    flex: 30%;
}
</style>