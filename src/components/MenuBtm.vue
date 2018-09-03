<template>
    <div class="q-sidebar-bottom-panel">
        <a>
            <span class="icon-metadata"></span>
            <span>元数据</span>
        </a>
        <a>
            <span class="icon-metadata"></span>
            <span>元数据</span>
        </a>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style lang="scss">
.q-sidebar-bottom-panel {
    width: 100%;

    a {
        position: relative;
        display: inline-block;
        width: 33.3%;
        height: 100%;
        color: #c0ccda;
        line-height: 50px;
        text-align: center;
        background: #35404f;
        transition: all 0.2s ease-in-out;
        border-right: 1px solid #2e3743;
    }
}
</style>
