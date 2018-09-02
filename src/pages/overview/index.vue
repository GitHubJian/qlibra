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
                </div>
                <div class="widget-chart-container container">
                    <div class="main">
                        <div class="dashboard-number-container number-type2">
                            <div class="inner">
                                <div class="main-number-content">
                                    <div></div>
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

