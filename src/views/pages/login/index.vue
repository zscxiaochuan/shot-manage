<template>
    <div class="login-bg">
        <div class="login-container">
            <div class="login-header"></div>
            <div class="login-form-box">
                <div class="login-form">
                    <div class="form-container">
                        <el-form :model="param" :rules="rules" ref="login" size="large">
                            <el-form-item prop="username">
                                <div class="user input-group">
                                    <div class="title">用户名</div>
                                    <div class="input-box">
                                        <div class="input-placeholder">USERNAME</div>
                                        <div class="username-input">
                                            <el-input v-model="param.username" placeholder="用户名"> </el-input>
                                        </div>
                                    </div>
                                </div>
                            </el-form-item>
                            <el-form-item prop="password">
                                <div class="password input-group">
                                    <div class="title">密&nbsp;&nbsp;&nbsp;码</div>
                                    <div class="input-box">
                                        <div class="input-placeholder">PASSWORD</div>
                                        <div class="username-input">
                                            <el-input v-model="param.password" type="password" placeholder="密码">
                                            </el-input>
                                        </div>
                                    </div>
                                </div>
                            </el-form-item>
                            <div class="btn" @click="submitForm(login)">
                                <div class="btn-placeholder">LOGIN</div>
                                <div class="btn-text">登&nbsp;&nbsp;&nbsp;录</div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
            <!-- <div class="login-header">
                <img class="logo mr10" src="@/assets/img/bg.png" alt="" />
                <div class="login-title">后台管理系统</div>
            </div>
            <el-form :model="param" :rules="rules" ref="login" size="large">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名">
                        <template #prepend>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="密码"
                        v-model="param.password"
                        @keyup.enter="submitForm(login)"
                    >
                        <template #prepend>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="pwd-tips">
                    <el-checkbox class="pwd-checkbox" v-model="checked" label="记住密码" />
                    <el-link type="primary" @click="$router.push('/reset-pwd')">忘记密码</el-link>
                </div>
                <el-button class="login-btn" type="primary" size="large" @click="submitForm(login)">登录</el-button>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
                <p class="login-text">
                    没有账号？<el-link type="primary" @click="$router.push('/register')">立即注册</el-link>
                </p>
            </el-form> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useTabsStore } from '@/store/tabs';
import { usePermissStore } from '@/store/permiss';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';

interface LoginInfo {
    username: string;
    password: string;
}

const lgStr = localStorage.getItem('login-param');
const defParam = lgStr ? JSON.parse(lgStr) : null;
const checked = ref(lgStr ? true : false);

const router = useRouter();
const param = reactive<LoginInfo>({
    username: defParam ? defParam.username : '',
    password: defParam ? defParam.password : '',
});

const rules: FormRules = {
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
        },
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};
const permiss = usePermissStore();
const login = ref<FormInstance>();
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid: boolean) => {
        if (valid) {
            ElMessage.success('登录成功');
            localStorage.setItem('vuems_name', param.username);
            const keys = permiss.defaultList[param.username == 'admin' ? 'admin' : 'user'];
            permiss.handleSet(keys);
            router.push('/');
            if (checked.value) {
                localStorage.setItem('login-param', JSON.stringify(param));
            } else {
                localStorage.removeItem('login-param');
            }
        } else {
            ElMessage.error('登录失败');
            return false;
        }
    });
};

const tabs = useTabsStore();
tabs.clearTabs();
</script>

<style lang="less">
.login-bg {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: url(../../../assets/img/login/bg.png) center/cover no-repeat;

    .login-container {
        box-sizing: border-box;
        margin-top: -100px;
        .login-header {
            width: 727px;
            height: 173px;
            background: url(../../../assets/img/login/header.png) center/cover no-repeat;
        }
        .login-form-box {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            .login-form {
                display: flex;
                justify-content: center;
                padding: 40px 24px 0 40px;
                width: 433px;
                height: 378px;
                margin-right: -11px;
                background: url(../../../assets/img/login/mask.png) center/cover no-repeat;
                box-sizing: border-box;
                .form-container {
                    width: 100%;
                    .btn {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto;
                        width: 187px;
                        height: 60px;
                        background: url(../../../assets/img/login/btn.png) center/cover no-repeat;
                        cursor: pointer;
                        .btn-placeholder {
                            position: absolute;
                            bottom: 1px;
                            left: 10px;
                            font-size: 8px;
                            color: #fff;
                        }
                        .btn-text {
                            font-size: 24px;
                            color: #fff;
                        }
                    }
                    .input-group {
                        width: 100%;
                        .title {
                            margin-left: 4px;
                            font-size: 24px;
                            color: #fff;
                        }
                        .input-box {
                            display: flex;
                            align-items: center;
                            height: 60px;
                            background: url(../../../assets/img/login/input.png) center/cover no-repeat;
                            position: relative;
                            .username-input {
                                width: 100%;
                                margin-top: 4px;
                                .el-input {
                                    height: 35px;
                                    .el-input__wrapper {
                                        background: transparent;
                                        border-color: transparent;
                                        box-shadow: none;
                                        .el-input__inner {
                                            color: #fff;
                                            height: 100%;
                                            text-align: center;
                                            &:-webkit-autofill {
                                                -webkit-text-fill-color: #ededed !important;
                                                -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
                                                background-color: transparent;
                                                background-image: none;
                                                transition: background-color 50000s ease-in-out 0s; //背景色透明 生效时长 过渡效果 启用时延迟的时间
                                            }
                                            input {
                                                background-color: transparent;
                                            }
                                        }
                                    }
                                }
                            }
                            .input-placeholder {
                                position: absolute;
                                top: 2px;
                                right: 4px;
                                font-size: 8px;
                                color: #fff;
                                line-height: 1;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
