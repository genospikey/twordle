<script>
export default{
    props:['value'],
    data(){
        return{
            pressed: false,
            hover: false,
            physical: false,
            state: 'default'
        }
    },
    computed:{
        class(){
            if(this.pressed==true || this.physical)
                return 'bg-gray-500'
            else if(this.hover==true)
                return 'bg-gray-400'
            else
                return 'bg-gray-300'
        },
        upperValue(){
            return this.value.toUpperCase()
        }
    },
    methods:{
        press: function(){
            this.pressed=true
            this.$emit('pressed',this.value)
        }
    },
    mounted(){
        this.handleKeyDown = window.addEventListener('keydown', e => {
            //handle keys
            if(this.value.toUpperCase()==e.code[3]){
                this.physical = true
                this.$emit('pressed',this.value)
            }

            //handle backspace and enter code='Enter','Backspace'
            if(e.code=='Enter' && this.value=='enter'){
                this.physical = true
                this.$emit('pressed',this.value)
            }

            if(e.code=='Backspace' && this.value=='back'){
                this.physical = true
                this.$emit('pressed',this.value)
            }
        })

        this.handleKeyUp = window.addEventListener('keyup', e =>{
            //handle keys
            if(this.value.toUpperCase()==e.code[3]){
                this.physical = false
            }

            //handle backspace and enter code='Enter','Backspace'
            if(e.code=='Enter' && this.value=='enter'){
                this.physical = false
            }

            if(e.code=='Backspace' && this.value=='back'){
                this.physical = false
            }
        });

    }
}

</script>
<template>
<div class="inline-block w-full h-full flex-1 p-1">
    <button class="w-full h-full" @mouseover="hover=true" @mousedown="press" @mouseup="pressed=false" @mouseleave="pressed=false;hover=false">
        <div class="inline-flex w-full h-full border p-1 items-center justify-center rounded-md border-grey-400" :class="class">
            <span class="font-bold text-sm">{{upperValue}}</span>
        </div>
    </button>
</div>
</template>