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
            <div>
                <OverviewPanel></OverviewPanel>
                <OverviewPanel></OverviewPanel>
                <OverviewPanel></OverviewPanel>
                <OverviewPanel></OverviewPanel>
            </div>
        </template>
    </Layout>
</template>

<script>
import Layout from 'components/Layout';
import OverviewPanel from 'components/OverviewPanel';

export default {
    components: {
        Layout,
        OverviewPanel
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss">
</style>


