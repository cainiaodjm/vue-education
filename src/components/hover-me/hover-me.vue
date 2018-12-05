
<template>
    <div class="hover">
        <span>Hover Me</span>
        <a href="#" class="social-link"  target="_blank">
            <i class="fab fa-twitter"></i>
        </a>
         <a href="#" class="social-link"  target="_blank">
            <i class="fab fa-twitter"></i>
        </a>
         <a href="#" class="social-link"  target="_blank">
            <i class="fab fa-twitter"></i>
        </a>
         <a href="#" class="social-link"  target="_blank">
            <i class="fab fa-twitter"></i>
        </a>
    </div>
</template>


<script>
export default {
    name:'hover-me'
}
</script>

<style lang="less" scoped>
    @base-duration:250ms;

    //colors
    @primary:#4DB6AC;
    @accent: #46627f;
    @white: whitesmoke;
    @color-3: #bdc3c7;

    //Breakpoints

    @sm:20rem;
    @med:48rem;
    @lg:64rem;
    *, *:before, *:after {
	box-sizing: border-box;
    outline: none;
    }
    html{
        font-family: 'Source Sans Pro';
        font-smooth: auto;
	    font-weight: 300;
	    line-height: 1.5;
	    color: #444;
    }
    .hover{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 300px;
        height: 75px;
        background-color:@primary;
        border-radius: 99px;
        box-shadow:0 1px 3px rgba(0, 0, 0, 0.12),0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1)

    }

</style>
