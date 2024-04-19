<template>
    <m-sidebar id="sidebar" class="pc" :home="getHome()" :features="getPages()" :userFeatures="getUserFeatures()"
        :user="{firstName: user?.ldap, title: user?.name}" :open="open"
         @update:modelValue="change" @open-status="open=$event"/>  
         <div id="footer" class="mobile">
        <div id="footer-btns">
            <div class="footer-btn" :class="{'selected': isPageSelected('home')}" @click="goToPage('home')">
                <div><m-icon name="DisplayHome24"/></div>
                <span>{{ $t('sidebar.home') }}</span>
            </div>
            <div class="footer-btn" :class="{'selected': isPageSelected('about')}" @click="goToPage('about')">
                <div><m-icon name="View36024"/></div>
                <span>{{ $t('sidebar.about') }}</span>
            </div>
            <div class="footer-btn" @click="logout()">
                <div><m-icon name="DisplayLogOut24"/></div>
                <span>{{ $t('sidebar.logout') }}</span>
            </div>
        </div>
        <div id="footer-line"/>
        
    </div>  
</template>
<script lang="ts" setup>
import {ref, type Ref, inject, nextTick} from 'vue'
import { useRoute, useRouter } from 'vue-router'

// components
import { MSidebar, MIcon } from '@mozaic-ds/vue-3'
import {SidebarItem} from '@/domain/mozaic'
// models
import {User} from '@/domain/user'
// services
import { useI18n } from 'vue3-i18n'
import { logout } from '@/services/auth'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const user: Ref<User>| undefined = inject<Ref<User>>('user')
const open: Ref = ref<boolean>(false)

// Get home.
const getHome = ():SidebarItem => new SidebarItem('home', t('sidebar.home'), 'DisplayHome24')

// Get navigation options.
const getPages = (): Array<SidebarItem> => [ new SidebarItem('about', t('sidebar.about'), 'View36024') ]

// Get user options.
const getUserFeatures = (): Array<SidebarItem> =>  [ new SidebarItem('logout', t('sidebar.logout')) ]

/**
 * Check if page is selected.
 * @param name 
 * @returns boolean
 */
const isPageSelected = (name: string): boolean => route.name==name   

/**
 * Redirect to router page.
 * @param name 
 */
const goToPage = async(name: string): Promise<void> => {
    if(route.name!=name)
        router.push({name: name})
    await nextTick()
    open.value = false
}

/**
 * Handles Sidebar selection.
 * @param event 
 */
const change = async (event: any): Promise<void> => {
    const selection: string = event.lv1?.code ?? event.lv0?.code ?? ''
    switch(selection){
        case 'logout': logout(); break;
        default: goToPage(selection); break;
    }    
}

</script>
<style lang="scss" scoped>

#footer {
    background: white;
    width: 100%;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    bottom: 0;
    z-index: 9;
    border-top: 0.5px solid $color-grey-300;

    #footer-line{
        width: 4.5rem;
        height: 0.125rem;
        flex-shrink: 0;
        border-radius: 0.5rem;
        background:  #000;
        margin-top: 1rem;
        margin-bottom: .62rem;
    }

    #footer-btns{
        width: calc(100% - 1rem);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: .75rem 0 1rem;
        gap: .5rem;

        .footer-btn{
            display: flex;
            flex-direction: column;
            text-align: center;
            align-items: center;

            color: $color-grey-500;
            div{
                padding: 0.25rem 1.25rem;
                border-radius: 1rem;
            }
            span{
                font-size: 0.75rem;
                font-style: normal;
                font-weight: 600;
                line-height: 1rem;
            }
            

            &.selected {
                color: #000;
                div{
                    background: #c5e39e;
                }
            }
        }
    }
}
</style>
