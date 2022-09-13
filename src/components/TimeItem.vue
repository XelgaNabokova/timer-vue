<template>
    <div class="timer">
        <h1 class="timer__title">Timer {{timerCategory.replace('/', '')}}</h1>
        <button 
            v-if="!open" 
            class="timer__btn timer__btn-choose" 
            @click="openInput"
        >Choose a date</button>
        <div class="timer__input-block">
            <!-- <div v-if="open">
                <label>From</label>
                <input 
                    class="timer__input" 
                    type="date"
                    :value="chooseDate.from"
                    @change="(e) => onDateChange('from', e.target.value)"
                />
            </div> -->
            <div v-if="open">
                <!-- <label>To</label> -->
                <input 
                    class="timer__input" 
                    type="date"
                    :value="chooseDate.to"
                    @change="(e) => onDateChange('to', e.target.value)"
                />
            </div>
            <button 
                v-if="open && choose" 
                class="timer__btn timer__btn-start" 
                @click="onStart"
            >Start</button>
        </div>
        <div class="timer__block">
            <ul class="timer__list">
                <li 
                    v-for="item in timer" 
                    :key="item.number"  
                    class="timer__item"
                >
                    <div>
                        <div 
                            class="timer__item_number" 
                            :class="chooseSettings.animation">
                            <div
                                :class="chooseSettings.background"
                            >{{ item.number.toString().slice() }}</div>
                        </div>
                        <span id={{item.id}} class="timer__item_text">{{ item.title }}</span>
                    </div>
                    <div class="timer__item_separator">:</div>
                </li>
            </ul>
        </div>
        <button 
            class="timer__btn timer__btn-settings" 
            @click="this.openSettings = !this.openSettings"
        >Settings</button>
        <div class="timer__settings" v-if="openSettings">
            <div class="timer__settings_item" >
                <h2 @click="this.isActive = !this.isActive">Animation</h2>
                <ul v-if="openSettings && isActive">
                    <li
                        v-for="item in settings.animation"
                        :key="item"  
                        @click="settingsChange(item, 'animation')"
                    >{{ item }}</li>
                </ul>
            </div>
             <div class="timer__settings_item" >
                <h2 @click="this.isActive = !this.isActive">Background</h2>
                <ul v-if="openSettings && isActive">
                    <li
                        v-for="item in settings.background"
                        :key="item"  
                        @click="settingsChange(item, 'background')"
                    >{{ item }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    const dayjs = require('dayjs')
    const duration = require('dayjs/plugin/duration')
    dayjs.extend(duration)

    export default {
        name: 'TimerItem',
        props: ['timerCategory'],
        data() {
            return {
                open: false,
                openSettings: false,
                chooseSettings: { animation: '', background: '' },
                isActive: false,
                choose: false,
                chooseDate: { from: 0, to: 0 },
                list: {
                    days: {id: 'days', title: 'Days', number: 0},
                    hours: {id: 'hours', title: 'Hours', number: 0},
                    minutes: {id: 'minutes', title: 'Minutes', number: 0},
                    seconds: {id: 'seconds', title: 'Seconds', number: 0}
                },
                settings: {
                    animation: ['rotateX', 'scale', 'flipBottom'],
                    background: ['green', 'blue', 'orange']
                },
            }
        },
        methods: {
            openInput() {
                this.open = !this.open
            },
            onDateChange(name, value) {
                this.chooseDate = { ...this.chooseDate, [name]: value } 
                this.chooseDate[name] ? this.choose = true : null
            },
            onStart() {
                const timer = setInterval(() => {
                    const start = this.chooseDate.from ? dayjs(this.chooseDate.from) : dayjs();
                    const end = dayjs(this.chooseDate.to);

                    const interval = dayjs.duration(end.diff(start));

                    if(interval.$ms <= 0) {
                        console.log("Unfortunately we have past the event day");
                        clearInterval(timer);
                        return;
                    } else {
                        if (this.list.days) this.list.days.number = interval.days();
                        this.list.hours.number = interval.hours(); 
                        this.list.minutes.number = interval.minutes(); 
                        this.list.seconds.number = interval.seconds();
                    }
                }, 1000);
            },
            settingsChange(name, category) {
                switch(category) {
                    case 'animation': 
                        this.chooseSettings = {...this.chooseSettings, animation: name}
                        break
                    case 'background':
                        this.chooseSettings = {...this.chooseSettings, background: name}
                        break
                }
            }
        },
        computed: {
            timer() {
                if(this.timerCategory === '/time') {
                    delete this.list.days
                    return this.list
                } else {
                    return this.list
                }
            }
        }
    }
</script>

<style lang="scss">
    h1 {
        margin-bottom: 3rem;
    }
    .timer {
        display: inline-grid;
        &__btn {
            font-size: 2rem;
            font-weight: 500;
            background: beige;
            color: brown;
            border: .5rem solid brown;
            &:hover {
                transition: .2s;
                color: beige;
                background: brown;
                cursor: pointer;
            }
            &-start {
                min-width: 150px;
            }
        }
        &__input-block {
            display: flex;
            flex-direction: column;
            align-items: center;
            & > div {
                display: flex;
                flex-direction: column;
                align-items: baseline;
                justify-content: flex-start;
                & > label {
                    font-size: 2rem;
                    font-weight: 500;
                    margin-right: .5rem;
                }
            }
        }
        &__input {
            width: 200px;
            height: 50px;
            margin-bottom: 1rem;
        }
        &__list {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 2rem 0;
            & > li:last-child > div:last-child {
                display: none;
            }
        }
        &__item {
            display: flex;
            align-items: baseline;
            &_number {
                display: flex;
                align-items: center;
                justify-content: center;
                &.rotateX {
                    animation: rotateX ease 1s;
                }
                &.scale {
                    animation: scale ease 1s;
                }
                &.flipBottom {
                    transform-origin: center top;
                    animation-fill-mode: both;
                    animation: flipBottom 0.6s cubic-bezier(0.15, 0.45, 0.28, 1);
                }
          
                & div {
                    color: beige;
                    font-size: 3rem;
                    font-weight: 500;
                    background: brown;
                    border: 1px solid brown;
                    border-radius: 10px;
                    padding: 0 .5rem;
                    margin: .5rem .2rem;
                    &.green {
                        background: rgb(126, 188, 126);
                        border: 1px solid rgb(126, 188, 126);
                    }
                    &.blue {
                        background: rgb(100, 100, 227);
                        border: 1px solid rgb(100, 100, 227);
                    }
                    &.orange {
                        background: rgb(255, 165, 0);
                        border: 1px solid rgb(255, 165, 0);
                    }
                }
            }
            &_separator {
                font-size: 3rem;
                font-weight: 500;
                margin: 0 0.5rem;
            }
            &_text {
                color: brown;
                font-size: 1.5rem;
                font-weight: 500;
            }
        }
        &__settings {
            display: flex;
            flex-direction: column;
            background: beige;
            &_item {
                & > h2 {
                    margin: 0;
                    padding: 1rem;
                    border-bottom: .2rem solid brown;
                    &:hover {
                        transition: .1s;
                        color: beige;
                        background: brown;
                        cursor: pointer;
                    }
                }
                & > ul li {
                    color: brown;
                    font-size: 1.5rem;
                    font-weight: 500;
                    border: .2rem solid brown;
                    margin: 1rem;
                    padding: 1rem;
                    &:hover {
                        transition: .2s;
                        color: beige;
                        background: brown;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    @keyframes rotateX{
        from {transform: rotateX(0);}
        to {transform: rotateX(360deg);}
    }
    @keyframes scale{
        from {transform: scale(0);}
        to {transform: scale(1);}
    }
    @keyframes flipBottom {
    0%,
    50% {
        z-index: -1;
        transform: rotateX(90deg);
        opacity: 0;
    }
    51% {
        opacity: 1;
    }
    100% {
        opacity: 1;
        transform: rotateX(0deg);
        z-index: 5;
    }
}

</style>