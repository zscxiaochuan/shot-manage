<template>
    <div class="wrapper">
        <v-header />
        <v-sidebar />
        <div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
            <!-- <v-tabs></v-tabs> -->
            <div class="content">
                <router-view v-slot="{ Component }">
                    <transition name="move" mode="out-in">
                        <keep-alive :include="tabs.nameList">
                            <component :is="Component"></component>
                        </keep-alive>
                    </transition>
                </router-view>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useSidebarStore } from '@/store/sidebar';
import { useTabsStore } from '@/store/tabs';
import vHeader from '@/components/header.vue';
import vSidebar from '@/components/sidebar.vue';
import vTabs from '@/components/tabs.vue';

const sidebar = useSidebarStore();
const tabs = useTabsStore();
</script>

<style lang="less">
.wrapper {
    height: 100vh;
    overflow: hidden;
    background: url(../assets/img/bg.png) center/cover no-repeat;
}
.content-box {
    position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom: 0;
    padding-bottom: 30px;
    -webkit-transition: left 0.3s ease-in-out;
    transition: left 0.3s ease-in-out;
    overflow: hidden;
}

.content {
    display: flex;
    width: auto;
    height: 100%;
    padding: 20px;
    padding-bottom: 0;
    box-sizing: border-box;
    &>div {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        &>.container {
            flex: 1;
            height: 0;
        }
    }
}

.content::-webkit-scrollbar {
    width: 0;
}

.content-collapse {
    left: 65px;
}
</style>
