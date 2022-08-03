<script>
import Header from "./Header.vue"
import Social from "./Social.vue"
import Keyboard from "./Keyboard.vue"
import TwordleLetter from "./TwordleLetter.vue"
import Words from "./Words.json"

const numTurns = 10

export default{
    name: 'PlayArea',
    components:{
        Header,
        Social,
        Keyboard,
        TwordleLetter
    },
    methods:{
        generateRandomLetter: function(){
            const alphabet = "ABCDEFHIJKLMNOPQRSTUVWXYZ"

            return alphabet[Math.floor(Math.random() * alphabet.length)]
        },
        isValidWord: function(word){
            console.log(word)
            var exists = Words.filter(w=>w.word == word)
            if(exists.length > 0)
                return true
            else
                return false
        },
        checkWord: function(word){
            //reset cursor position
            this.gameTurn++
            this.cursor = 0

            //check if out of turns
            if(this.gameTurn == numTurns){
                this.gameState = 'finish'
                this.msg = 'You ran out of turns.'
            }

            //check if word is right
            if(word == this.word){
                if(this.gameTurn==1)
                    this.msg = 'You guessed the right word in 1 turn.'
                else
                    this.msg = 'You guessed the right word in ' + this.gameTurn + ' turns.'
                this.gameState = 'finish'
            }

            //check if letters exist and update keyboard
            var found = false;
            if(word[0]==this.word[0]){
                this.wordStyle[(this.gameTurn-1)][0]='found'
                console.log('set',word[0],'to found on keyboard')
                found = true;
            }
            else if(word[0]==this.word[1]){
                this.wordStyle[(this.gameTurn-1)][0]='inWord'
                console.log('set',word[0],'to inword if not found on keyboard')
                found = true;
            }
            else {
                this.wordStyle[(this.gameTurn-1)][0]='played'
            }
            
            if(word[1]==this.word[0]){
                this.wordStyle[(this.gameTurn-1)][1]='inWord'
                console.log('set',word[1],'to inword if not found on keyboard')
                found= true;
            }
            else if(word[1]==this.word[1]){
                this.wordStyle[(this.gameTurn-1)][1]='found'
                console.log('set',word[1],'to found on keyboard')
                found = true;
            }
            else {
                this.wordStyle[(this.gameTurn-1)][1]='played'
            }
        },
        handleInput: function(e){
            console.log('handle input',e, this.gameState)
            if(this.gameState=='play'){
                if(e=='BACK'){
                    if(this.cursor > 0)
                        this.cursor--

                    this.gameData[this.gameTurn][this.cursor] = ''
                    this.wordStyle[this.gameTurn][this.cursor] = 'default'
                }
                else if(e=='ENTER'){
                    if(this.cursor==2){
                        //check against dictionary - if exists then process
                        var w = this.gameData[this.gameTurn][0]+this.gameData[this.gameTurn][1]
                        if(this.isValidWord(w))
                            this.checkWord(w)
                    }
                }
                else{
                    if(this.cursor < 2){
                        this.gameData[this.gameTurn][this.cursor] = e
                        this.wordStyle[this.gameTurn][this.cursor] = 'pressed'
                        this.cursor++
                        console.log(this.cursor)
                    }
                }
            }
            else if(this.gameState=='finish'){
                this.gameState='idle'
            }
        },
        getWord: function(){
            const d = new Date();
            var w = Words[(d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDay()) % Words.length]
            console.log(w)
            this.word = w.word
            this.description = w.description
        }
    },
    data(){
        var g = []
        for(let i = 0; i < numTurns; i++)
            g.push(['',''])

        var s = []
        for(let i = 0; i < numTurns; i++)
            s.push(['default','default'])

        return{
            gameData: g,
            wordStyle: s,
            input: '',
            word: '',
            description: '',
            gameState: 'play',
            gameTurn: 0,
            cursor:0,
            msg: 'You won in 3 rounds!'
        }
    },
    mounted(){
        this.getWord()
    },
    computed:{
        showDef(){
            console.log(this.gameState)
            if(this.gameState=='finish')
                return true
            else
                return false
        }
    }
}

</script>

<template>
<div class="w-full h-screen bg-gray-600">
    <Transition>
        <div class="z-50 w-96 border p-2 bg-white absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded drop-shadow-lg" v-if="showDef">
            <div class="text-sm">The word is:</div>
            <div class="text-5xl mb-5 font-extrabold">{{word}}</div>
            <div class="text-xs">Definition of <span class="italic">{{word}}</span>:</div>
            <div class="italic mb-5">{{description}}</div>
            <div class="mb-3">{{msg}}</div>
            <div class="text-xs">Press any key to contine.</div>
        </div>
    </Transition>
    <div class="absolute inline-flex flex-col justify-center top-0 w-full h-4/5 py-10">
    
        <Header />

        <div class="h-full w-full mx-auto p-0 flex butts">
            <div class="inline-flex flex-col w-1/2 h-full">    
                <div class="ml-auto w-full h-1/5 flex justify-center items-center rowmax">
                    <TwordleLetter :value="gameData[0][0]" :state="wordStyle[0][0]"/>
                    <TwordleLetter :value="gameData[0][1]" :state="wordStyle[0][1]"/>
                </div>
                <div class="ml-auto w-full h-1/5 flex justify-center items-center rowmax">
                    <TwordleLetter :value="gameData[1][0]" :state="wordStyle[1][0]"/>
                    <TwordleLetter :value="gameData[1][1]" :state="wordStyle[1][1]"/>
                </div>
                <div class="ml-auto w-full h-1/5 flex justify-center items-center rowmax">
                    <TwordleLetter :value="gameData[2][0]" :state="wordStyle[2][0]"/>
                    <TwordleLetter :value="gameData[2][1]" :state="wordStyle[2][1]"/>
                </div>
                <div class="ml-auto w-full h-1/5 flex justify-center items-center rowmax">
                    <TwordleLetter :value="gameData[3][0]" :state="wordStyle[3][0]"/>
                    <TwordleLetter :value="gameData[3][1]" :state="wordStyle[3][1]"/> 
                </div>
                <div class="ml-auto w-full h-1/5 flex justify-center items-center rowmax">
                    <TwordleLetter :value="gameData[4][0]" :state="wordStyle[4][0]"/>
                    <TwordleLetter :value="gameData[4][1]" :state="wordStyle[4][1]"/> 
                </div>
            </div>
            <div class="inline-flex flex-col w-1/2 h-full">    
                <div class="mr-auto w-full h-1/5 flex justify-center items-center rowmax">
                    <TwordleLetter :value="gameData[5][0]" :state="wordStyle[5][0]"/>
                    <TwordleLetter :value="gameData[5][1]" :state="wordStyle[5][1]"/>
                </div>
                <div class="mr-auto w-full h-1/5 flex justify-center items-center rowmax">
                    <TwordleLetter :value="gameData[6][0]" :state="wordStyle[6][0]"/>
                    <TwordleLetter :value="gameData[6][1]" :state="wordStyle[6][1]"/>
                </div>
                <div class="mr-auto w-full h-1/5 flex justify-center items-center rowmax">
                    <TwordleLetter :value="gameData[7][0]" :state="wordStyle[7][0]"/>
                    <TwordleLetter :value="gameData[7][1]" :state="wordStyle[7][1]"/>
                </div>
                <div class="mr-auto w-full h-1/5 flex justify-center items-center rowmax">
                    <TwordleLetter :value="gameData[8][0]" :state="wordStyle[8][0]"/>
                    <TwordleLetter :value="gameData[8][1]" :state="wordStyle[8][1]"/> 
                </div>
                <div class="mr-auto w-full h-1/5 flex justify-center items-center rowmax">
                    <TwordleLetter :value="gameData[9][0]" :state="wordStyle[9][0]"/>
                    <TwordleLetter :value="gameData[9][1]" :state="wordStyle[9][1]"/> 
                </div>
            </div>
        </div>
    </div>
    <div class="w-full h-1/5 absolute bottom-0">
        <Keyboard @pressed="handleInput($event)" />
    </div>
    <div class="absolute top-0 w-full h-fit bg-black text-gray-300 p-1">
        <div class="inline">Twordle - IT BE AH</div>
        <div class="absolute right-1 inline-flex">
            <button><img class="h-5 w-5 mx-1" src="/public/help.svg"/></button>
            <button><img class="h-5 w-5 mx-1" src="/public/stats.svg"/></button>
            <button><img class="h-5 w-5 mx-1" src="/public/gear.svg"/></button>
        </div>
    </div>
</div>
</template>

<style scoped>

.rowmax{
    max-width:200px;
    max-height:80px;
}
.butts{
    max-height: 420px;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
