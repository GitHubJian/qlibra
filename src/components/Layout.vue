<template>
    <div class="page">
        <div class="navbar">
            <div id="sa_head_pack_up">
                <a id="sidebar-pack" class="btn-icon">
                    <span class="icon-pack-up"></span>
                </a>
            </div>
            <div id="sa_head_project" class="single-project">
                <span>测试项目</span>
            </div>
            <ul class="sa-head-r">
                <li>
                    <a class="sa-head-data-import-tip">
                        <span class="icon-demo"></span>
                        <span>预约免费演示</span>
                    </a>
                </li>
                <li>
                    <a class="sa-head-data-import-tip">
                        <span class="icon-demo"></span>
                        <span>预约免费演示</span>
                    </a>
                </li>
                <li>
                    <a class="sa-head-data-import-tip">
                        <span class="icon-demo"></span>
                        <span>预约免费演示</span>
                    </a>
                </li>
                <li class="dropdown">
                    <a class="sa-head-data-import-tip">
                        <span class="icon-demo"></span>
                        <span>预约免费演示</span>
                    </a>
                    <ul id="user-dropdown" class="dropdown-menu">
                        <li>
                            <a id="sa_head_sdk">数据接入</a>
                        </li>
                        <li>
                            <a id="sa_head_sdk">数据接入</a>
                        </li>
                        <li>
                            <a id="sa_head_sdk">数据接入</a>
                        </li>
                        <li>
                            <a id="sa_head_sdk">数据接入</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <aside class="sidebar">
            <div id="sidebar-top" class="sidebar-top">
                <a class="q-logo"></a>
            </div>
            <div class="sa-sidebar-scoll-wrap">
                <Menu></Menu>
            </div>
            <div class="sidebar-bottom">
                <MenuBtm></MenuBtm>
            </div>
        </aside>
        <div class="main">
            <slot name="toolbar"></slot>
            <div class="sa-report">
                <slot name="report"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import Menu from './Menu';
import MenuBtm from './MenuBtm';

export default {
    components: {
        Menu,
        MenuBtm
    },
    data() {
        return {
            abc1: 12222,
            menus: []
        };
    }
};
</script>

<style lang="scss">
@import './normalize.css';

* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.dropdown {
    position: relative;
    &.open {
        .dropdown-menu {
            display: block;
        }
    }

    .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        display: none;
        float: left;
        min-width: 160px;
        padding: 5px 0;
        margin: 2px 0 0;
        font-size: 14px;
        text-align: left;
        list-style: none;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ccc;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
        -webkit-background-clip: padding-box;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    }

    .dropdown-menu {
        min-width: 100%;
        border-radius: 0;
        padding: 0;
        max-width: 320px;
        z-index: 1070;

        li {
            position: relative;
            a {
                display: block;
                padding: 3px 20px;
                padding: 6px;
                width: 100%;
                height: 100%;
                font-weight: 400;
                line-height: 1.42;
                color: #4c535a;
                white-space: nowrap;
                overflow: hidden;
                clear: both;
                text-overflow: ellipsis;
                cursor: pointer;
                transition: background 0.2s ease-in-out;
            }
        }
    }
}

@function stripUnit($number) {
    @return $number / ($number * 0 +1);
}

$navbarHeight: 55;
$sidebarWidth: 240;

.navbar {
    position: fixed;
    right: 0px;
    top: 0px;
    z-index: 1030;
    margin-bottom: 20px;
    width: calc(100% - 240px);
    height: $navbarHeight * 1px;
    min-height: 50px;
    line-height: $navbarHeight * 1px;
    background: #fff;
    border: 0;
    color: #475669;
    box-shadow: 0 1px 1px 0 rgba(166, 166, 166, 0.2);
    transition: margin-left 0.2s ease;

    &.active {
        width: calc(100% - 63px);
        margin-left: 63px;
        transition: all 0.2s ease;
    }

    #sa_head_pack_up {
        position: relative;
        margin-left: -4px;
        display: inline-block;
        width: 54px;
        vertical-align: top;

        a {
            display: inline-block;
            width: 100%;
            height: 55px;
            color: #475669;
            font-weight: 300;
        }
    }

    #sa_head_project {
        position: relative;
        margin-left: -2px;
        display: inline-block;
        vertical-align: top;
        transition: all 0.2s ease;

        span {
            padding: 5px 0 5px 18px;
        }
    }

    .sa-head-r {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;

        & > li {
            display: inline-block;
            height: 100%;
            vertical-align: top;

            & > a {
                position: relative;
                display: inline-block;
                padding: 0 20px;
                max-width: 240px;
                height: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                vertical-align: super;
            }
        }
    }

    #user-dropdown {
        left: auto;
        right: 0;
    }
}

.page {
    width: 100%;
    height: 100vh;
    padding-top: $navbarHeight * 1px;
    align-items: stretch;
    min-width: 799px;
}

.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1020;
    padding: 0 0 50px;
    width: $sidebarWidth * 1px;
    height: 100%;
    background: #35404f;
    transition: width 0.2s, left 0.2s;
    box-shadow: 2px 0 10px 0 rgba(166, 166, 166, 0.5);

    .q-logo {
        width: 130px;
        height: $navbarHeight * 1px;
        background: 10px center no-repeat;
        background-size: 110px auto;
        display: inline-block;
        transform: scale(0.85);
        transition: transform 0.3s;
    }

    .sidebar-top .q-logo {
        display: block;
    }

    .sa-sidebar-scoll-wrap {
        height: calc(100% - 60px);
        overflow-y: auto;
    }

    .sidebar-bottom {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 240px;
        height: 50px;
        display: flex;
        background: #35404f;
        transition: all 0.15s linear;
        border-left: 1px solid #35404f;
        overflow-x: hidden;
        border-top: 1px solid #2e3743;
    }
}

.main {
    width: 100%;
    height: 100%;
    padding-left: $sidebarWidth * 1px;
    transition: padding-left 0.2s ease;

    .bookmark-tool-bar {
        position: fixed;
        top: 55px;
        z-index: 99;
        width: calc(100% - 240px);
    }

    .sa-report {
        padding-top: 56px;
        width: 100%;
        min-height: 100%;
    }
}
</style>
