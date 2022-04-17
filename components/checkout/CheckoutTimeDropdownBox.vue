<template>
  <div
    ref="checkout-time-dropdown-box"
    class="dropdown"
  >
    <ul>
      <li
        v-for="time in times"
        :class="{'active': time === selectedTime}"
        @click.prevent="selectTime(time)"
      >
        {{ time }}
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  name: 'CheckoutTimeDropdownBox',
  props: {
    value: String,
  },
  data() {
    return {
      selectedTime: this.value,
    };
  },
  computed: {
    times() {
      const result = [];
      const startHour = new Date().getHours() + 1;
      for (let hour = startHour; hour < 22; hour++) {
        for (let minute = 0; minute < 60; minute += 60) {
          const time = `с ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} до ${String(hour + 1)
            .padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
          result.push(time);
        }
      }

      return result;
    },
  },

  mounted() {
    this.$nextTick(() => {
      const el = this.$refs['checkout-time-dropdown-box'].querySelector('.active');
      if (el) {
        el.scrollIntoView();
      }
    });
  },
  methods: {
    selectTime(time) {
      this.$emit('input', time);
      this.$emit('close');
    },
  },

};
</script>
