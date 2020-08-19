<template>
    <div class="main">
        <Nav></Nav>
            <router-view />
    </div>
</template>

<script>

import Nav from '../components/nav.vue'

export default {
    name: 'Main',
    components: {
        Nav
    }
}

</script>

<style>
.main{
    height: 100%;
}
</style>


