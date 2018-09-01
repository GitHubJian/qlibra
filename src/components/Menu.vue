<template>
    <div class="sa-sidebar">
        <section class="sidebar-section">
            <h4>
                <span class="action-onoff">
                    <span class="icon-expand-down"></span>
                </span>
                <span class="icon-dashboard"></span>
                <span>数据概览111</span>
                <span class="icon-add" data-method="showMenu" data-authorization="analyst"></span>
            </h4>
        </section>
        <section class="sidebar-section">
            <h4>
                <span class="action-onoff">
                    <span class="icon-expand-down"></span>
                </span>
                <span class="icon-dashboard"></span>
                <span>数据概览111</span>
            </h4>
            <ul class="sidebar-links fix-url">
                <li data-nav="segmentation" class="active">
                    <a href="/" title="事件分析">
                        <span class="sidebar-link-title">事件分析</span>
                    </a>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
export default {
    componentname: 'menu',
    props: {},
    data() {
        return {};
    }
};
</script>

<style lang="scss">
[class^='icon-'],
[class*=' icon-'] {
    font-family: icomoon !important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    font-size: 20px;
    -webkit-font-smoothing: antialiased;
}

.sa-sidebar {
    .sidebar-section {
        & > h4 {
            position: relative;
            color: #8492a6;
            font-size: 14px;
            font-weight: 400;
            line-height: 48px;
            padding: 0 12px 0 15px;
            margin: 0;
            user-select: none;
            cursor: pointer;

            .action-onoff {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;

                .icon-expand-down,
                .icon-expand-up {
                    float: right;
                    margin-right: 12px;

                    &::before {
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                    }
                }

                .icon-expand-down::before {
                    background-color: #2e3642;
                    color: #6c7a8e;
                    border-radius: 3px;

                    content: '\e92b';
                }

                .icon-expand-up::before {
                    background-color: #2e3642;
                    color: #6c7a8e;
                    border-radius: 3px;

                    content: '\e914';
                }
            }

            span[class^='icon-'] {
                line-height: 48px;
                vertical-align: sub;
                display: inline-block;
                color: #99a9bf;
            }

            .icon-add {
                position: relative;
                z-index: 2;
                float: right;
                font-size: 16px;
                line-height: 48px;
                right: 34px;

                &::before {
                    content: '\e901';
                }
            }

            .icon-dashboard {
                &::before {
                    content: '\e909';
                }
            }
        }

        .sidebar-links {
            list-style: none;
            padding: 0;
            margin-bottom: 0;
            li {
                box-sizing: content-box;
                height: 38px;
                line-height: 38px;
                padding: 0;
                transition: background 0.2s ease-in-out;
                position: relative;
                background-color: #2e3743;

                a {
                    color: #c0ccda;
                    font-size: 13px;
                    width: 100%;
                    height: 38px;
                    line-height: 38px;
                    display: inline-block;
                    position: relative;
                    outline: 0;

                    span {
                        display: inline-block;
                        width: 24px;
                        vertical-align: middle;
                        line-height: 38px;

                        &.sidebar-link-title {
                            width: 100%;
                            padding-left: 40px;
                            padding-right: 10px;
                            vertical-align: sub;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                }
                &.active {
                    background: #2dca93;
                    color: #fff;
                    font-weight: 400;

                    a {
                        color: #fff;
                    }
                }
            }

            & > li:nth-of-type(1) {
                border-radius: 3px 3px 0 0;
                border-top: 6px solid #2e3743;
            }
        }
    }
}
</style>
