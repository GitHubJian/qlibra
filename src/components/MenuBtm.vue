<template>
    <div class="sidebar-bottom-panel">
        <a class="">
            <span class="icon-metadata"></span>
            <span>元数据</span>
        </a>
        <a class="">
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
.sidebar-bottom-panel {
    width: 100%;

    a {
        color: #c0ccda;
        width: 33.3%;
        height: 100%;
        line-height: 50px;
        display: inline-block;
        text-align: center;
        background: #35404f;
        position: relative;
        transition: all 0.2s ease-in-out;
        border-right: 1px solid #2e3743;

        span {
            font-size: 14px;
        }
    }
}
</style>
