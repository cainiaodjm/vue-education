
<template>
  <div class="hover">
    <span>Hover Me</span>
    <a href="https://twitter.com/twitter"  class="social-link"  target="_blank">
      <i class="fab fa-twitter"></i>
      <slot></slot>
    </a>
    <a href="#" class="social-link" target="_blank">
      <i class="fab fa-twitter"></i>
    </a>
    <a href="#" class="social-link" target="_blank">
      <i class="fab fa-twitter"></i>
    </a>
    <a href="#" class="social-link" target="_blank">
      <i class="fab fa-twitter"></i>
    </a>
  </div>
</template>


<script>
export default {
  name: "hover-me"
};
</script>

<style lang="less" >
@base-duration: 250ms;

//colors
@primary: #4db6ac;
@accent: #46627f;
@white: whitesmoke;
@color-3: #bdc3c7;

//Breakpoints

@sm: 20rem;
@med: 48rem;
@lg: 64rem;
*,
*:before,
*:after {
  box-sizing: border-box;
  outline: none;
}

.hover {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 75px;
  background-color: @primary;
  border-radius: 99px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  &:before,
  &:after {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    width: 50%;
    height: 100%;
    background-color: pink;
    transition: 0.25s linear;
    z-index: 1;
  }
  &:before {
    content: "";
    left: 0;
    justify-content: flex-end;
    background-color: @primary;
  }
  &:after {
    content: "";
    right: 0;
    justify-content: flex-start;
    background-color: darken(@primary, 5%);
  }
  &:hover {
    background-color: @accent;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    span {
      opacity: 0;
      z-index: -3;
    }
    &:before {
      opacity: 0.5;
      transform: translateY(-100%);
    }
    &:after {
      opacity: 0.5;
      transform: translateY(100%);
    }
  }
  span {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: @white;
    font-family: "Fira Mono", monospace;
    font-size: 24px;
    font-weight: 700;
    opacity: 1;
    transition: opacity 0.25s;
    z-index: 2;
  }
  .social-link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 100%;
    color: @white;
    font-size: 24px;
    text-decoration: none;
    transition: 0.25s;
    i {
      text-shadow: 1px 1px rgba(@accent, 0.7);
      transform: scale(1);
    }
    &:hover {
      background-color: rgba(@white, 0.1);
      i {
        animation: bounce 0.4s linear;
      }
    }
  }
}
</style>
