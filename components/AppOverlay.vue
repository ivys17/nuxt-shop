<template>
  <div class="overlay"></div>
</template>

<script>
export default {
  name: 'AppOverlay',
};
</script>

<style
  scoped
  lang="scss">
.overlay {
  position   : fixed;
  z-index    : 50;
  top        : 0;
  right      : 0;
  bottom     : 0;
  left       : 0;
  display    : block;
  opacity    : 0.8;
  background : #fff;


}
</style>
