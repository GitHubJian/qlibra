<template>
    <Layout>
        <template slot="toolbar">
            <div class="bookmark-tool-bar">
                <div class="analyse-top">
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
                            <div class="more-method-layer">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template slot="report">
            <div class="widget-container">
                <div class="widget-content-container">
                    <div class="widget-topbar">
                        <div class="widget-title">
                            <div class="title nav">
                                <a>昨日活跃用户</a>
                            </div>
                            <div class="range">
                                2018-09-01~2018-09-01 | 昨日
                            </div>
                        </div>
                    </div>
                    <div class="widget-chart-container container">
                        <div class="dashboard-number-container number-type2">
                            <div class="inner">
                                <div class="main-number-content">
                                    <div class="number-content clearfix">
                                        <span class="number">6,837</span>
                                        <span class="measuresUnit">人</span>
                                        <div class="mom-yoy-content">
                                            <div class="mom-content">
                                                <div class="">
                                                    <span class="measuresUnit">环比</span>
                                                    <span class="kpi-drop">
                                                        <span class="icon-falling"></span>
                                                        <span>54.32%</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="yoy-content">
                                                <div class="">
                                                    <span class="measuresUnit">同比</span>
                                                    <span class="kpi-drop">
                                                        <span class="icon-falling"></span>
                                                        <span>54.32%</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Layout>
</template>

<script>
import Layout from 'components/Layout.vue';
export default {
    components: {
        Layout
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss">
.widget-container {
    float: left;
    width: 25%;
    .widget-content-container {
        padding: 14px 20px;
        height: 100%;
        border: 2px #fff solid;
        background: #fff;
        box-shadow: 0 2px 11px 0 rgba(190, 202, 218, 0.17);
        border-radius: 3px;

        .widget-topbar {
            .widget-title {
                display: inline-block;
                max-width: calc(100% - 20px);

                .title {
                    color: #5f6e82;
                    white-space: nowrap;
                    overflow: hidden;
                    font-weight: 400;
                    font-size: 14px;
                    text-overflow: ellipsis;

                    a {
                        display: inline-block;
                        min-width: 10px;
                        min-height: 20px;
                        color: #5f6e82;
                    }
                }

                .range {
                    font-size: 12px;
                    color: #8492a6;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
            }
        }

        .widget-chart-container {
            .dashboard-number-container {
                position: relative;
                margin-top: 8px;
                color: #8492a6;
                font-size: 13px;
                font-family: Roboto, 'Helvetica Neue', Helvetica, Arial,
                    sans-serif;
                font-weight: 400;

                .inner {
                    width: 100%;

                    .main-number-content {
                        .number-content {
                            width: 100%;
                            margin-top: -3px;
                            ::after {
                                content: '';
                                display: table;
                                clear: both;
                            }

                            .number {
                                float: left;
                                display: inline-block;
                                font-size: 40px;
                                max-width: calc(100% - 30px);
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }

                            .measuresUnit {
                                float: left;
                                margin-top: 30px;
                                font-size: 12px;
                            }

                            .mom-yoy-content {
                                float: left;
                                display: inline-block;
                                margin: -5px 0 0;
                                width: 100%;

                                .mom-content {
                                    display: inline-block;
                                }
                            }

                            .measuresUnit {
                                font-size: 12px;
                            }
                            
                            .kpi-drop {
                                position: relative;
                                padding-left: 8px;
                                color: #fc6772;
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>


