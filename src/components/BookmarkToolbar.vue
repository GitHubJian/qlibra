<template>
    <div class="bookmark-tool-bar">
        <div class="bookmark-title-container">
            <span class="bookmark-title">事件分析</span>
            <span class="icon-help"></span>
        </div>
        <div class="bookmark-right">
            <div class="bookmark-wrapper">
                <a class="btn btn-save">
                    <span></span>
                    <span>保存</span>
                </a>
            </div>
            <div class="bookmark-wrapper bookmark-wrapper-split"></div>
            <div class="bookmark-wrapper">
                <span class="btn icon-search"></span>
                <span class="btn icon-download"></span>
                <span class="btn more-method"></span>
                <div class="more-method-layer"></div>
            </div>
        </div>
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
.bookmark-tool-bar {
    position: relative;
    padding: 0 16px;
    background: #f7f9fa;

    .bookmark-title-container {
        display: inline-block;
        vertical-align: middle;
        .bookmark-title {
            padding: 13px 0;
            color: #475669;
            outline: 0;
            float: left;
            max-width: 300px;
            min-width: 30px;
            overflow-x: auto;
            white-space: nowrap;
            font-size: 20px;
            font-weight: 700;
        }
    }

    .bookmark-right {
        margin-top: 13px;
        float: right;

        ::after {
            content: '';
            display: table;
            clear: both;
        }

        .bookmark-wrapper {
            float: left;

            &.bookmark-wrapper-split {
                margin: 0 10px;
                height: 24px;
                border-right: 1px solid rgba(0, 0, 0, 0.12);
            }
        }

        .btn {
            float: left;
            padding: 2px;
            width: 24px;
            min-width: 24px;
            height: 24px;
            margin-right: 10px;

            &.btn-save {
                width: 50px;
                text-align: center;
            }

            &:last-of-type {
                margin-right: 0;
            }

            &.icon-search {
                background: red;
            }

            &.icon-download {
                background: blue;
            }
        }

        .more-method-layer {
            display: none;
        }
    }
}
</style>
