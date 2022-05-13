<template>
    <el-card class="box-card" @click="handle_click">
        <template #header>
            <el-link class="link" :href="url" target="_blank" type="primary">{{ url }}</el-link>
        </template>
        <div class="text item"> {{ detail }} </div>
    </el-card>
</template>

<script>
export default {
    props: ['url', 'detail'],
    methods: {
        handle_click() {
            window.open(this.url)
        }
    }
}

</script>
<style>
.text {
font-size: 14px;
}

.item {
margin-bottom: 18px;
}

.box-card {
width: 100%;
}

.box-card:hover {
    cursor: pointer
}

.link {
    white-space: normal;
    word-break: break-all;
}
</style>