<script>
import KeyboardKey from './KeyboardKey.vue'

export default{
    name: 'Keyboard',
    props:{
        layout: {
            type: Array,
            default:[
                ['q','w','e','r','t','y','u','i','o','p'],
                ['a','s','d','f','g','h','j','k','l'],
                ['enter','z','x','c','v','b','n','m','back']
            ]   
        },
    },

    data(){
        var l =  [
                ['q','w','e','r','t','y','u','i','o','p'],
                ['a','s','d','f','g','h','j','k','l'],
                ['enter','z','x','c','v','b','n','m','back']
            ]
        
        var s = []
        for(var i in l){
            for(var j in l[i]){
                s[l[i][j]] = 'default'
            }
        }
        console.log(s)

        return {
            state: s,
        }
    },
    methods:{
        handlePressed(e){
            console.log('keyboard hit',e)
            this.$emit('pressed',e.toUpperCase())
        }

    },
    components:{
        KeyboardKey
    }
}
</script>

<template>
<div class="keyboard">
    <div class="mx-auto h-1/3 w-full flex justify-center" v-for="i in layout">
        <KeyboardKey v-for="j in i" :value="j" :state="state[j]"  @pressed="handlePressed"/>
    </div>
</div>
</template>


<style scoped>
.keyboard{
    width:100%;
    max-width:600px;
    height:100%;
    max-height: 300px;
    margin-left: auto;
    margin-right: auto;
}
</style>