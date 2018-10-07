<template>
  <div>



    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="1000"
                img-height="250"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
    >

      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
             src="/psu1.png" alt="psu" />
      </b-carousel-slide>
       <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
             src="/psu.png" alt="psu" />
      </b-carousel-slide>
       <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
             src="/psu4.png" alt="psu" />
      </b-carousel-slide>

    </b-carousel>

   <b-card  bg-variant="dark" text-variant="white" title="Guiding Philosophy and Core Values">
    <b-card  bg-variant="dark" text-variant="white" title="Guiding Philosophy">
   </b-card>
  <p class="card-text">
    The Pangasinan State University’s leadership adheres to the Filipino educational philosophy that education is geared towards better citizenship and livelihood and the United Nation’s declaration that EDUCATION IS FOR ALL giving ACCESS to quality education.
  </p>
  </b-card>
  <b-card  bg-variant="dark" text-variant="white" title="">
    <b-card  bg-variant="dark" text-variant="white" title="Core Values">
   </b-card>
  <p class="card-text">
    <ul><b>A</b>ccountability and Transparency</ul>

<ul><b>C</b>redibility and Integrity</ul>

<ul><b>C</b>ompetence and Commitment to Achieve</ul>

<ul><b>E</b>xcellence in Service Delivery</ul>

<ul><b>S</b>ocial and Environmental Responsiveness</ul>

<ul><b>S</b>pirituality</ul>
  </p>
</b-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>
<!-- carousel-1.vue -->