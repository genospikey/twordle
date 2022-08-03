<script>
export default{
    props: {
        state: {
            type: String, 
            default: 'default'
        },
        value: {
            type: String,
            default: 'W'
        }
    },
    computed:{
        bg(){
            // change this to a big json dictionary basically 
            // or make an arraywith the state as a key
            if(this.state=='default')
                return 'bg-gray-800'
            if(this.state=='inWord')
                return 'bg-yellow-300'
            if(this.state=='found')
                return 'bg-green-500'
            if(this.state=='pressed')
                return 'bg-gray-300'
            if(this.state=='played')
                return 'bg-gray-500'
        }
    },
}
</script>

<template>
<div class="inline-block w-full h-full button-max p-0.5 ">
    <div class="transition-all w-full h-full border relative rounded-md border-gray-900" :class="bg">
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold w-min">{{value}}</div>
    </div>
</div>
</template>

<style scoped>
.button-max{
    max-width: 5rem;
    max-height: 5rem;
}
</style>
