<template>
  <div class="toggle-sidebar">
    <label class="container">
      <svg
        viewBox="0 0 320 512"
        height="1em"
        xmlns="http://www.w3.org/2000/svg"
        class="chevron-right"
      >
        <path
          d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
        ></path>
      </svg>
    </label>
  </div>
</template>
<script>
export default {};
</script>
<style>
container {
  --color: #a5a5b0;
  --size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-size: var(--size);
  user-select: none;
  fill: var(--color);
}

.container .chevron-right {
  position: absolute;
  animation: keyframes-return 0.5s backwards;
}

.container input:checked ~ .chevron-right {
  animation: keyframes-rotate 0.5s backwards;
  transform: rotate(180deg);
}

@keyframes keyframes-rotate {
  0% {
    transform: rotate(0deg);
    opacity: 0;
  }

  100% {
    transform: rotate(180deg);
  }
}

@keyframes keyframes-return {
  0% {
    transform: rotate(180deg);
    opacity: 0;
  }

  100% {
    transform: rotate(0deg);
  }
}
</style>
