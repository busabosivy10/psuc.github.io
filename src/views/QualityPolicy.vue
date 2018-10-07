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
  <b-card  bg-variant="dark" text-variant="white" title="Quality Policy">
  <p class="card-text">
   The Pangasinan State University shall be recognized as an ASEAN premier state university that provides quality education and satisfactory service delivery through instruction, research, extension and production.
  </p>
   <p class="card-text">
  <ul>We commit our expertise and resources to produce professionals who meet the expectations of the industry and other interested parties in the national and international community.</ul>
  </p>
   <p class="card-text">
  <ul>We shall continuously improve our operations in response to the changing environment and in support of the institution’s strategic direction.</ul>
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