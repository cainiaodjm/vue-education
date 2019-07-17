<template>
    <button class="g-button">按钮</button>
</template>
<script>
    export default {
        name:'gButton'
    }
</script>
<style lang="less">
    .g-button{
        font-size: var(--font-size);
        height: var(--button-height);

        background-color:var(--button-bg);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        padding: 0 1em;
        &:hover{
            border-color: var(--border-color-hover);
        }
        &:active{
            background-color: var(--button-active-bg);
        }
        &:focus{
            outline: none;
        }

    }

</style>