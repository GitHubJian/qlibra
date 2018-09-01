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
            <div class="filter-tool-bar">
                <div class="event-bar">
                    <span>请添加指标</span>
                </div>
                <section class="report-ops">
                    <div class="report-ops-panel">
                        <div class="report-ops-hd">任意事件1</div>
                        <div class="report-ops-bd">A且B且C</div>
                    </div>
                    <div class="report-ops-panel">
                        <div class="report-ops-hd">任意事件1</div>
                        <div class="report-ops-bd">A且B且C</div>
                    </div>
                </section>
                <section class="report-filter">
                    <div class="report-filter-panel">
                        <div class="report-filter-hd">过滤器1</div>
                        <div class="report-filter-bd">A且B且C</div>
                    </div>
                    <div class="report-filter-panel">
                        <div class="report-filter-hd">过滤器1</div>
                        <div class="report-filter-bd">A且B且C</div>
                    </div>
                </section>
            </div>
            <div class="report-filter-wrapper">
                <h4>针对表格进行删选</h4>
            </div>
            <div id="report" class="report-chart" style="width:100%;height:400px;padding:12px;"></div>
        </template>
    </Layout>
</template>

<script>
import Layout from 'components/Layout.vue';
import * as echarts from 'echarts';

export default {
    components: {
        Layout
    },
    data() {
        return {
            echarts,
            abc: Date.now()
        };
    },
    mounted() {
        let div = document.getElementById('report');
        var myChart = echarts.init(div);

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
};
</script>

<style lang="scss">
.analyse-top {
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

.report-filter-wrapper {
    padding: 20px 12px 10px;
    border-top: 1px solid #d9dadb;
    & > h4 {
        text-align: center;
        font-size: 16px;
        color: #202742;
        line-height: 24px;
        vertical-align: bottom;
    }
}

.report-chart {
    padding-bottom: 20px;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    position: relative;
    background: transparent;
}
</style>

