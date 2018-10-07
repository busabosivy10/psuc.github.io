<template>
    <div>
        <nav>
            <div class="container">
                <router-link to="/" class="logo">
                    <img src="/logo.png">
                    <h1>PSU</h1>
                </router-link>

                <b-nav fill tabs>
                <b-nav-item> <router-link to="/">Home</router-link></b-nav-item>
                <b-nav-item-dropdown id="nav7_ddown" text="About Us" extra-toggle-classes="nav-link-custom" right>
                    <b-dropdown-item href="VissionMission">Vission And Mission</b-dropdown-item>
                    <b-dropdown-item href="GuidingPhilosophyandCoreValue">Guiding Philosophy and Core Value</b-dropdown-item>
                    <b-dropdown-item href="StrategicGoals">Strategic Goals</b-dropdown-item>
                    <b-dropdown-item href="QualityPolicy">Quality Policy</b-dropdown-item>
                    <b-dropdown-item href="PSUHymn">PSU Hymn</b-dropdown-item>
                    
                    </b-nav-item-dropdown>
                </b-nav>
                <div class="right-nav">
                    <router-link to="/complaints" class="normal" v-if="isClientLoggedIn">View Complaints</router-link>
                    <button class="logout" @click="logout()" v-if="isAdminLoggedIn"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
                    <button class="logout" @click="clientLogout()" v-if="isClientLoggedIn"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
                </div>
            </div>
        </nav>
        <router-view/>
        <transition name="fade">
            <div class="loading-container" v-if="isLoading"></div>
        </transition>
    </div>
</template>

<script>
    import Cookie from 'js-cookie'
    import jwt from 'jsonwebtoken'
    export default{
        data() {
            return{
                isLoading: false,
                isAdminLoggedIn: false,
                isClientLoggedIn: false,
                decodedClientToken: ''
            }
        },
        methods: {
            logout() {
                let me = this
                me.isLoading = true
                Cookie.remove('admin-token')
                setTimeout(function() {
                    me.isLoading = false
                    me.isAdminLoggedIn = false
                    me.$router.push('/admin-panel')
                }, 1000)
            },
            clientLogout() {
                let me = this
                me.isLoading = true
                Cookie.remove('client-token')
                setTimeout(function() {
                    me.isLoading = false
                    me.isClientLoggedIn = false
                    me.$router.push('/')
                }, 1000)
            }
        },
        mounted() {
            let me = this

            // for checking of admin auth state
            var c = Cookie.get('admin-token')
            if(c == undefined) {
                me.isAdminLoggedIn = false
            }else{
                jwt.verify(Cookie.get('admin-token'), process.env.VUE_APP_JWT_SECRET, (err, decoded) => {
                    if(!err) {
                        me.isAdminLoggedIn = true
                    }else{
                        me.isAdminLoggedIn = false
                    }
                })
            }

            // for checking of client auth state
            var x = Cookie.get('client-token')
            if(x == undefined) {
                me.isClientLoggedIn = false
            }else{
                jwt.verify(Cookie.get('client-token'), process.env.VUE_APP_JWT_SECRET, (err, decoded) => {
                    if(!err) {
                        me.isClientLoggedIn = true
                        me.decodedClientToken = decoded
                    }else{
                        me.isClientLoggedIn = false
                    }
                })
            }
        }
    }
</script>